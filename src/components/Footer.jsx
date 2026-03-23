import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, Twitter, Facebook, Youtube, Instagram } from "lucide-react";
import logo from "../assets/logo/logo.svg";

const popularArticles = [
  "VEGETARIAN KETO PLAN FOR A DAY",
  "10 TIPS TO REDUCE SUGAR INTAKE",
  "JUICES TO BOOST YOUR IMMUNE SYSTEM",
  "FOOD ALLERGIES: THE BODY'S DEFENSE",
  "A COMPREHENSIVE GUIDE TO 1,200 CALORIE DIET",
  "SHOULD YOU DRINK APPLE CIDER VINEGAR BEFORE BED?",
  "HEALTH BENEFITS OF COFFEE",
  "HOW TO LOSE WEIGHT IN A MONTH",
  "KETO ZUCCHINI NOODLES WITH PESTO",
  "FOODS TO AVOID WITH ARTHRITIS",
  "KETO BUTTER CHICKEN",
  "WHAT TO EAT WHEN YOU HAVE FLU?",
];

const Footer = () => {
  return (
    <footer className="bg-brand-green text-white pt-16 pb-12 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* TOP SECTION: Questions & Contact */}
        <div className="bg-brand-dark/40 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 border border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black italic text-white max-w-[250px] leading-tight">
            Have more questions?
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2.5 rounded-lg text-white">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-white/60 mb-1">Call on</p>
                <p className="font-bold text-white">+91 9590 510 520</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2.5 rounded-lg text-white">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-white/60 mb-1">Mail us at</p>
                <p className="font-bold text-white">inquiries@humbl.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2.5 rounded-lg text-white">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-white/60 mb-1">Feedback</p>
                <p className="font-bold text-white">feedback@humbl.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Brand & Links */}
        <div className="bg-brand-dark/40 rounded-[2rem] p-8 md:p-10 border border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-10">
            <div className="flex items-center gap-6">
              <div className="bg-brand-pink p-5 rounded-[1.5rem] shadow-xl text-brand-green">
                <img src={logo} alt="Humbl. Logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Humbl.</h3>
                <p className="text-sm font-medium text-white/80 max-w-[300px] leading-relaxed">
                  A food and nutrition company that offers healthy and tasty meals to be delivered to your doorstep.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              {[Twitter, Facebook, Youtube, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="bg-white/10 p-3 rounded-full hover:bg-white text-white hover:text-brand-green transition-all shadow-md">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold italic">
            <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white">
              <li><Link to="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link></li>
              <li><Link to="/terms" className="hover:opacity-70 transition-opacity">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
              <li><Link to="/#blogs" className="hover:opacity-70 transition-opacity">Blog</Link></li>
            </ul>
            <p className="text-white">© 2026 HUMBL FOODS | All rights reserved.</p>
          </div>
        </div>

        {/* BOTTOM SECTION: Popular Articles */}
        <div className="mt-6 px-4">
          <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-70">
            Popular articles on HUMBL
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] sm:text-xs font-bold opacity-60 uppercase tracking-widest text-center text-white">
            {popularArticles.map((article, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:opacity-100 transition-opacity cursor-pointer">{article}</span>
                {idx !== popularArticles.length - 1 && <span className="opacity-30">◆</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;