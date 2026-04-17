import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import CustomButton from "../../components/ui/CustomButton";
import DeleteCategoryDialog from "../../components/DeleteCategoryDialog";
import {
  deleteAdminCategory,
  fetchAdminCategories,
} from "../../api/admin";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

export default function CategoriesPage() {
  const { accessToken } = useAuth();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAdminCategories(accessToken);
        setCategories(result);
      } catch (err) {
        toast.error(
          err?.response?.data?.error || err?.message || "Failed to load categories"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) load();
  }, [accessToken]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, search]);

  const createCategoryButton = (
    <Link to="/admin/categories/create">
      <CustomButton variant="dark" className="h-10 px-6 py-2">
        <Plus className="size-4" />
        Create category
      </CustomButton>
    </Link>
  );

  return (
    <>
      <DeleteCategoryDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        categoryId={categoryToDelete}
        onConfirm={async (id) => {
          if (!id || !accessToken) return;
          try {
            await deleteAdminCategory(accessToken, id);
            setCategories((prev) => prev.filter((category) => category.id !== id));
            toast.success("Category deleted successfully");
          } catch (err) {
            toast.error(
              err?.response?.data?.error || err?.message || "Failed to delete category"
            );
          } finally {
            setCategoryToDelete(null);
          }
        }}
      />
      <AdminLayout
        title="Category management"
        rightContent={createCategoryButton}
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex h-12 w-[360px] items-center gap-1">
              <Search className="absolute left-3 top-1/2 size-4 shrink-0 -translate-y-1/2 text-brown-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-lg border border-brown-200 bg-white pl-9 pr-3 text-body-1 text-brown-400 placeholder:text-brown-400 focus:border-brown-200 focus:outline-none focus:ring-1 focus:ring-brown-400"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-brown-300 bg-brown-100">
            <div className="relative z-10 grid grid-cols-[1fr_100px] gap-4 border-b border-brown-300 bg-brown-100 px-4 py-3 text-body-1 text-brown-400 shadow-md">
              <div>Category</div>
              <div className="text-right"></div>
            </div>

            {isLoading ? (
              <div className="py-10 text-center text-sm text-brown-400">
                Loading…
              </div>
            ) : (
              <div>
                {filteredCategories.map((c, i) => (
                  <div
                    key={c.name}
                    className={`grid grid-cols-[1fr_100px] items-center gap-4 px-4 py-3 text-sm transition-colors hover:opacity-90 ${i % 2 === 0 ? "bg-brown-100" : "bg-brown-200"}`}
                  >
                    <div className="min-w-0 text-body-1 text-brown-500">
                      {c.name}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/categories/edit/${c.id}`}
                        className="rounded-lg p-2 text-brown-400 hover:bg-brown-300"
                        aria-label="Edit"
                      >
                        <Pencil className="size-5" />
                      </Link>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-brown-400 hover:bg-brown-300"
                        onClick={() => {
                          setCategoryToDelete(c.id);
                          setDeleteDialogOpen(true);
                        }}
                        aria-label="Delete"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {!filteredCategories.length && (
                  <div className="py-10 text-center text-sm text-brown-400">
                    No categories found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
