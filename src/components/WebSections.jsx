import { useState } from 'react'
// Note: Linkedin & Github are deprecated brand icons and will be removed in lucide-react v1.0
import { Linkedin, Github, Mail } from 'lucide-react'
import heroImage from '../assets/images/human-and-cat.png'

export function NavBar() {
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

  export function HeroSection() {
    return (
      <section className="bg-brown-100 px-4 py-10 md:px-[120px] md:py-[60px] flex flex-col md:flex-row gap-10 md:gap-[60px] md:items-center md:justify-center">
        {/* Hero Header - 347x276 on desktop */}
        <div className="flex flex-col gap-4 md:w-[347px] md:shrink-0">
          <h1 className="text-headline-2 md:text-headline-1 text-brown-600 text-center md:text-right">
            Stay Informed, Stay Inspired
          </h1>
          <p className="text-body-1 text-brown-400 text-center md:text-right">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
          </p>
        </div>
  
        {/* Hero Image - 386x529 on desktop */}
        <div className="w-full max-w-[343px] md:max-w-none md:w-[386px] md:h-[529px] mx-auto md:mx-0 aspect-343/470 md:aspect-auto rounded-2xl overflow-hidden md:shrink-0">
          <img 
            src={heroImage} 
            alt="Person with cat" 
            className="w-full h-full object-cover object-[center_25%]"
          />
        </div>
  
        {/* Author Section - 347x284 on desktop */}
        <div className="flex flex-col gap-3 md:w-[347px] md:shrink-0">
          <span className="text-body-3 text-brown-400">-Author</span>
          <h3 className="text-headline-3 text-brown-600">Thompson P.</h3>
          <p className="text-body-1 text-brown-400">
            I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
          </p>
          <p className="text-body-1 text-brown-400">
            When i'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
          </p>
        </div>
      </section>
    )
  }

export function Footer() {
  return (
    <footer className="bg-brown-200 border-t border-brown-300 px-4 py-10 md:px-[120px] md:py-[60px] flex flex-col md:flex-row gap-6 md:gap-0 items-center md:justify-between">
      {/* Get in touch + Social Icons */}
      <div className="flex items-center gap-4">
        <span className="text-body-1 text-brown-500">Get in touch</span>
        <div className="flex items-center gap-4">
          {/* LinkedIn */}
          <a href="#" className="w-6 h-6 flex items-center justify-center rounded-full bg-brown-500 text-white hover:bg-brown-400 transition-colors">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          {/* GitHub */}
          <a href="#" className="w-6 h-6 flex items-center justify-center rounded-full bg-brown-500 text-white hover:bg-brown-400 transition-colors">
            <Github className="w-3.5 h-3.5" />
          </a>
          {/* Mail */}
          <a href="#" className="w-6 h-6 flex items-center justify-center rounded-full bg-brown-500 text-white hover:bg-brown-400 transition-colors">
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Home page link */}
      <a href="#" className="text-body-1 text-brown-600 underline hover:text-brown-400 transition-colors">
        Home page
      </a>
    </footer>
  )
}
  