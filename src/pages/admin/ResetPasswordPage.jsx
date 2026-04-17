import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import CustomButton from "../../components/ui/CustomButton";
import { resetAdminPassword } from "../../api/admin";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const { accessToken } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!currentPassword.trim()) {
      toast.error("Please enter your current password.");
      return;
    }
    if (!newPassword.trim()) {
      toast.error("Please enter a new password.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (!accessToken) {
      toast.error("Please sign in again");
      return;
    }

    setIsSaving(true);
    try {
      await resetAdminPassword(accessToken, {
        oldPassword: currentPassword,
        newPassword,
      });
      toast.success("Password reset", {
        description: "Your password has been successfully updated",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(
        err?.response?.data?.error || err?.message || "Failed to reset password"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const rightContent = (
    <CustomButton
      type="button"
      variant="dark"
      className="h-10 px-6 py-2"
      onClick={handleReset}
      disabled={isSaving}
    >
      {isSaving ? "Resetting..." : "Reset password"}
    </CustomButton>
  );

  const inputClass =
    "h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 pr-12 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400";

  return (
    <AdminLayout title="Reset password" rightContent={rightContent}>
      <form className="space-y-6" onSubmit={handleReset}>
        <div className="space-y-2">
          <label
            htmlFor="currentPassword"
            className="block text-body-1 text-brown-400"
          >
            Current password
          </label>
          <div className="relative max-w-md">
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              aria-label={
                showCurrentPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
            >
              {showCurrentPassword ? (
                <EyeOff className="w-6 h-6 text-brown-400 hover:text-brown-600" />
              ) : (
                <Eye className="w-6 h-6 text-brown-400 hover:text-brown-600" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="block text-body-1 text-brown-400"
          >
            New password
          </label>
          <div className="relative max-w-md">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
            >
              {showNewPassword ? (
                <EyeOff className="w-6 h-6 text-brown-400 hover:text-brown-600" />
              ) : (
                <Eye className="w-6 h-6 text-brown-400 hover:text-brown-600" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-body-1 text-brown-400"
          >
            Confirm new password
          </label>
          <div className="relative max-w-md">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-6 h-6 text-brown-400 hover:text-brown-600" />
              ) : (
                <Eye className="w-6 h-6 text-brown-400 hover:text-brown-600" />
              )}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
