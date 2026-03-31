import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import CustomButton from "../components/ui/CustomButton";
import { toast } from "sonner";

export default function AdminResetPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = (e) => {
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
    toast.success("Password reset", {
      description: "Your password has been successfully updated",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const rightContent = (
    <CustomButton
      type="button"
      variant="dark"
      className="h-10 px-6 py-2"
      onClick={handleReset}
    >
      Reset password
    </CustomButton>
  );

  const inputClass =
    "h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400";

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
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="block text-body-1 text-brown-400"
          >
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-body-1 text-brown-400"
          >
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className={inputClass}
          />
        </div>
      </form>
    </AdminLayout>
  );
}
