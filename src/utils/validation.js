export function validateForm({ name, username, email, password, isSignUp = true}) {
  const errors = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  let hasError = false;

  // Validate name (only for sign up)
  if (isSignUp && !name) {
    hasError = true;
    errors.name = 'Name is required';
  }

  // Validate username (only for sign up)
  if (isSignUp && !username) {
    hasError = true;
    errors.username = 'Username is required';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    hasError = true;
    errors.email = 'Email is required'; 
  } else if (!emailRegex.test(email)) {
    hasError = true;
    errors.email = 'Email must be a valid email';
  }

  // Validate password
  if (!password) {
    hasError = true;
    errors.password = 'Password is required'; 
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
