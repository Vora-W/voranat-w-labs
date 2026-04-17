import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import CustomButton from "../../components/ui/CustomButton";
import { createAdminCategory } from "../../api/admin";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

export default function CategoryCreatePage() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name.");
      return;
    }

    if (!accessToken) {
      toast.error("Please sign in again");
      return;
    }

    setIsSaving(true);
    try {
      await createAdminCategory(accessToken, { name: name.trim() });
      toast.success("Category created");
      navigate("/admin/categories");
    } catch (err) {
      toast.error(
        err?.response?.data?.error || err?.message || "Failed to create category"
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
      disabled={isSaving}
    >
      {isSaving ? "Saving..." : "Save"}
    </CustomButton>
  );

  return (
    <AdminLayout title="Create category" rightContent={rightContent}>
      <form className="space-y-6" onSubmit={handleSave}>
        <div className="space-y-2">
          <label
            htmlFor="categoryName"
            className="block text-body-1 text-brown-400"
          >
            Category name
          </label>
          <input
            id="categoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="h-12 w-full max-w-md rounded-lg border border-brown-200 bg-white px-4 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>
      </form>
    </AdminLayout>
  );
}
