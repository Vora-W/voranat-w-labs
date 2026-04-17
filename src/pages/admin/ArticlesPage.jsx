import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Pencil, Trash2, Plus, ChevronDown } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import CustomButton from "../../components/ui/CustomButton";
import DeleteArticleDialog from "../../components/DeleteArticleDialog";
import {
  deleteAdminPost,
  fetchAdminPostOptions,
  fetchAdminPosts,
} from "../../api/admin";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

export default function ArticlesPage() {
  const { accessToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "";
  const initialPage = Number(searchParams.get("page") || 1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(10);

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      if (!accessToken) return;
      try {
        const result = await fetchAdminPostOptions(accessToken);
        setCategories(result.categories || []);
        setStatuses(result.statuses || []);
      } catch (err) {
        toast.error(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Failed to load article filters"
        );
      }
    };

    loadOptions();
  }, [accessToken]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAdminPosts({
          page,
          limit,
          category: category || undefined,
          keyword: search.trim() || undefined,
        });
        setPosts(result.posts);
        setTotalPages(result.totalPages);
      } catch (err) {
        toast.error(
          err?.response?.data?.error || err?.message || "Failed to load articles"
        );
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [page, limit, category, search]);

  useEffect(() => {
    const next = {};
    if (category) next.category = category;
    if (page !== 1) next.page = String(page);
    setSearchParams(next);
  }, [category, page, setSearchParams]);

  const filteredPosts = useMemo(() => {
    if (!status) return posts;
    return posts.filter(
      (post) => (post.status || "").toLowerCase() === status.toLowerCase()
    );
  }, [posts, status]);

  const createArticleButton = (
    <Link to="/admin/articles/create">
      <CustomButton variant="dark" className="h-10 px-6 py-2">
        <Plus className="size-4" />
        Create article
      </CustomButton>
    </Link>
  );

  return (
    <>
      <DeleteArticleDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        postId={postToDelete}
        onConfirm={async (id) => {
          if (!id || !accessToken) return;
          try {
            await deleteAdminPost(accessToken, id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
            toast.success("Article deleted successfully");
          } catch (err) {
            toast.error(
              err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to delete article"
            );
          } finally {
            setPostToDelete(null);
          }
        }}
      />
      <AdminLayout
        title="Article management"
        rightContent={createArticleButton}
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="relative flex h-12 w-[360px] items-center gap-1">
              <Search className="absolute left-3 top-1/2 size-4 shrink-0 -translate-y-1/2 text-brown-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-lg border border-brown-200 bg-white pl-9 pr-3 text-body-1 text-brown-400  placeholder:text-brown-400 focus:border-brown-200 focus:outline-none focus:ring-1 focus:ring-brown-400"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-12 w-[200px] appearance-none rounded-lg border border-brown-200 bg-white py-3 pl-4 pr-10 text-body-1 text-brown-400 focus:border-brown-400 focus:outline-none"
                >
                  <option value="">Status</option>
                  {statuses.map((item) => (
                    <option key={item.id} value={item.status}>
                      {item.status}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-brown-400" />
              </div>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => {
                    setPage(1);
                    setCategory(e.target.value);
                  }}
                  className="h-12 w-[200px] appearance-none rounded-lg border border-brown-200 bg-white py-3 pl-4 pr-10 text-body-1 text-brown-400 focus:border-brown-400 focus:outline-none"
                >
                  <option value="">Category</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-brown-400" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-brown-300 bg-brown-100">
            <div className="relative z-10 grid grid-cols-[1fr_140px_140px_100px] gap-4 border-b border-brown-300 bg-brown-100 px-4 py-3 text-body-1 text-brown-400 shadow-md">
              <div>Article title</div>
              <div>Category</div>
              <div>Status</div>
              <div className="text-right"></div>
            </div>

            {isLoading ? (
              <div className="py-10 text-center text-sm text-brown-400">
                Loading…
              </div>
            ) : (
              <div>
                {filteredPosts.map((p, i) => (
                  <div
                    key={p.id}
                    className={`grid grid-cols-[1fr_140px_140px_100px] items-center gap-4 px-4 py-3 text-sm transition-colors hover:opacity-90 ${i % 2 === 0 ? "bg-brown-100" : "bg-brown-200"}`}
                  >
                    <div className="min-w-0 text-body-1 text-brown-500">
                      {p.title}
                    </div>
                    <div className="text-body-1 text-brown-500">
                      {p.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${
                          (p.status || "").toLowerCase() === "draft"
                            ? "bg-brown-400"
                            : "bg-brand-green"
                        }`}
                      />
                      <span
                        className={`text-body-1 ${
                          (p.status || "").toLowerCase() === "draft"
                            ? "text-brown-400"
                            : "text-brand-green"
                        }`}
                      >
                        {p.status || "-"}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/articles/edit/${p.id}`}
                        className="rounded-lg p-2 text-brown-400 hover:bg-brown-300"
                        aria-label="Edit"
                      >
                        <Pencil className="size-5" />
                      </Link>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-brown-400 hover:bg-brown-300"
                        onClick={() => {
                          setPostToDelete(p.id);
                          setDeleteDialogOpen(true);
                        }}
                        aria-label="Delete"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {!filteredPosts.length && (
                  <div className="py-10 text-center text-sm text-brown-400">
                    No posts found.
                  </div>
                )}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <CustomButton
                variant="light"
                className="h-9 px-4 py-2 text-sm disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </CustomButton>
              <div className="text-sm text-brown-600">
                Page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </div>
              <CustomButton
                variant="light"
                className="h-9 px-4 py-2 text-sm disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </CustomButton>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
