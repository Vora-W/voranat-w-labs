export function validateForm({ email, password }) {
  const errors = {
    email: '',
    password: '',
  };

  let hasError = false;

  // No validation for name and username - they are optional

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    hasError = true;
    errors.email = " "; 
  } else if (!emailRegex.test(email)) {
    hasError = true;
    errors.email = 'Email must be a valid email';
  }

  // Validate password
  if (!password) {
    hasError = true;
    errors.password = " "; 
  } else if (password.length < 6) {
    hasError = true;
    errors.password = 'Password must be at least 6 characters';
  }

  return { hasError, errors };
}

// Function to check if email is already taken (simulate API call)
export function checkEmailExists(email) {
  // Simulate existing emails for demo
  const existingEmails = ['moodeng.cute@gmail.com', 'test@example.com'];
  return existingEmails.includes(email.toLowerCase());
}

export function validateEmailExists(email) {
  if (checkEmailExists(email)) {
    return {
      hasError: true,
      error: 'Email is already taken. Please try another email.'
    };
  }
  return { hasError: false, error: '' };
}
