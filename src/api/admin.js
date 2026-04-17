import axios from "axios";
import { buildProfileFormData } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTS_BASE_URL = `${API_BASE_URL}/posts`;
const CATEGORIES_BASE_URL = `${API_BASE_URL}/categories`;
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

const withAuthHeaders = (accessToken) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const isFormDataPayload = (payload) =>
  typeof FormData !== "undefined" && payload instanceof FormData;

export function buildAdminPostFormData(payload = {}) {
  if (isFormDataPayload(payload)) return payload;

  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (key === "imageFile") {
      formData.append("imageFile", value);
      return;
    }
    formData.append(key, value);
  });

  return formData;
}

const mapPost = (raw) => ({
  ...raw,
  categoryId: raw.category_id ?? null,
  category: raw.category_name ?? raw.category ?? "",
  categoryName: raw.category_name ?? "",
  statusId: raw.status_id ?? null,
  status: raw.status_name ?? "",
});

export async function fetchAdminProfile(accessToken) {
  const response = await axios.get(
    `${AUTH_BASE_URL}/get-admin`,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function updateAdminProfile(accessToken, payload) {
  const requestBody = buildProfileFormData(payload);
  const response = await axios.put(
    `${AUTH_BASE_URL}/admin/profile`,
    requestBody,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function resetAdminPassword(accessToken, payload) {
  const response = await axios.put(
    `${AUTH_BASE_URL}/admin/reset-password`,
    payload,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function fetchAdminPostOptions(accessToken) {
  const response = await axios.get(
    `${POSTS_BASE_URL}/admin/options`,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function fetchAdminPosts({
  page = 1,
  limit = 10,
  category,
  keyword,
} = {}) {
  const params = { page, limit };
  if (category) params.categories = category;
  if (keyword) params.keywords = keyword;

  const response = await axios.get(POSTS_BASE_URL, { params });
  return {
    ...response.data,
    posts: (response.data.posts || []).map(mapPost),
  };
}

export async function fetchAdminPost(postId) {
  const response = await axios.get(`${POSTS_BASE_URL}/${postId}`);
  return mapPost(response.data?.data ?? response.data);
}

export async function createAdminPost(accessToken, payload) {
  const requestBody = buildAdminPostFormData(payload);
  const response = await axios.post(
    POSTS_BASE_URL,
    requestBody,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function updateAdminPost(accessToken, postId, payload) {
  const requestBody = buildAdminPostFormData(payload);
  const response = await axios.put(
    `${POSTS_BASE_URL}/${postId}`,
    requestBody,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function deleteAdminPost(accessToken, postId) {
  const response = await axios.delete(
    `${POSTS_BASE_URL}/${postId}`,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function fetchAdminCategories(accessToken) {
  const response = await axios.get(
    CATEGORIES_BASE_URL,
    withAuthHeaders(accessToken)
  );
  return response.data.categories || [];
}

export async function createAdminCategory(accessToken, payload) {
  const response = await axios.post(
    CATEGORIES_BASE_URL,
    payload,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function updateAdminCategory(accessToken, categoryId, payload) {
  const response = await axios.put(
    `${CATEGORIES_BASE_URL}/${categoryId}`,
    payload,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function deleteAdminCategory(accessToken, categoryId) {
  const response = await axios.delete(
    `${CATEGORIES_BASE_URL}/${categoryId}`,
    withAuthHeaders(accessToken)
  );
  return response.data;
}
