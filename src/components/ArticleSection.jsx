import { Search, ChevronDown } from 'lucide-react'

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
      </div>
    </section>
  )
}

export default ArticleSection
