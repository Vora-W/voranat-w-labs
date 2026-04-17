import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
const withAuthHeaders = (accessToken) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const isFormDataPayload = (payload) =>
  typeof FormData !== "undefined" && payload instanceof FormData;

export function buildProfileFormData(payload = {}) {
  if (isFormDataPayload(payload)) return payload;

  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (key === "profileImageFile") {
      formData.append("profileImageFile", value);
      return;
    }
    formData.append(key, value);
  });

  return formData;
}

export async function signUpWithEmailPassword({
  email,
  password,
  username,
  name,
}) {
  const response = await axios.post(`${AUTH_BASE_URL}/register`, {
    email,
    password,
    username,
    name,
  });

  return response.data;
}

export async function signInWithEmailPassword({ email, password }) {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, {
    email,
    password,
  });

  return response.data;
}

export const loginWithEmailPassword = signInWithEmailPassword;

export async function fetchCurrentUser(accessToken) {
  const response = await axios.get(
    `${AUTH_BASE_URL}/get-user`,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function fetchCurrentAdmin(accessToken) {
  const response = await axios.get(
    `${AUTH_BASE_URL}/get-admin`,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function updateCurrentUserProfile(accessToken, payload) {
  const requestBody = buildProfileFormData(payload);
  const response = await axios.put(
    `${AUTH_BASE_URL}/profile`,
    requestBody,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

export async function resetCurrentUserPassword(accessToken, payload) {
  const response = await axios.put(
    `${AUTH_BASE_URL}/reset-password`,
    payload,
    withAuthHeaders(accessToken)
  );
  return response.data;
}

