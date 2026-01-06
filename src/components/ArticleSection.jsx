import { Search, ChevronDown } from 'lucide-react'
import blogPosts from '../data/blogPosts'

function ArticleSection() {
  return (
    <section className="bg-brown-100">
      {/* Desktop Container - 1200px max width, gap 32px */}
      <div className="md:max-w-[1200px] md:mx-auto md:flex md:flex-col md:gap-8 md:py-8">
        {/* Header */}
        <div className="px-4 md:px-0 pt-10 md:pt-0 pb-4 md:pb-0">
          <h2 className="text-headline-3 text-brown-600">
            Latest articles
          </h2>
        </div>

        {/* Mobile: Search & Filter - bg-brown-200 */}
        <div className="bg-brown-200 px-4 py-4 md:hidden">
          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-12 py-3 pl-4 pr-10 bg-white rounded-lg text-body-1 text-brown-600 placeholder:text-brown-400 border border-brown-300 focus:outline-none focus:border-brown-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
          </div>

          {/* Category Label */}
          <p className="text-body-1 text-brown-400 mb-2">Category</p>

          {/* Category Dropdown */}
          <div className="relative">
            <select className="w-full h-12 py-3 pl-4 pr-10 bg-white rounded-lg text-body-1 text-brown-400 border border-brown-300 focus:outline-none focus:border-brown-400 appearance-none cursor-pointer">
              <option value="highlight">Highlight</option>
              <option value="cat">Cat</option>
              <option value="inspiration">Inspiration</option>
              <option value="general">General</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop: Category Tabs & Search */}
        <div className="hidden md:flex items-center justify-between bg-brown-200 px-6 py-4 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2.5 bg-brown-200 rounded-lg p-1">
            <button className="h-12 px-5 py-3 rounded-lg bg-brown-300 text-body-1 text-brown-500">
              Highlight
            </button>
            <button className="h-12 px-5 py-3 rounded-lg text-body-1 text-brown-400 hover:bg-brown-300/50 transition-colors">
              Cat
            </button>
            <button className="h-12 px-5 py-3 rounded-lg text-body-1 text-brown-400 hover:bg-brown-300/50 transition-colors">
              Inspiration
            </button>
            <button className="h-12 px-5 py-3 rounded-lg text-body-1 text-brown-400 hover:bg-brown-300/50 transition-colors">
              General
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-[360px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-12 py-3 pl-4 pr-10 bg-white rounded-lg text-body-1 text-brown-600 placeholder:text-brown-400 border border-brown-300 focus:outline-none focus:border-brown-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="px-4 py-6 md:px-0 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 md:w-[1200px] md:mx-auto justify-items-center md:justify-items-stretch">
            {blogPosts.map((post) => (
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
      </div>
    </section>
  )
}

export default ArticleSection

function BlogCard({ image, category, title, description, author, date }) {
  return (
    <div className="w-full max-w-[343px] md:max-w-none flex flex-col gap-4 md:gap-6">
      {/* Image */}
      <a href="#" className="block w-full rounded-2xl overflow-hidden">
        <img 
          className="w-full h-[212px] md:h-[360px] object-cover"
          src={image} 
          alt={title}
        />
      </a>

      {/* Content */}
      <div className="w-full flex flex-col gap-4">
        {/* Category Badge */}
        <div className="flex">
          <span className="bg-brand-green-soft rounded-full px-3 py-1 text-body-2 text-brand-green">
            {category}
          </span>
        </div>

        {/* Title */}
        <a href="#">
          <h2 className="text-headline-4 text-brown-600 line-clamp-2 hover:underline">
            {title}
          </h2>
        </a>

        {/* Description */}
        <p className="text-body-2 text-brown-400 line-clamp-2">
          {description}
        </p>

        {/* Author & Date */}
        <div className="flex items-center gap-2 text-body-2 text-brown-600">
          <img 
            className="w-6 h-6 rounded-full" 
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
            alt={author} 
          />
          <span className="text-body-2 text-brown-500">{author}</span>
          <span className="text-brown-300">|</span>
          <span className="text-body-2 text-brown-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
