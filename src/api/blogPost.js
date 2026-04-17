import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const withAuthHeaders = (accessToken) =>
  accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : {};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatCommentDate = (isoDate) => {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  const datePart = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} at ${timePart}`;
};

const normalizeImageUrl = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/^"+|"+$/g, "");
};

const mapComment = (raw) => ({
  id: raw.id,
  postId: raw.post_id ?? raw.postId ?? null,
  userId: raw.user_id ?? raw.userId ?? null,
  text: raw.comment_text ?? raw.commentText ?? raw.text ?? "",
  author: raw.name ?? raw.username ?? raw.author ?? "Anonymous",
  profilePic: normalizeImageUrl(raw.profile_pic ?? raw.profilePic ?? ""),
  createdAt: raw.created_at ?? raw.createdAt ?? "",
  formattedDate: formatCommentDate(raw.created_at ?? raw.createdAt),
});

const mapPost = (raw) => ({
  ...raw,
  category: raw.category_name ?? raw.category,
  date: formatDate(raw.date),
  author: raw.author_name ?? raw.name ?? raw.author ?? "Admin",
  authorProfilePic: normalizeImageUrl(
    raw.author_profile_pic ?? raw.authorProfilePic ?? raw.profile_pic ?? ""
  ),
});

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
    return mapPost(raw);
  }

  // Fetch list of posts
  const categoryParam = category === "Highlight" ? "" : category;

  // Backend expects query param name `categories`
  const params = { page, limit };
  if (categoryParam) params.categories = categoryParam;

  const response = await axios.get(baseUrl, { params });
  console.log("response.data:", response.data);

  const posts = response.data.posts.map(mapPost);

  return {
    posts,
    currentPage: response.data.currentPage,
    totalPages: response.data.totalPages,
  };
};

export const fetchPostLikes = async ({ postId, accessToken } = {}) => {
  const response = await axios.get(
    `${API_BASE_URL}/posts/${postId}/likes`,
    withAuthHeaders(accessToken)
  );
  return response.data;
};

export const fetchPostComments = async ({ postId, accessToken } = {}) => {
  const response = await axios.get(
    `${API_BASE_URL}/posts/${postId}/comments`,
    withAuthHeaders(accessToken)
  );

  const rawComments =
    response.data?.comments ?? response.data?.data ?? response.data ?? [];

  return Array.isArray(rawComments) ? rawComments.map(mapComment) : [];
};

export const createPostComment = async ({
  postId,
  commentText,
  accessToken,
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/posts/${postId}/comments`,
    {
      comment_text: commentText,
      commentText,
    },
    withAuthHeaders(accessToken)
  );

  const rawComment =
    response.data?.comment ?? response.data?.data ?? response.data ?? {};

  return mapComment(rawComment);
};

export const likePost = async ({ postId, accessToken }) => {
  const response = await axios.post(
    `${API_BASE_URL}/posts/${postId}/likes`,
    {},
    withAuthHeaders(accessToken)
  );
  return response.data;
};
