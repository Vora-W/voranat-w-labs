import { Search } from "lucide-react";

function SearchInput({ value, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search"
        className="w-full h-12 py-3 pl-4 pr-10 bg-white rounded-lg text-body-1 text-brown-600 placeholder:text-brown-400 border border-brown-300 focus:outline-none focus:border-brown-400"
        value={value}
        onChange={onChange}
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
    </div>
  );
}

export default SearchInput;
