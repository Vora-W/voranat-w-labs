import { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "./ui/CustomButton";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="h-12 md:h-20 px-6 md:px-[120px] py-3 md:py-4 flex justify-between items-center bg-brown-100 border-b border-brown-300">
        {/* Logo */}
        <Link
          to="/"
          className="text-body-1 md:text-headline-3 text-brown-600 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r from-brown-400 to-orange transition-colors hover:font-extrabold"
        >
          Vora W<span className="text-brand-green">.</span>
        </Link>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          className="flex flex-col justify-between w-[18px] h-3 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
          <span className="block w-full h-0.5 bg-brown-400 rounded-full"></span>
        </button>

        {/* Desktop Nav Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <CustomButton>Log in</CustomButton>
          <CustomButton variant="dark">Sign up</CustomButton>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-brown-100 px-6 py-10 flex flex-col gap-6 md:hidden">
          <CustomButton fullWidth>Log in</CustomButton>
          <CustomButton variant="dark" fullWidth>Sign up</CustomButton>
        </div>
      )}
    </div>
  );
}

export default NavBar;
