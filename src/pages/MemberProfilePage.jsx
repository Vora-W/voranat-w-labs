import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_USER } from "../mockupData/mockUser";
import { User, Lock } from "lucide-react";

function MemberProfilePage() {
  const { user } = useAuth();
  const displayUser = user || MOCK_USER;

  const [name, setName] = useState(displayUser.name || "");
  const [username, setUsername] = useState(displayUser.username || "");
  const [avatarPreview, setAvatarPreview] = useState(displayUser.avatarUrl || null);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Saved profile", {
      description: "Your profile has been successfully updated",
    });
  };

  const activeTabClass =
    "flex items-center gap-2 text-body-1 text-brown-600 font-medium";
  const inactiveTabClass =
    "flex items-center gap-2 text-body-1 text-brown-400";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="bg-brown-100 flex-1 w-full pt-6 pb-20 md:pt-10 md:pb-30">
        <div className="mx-auto w-full max-w-[344px] md:max-w-[798px] px-4 md:px-[120px]">
          {/* Profile summary - mobile: top, desktop: below header context */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 md:w-6 md:h-6 text-brown-500" />
              )}
            </div>
            <div>
              <span className="text-body-1 md:text-headline-4 text-brown-600 block">
                {name || displayUser.name}
              </span>
              <span className="text-body-2 text-brown-400">Profile</span>
            </div>
          </div>

          {/* Tabs - Mobile: horizontal tabs, Desktop: vertical sidebar */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Desktop: Left sidebar navigation */}
            <nav className="hidden md:flex flex-col gap-1 min-w-[180px]">
              <Link
                to="/member/profile"
                className={activeTabClass}
              >
                <User className="w-5 h-5 shrink-0" />
                Profile
              </Link>
              <Link
                to="/auth/reset-password"
                className={inactiveTabClass}
              >
                <Lock className="w-5 h-5 shrink-0" />
                Reset password
              </Link>
            </nav>

            {/* Main content card - 550 Fill x 652 Hug (desktop) */}
            <div
              className="flex-1 w-full rounded-2xl pt-6 pr-4 pb-6 pl-4 md:pt-10 md:pr-10 md:pb-10 md:pl-10
                         bg-brown-200 flex flex-col gap-6 md:gap-8 md:flex-none md:w-[550px] md:min-h-[652px]"
            >
              {/* Mobile: Inline tabs */}
              <div className="flex md:hidden gap-4 border-b border-brown-300 pb-4">
                <span className={activeTabClass}>
                  <User className="w-5 h-5 shrink-0" />
                  Profile
                </span>
                <Link to="/auth/reset-password" className={inactiveTabClass}>
                  <Lock className="w-5 h-5 shrink-0" />
                  Reset password
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
                {/* Profile picture + Upload - Desktop: side by side, Mobile: stacked */}
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    <div
                      className="w-[120px] h-[120px] rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0"
                    >
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-brown-500" />
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUploadClick}
                      className="w-full md:w-auto h-12 px-6 rounded-full text-body-1 text-brown-600 
                                 bg-white border-brown-400 hover:bg-brown-100 hover:border-brown-300
                                 border"
                    >
                      Upload profile picture
                    </Button>
                  </div>

                  {/* Form fields - Desktop: to the right of profile pic */}
                  <div className="flex-1 flex flex-col gap-6 w-full">
                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="name"
                        className="text-body-1 text-brown-400"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full h-12 p-3 md:p-4 rounded-lg border border-brown-300 bg-white 
                                   placeholder-brown-400 focus:outline-none focus:border-brown-500 
                                   text-brown-600 text-body-1"
                      />
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
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full h-12 p-3 md:p-4 rounded-lg border border-brown-300 bg-white 
                                   placeholder-brown-400 focus:outline-none focus:border-brown-500 
                                   text-brown-600 text-body-1"
                      />
                    </div>

                    {/* Email Field - read only */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="email"
                        className="text-body-1 text-brown-400"
                      >
                        Email
                      </label>
                      <div
                        className="w-full h-12 p-3 md:p-4 rounded-lg border border-brown-300 bg-brown-100 
                                   text-brown-400 text-body-1 flex items-center"
                      >
                        {displayUser.email || "moodeng.cute@gmail.com"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center md:pt-2">
                  <Button
                    type="submit"
                    className="w-full md:w-auto h-12 px-10 rounded-full text-body-1 text-white 
                               bg-brown-600 hover:bg-brown-500"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MemberProfilePage;
