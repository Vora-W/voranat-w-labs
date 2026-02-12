import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import CustomButton from "../components/ui/CustomButton";
import { toast } from "sonner";

export default function AdminCategoryCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name.");
      return;
    }
    toast.success("Category created", {
      description: "Create category will be fully supported when backend is ready.",
    });
    navigate("/admin/categories");
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
