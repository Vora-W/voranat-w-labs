import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CustomButton from "../components/ui/CustomButton";
import ImageUploadField from "../components/ImageUploadField";
import MemberSettingsLayout from "../components/MemberSettingsLayout";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { fetchCurrentUser, updateCurrentUserProfile } from "../api/auth";

function ProfilePage() {
  const { user, setUser, accessToken, isAuthLoading } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.profilePic || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!accessToken) return;
      setIsLoading(true);
      try {
        const profile = await fetchCurrentUser(accessToken);
        setName(profile.name || "");
        setUsername(profile.username || "");
        setEmail(profile.email || "");
        setAvatarPreview(profile.profilePic || null);
        setAvatarFile(null);
        setUser(profile);
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

  const handleAvatarChange = ({ file, previewUrl }) => {
    setAvatarFile(file);
    setAvatarPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("Please sign in again");
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateCurrentUserProfile(accessToken, {
        name: name.trim(),
        username: username.trim(),
        profilePic: avatarPreview,
        profileImageFile: avatarFile,
      });
      setUser(result.user);
      setEmail(result.user.email || "");
      setAvatarPreview(result.user.profilePic || null);
      setAvatarFile(null);
      toast.success("Saved profile", {
        description: "Your profile has been successfully updated",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.error || err?.message || "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthLoading && !user) {
    return <Navigate to="/auth/login" replace />;
  }

  const inputClass =
    "h-12 w-full rounded-[10px] border border-brown-300 bg-white px-4 text-body-1 text-brown-600 placeholder-brown-300 focus:border-brown-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70";

  return (
    <MemberSettingsLayout
      title="Profile"
      activeTab="profile"
      avatarSrc={avatarPreview}
      displayName={name || user?.name || "User"}
      displayNameClassName="text-[20px] leading-none font-semibold text-brown-400 md:text-headline-3"
      cardClassName="md:min-h-[620px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-start md:gap-6">
          <ImageUploadField
            label=""
            previewUrl={avatarPreview}
            onImageChange={handleAvatarChange}
            buttonLabel="Upload profile picture"
            disabled={isLoading || isSaving}
            containerClassName="w-full"
            contentClassName="flex flex-col items-center gap-6 md:flex-row md:items-center"
            previewClassName="h-[120px] w-[120px] rounded-full bg-brown-300 md:h-[104px] md:w-[104px]"
            iconClassName="h-12 w-12 text-brown-500"
            buttonClassName="h-12 min-w-[234px] px-6 text-body-1"
          />
        </div>

        <div className="h-px w-full bg-brown-300" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-body-1 text-brown-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              disabled={isLoading}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-body-1 text-brown-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              disabled={isLoading}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-body-1 text-brown-400">
              Email
            </label>
            <div
              id="email"
              className="flex min-h-12 items-center px-4 text-body-1 text-brown-400"
            >
              {email}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <CustomButton
            type="submit"
            variant="dark"
            className="min-w-[88px]"
            disabled={isSaving || isLoading}
          >
            {isSaving ? "Saving..." : "Save"}
          </CustomButton>
        </div>
      </form>
    </MemberSettingsLayout>
  );
}

export default ProfilePage;
