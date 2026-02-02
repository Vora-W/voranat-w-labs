import NavBar from "../components/NavBar";
import CustomButton from "../components/ui/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    email,
    password,
    isSubmitted,
    errors,
    setEmail,
    setPassword,
    handleSubmit,
    clearFieldError,
  } = useForm(false, true, {
    onValidationError: (errs) => {
      if (errs.email || errs.password) {
        toast.error("Your password is incorrect or this email does not exist", {
          description: "Please try another password or email",
        });
      }
    },
  });

  useEffect(() => {
    if (isSubmitted) {
      navigate("/");
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="bg-brown-100 w-full flex items-center justify-center pt-10 pb-20 md:pt-15 md:pb-30">
        <div
          className="w-[344px] h-full rounded-2xl pt-10 pr-4 pb-10 pl-4 gap-6 flex flex-col justify-between mx-auto
                        md:w-[798px] md:pt-15 md:pr-30 md:pb-15 md:pl-30 md:gap-10
                        bg-brown-200"
        >
          <header className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-headline-2 text-brown-600">Log in</h2>
          </header>

          {!isSubmitted && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 md:gap-8"
            >
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
                    errors.email || errors.password
                      ? "border-brand-red focus:border-brand-red text-brand-red"
                      : "border-brown-300 focus:border-brown-500 text-brown-600"
                  }`}
                />
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
                      errors.password || errors.email
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
              </div>

              {/* Log In Button */}
              <div className="flex justify-center md:pt-3">
                <CustomButton variant="dark" type="submit">
                  Log in
                </CustomButton>
              </div>
            </form>
          )}

          {/* Sign Up Link */}
          {!isSubmitted && (
            <div className="text-center">
              <span className="text-body-1 text-brown-400">
                Don't have an account?{" "}
              </span>
              <Link
                to="/auth/signup"
                className="text-body-1 text-brown-600 font-medium underline hover:text-brown-400"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
