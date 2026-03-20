import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import logo from '../assets/logo/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0); 
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/subscription', label: 'Subscription' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-black/5 ${
      scrolled 
        ? 'h-[70px] shadow-sm bg-white/95 backdrop-blur-md' 
        : 'h-[80px] bg-white/85 backdrop-blur-md'
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-8 h-full">
        
        {/* Left Section: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link to="/" className="shrink-0 flex items-center">
            <img src={logo} alt="Humbl. Logo" className="h-14 w-auto" />
          </Link>
        </div>

        {/* Center Section: Centered Nav Links (Desktop) */}
        <div className="hidden md:flex flex-[2] justify-center items-center">
          <ul className="flex flex-row space-x-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `
                    px-4 py-2 text-lg font-medium transition-all duration-200 rounded-lg
                    ${isActive 
                      ? 'text-brand-pink font-bold bg-brand-pink/10 opacity-100' 
                      : 'text-gray-600 hover:text-brand-green hover:bg-brand-green/5'
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Toggle, Cart & Action */}
        <div className="flex-1 flex items-center justify-end gap-5">
          <NavLink 
            to="/cart" 
            className={({ isActive }) => `
              relative p-2 transition-all group rounded-full
              ${isActive ? 'text-brand-pink bg-brand-pink/10' : 'text-brand-dark hover:text-brand-pink hover:bg-black/5'}
            `}
          >
            <ShoppingBag size={26} strokeWidth={2.5} />
            <span className="absolute -top-0.5 -right-0.5 bg-brand-pink text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white transform group-hover:scale-110 transition-transform">
              {cartCount}
            </span>
          </NavLink>

          <div className="md:hidden cursor-pointer text-brand-dark hover:text-brand-pink transition-colors" onClick={toggleMenu}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <div className={`${isOpen 
          ? `flex flex-col absolute ${scrolled ? 'top-[70px]' : 'top-[80px]'} left-0 w-full bg-white h-[calc(100vh-${scrolled ? '70px' : '80px'})] shadow-2xl py-8 overflow-y-auto animate-fade-in` 
          : 'hidden'
        }`}>
          <ul className="flex flex-col items-center gap-2">
            {navLinks.map((link) => (
              <li className="w-full text-center" key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `
                    inline-block w-full px-8 py-5 text-3xl font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-brand-pink font-bold bg-brand-pink/5' 
                      : 'text-gray-600 hover:text-brand-green'
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
