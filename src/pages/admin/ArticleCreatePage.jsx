import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import CustomButton from "../../components/ui/CustomButton";
import ImageUploadField from "../../components/ImageUploadField";
import { createAdminPost, fetchAdminPostOptions } from "../../api/admin";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

const MAX_INTRODUCTION_LETTERS = 120;

const normalizeStatusName = (value) => value?.trim().toLowerCase() ?? "";

const findStatusIdByIntent = (statuses, intent) => {
  if (intent === "draft") {
    return (
      statuses.find((status) => normalizeStatusName(status.status) === "draft")?.id ??
      statuses.find((status) =>
        normalizeStatusName(status.status).includes("draft")
      )?.id ??
      null
    );
  }

  const draftId =
    statuses.find((status) => normalizeStatusName(status.status) === "draft")?.id ??
    null;

  return (
    statuses.find(
      (status) => normalizeStatusName(status.status) === "published"
    )?.id ??
    statuses.find((status) => normalizeStatusName(status.status) === "publish")?.id ??
    statuses.find((status) =>
      normalizeStatusName(status.status).includes("publish")
    )?.id ??
    statuses.find((status) => status.id !== draftId)?.id ??
    null
  );
};

export default function ArticleCreatePage() {
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [authorName, setAuthorName] = useState(user?.name || "");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");

  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadingCategories(true);
      try {
        const result = await fetchAdminPostOptions(accessToken);
        setCategories(result.categories || []);
        setStatuses(result.statuses || []);
      } catch (err) {
        toast.error(
          err?.response?.data?.error || err?.message || "Failed to load article options"
        );
      } finally {
        setLoadingCategories(false);
      }
    };
    if (accessToken) load();
  }, [accessToken]);

  useEffect(() => {
    setAuthorName(user?.name || "");
  }, [user]);

  const draftStatusId = useMemo(
    () => findStatusIdByIntent(statuses, "draft"),
    [statuses]
  );

  const publishedStatusId = useMemo(
    () => findStatusIdByIntent(statuses, "publish"),
    [statuses]
  );

  const introLength = introduction.length;
  const introOver = introLength > MAX_INTRODUCTION_LETTERS;

  const handleThumbnailChange = ({ file, previewUrl }) => {
    setThumbnailFile(file);
    setThumbnailPreview(previewUrl);
  };

  const validateForm = (nextStatusId) => {
    if (!thumbnailFile) {
      toast.error("Thumbnail image is required");
      return false;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return false;
    }

    if (!title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!introduction.trim()) {
      toast.error("Introduction is required");
      return false;
    }

    if (introOver) {
      toast.error(`Introduction must not exceed ${MAX_INTRODUCTION_LETTERS} letters`);
      return false;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return false;
    }

    if (!nextStatusId) {
      toast.error("Please select a status");
      return false;
    }

    return true;
  };

  const handleSave = async (statusId, successMessage, successDescription) => {
    if (!accessToken) {
      toast.error("Please sign in again");
      return;
    }

    if (!validateForm(statusId)) {
      return;
    }

    setIsSaving(true);
    try {
      await createAdminPost(accessToken, {
        title: title.trim(),
        imageFile: thumbnailFile,
        category_id: Number(categoryId),
        description: introduction.trim(),
        content: content.trim(),
        status_id: Number(statusId),
      });
      toast.success(successMessage, {
        description: successDescription,
      });
      navigate("/admin/articles");
    } catch (err) {
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create article"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const rightContent = (
    <div className="flex items-center gap-3">
      <CustomButton
        type="button"
        variant="light"
        className="h-10 px-6 py-2 text-sm disabled:opacity-50"
        onClick={() =>
          handleSave(
            draftStatusId,
            "Create article and saved as draft",
            "You can publish article later"
          )
        }
        disabled={isSaving || loadingCategories}
      >
        Save as draft
      </CustomButton>
      <CustomButton
        type="button"
        variant="dark"
        className="h-10 px-6 py-2"
        onClick={() =>
          handleSave(
            publishedStatusId,
            "Create article and published",
            "Your article has been successfully published"
          )
        }
        disabled={isSaving || loadingCategories}
      >
        {isSaving ? "Saving..." : "Save and publish"}
      </CustomButton>
    </div>
  );

  return (
    <AdminLayout title="Create article" rightContent={rightContent}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <ImageUploadField
          label="Thumbnail image"
          previewUrl={thumbnailPreview}
          onImageChange={handleThumbnailChange}
          buttonLabel="Upload thumbnail image"
          disabled={isSaving || loadingCategories}
        />

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-body-1 text-brown-400"
          >
            Category
          </label>
          <div className="relative max-w-md">
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-brown-200 bg-white py-3 pl-4 pr-10 text-body-1 text-brown-400 focus:border-brown-400 focus:outline-none disabled:opacity-50"
              disabled={loadingCategories}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-brown-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="authorName"
            className="block text-body-1 text-brown-400"
          >
            Author name
          </label>
          <input
            id="authorName"
            type="text"
            value={authorName}
            readOnly
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
            placeholder="Author name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-body-1 text-brown-400">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 w-full rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
            placeholder="Article title"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="introduction"
            className="block text-body-1 text-brown-400"
          >
            Introduction (max {MAX_INTRODUCTION_LETTERS} letters)
          </label>
          <textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            rows={3}
            className={`w-full rounded-lg border px-4 py-3 text-body-1 bg-white text-brown-400 placeholder:text-brown-400 focus:outline-none focus:ring-1 ${
              introOver
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-brown-200 focus:border-brown-400 focus:ring-brown-400"
            }`}
            placeholder="Introduction"
          />
          <p
            className={`text-body-3 ${introOver ? "text-red-600" : "text-brown-400"}`}
          >
            {introLength} / {MAX_INTRODUCTION_LETTERS}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-body-1 text-brown-400">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="w-full rounded-lg border border-brown-200 bg-white px-4 py-3 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
            placeholder="Content"
          />
        </div>
      </form>
    </AdminLayout>
  );
}
