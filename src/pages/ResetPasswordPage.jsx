import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CustomButton from "../components/ui/CustomButton";
import MemberSettingsLayout from "../components/MemberSettingsLayout";
import { useAuth } from "../contexts/AuthContext";
import { fetchCurrentUser, resetCurrentUserPassword } from "../api/auth";
import { toast } from "sonner";
import { Eye, EyeOff, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog";

function ResetPasswordAlertDialog({ dialogState, setDialogState, onConfirm }) {
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="left-1/2! top-1/2! -translate-x-1/2! -translate-y-1/2! fixed z-50 bg-brown-100 rounded-2xl pt-16 pb-6 max-w-[343px] md:max-w-lg flex flex-col items-center">
        <AlertDialogCancel className="absolute right-4 top-4 bg-brown-100 border-none cursor-pointer hover:bg-brown-200 p-0 h-auto">
          <X className="h-6 w-6 text-brown-400 hover:text-brown-600" />
        </AlertDialogCancel>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-headline-4 text-brown-600 font-semibold">
            Reset password
          </AlertDialogTitle>
          <AlertDialogDescription className="text-body-1 text-brown-400 pt-2">
            Do you want to reset your password?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row gap-3 mt-6 w-full sm:justify-center">
          <AlertDialogCancel
            className="h-12 px-10 rounded-full text-body-1 text-brown-600 
                       bg-white border border-brown-400 hover:bg-brown-200 hover:border-brown-300"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-12 px-10 rounded-full text-body-1 text-white 
                       bg-brown-600 hover:bg-brown-500"
          >
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ResetPasswordPage() {
  const { user, setUser, accessToken, isAuthLoading } = useAuth();
  const [profile, setProfile] = useState(user);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!accessToken) return;

      setIsLoading(true);
      try {
        const result = await fetchCurrentUser(accessToken);
        setProfile(result);
        setUser(result);
      } catch (err) {
        toast.error(
          err?.response?.data?.error || err?.message || "Failed to load profile"
        );
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [accessToken, setUser]);

  const handleSubmit = (e) => {
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
    setIsDialogOpen(true);
  };

  const handleResetConfirm = async () => {
    if (!accessToken) {
      toast.error("Please sign in again");
      return;
    }

    setIsSaving(true);
    try {
      await resetCurrentUserPassword(accessToken, {
        oldPassword: currentPassword,
        newPassword,
      });
      setIsDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password reset", {
        description: "Your password has been successfully updated",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.error || err?.message || "Failed to reset password"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthLoading && !user) {
    return <Navigate to="/auth/login" replace />;
  }

  const inputBaseClass =
    "h-12 w-full rounded-[10px] border border-brown-300 bg-white px-4 pr-12 text-body-1 text-brown-600 placeholder-brown-400 focus:border-brown-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70";
  const toggleButtonClass =
    "absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 transition-colors hover:text-brown-600";

  return (
    <>
      <MemberSettingsLayout
        title="Reset password"
        activeTab="reset-password"
        avatarSrc={profile?.profilePic}
        displayName={profile?.name || user?.name || "User"}
        displayNameClassName="max-w-[120px] truncate text-[20px] leading-none font-semibold text-brown-400 md:max-w-none md:text-headline-3"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="current-password"
                className="text-body-1 text-brown-400"
              >
                Current password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  disabled={isLoading || isSaving}
                  className={inputBaseClass}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  aria-label={
                    showCurrentPassword ? "Hide password" : "Show password"
                  }
                  className={toggleButtonClass}
                  disabled={isLoading || isSaving}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="new-password"
                className="text-body-1 text-brown-400"
              >
                New password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  disabled={isLoading || isSaving}
                  className={inputBaseClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                  className={toggleButtonClass}
                  disabled={isLoading || isSaving}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm-password"
                className="text-body-1 text-brown-400"
              >
                Confirm new password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  disabled={isLoading || isSaving}
                  className={inputBaseClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className={toggleButtonClass}
                  disabled={isLoading || isSaving}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <CustomButton
              type="submit"
              variant="dark"
              className="min-w-[176px]"
              disabled={isSaving || isLoading}
            >
              {isSaving ? "Resetting..." : "Reset password"}
            </CustomButton>
          </div>
        </form>
      </MemberSettingsLayout>

      <ResetPasswordAlertDialog
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
        onConfirm={handleResetConfirm}
      />
    </>
  );
}

export default ResetPasswordPage;
