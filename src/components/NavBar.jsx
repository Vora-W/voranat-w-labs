import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bell, User, RefreshCw, LogOut, ChevronDown } from "lucide-react";
import CustomButton from "./ui/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_USER } from "../mockupData/mockUser";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

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
    setUser(null);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="relative">
      <nav className="h-12 md:h-20 px-6 md:px-[120px] py-3 md:py-4 flex justify-between items-center bg-brown-100 border-b border-brown-300">
        {/* Logo */}
        <Link
          to="/"
          className="text-body-1 md:text-headline-3 text-brown-600 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r from-brown-400 to-orange transition-colors hover:font-extrabold"
        >
          Vora W<span className="text-brand-green">.</span>
        </Link>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          className="flex flex-col justify-between w-[18px] h-3 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
        </button>

        {/* Desktop Nav - Logged out */}
        {!user && (
          <div className="hidden md:flex items-center gap-4">
            <CustomButton onClick={() => navigate("/auth/login")}>
              Log in
            </CustomButton>
            <CustomButton variant="dark" onClick={() => navigate("/auth/signup")}>
              Sign up
            </CustomButton>
          </div>
        )}

        {/* Desktop Nav - Logged in (รูป 1, 2) */}
        {user && (
          <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
            {/* Notification bell with badge */}
            <button
              type="button"
              className="relative p-1.5 rounded-full hover:bg-brown-200 text-brown-600"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" strokeWidth={2} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-red" aria-hidden />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-brown-400 flex items-center justify-center overflow-hidden shrink-0">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-body-2 font-medium">
                  {user.name?.charAt(0) || MOCK_USER.name?.charAt(0)}
                </span>
              )}
            </div>

            {/* Name + dropdown trigger */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen((o) => !o)}
              className="flex items-center gap-1 text-body-1 text-brown-600 hover:text-brown-500"
            >
              <span>{user.name || MOCK_USER.name}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-white rounded-lg shadow-lg border border-brown-200 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/member/profile");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-body-2 text-brown-600 hover:bg-brown-100"
                >
                  <User className="w-4 h-4 shrink-0" />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/auth/reset-password");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-body-2 text-brown-600 hover:bg-brown-100"
                >
                  <RefreshCw className="w-4 h-4 shrink-0" />
                  Reset password
                </button>
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
        )}
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-brown-100 px-6 py-10 flex flex-col gap-6 shadow-lg md:hidden z-50">
          {!user ? (
            <>
              <CustomButton fullWidth onClick={() => navigate("/auth/login")}>
                Log in
              </CustomButton>
              <CustomButton
                variant="dark"
                fullWidth
                onClick={() => navigate("/auth/signup")}
              >
                Sign up
              </CustomButton>
            </>
          ) : (
            /* รูป 3: โปรไฟล์ + เมนู */
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brown-400 flex items-center justify-center overflow-hidden shrink-0">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-body-1 font-medium">
                      {user.name?.charAt(0) || MOCK_USER.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="text-body-1 text-brown-600 flex-1">{user.name || MOCK_USER.name}</span>
                <button
                  type="button"
                  className="relative p-2 rounded-full hover:bg-brown-200 text-brown-600"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-red" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/member/profile");
                  }}
                  className="flex items-center gap-2 py-3 text-body-1 text-brown-600 hover:bg-brown-200 rounded-lg px-2"
                >
                  <User className="w-5 h-5 shrink-0" />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/auth/reset-password");
                  }}
                  className="flex items-center gap-2 py-3 text-body-1 text-brown-600 hover:bg-brown-200 rounded-lg px-2"
                >
                  <RefreshCw className="w-5 h-5 shrink-0" />
                  Reset password
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-3 text-body-1 text-brown-600 hover:bg-brown-200 rounded-lg px-2"
                >
                  <LogOut className="w-5 h-5 shrink-0" />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
