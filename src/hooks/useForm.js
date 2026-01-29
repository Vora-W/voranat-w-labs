import { useState } from "react";
import { validateForm, validateEmailExists } from "../utils/validation";

export function useForm(isSignUp = true) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // First validate form fields
    const { hasError: validationHasError, errors: newErrors } = validateForm({
      name,
      username,
      email,
      password,
      isSignUp,
    });

    // Check if email already exists (for sign up)
    if (isSignUp && !newErrors.email && email) {
      const { hasError: emailExistsError, error: emailError } =
        validateEmailExists(email);
      if (emailExistsError) {
        newErrors.email = emailError;
        setErrors(newErrors);
        setHasError(true);
        return;
      }
    }

    setErrors(newErrors);
    setHasError(validationHasError);

    if (!validationHasError) {
      setIsSubmitted(true);
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
