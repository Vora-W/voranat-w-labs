import { ChevronDown } from "lucide-react";

function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <>
      {/* Mobile: Dropdown */}
      <div className="relative md:hidden">
        <select
          value={selectedCategory}
          onChange={(e) => onChange(e.target.value)}
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

      {/* Desktop: Tabs */}
      <div className="hidden md:flex items-center gap-2.5 bg-brown-200 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`h-12 px-5 py-3 rounded-lg text-body-1 cursor-pointer transition-colors ${
              selectedCategory === category
                ? "bg-brown-300 text-brown-500"
                : "text-brown-400 hover:bg-brown-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}

export default CategoryFilter;
