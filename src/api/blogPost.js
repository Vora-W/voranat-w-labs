import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const fetchBlogPosts = async ({
  postId,
  category,
  page = 1,
  limit = 6,
} = {}) => {
  const baseUrl = `${API_BASE_URL}/posts`;

  // Fetch single post by ID (backend may return { data: post } or post directly)
  if (postId) {
    const response = await axios.get(`${baseUrl}/${postId}`);
    const raw = response.data?.data ?? response.data;
    const post = {
      ...raw,
      category: raw.category_name ?? raw.category,
      date: formatDate(raw.date),
    };
    return post;
  }

  // Fetch list of posts
  const categoryParam = category === "Highlight" ? "" : category;

  // Backend expects query param name `categories`
  const params = { page, limit };
  if (categoryParam) params.categories = categoryParam;

  const response = await axios.get(baseUrl, { params });
  console.log("response.data:", response.data);

  const posts = response.data.posts.map((post) => ({
    ...post,
    category: post.category_name ?? post.category,
    date: formatDate(post.date),
  }));

  return {
    posts,
    currentPage: response.data.currentPage,
    totalPages: response.data.totalPages,
  };
};
