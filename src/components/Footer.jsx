import React from "react";
import { Check } from "lucide-react";
import logo from "../assets/logo/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-green text-brand-beige pt-16 pb-12 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + Contact */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-brand-white p-2 rounded-full shadow-sm">
              <img src={logo} alt="Humbl. Logo" className="w-8 h-8 object-contain" />
            </div>
            <h2 className="text-brand-white text-2xl font-bold tracking-tight uppercase tracking-widest italic">HUMBL.</h2>
          </div>

          <div className="mb-6 opacity-80">
            <h3 className="text-brand-pink font-bold mb-2 uppercase text-xs tracking-widest">Address</h3>
          </div>

          <div className="opacity-80">
            <h3 className="text-brand-pink font-bold mb-2 uppercase text-xs tracking-widest">Contact</h3>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-brand-white font-bold mb-4 uppercase text-xs tracking-widest">Product</h3>
          <ul className="space-y-3 font-medium opacity-80">
            <li>
              <Link to="/subscription" className="hover:text-brand-pink transition-colors cursor-pointer">
                Subscription
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-brand-white font-bold mb-4 uppercase text-xs tracking-widest">Legal</h3>
            <ul className="space-y-3 font-medium opacity-80">
              <li className="hover:text-brand-pink transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-brand-pink transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-brand-pink transition-colors cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
          
          <div className="mt-12 text-sm font-medium opacity-60">
            <p>© 2026 Humbl. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;