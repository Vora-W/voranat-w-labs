import { useState } from "react";
import { validateForm } from "../utils/validation";
//validateEmailExists

export function useForm(
  isSignUp = true,
  isLogin = true,
  { onValidationError, onValidationSuccess } = {},
) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First validate form fields
    const { hasError: validationHasError, errors: newErrors } = validateForm({
      name,
      username,
      email,
      password,
      isSignUp,
      isLogin,
    });

    setErrors(newErrors);
    setHasError(validationHasError);

    if (validationHasError && onValidationError) {
      onValidationError(newErrors);
    }
    if (!validationHasError) {
      const allowSubmit =
        typeof onValidationSuccess === "function"
          ? await onValidationSuccess({ name, username, email, password })
          : true;
      if (allowSubmit) setIsSubmitted(true);
    }
  };

  const clearErrors = () => {
    setErrors({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    setHasError(false);
  };

  // Clear a specific field error (immutably) so the message disappears when the user edits the field
  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: "" };
    });
  };

  return {
    // State
    name,
    username,
    email,
    password,
    isSubmitted,
    hasError,
    errors,
    // Setters
    setName,
    setUsername,
    setEmail,
    setPassword,
    // Actions
    handleSubmit,
    clearErrors,
    clearFieldError,
  };
}
