import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import CustomButton from "../components/ui/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_USER } from "../mockupData/mockUser";
import { User, Lock, Eye, EyeOff, X } from "lucide-react";
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

function ResetPasswordAlertDialog({ dialogState, setDialogState, onReset }) {
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
            onClick={onReset}
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
  const { user } = useAuth();
  const displayUser = user || MOCK_USER;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleResetConfirm = () => {
    setIsDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const activeTabClass =
    "flex items-center gap-2 text-body-1 text-brown-600 font-medium";
  const inactiveTabClass =
    "flex items-center gap-2 text-body-1 text-brown-400";

  const inputBaseClass =
    "w-full p-3 pr-12 h-12 md:p-4 md:pr-14 rounded-lg border border-brown-300 bg-white placeholder-brown-400 focus:outline-none focus:border-brown-500 text-brown-600 text-body-1";
  const toggleButtonClass =
    "absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="bg-brown-100 flex-1 w-full pt-6 pb-20 md:pt-10 md:pb-30">
        <div className="mx-auto w-full max-w-[344px] md:max-w-[798px] px-4 md:px-[120px]">
          {/* Profile summary */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
              {displayUser.avatarUrl ? (
                <img
                  src={displayUser.avatarUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 md:w-6 md:h-6 text-brown-500" />
              )}
            </div>
            <div>
              <span className="text-body-1 md:text-headline-4 text-brown-600 block">
                {displayUser.name}
              </span>
              <span className="text-body-2 text-brown-400">Reset password</span>
            </div>
          </div>

          {/* Tabs - Mobile: horizontal, Desktop: vertical sidebar */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Desktop: Left sidebar navigation */}
            <nav className="hidden md:flex flex-col gap-1 min-w-[180px]">
              <Link to="/member/profile" className={inactiveTabClass}>
                <User className="w-5 h-5 shrink-0" />
                Profile
              </Link>
              <Link to="/auth/reset-password" className={activeTabClass}>
                <Lock className="w-5 h-5 shrink-0" />
                Reset password
              </Link>
            </nav>

            {/* Main content card - 550 Fill x 452 Hug (desktop) */}
            <div
              className="flex-1 w-full rounded-2xl pt-6 pr-4 pb-6 pl-4 md:pt-10 md:pr-10 md:pb-10 md:pl-10
                         bg-brown-200 flex flex-col gap-6 md:gap-8 md:flex-none md:w-[550px] md:min-h-[452px]"
            >
              {/* Mobile: Inline tabs */}
              <div className="flex md:hidden gap-4 border-b border-brown-300 pb-4">
                <Link to="/member/profile" className={inactiveTabClass}>
                  <User className="w-5 h-5 shrink-0" />
                  Profile
                </Link>
                <span className={activeTabClass}>
                  <Lock className="w-5 h-5 shrink-0" />
                  Reset password
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                <h2 className="text-headline-4 text-brown-600">Reset password</h2>

                {/* Current password */}
                <div className="flex flex-col gap-1">
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
                      className={inputBaseClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword((prev) => !prev)
                      }
                      aria-label={
                        showCurrentPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className={toggleButtonClass}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-6 h-6 text-brown-400 hover:text-brown-600" />
                      ) : (
                        <Eye className="w-6 h-6 text-brown-400 hover:text-brown-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div className="flex flex-col gap-1">
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
                      className={inputBaseClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                      className={toggleButtonClass}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-6 h-6 text-brown-400 hover:text-brown-600" />
                      ) : (
                        <Eye className="w-6 h-6 text-brown-400 hover:text-brown-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm new password */}
                <div className="flex flex-col gap-1">
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
                      className={inputBaseClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className={toggleButtonClass}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-6 h-6 text-brown-400 hover:text-brown-600" />
                      ) : (
                        <Eye className="w-6 h-6 text-brown-400 hover:text-brown-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Reset password Button */}
                <div className="flex justify-center md:pt-2">
                  <CustomButton
                    type="submit"
                    variant="dark"
                    fullWidth
                    className="md:w-auto"
                  >
                    Reset password
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <ResetPasswordAlertDialog
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
        onReset={handleResetConfirm}
      />
    </div>
  );
}

export default ResetPasswordPage;
