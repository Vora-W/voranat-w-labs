import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import CustomButton from "../components/ui/CustomButton";
import { fetchBlogPosts } from "../api/blogPost";
import { toast } from "sonner";

export default function AdminArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "";
  const initialPage = Number(searchParams.get("page") || 1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(10);

  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const result = await fetchBlogPosts({
          page,
          limit,
          category: category || undefined,
        });
        setPosts(result.posts);
        setTotalPages(result.totalPages);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [page, limit, category]);

  useEffect(() => {
    const next = {};
    if (category) next.category = category;
    if (page !== 1) next.page = String(page);
    setSearchParams(next);
  }, [category, page, setSearchParams]);

  const categoriesOnPage = useMemo(() => {
    return Array.from(
      new Set(posts.map((p) => p.category).filter(Boolean))
    ).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [posts, search]);

  const createArticleButton = (
    <Link to="/admin/articles/create">
      <CustomButton variant="dark" className="h-10 px-6 py-2">
        <Plus className="size-4" />
        Create article
      </CustomButton>
    </Link>
  );

  return (
    <AdminLayout
      title="Article management"
      rightContent={createArticleButton}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brown-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-brown-200 bg-white pl-9 pr-3 text-sm text-brown-600 placeholder:text-brown-400 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 min-w-[120px] rounded-lg border border-brown-200 bg-white px-3 pr-8 text-sm text-brown-600 focus:border-brown-400 focus:outline-none"
          >
            <option value="">Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="h-10 min-w-[120px] rounded-lg border border-brown-200 bg-white px-3 pr-8 text-sm text-brown-600 focus:border-brown-400 focus:outline-none"
          >
            <option value="">Category</option>
            {categoriesOnPage.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-xl border border-brown-200 bg-brown-100">
          <div className="grid grid-cols-[1fr_140px_140px_100px] gap-4 bg-brown-100 px-4 py-3 text-sm font-medium text-brown-600">
            <div>Article title</div>
            <div>Category</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {isLoading ? (
            <div className="py-10 text-center text-sm text-brown-400">
              Loading…
            </div>
          ) : (
            <div className="divide-y divide-brown-200">
              {filteredPosts.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[1fr_140px_140px_100px] items-center gap-4 px-4 py-3 text-sm transition-colors hover:bg-brown-100"
                >
                  <div className="min-w-0 font-medium text-brown-600">
                    {p.title}
                  </div>
                  <div className="text-brown-600">{p.category}</div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-brand-green" />
                    <span className="text-brand-green">
                      Published
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-brown-600 hover:bg-black/5"
                      onClick={() =>
                        toast("Edit: coming soon (API not available)")
                      }
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-2 text-brown-600 hover:bg-black/5"
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
  );
}
