import { useState } from 'react'
import './App.css'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative">
      <nav className="h-12 md:h-20 px-6 md:px-[120px] py-3 md:py-4 flex justify-between items-center bg-brown-100 border-b border-brown-300">
        {/* Logo */}
        <div className="text-body-1 md:text-headline-3 text-brown-600">
          Vora W<span className="text-brand-green">.</span>
        </div>

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
          {/* Log in Button - Outlined */}
          <button className="h-12 px-10 py-3 flex items-center justify-center gap-1.5 text-body-1 text-brown-600 bg-transparent border border-brown-300 rounded-full hover:border-brown-400 transition-colors">
            Log in
          </button>

          {/* Sign up Button - Solid */}
          <button className="h-12 px-10 py-3 flex items-center justify-center gap-1.5 text-body-1 text-white bg-brown-600 rounded-full hover:bg-brown-500 transition-colors">
            Sign up
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-brown-100 px-6 py-10 flex flex-col gap-6 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)] md:hidden">
          {/* Log in Button - Outlined */}
          <button className="w-full h-12 px-10 py-3 flex items-center justify-center gap-1.5 text-body-1 text-brown-600 bg-transparent border border-brown-300 rounded-full hover:border-brown-400 transition-colors">
            Log in
          </button>

          {/* Sign up Button - Solid */}
          <button className="w-full h-12 px-10 py-3 flex items-center justify-center gap-1.5 text-body-1 text-white bg-brown-600 rounded-full hover:bg-brown-500 transition-colors">
            Sign up
          </button>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <>
      <NavBar />
    </>
  );
}

export default App
