import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import logo_no_bg from '../assets/logo/Updated_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy logic
      const sections = ['home', 'products', 'about', 'subscription', 'blogs', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${id}`);
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled
      ? 'h-[70px] shadow-lg bg-brand-green/95 backdrop-blur-md'
      : 'h-[90px] bg-brand-green'
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-8 h-full gap-4">

        {/* Left Section: Logo Only */}
        <div className="flex-shrink-0 flex items-center justify-start">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="shrink-0 flex items-center"
          >
            <div className="p-1 sm:p-2 rounded-full transform hover:scale-110 transition-transform">
              <img src={logo_no_bg} alt="Go-Humbl. Logo" className="h-10 sm:h-14 lg:h-18 w-auto object-contain " />
            </div>
          </Link>
        </div>

        {/* Center Section: Centered Nav Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center items-center px-2">
          <ul className="flex flex-row space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`nav-link text-sm lg:text-lg px-2 lg:px-4 ${activeSection === link.id ? 'nav-link-active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Toggle, Cart & Action */}
        <div className="flex-shrink-0 flex items-center justify-end gap-2 sm:gap-5">
          <Link
            to="/cart"
            className="relative p-2 transition-all rounded-full text-white hover:bg-white/10"
          >
            <ShoppingBag size={24} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-brand-green">
              {cartCount}
            </span>
          </Link>

          <div className="md:hidden cursor-pointer text-white hover:opacity-80 transition-opacity" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <div className={`${isOpen
          ? `flex flex-col absolute ${scrolled ? 'top-[70px]' : 'top-[90px]'} left-0 w-full bg-brand-green/95 backdrop-blur-md h-[calc(100vh-90px)] shadow-2xl py-8 overflow-y-auto animate-fade-in`
          : 'hidden'
          }`}>
          <ul className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <li className="w-full text-center" key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`
                    inline-block w-full px-8 py-4 text-3xl font-bold transition-all text-white
                    ${activeSection === link.id ? 'bg-white/10' : 'hover:bg-white/5'}
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
