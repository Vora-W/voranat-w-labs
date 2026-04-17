import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  UserRound,
  LogOut,
  ChevronDown,
  SquareArrowOutUpRight,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { fetchCurrentUser } from "../api/auth";
import { fetchAdminProfile } from "../api/admin";

function ProfileAvatar({
  imageSrc,
  displayName,
  className = "",
  fallbackClassName = "",
}) {
  const initials = (displayName || "VW").slice(0, 2).toUpperCase();

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full bg-brown-200 ${className}`}
      style={{
        backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!imageSrc && (
        <span className={`text-brown-600 font-medium ${fallbackClassName}`}>
          {initials}
        </span>
      )}
    </div>
  );
}

function MemberNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout, accessToken } = useAuth();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const isAdmin = user?.role === "admin";
  const profileImage = avatarPreview || user?.profilePic || user?.avatarUrl || "";
  const displayName = user?.name || "User";

  useEffect(() => {
    let isActive = true;

    const loadProfileAvatar = async () => {
      if (!accessToken || !user) return;

      try {
        const profile = isAdmin
          ? await fetchAdminProfile(accessToken)
          : await fetchCurrentUser(accessToken);

        if (!isActive) return;
        setAvatarPreview(profile.profilePic || "");
      } catch {
        if (!isActive) return;
        setAvatarPreview(user?.profilePic || user?.avatarUrl || "");
      }
    };

    loadProfileAvatar();

    return () => {
      isActive = false;
    };
  }, [accessToken, isAdmin, user]);

  return (
    <div className="relative">
      <nav className="h-12 md:h-20 px-6 md:px-[120px] py-3 md:py-4 flex justify-between items-center bg-brown-100 border-b border-brown-300">
        <Link
          to="/"
          className="text-body-1 md:text-headline-3 text-brown-600 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r from-brown-400 to-orange transition-colors hover:font-extrabold"
        >
          Vora W<span className="text-brand-green">.</span>
        </Link>

        <button
          className="flex flex-col justify-between w-[18px] h-3 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
        </button>

        <div
          className="hidden md:flex items-center gap-3 relative"
          ref={dropdownRef}
        >
          {/* <button
            type="button"
            className="relative p-1.5 rounded-full hover:bg-brown-200 text-brown-600"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-red"
              aria-hidden
            />
          </button> */}

          <button
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            className="flex items-center gap-3 rounded-full transition-opacity hover:opacity-80"
          >
            <ProfileAvatar
              imageSrc={profileImage}
              displayName={displayName}
              className="size-12 shrink-0"
              fallbackClassName="text-body-2"
            />
            <span>{displayName}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-white rounded-lg shadow-lg border border-brown-200 z-50">
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate(isAdmin ? "/admin/profile" : "/member/profile");
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-body-2 text-brown-600 hover:bg-brown-100"
              >
                <UserRound className="w-4 h-4 shrink-0" />
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate(
                    isAdmin
                      ? "/admin/auth/reset-password"
                      : "/auth/reset-password"
                  );
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-body-2 text-brown-600 hover:bg-brown-100"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                Reset password
              </button>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/admin/articles");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-body-2 text-brown-600 hover:bg-brown-100"
                >
                  <SquareArrowOutUpRight className="w-4 h-4 shrink-0" />
                  Admin panel
                </button>
              )}
              <div className="my-1 border-t border-brown-200" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-body-2 text-brown-600 hover:bg-brown-100"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-brown-100 px-6 py-6 flex flex-col gap-6 shadow-lg md:hidden z-50">
          <div className="flex items-center gap-3">
            <ProfileAvatar
              imageSrc={profileImage}
              displayName={displayName}
              className="size-12 shrink-0"
              fallbackClassName="text-body-1"
            />
            <span className="text-body-1 text-brown-600 flex-1">
              {displayName}
            </span>
            {/* <button
              type="button"
              className="relative p-2 rounded-full hover:bg-brown-200 text-brown-600"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-red" />
            </button> */}
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                navigate(isAdmin ? "/admin/profile" : "/member/profile");
              }}
              className="flex items-center gap-2 py-3 text-body-1 text-brown-600 hover:bg-brown-200 rounded-lg px-2"
            >
              <UserRound className="w-5 h-5 shrink-0" />
              Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                navigate(
                  isAdmin ? "/admin/auth/reset-password" : "/auth/reset-password"
                );
              }}
              className="flex items-center gap-2 py-3 text-body-1 text-brown-600 hover:bg-brown-200 rounded-lg px-2"
            >
              <RotateCcw className="w-5 h-5 shrink-0" />
              Reset password
            </button>
            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/admin/articles");
                }}
                className="flex items-center gap-2 py-3 text-body-1 text-brown-600 hover:bg-brown-200 rounded-lg px-2"
              >
                <SquareArrowOutUpRight className="w-5 h-5 shrink-0" />
                Admin panel
              </button>
            )}
            <div className="my-1 border-t border-brown-300" />
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 pt-3 pb-2 text-body-1 text-brown-600 hover:bg-brown-200 rounded-lg px-2"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberNavBar;
