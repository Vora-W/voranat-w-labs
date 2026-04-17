import CustomButton from "../../components/ui/CustomButton";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { loginWithEmailPassword, fetchCurrentAdmin } from "../../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const showLoginError = () => {
    toast.error("Your password is incorrect or this email does not exist", {
      description: "Please try another password or email",
    });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setHasError(true);
      toast.error("Please enter a valid email.");
      return;
    }
    if (!password.trim()) {
      setHasError(true);
      toast.error("Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginWithEmailPassword({
        email: trimmedEmail,
        password,
      });
      const accessToken = data?.access_token;
      if (!accessToken) {
        setHasError(true);
        showLoginError();
        return;
      }

      setToken(accessToken);
      const me = await fetchCurrentAdmin(accessToken);
      setUser(me);
      toast.success("Signed in successfully");
      navigate("/admin/articles");
    } catch (err) {
      const message =
        err?.response?.data?.error || err?.message || "Login failed";
      setHasError(true);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brown-100">
      <main className="w-full flex items-center justify-center pt-10 pb-20 md:pt-15 md:pb-30">
        <div
          className="w-[344px] h-full rounded-2xl pt-10 pr-4 pb-10 pl-4 gap-6 flex flex-col justify-between mx-auto
                        md:w-[798px] md:pt-15 md:pr-30 md:pb-15 md:pl-30 md:gap-10
                        bg-brown-200"
        >
          <header className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-headline-4 text-brand-orange"> Admin panel</h2>
            <h1 className="text-headline-2 text-brown-600">Log in</h1>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-body-1 text-brown-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full h-12 p-3 md:p-4 rounded-lg border bg-white placeholder-brown-400 focus:outline-none ${
                  hasError
                    ? "border-brand-red focus:border-brand-red text-brand-red"
                    : "border-brown-300 focus:border-brown-500 text-brown-600"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-body-1 text-brown-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full p-3 pr-12 h-12 md:p-4 md:pr-14 rounded-lg border bg-white placeholder-brown-400 focus:outline-none ${
                    hasError
                      ? "border-brand-red focus:border-brand-red text-brand-red"
                      : "border-brown-300 focus:border-brown-500 text-brown-600"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

            <div className="flex justify-center md:pt-3">
              <CustomButton variant="dark" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Log in"}
              </CustomButton>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
