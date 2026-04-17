import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import CustomButton from "../../components/ui/CustomButton";
import ImageUploadField from "../../components/ImageUploadField";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchAdminProfile,
  updateAdminProfile,
} from "../../api/admin";
import { toast } from "sonner";

const MAX_BIO_LETTERS = 500;

const DEFAULT_BIO =
  "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.";

export default function ProfilePage() {
  const { user, setUser, accessToken } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(DEFAULT_BIO);
  const [avatarPreview, setAvatarPreview] = useState(user?.profilePic || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!accessToken) return;
      setIsLoading(true);
      try {
        const profile = await fetchAdminProfile(accessToken);
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

  const bioLength = bio.length;
  const bioOver = bioLength > MAX_BIO_LETTERS;

  const handleAvatarChange = ({ file, previewUrl }) => {
    setAvatarFile(file);
    setAvatarPreview(previewUrl);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (bioOver) {
      toast.error("Bio must be at most 500 letters.");
      return;
    }

    if (!accessToken) {
      toast.error("Please sign in again");
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateAdminProfile(accessToken, {
        name: name.trim(),
        username: username.trim(),
        profilePic: avatarPreview,
        profileImageFile: avatarFile,
      });
      setUser(result.user);
      setEmail(result.user.email || "");
      setAvatarPreview(result.user.profilePic || null);
      setAvatarFile(null);
      toast.success("Profile saved", {
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

  const rightContent = (
    <CustomButton
      type="button"
      variant="dark"
      className="h-10 px-6 py-2"
      onClick={handleSave}
      disabled={isSaving || isLoading}
    >
      {isSaving ? "Saving..." : "Save"}
    </CustomButton>
  );

  return (
    <AdminLayout title="Profile" rightContent={rightContent}>
      <form className="space-y-6" onSubmit={handleSave}>
        <ImageUploadField
          label="Profile picture"
          previewUrl={avatarPreview}
          onImageChange={handleAvatarChange}
          buttonLabel="Upload profile picture"
          disabled={isLoading || isSaving}
          previewClassName="h-24 w-24 rounded-full border-2 border-brown-200 bg-brown-100/50"
          iconClassName="size-8 text-brown-400"
        />

        <div className="space-y-2">
          <label htmlFor="profileName" className="block text-body-1 text-brown-400">
            Name
          </label>
          <input
            id="profileName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            disabled={isLoading}
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profileUsername" className="block text-body-1 text-brown-400">
            Username
          </label>
          <input
            id="profileUsername"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            disabled={isLoading}
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profileEmail" className="block text-body-1 text-brown-400">
            Email
          </label>
          <input
            id="profileEmail"
            type="email"
            value={email}
            placeholder="Email"
            disabled
            readOnly
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="profileBio"
            className="block text-body-1 text-brown-400"
          >
            Bio (max {MAX_BIO_LETTERS} letters)
          </label>
          <textarea
            id="profileBio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            disabled={isLoading}
            className={`w-full rounded-lg border px-4 py-3 text-body-1 bg-white text-brown-400 placeholder:text-brown-400 focus:outline-none focus:ring-1 ${
              bioOver
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-brown-200 focus:border-brown-400 focus:ring-brown-400"
            }`}
            placeholder="Bio"
          />
          <p className={`text-body-3 ${bioOver ? "text-red-600" : "text-brown-400"}`}>
            {bioLength} / {MAX_BIO_LETTERS}
          </p>
        </div>
      </form>
    </AdminLayout>
  );
}
