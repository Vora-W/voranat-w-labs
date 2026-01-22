import { useEffect, useState } from "react";
import { Search, ChevronDown, LoaderCircle, Ellipsis } from "lucide-react";
import { fetchBlogPosts } from "../api/blogPost";
import BlogCard from "./BlogCard";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // โหลดโพสต์เมื่อ page หรือ category เปลี่ยน
  useEffect(() => {
    const getBlogPosts = async () => {
      if (isLoading) return; // ป้องกันการโหลดซ้ำถ้ายังโหลดไม่เสร็จ

      setIsLoading(true);
      try {
        const postsData = await fetchBlogPosts(selectedCategory, page, 6);

        // ถ้า page 1 ให้ replace, ถ้าไม่ใช่ให้ append (load more)
        if (page === 1) {
          setBlogPosts(postsData.posts);
        } else {
          setBlogPosts((prevPosts) => [...prevPosts, ...postsData.posts]);
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
    // ข้าม ESLint warning เพราะถ้าใส่ isLoading ใน dependency array จะเกิด infinite loop
    // (isLoading เปลี่ยน → useEffect รัน → setIsLoading(true) → isLoading เปลี่ยน → loop ไม่สิ้นสุด)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCategory]);

  // Handler สำหรับเปลี่ยน category (reset ก่อนแล้วค่อยเปลี่ยน)
  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return; // ไม่ทำอะไรถ้าเลือก category เดิม
    setPage(1);
    setHasMore(true);
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // ฟังก์ชันเพิ่มหน้า
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
            <input
              type="text"
              placeholder="Search"
              className="w-full h-12 py-3 pl-4 pr-10 bg-white rounded-lg text-body-1 text-brown-600 placeholder:text-brown-400 border border-brown-300 focus:outline-none focus:border-brown-400"
              value={searchText}
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
          </div>

          {/* Category Label */}
          <p className="text-body-1 text-brown-400 mb-2">Category</p>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full h-12 py-3 pl-4 pr-10 bg-white rounded-lg text-body-1 text-brown-400 border border-brown-300 focus:outline-none focus:border-brown-400 appearance-none cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop: Category Tabs & Search */}
        <div className="hidden md:flex items-center justify-between bg-brown-200 px-6 py-4 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2.5 bg-brown-200 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`h-12 px-5 py-3 rounded-lg text-body-1 cursor-pointer transition-colors ${selectedCategory === category
                  ? "bg-brown-300 text-brown-500"
                  : "text-brown-400 hover:bg-brown-100"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-[360px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-12 py-3 pl-4 pr-10 bg-white rounded-lg text-body-1 text-brown-600 placeholder:text-brown-400 border border-brown-300 focus:outline-none focus:border-brown-400"
              value={searchText}
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="px-4 py-6 md:px-0 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 md:w-[1200px] md:mx-auto justify-items-center md:justify-items-stretch">
            {blogPosts
              .filter((post) => {
                // Filter เฉพาะ search (category filter ทำฝั่ง API แล้ว)
                const matchSearch =
                  post.title.toLowerCase().includes(searchText.toLowerCase()) ||
                  post.description.toLowerCase().includes(searchText.toLowerCase());
                return matchSearch;
              })
              .map((post) => (
                <BlogCard
                  key={post.id}
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  author={post.author}
                  date={post.date}
                />
              ))}
          </div>
        </div>

        {/* View More - ซ่อนปุ่มเมื่อไม่มีข้อมูลให้โหลดเพิ่มแล้ว */}
        {hasMore && (
          <div className="flex justify-center items-center">
            <button
              className="pt-6 md:pt-12 pb-14 md:pb-22 text-body-1 text-brown-600"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <LoaderCircle className="animate-spin w-10 h-10 mr-2" />
                  <span className="flex flex-row items-end-safe">
                    Loading
                    <Ellipsis className="w-5 h-5 animate-pulse pt-0.5" />
                  </span>
                </div>
              ) : (
                <div className="underline cursor-pointer hover:text-brown-400 transition-colors">
                  View more
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </section>

  );
}

export default ArticleSection;
