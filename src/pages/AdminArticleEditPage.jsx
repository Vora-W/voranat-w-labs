import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, ChevronDown } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import CustomButton from "../components/ui/CustomButton";
import { fetchBlogPosts } from "../api/blogPost";
import { toast } from "sonner";

const MAX_INTRODUCTION_LETTERS = 120;

export default function AdminArticleEditPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);
  const [postNotFound, setPostNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoadingCategories(true);
      try {
        const result = await fetchBlogPosts({ page: 1, limit: 50 });
        const fromApi = result.posts.map((p) => p.category).filter(Boolean);
        const list = [...new Set(fromApi)].sort();
        setCategories(list);
      } finally {
        setLoadingCategories(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!postId) {
      setLoadingPost(false);
      setPostNotFound(true);
      return;
    }
    let isActive = true;
    const loadPost = async () => {
      setLoadingPost(true);
      setPostNotFound(false);
      try {
        const post = await fetchBlogPosts({ postId });
        if (!isActive) return;
        setCategory(post.category || "");
        setAuthorName(post.author || "");
        setTitle(post.title || "");
        setIntroduction(post.description || "");
        setContent(post.content || "");
        if (post.image) setThumbnailPreview(post.image);
      } catch {
        if (isActive) setPostNotFound(true);
      } finally {
        if (isActive) setLoadingPost(false);
      }
    };
    loadPost();
    return () => { isActive = false; };
  }, [postId]);

  const introLength = introduction.length;
  const introOver = introLength > MAX_INTRODUCTION_LETTERS;

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setThumbnailPreview(url);
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    toast.success("Article saved as draft", {
      description: "You can publish article later",
    });
    navigate("/admin/articles");
  };

  const handleSavePublish = (e) => {
    e.preventDefault();
    toast.success("Article updated and published", {
      description: "Your article has been successfully updated",
    });
    navigate("/admin/articles");
  };

  const rightContent = (
    <div className="flex items-center gap-3">
      <CustomButton
        type="button"
        variant="light"
        className="h-10 px-6 py-2 text-sm disabled:opacity-50"
        onClick={handleSaveDraft}
      >
        Save as draft
      </CustomButton>
      <CustomButton
        type="button"
        variant="dark"
        className="h-10 px-6 py-2"
        onClick={handleSavePublish}
      >
        Save and publish
      </CustomButton>
    </div>
  );

  if (loadingPost) {
    return (
      <AdminLayout title="Edit article">
        <div className="py-10 text-center text-sm text-brown-400">
          Loading…
        </div>
      </AdminLayout>
    );
  }

  if (postNotFound) {
    return (
      <AdminLayout title="Edit article">
        <div className="flex flex-col items-center gap-4 py-10">
          <p className="text-center text-sm text-brown-400">Article not found.</p>
          <CustomButton variant="light" className="h-10 px-6 py-2" onClick={() => navigate("/admin/articles")}>
            Back to articles
          </CustomButton>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit article" rightContent={rightContent}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Thumbnail image */}
        <div className="space-y-2">
          <label className="block text-body-1 text-brown-400">
            Thumbnail image
          </label>
          <div className="flex flex-wrap items-start gap-4">
            <div
              className="flex h-40 w-64 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-brown-200 bg-brown-100/50"
              style={{
                backgroundImage: thumbnailPreview
                  ? `url(${thumbnailPreview})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!thumbnailPreview && (
                <ImagePlus className="size-10 text-brown-400" />
              )}
            </div>
            <CustomButton
              type="button"
              variant="light"
              className="h-10 px-4 py-2 text-body-2"
              onClick={() => document.getElementById("thumbnail-upload").click()}
            >
              Upload thumbnail image
            </CustomButton>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
          </div>
        </div>

        {/* Category */}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-brown-200 bg-white py-3 pl-4 pr-10 text-body-1 text-brown-400 focus:border-brown-400 focus:outline-none disabled:opacity-50"
              disabled={loadingCategories}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-brown-400" />
          </div>
        </div>

        {/* Author name */}
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
            onChange={(e) => setAuthorName(e.target.value)}
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
            placeholder="Author name"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-body-1 text-brown-400"
          >
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

        {/* Introduction (max 120 letters) */}
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

        {/* Content */}
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-body-1 text-brown-400"
          >
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
