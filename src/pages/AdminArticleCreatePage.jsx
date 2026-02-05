import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import CustomButton from "../components/ui/CustomButton";
import { fetchBlogPosts } from "../api/blogPost";
import { toast } from "sonner";

const MOCK = {
  category: "Cat",
  authorName: "Thompson P.",
  title:
    "The Fascinating World of Cats: Why We Love Our Furry Friends",
  introduction:
    "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let's dive into the unique traits, behaviors, and quirks that make cats endlessly fascinating.",
  content: `## 1. Independent Yet Affectionate

Cats are often misunderstood as aloof, but anyone who has shared their home with one knows they form deep bonds. They show affection on their own terms—a head bump, a purr, or curling up on your lap. This independence is part of their charm; they choose when to seek attention, making every moment of connection feel earned and special.

## 2. Playful Personalities

From chasing laser dots to pouncing on feather toys, cats have a natural playfulness that keeps us entertained. Their curiosity drives them to explore every corner and box in the house. Watching a cat "hunt" a toy reminds us of their wild ancestry while highlighting their adaptability to indoor life.

## 3. Communication Through Body Language

Cats communicate in subtle ways—a twitching tail, flattened ears, or slow blinks. Learning to read these signals deepens the bond between human and cat. The famous "slow blink" is often called a cat's way of saying "I love you," and many owners find it one of the most heartwarming gestures.`,
};

const MAX_INTRODUCTION_LETTERS = 120;

export default function AdminArticleCreatePage() {
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [category, setCategory] = useState(MOCK.category);
  const [authorName, setAuthorName] = useState(MOCK.authorName);
  const [title, setTitle] = useState(MOCK.title);
  const [introduction, setIntroduction] = useState(MOCK.introduction);
  const [content, setContent] = useState(MOCK.content);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoadingCategories(true);
      try {
        const result = await fetchBlogPosts({ page: 1, limit: 50 });
        const fromApi = result.posts.map((p) => p.category).filter(Boolean);
        const list = [...new Set([MOCK.category, ...fromApi])].sort();
        setCategories(list);
      } finally {
        setLoadingCategories(false);
      }
    };
    load();
  }, []);

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
    toast.success("Create article and saved as draft", {
      description: "You can publish article later",
    });
    navigate("/admin/articles");
  };

  const handleSavePublish = (e) => {
    e.preventDefault();
    toast.success("Create article and published", {
      description: "Your article has been successfully published",
    });
    navigate("/admin/articles");
  };

  const rightContent = (
    <div className="flex items-center gap-3">
      <CustomButton
        type="button"
        variant="light"
        className="h-10 px-6 py-2 text-body-2"
        onClick={handleSaveDraft}
      >
        Save as draft
      </CustomButton>
      <CustomButton
        type="button"
        variant="dark"
        className="h-10 px-6 py-2 text-body-2"
        onClick={handleSavePublish}
      >
        Save and publish
      </CustomButton>
    </div>
  );

  return (
    <AdminLayout title="Create article" rightContent={rightContent}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Thumbnail image */}
        <div className="space-y-2">
          <label className="block text-body-2 font-medium text-brown-600">
            Thumbnail image
          </label>
          <div className="flex flex-wrap items-start gap-4">
            <div
              className="flex h-40 w-64 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-brown-300 bg-brown-100/50"
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
            className="block text-body-2 font-medium text-brown-600"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 w-full max-w-md rounded-lg border border-brown-300 bg-white px-4 text-body-1 text-brown-600 focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
            disabled={loadingCategories}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Author name */}
        <div className="space-y-2">
          <label
            htmlFor="authorName"
            className="block text-body-2 font-medium text-brown-600"
          >
            Author name
          </label>
          <input
            id="authorName"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="h-12 w-full max-w-md rounded-lg border border-brown-300 bg-white px-4 text-body-1 text-brown-600 placeholder:text-brown-400 focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
            placeholder="Author name"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-body-2 font-medium text-brown-600"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 w-full rounded-lg border border-brown-300 bg-white px-4 text-body-1 text-brown-600 placeholder:text-brown-400 focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
            placeholder="Article title"
          />
        </div>

        {/* Introduction (max 120 letters) */}
        <div className="space-y-2">
          <label
            htmlFor="introduction"
            className="block text-body-2 font-medium text-brown-600"
          >
            Introduction (max {MAX_INTRODUCTION_LETTERS} letters)
          </label>
          <textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            rows={3}
            className={`w-full rounded-lg border px-4 py-3 text-body-1 text-brown-600 placeholder:text-brown-400 focus:outline-none focus:ring-1 ${
              introOver
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-brown-300 focus:border-brown-500 focus:ring-brown-500"
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
            className="block text-body-2 font-medium text-brown-600"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="w-full rounded-lg border border-brown-300 px-4 py-3 text-body-1 text-brown-600 placeholder:text-brown-400 focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
            placeholder="Content"
          />
        </div>
      </form>
    </AdminLayout>
  );
}
