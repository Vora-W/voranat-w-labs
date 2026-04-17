import NavBar from "../components/NavBar";
import CustomButton from "../components/ui/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { signUpWithEmailPassword } from "../api/auth";

function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    name,
    username,
    email,
    password,
    isSubmitted,
    errors,
    setName,
    setUsername,
    setEmail,
    setPassword,
    handleSubmit,
    clearFieldError,
  } = useForm(true, true, {
    onValidationSuccess: async (values) => {
      setIsLoading(true);
      try {
        await signUpWithEmailPassword({
          name: values.name.trim(),
          username: values.username.trim(),
          email: values.email.trim(),
          password: values.password,
        });
        toast.success("Registration successful");
        return true;
      } catch (err) {
        const message =
          err?.response?.data?.error || err?.message || "Registration failed";
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="bg-brown-100 w-full flex-1 flex items-start justify-center pt-10 pb-20 md:pt-15 md:pb-30">
        <div
          className="w-[344px] h-full rounded-2xl pt-10 pr-4 pb-10 pl-4 gap-6 flex flex-col justify-between mx-auto
                        md:w-[798px] md:pt-15 md:pr-30 md:pb-15 md:pl-30 md:gap-10
                        bg-brown-200"
        >
          {!isSubmitted ? (
            <>
              <header className="flex flex-col items-center gap-6 text-center">
                <h2 className="text-headline-2 text-brown-600">Sign Up</h2>
              </header>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 md:gap-8"
              >
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-body-1 text-brown-400">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearFieldError("name");
                    }}
                    placeholder="Full name"
                    className={`w-full h-12 p-3 md:p-4 rounded-lg border bg-white placeholder-brown-400 focus:outline-none ${
                      errors.name
                        ? "border-brand-red focus:border-brand-red"
                        : "border-brown-300 focus:border-brown-500 text-brown-600"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-brand-red text-body-2">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Username Field */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="username"
                    className="text-body-1 text-brown-400"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      clearFieldError("username");
                    }}
                    placeholder="Username"
                    className={`w-full h-12 p-3 md:p-4 rounded-lg border bg-white placeholder-brown-400 focus:outline-none ${
                      errors.username
                        ? "border-brand-red focus:border-brand-red"
                        : "border-brown-300 focus:border-brown-500 text-brown-600"
                    }`}
                  />
                  {errors.username && (
                    <span className="text-brand-red text-body-2">
                      {errors.username}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-body-1 text-brown-400">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError("email");
                    }}
                    placeholder="Email"
                    className={`w-full h-12 p-3 md:p-4 rounded-lg border bg-white placeholder-brown-400 focus:outline-none ${
                      errors.email
                        ? "border-brand-red focus:border-brand-red text-brand-red"
                        : "border-brown-300 focus:border-brown-500 text-brown-600"
                    }`}
                  />
                  {errors.email && errors.email !== " " && (
                    <span className="text-brand-red text-body-2">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="password"
                    className="text-body-1 text-brown-400"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError("password");
                      }}
                      placeholder="Password"
                      className={`w-full p-3 pr-12 h-12 md:p-4 md:pr-14 rounded-lg border bg-white placeholder-brown-400 focus:outline-none ${
                        errors.password
                          ? "border-brand-red focus:border-brand-red text-brand-red"
                          : "border-brown-300 focus:border-brown-500 text-brown-600"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-6 h-6 text-brown-400 hover:text-brown-600" />
                      ) : (
                        <Eye className="w-6 h-6 text-brown-400 hover:text-brown-600 " />
                      )}
                    </button>
                  </div>
                  {errors.password && errors.password !== " " && (
                    <span className="text-brand-red text-body-2">
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Sign Up Button */}
                <div className="flex justify-center md:pt-3">
                  <CustomButton variant="dark" type="submit" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Sign up"}
                  </CustomButton>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center gap-6 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-white stroke-4" />
              </div>

              {/* Success Message */}
              <h3 className="text-headline-3 md:text-headline-2 text-brown-600">
                Registration success
              </h3>

              {/* Continue Button */}
              <CustomButton
                variant="dark"
                className="mt-2"
                onClick={() => navigate("/auth/login")}
              >
                Continue
              </CustomButton>
            </div>
          )}

          {/* Login Link */}
          {!isSubmitted && (
            <div className="text-center">
              <span className="text-body-1 text-brown-400">
                Already have an account?{" "}
              </span>
              <Link
                to="/auth/login"
                className="text-body-1 text-brown-600 font-medium underline hover:text-brown-400"
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;
