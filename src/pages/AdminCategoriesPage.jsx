import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import CustomButton from "../components/ui/CustomButton";
import { fetchBlogPosts } from "../api/blogPost";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const result = await fetchBlogPosts({ page: 1, limit: 50 });
        setPosts(result.posts);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const categories = useMemo(() => {
    const map = new Map();
    posts.forEach((p) => {
      const key = p.category || "Uncategorized";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name]) => ({ name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [posts]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, search]);

  const createCategoryButton = (
    <CustomButton
      variant="dark"
      className="h-10 px-6 py-2"
      onClick={() => toast("Create category will be added after backend supports it.")}
    >
      <Plus className="size-4" />
      Create category
    </CustomButton>
  );

  return (
    <AdminLayout title="Category management" rightContent={createCategoryButton}>
      <div className="space-y-5">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brown-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-brown-300 bg-white pl-9 pr-3 text-body-1 text-brown-600 placeholder:text-brown-400 focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-brown-200 bg-white">
          <div className="grid grid-cols-[1fr_100px] gap-4 bg-brown-100 px-4 py-3 text-sm font-medium text-brown-600">
            <div>Category</div>
            <div className="text-right">Actions</div>
          </div>

          {isLoading ? (
            <div className="py-10 text-center text-sm text-brown-400">
              Loading…
            </div>
          ) : (
            <div className="divide-y divide-brown-200">
              {filteredCategories.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-[1fr_100px] items-center gap-4 px-4 py-3 text-sm transition-colors hover:bg-brown-100/80"
                >
                  <div className="font-medium text-brown-600">{c.name}</div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-brown-500 hover:bg-brown-200/80"
                      onClick={() =>
                        navigate(`/admin/articles?category=${encodeURIComponent(c.name)}&page=1`)
                      }
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-brown-500 hover:bg-brown-200/80"
                      onClick={() =>
                        toast("Delete: coming soon (API not available)")
                      }
                      aria-label="Delete"
                    >
                      <Trash2 className="size-4" />
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
  );
}
