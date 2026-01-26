import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogPosts } from "../api/blogPost";
import BlogCard from "./BlogCard";
import SearchInput from "./SearchInput";
import LoadMoreButton from "./LoadMoreButton";
import CategoryFilter from "./CategoryFilter";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

const SearchResultsDropdown = ({ searchResults, onSelectResult }) => {
  return (
    <div className="absolute left-0 top-full mt-2 w-full rounded-2xl bg-white shadow-lg overflow-hidden z-10 p-1">
      {searchResults.length === 0 ? (
        <div className="px-4 py-3 text-body-2 text-brown-400">No results</div>
      ) : (
        <ul className="max-h-[320px] overflow-auto">
          {searchResults.map((post) => (
            <li
              key={post.id}
              className="px-4 py-3 text-body-2 text-brown-600 hover:bg-brown-200 rounded-2xl hover:text-brown-400 cursor-pointer"
              onClick={() => onSelectResult(post.id)}
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function ArticleSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Navigate to post detail page
  const handleNavigate = (postId) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(`/post/view/${postId}`);
  };

  const normalizeText = (value) => (value ?? "").toString().toLowerCase();

  // โหลดโพสต์เมื่อ page / category / searchText เปลี่ยน
  useEffect(() => {
    const getBlogPosts = async () => {
      if (isLoading) return; // ป้องกันการโหลดซ้ำถ้ายังโหลดไม่เสร็จ

      setIsLoading(true);
      try {
        const isSearching = searchText.trim().length > 0;
        const limit = isSearching ? 50 : 6;
        const currentPage = isSearching ? 1 : page;

        const postsData = await fetchBlogPosts({
          category: selectedCategory,
          page: currentPage,
          limit,
        });

        // ถ้า page 1 ให้ replace, ถ้าไม่ใช่ให้ append (load more)
        if (currentPage === 1) {
          setBlogPosts(postsData.posts);
        } else {
          setBlogPosts((prevPosts) => [...prevPosts, ...postsData.posts]);
        }

        // ตอนกำลัง search ให้ซ่อนปุ่ม Load More (เราโหลดเป็น batch ใหญ่ครั้งเดียว)
        if (isSearching) {
          setHasMore(false);
          return;
        }

        // ตรวจสอบว่าถึงหน้าสุดท้ายหรือยัง
        if (postsData.currentPage >= postsData.totalPages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCategory, searchText]);

  // Handler สำหรับเปลี่ยน category (reset ก่อนแล้วค่อยเปลี่ยน)
  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return; // ไม่ทำอะไรถ้าเลือก category เดิม
    setPage(1);
    setHasMore(true);
    setSearchText("");
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // เวลา search เปลี่ยน ให้กลับไปหน้าแรก
    setPage(1);

    // ถ้าลบ search ให้กลับมาใช้ pagination ได้ตามปกติ
    if (!value.trim()) {
      setHasMore(true);
    } else {
      // เมื่อเริ่ม search ให้ clear ข้อมูลเก่าด้วย
      setBlogPosts([]);
    }
  };

  // ฟังก์ชันเพิ่มหน้า
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // search ได้จาก title, description และ content
  const isSearchOpen = searchText.trim().length > 0;
  const keyword = normalizeText(searchText);

  const filteredBlogPosts = blogPosts.filter((post) => {
    if (!keyword) return true;

    const title = normalizeText(post.title);
    const description = normalizeText(post.description);
    const content = normalizeText(post.content);

    return (
      title.includes(keyword) ||
      description.includes(keyword) ||
      content.includes(keyword)
    );
  });

  // dropdown แสดงแค่ 8 รายการแรกเพื่อไม่ให้ยาวเกินไป
  const searchResults = filteredBlogPosts.slice(0, 8);

  const handleSelectSearchResult = (postId) => {
    setSearchText("");
    handleNavigate(postId);
  };

  return (
    <section className="bg-brown-100">
      {/* Desktop Container - 1200px max width, gap 32px */}
      <div className="md:max-w-[1200px] md:mx-auto md:flex md:flex-col md:gap-8 md:py-8">
        {/* Header */}
        <div className="px-4 md:px-0 pt-10 md:pt-0 pb-4 md:pb-0">
          <h2 className="text-headline-3 text-brown-600">Latest articles</h2>
        </div>

        {/* Mobile: Search & Filter - bg-brown-200 */}
        <div className="bg-brown-200 px-4 py-4 md:hidden">
          {/* Search Input */}
          <div className="relative mb-4">
            <SearchInput value={searchText} onChange={handleSearch} />

            {/* Mobile: Search Results Dropdown */}
            {isSearchOpen && (
              <SearchResultsDropdown
                searchResults={searchResults}
                onSelectResult={handleSelectSearchResult}
              />
            )}
          </div>

          {/* Category Label */}
          <p className="text-body-1 text-brown-400 mb-2">Category</p>

          {/* Category Dropdown */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Desktop: Category Tabs & Search */}
        <div className="hidden md:flex items-center justify-between bg-brown-200 px-6 py-4 rounded-2xl">
          {/* Category Tabs */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />

          {/* Search Input */}
          <div className="relative w-[360px]">
            <SearchInput
              value={searchText}
              onChange={handleSearch}
              className="w-full"
            />

            {/* Desktop: Search Results Dropdown */}
            {isSearchOpen && (
              <SearchResultsDropdown
                searchResults={searchResults}
                onSelectResult={handleSelectSearchResult}
              />
            )}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="px-4 py-6 md:px-0 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 md:w-[1200px] md:mx-auto justify-items-center md:justify-items-stretch">
            {filteredBlogPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
                onClick={() => handleNavigate(post.id)}
              />
            ))}
          </div>
        </div>

        {/* View More - ซ่อนปุ่มเมื่อไม่มีข้อมูลให้โหลดเพิ่มแล้ว */}
        {hasMore && (
          <div className="flex justify-center items-center">
            <LoadMoreButton isLoading={isLoading} onClick={handleLoadMore} />
          </div>
        )}
      </div>
    </section>
  );
}

export default ArticleSection;
