import { useState, useRef } from "react";
import { ImagePlus } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import CustomButton from "../components/ui/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_ADMIN_USER } from "../mockupData/mockUser";
import { toast } from "sonner";

const MAX_BIO_LETTERS = 500;

const DEFAULT_BIO =
  "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.";

export default function AdminProfilePage() {
  const { user } = useAuth();
  const displayUser = user || MOCK_ADMIN_USER;
  const fileInputRef = useRef(null);

  const [name, setName] = useState(displayUser.name || "");
  const [username, setUsername] = useState(displayUser.username || "");
  const [email, setEmail] = useState(displayUser.email || "");
  const [bio, setBio] = useState(displayUser.bio ?? DEFAULT_BIO);
  const [avatarPreview, setAvatarPreview] = useState(displayUser.avatarUrl || null);

  const bioLength = bio.length;
  const bioOver = bioLength > MAX_BIO_LETTERS;

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    e.target.value = "";
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (bioOver) {
      toast.error("Bio must be at most 120 letters.");
      return;
    }
    toast.success("Profile saved", {
      description: "Your profile has been successfully updated",
    });
  };

  const rightContent = (
    <CustomButton
      type="button"
      variant="dark"
      className="h-10 px-6 py-2"
      onClick={handleSave}
    >
      Save
    </CustomButton>
  );

  return (
    <AdminLayout title="Profile" rightContent={rightContent}>
      <form className="space-y-6" onSubmit={handleSave}>
        {/* Profile picture */}
        <div className="space-y-2">
          <label className="block text-body-1 text-brown-400">
            Profile picture
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-brown-200 bg-brown-100/50 flex items-center justify-center"
              style={{
                backgroundImage: avatarPreview ? `url(${avatarPreview})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!avatarPreview && (
                <ImagePlus className="size-8 text-brown-400" />
              )}
            </div>
            <CustomButton
              type="button"
              variant="light"
              className="h-10 px-4 py-2 text-body-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload profile picture
            </CustomButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        {/* Name */}
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
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>

        {/* Username */}
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
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="profileEmail" className="block text-body-1 text-brown-400">
            Email
          </label>
          <input
            id="profileEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>

        {/* Bio (max 120 letters) */}
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
