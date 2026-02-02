import {
  MOCK_EXISTING_EMAILS,
  MOCK_CORRECT_PASSWORDS,
} from "../mockupData/mockAuthCredentials";

export function validateForm({
  name,
  username,
  email,
  password,
  isSignUp = true,
}) {
  const errors = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  let hasError = false;

  // Validate name (only for sign up)
  if (isSignUp && !name) {
    hasError = true;
    errors.name = "Name is required";
  }

  // Validate username (only for sign up)
  if (isSignUp && !username) {
    hasError = true;
    errors.username = "Username is required";
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (isSignUp && !email) {
    hasError = true;
    errors.email = "Email is required";
  } else if (isSignUp && !emailRegex.test(email)) {
    hasError = true;
    errors.email = "Email must be a valid email";
  } else if (isSignUp && checkEmailExists(email)) {
    hasError = true;
    errors.email = "Email is already taken. Please try another email.";
  } else if (!isSignUp && !checkEmailExists(email)) {
    hasError = true;
    errors.email = "Email is not found. Please try another email.";
  }

  // Validate password (only for sign up)
  if (isSignUp && !password) {
    hasError = true;
    errors.password = "Password is required";
  } else if (isSignUp && password.length < 6) {
    hasError = true;
    errors.password = "Password must be at least 6 characters";
  } else if (!isSignUp && !checkCorrectPassword(password)) {
    hasError = true;
    errors.password = "Password is incorrect";
  }

  return { hasError, errors };
}

// Function to check if email is already taken (simulate API call)
function checkEmailExists(email) {
  return MOCK_EXISTING_EMAILS.includes(email.toLowerCase());
}

function checkCorrectPassword(password) {
  return MOCK_CORRECT_PASSWORDS.includes(password);
}
