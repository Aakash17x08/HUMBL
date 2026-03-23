import React from "react";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="bg-white min-h-screen py-32 px-6 sm:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <h1 className="text-6xl sm:text-7xl font-black italic tracking-tighter text-brand-green uppercase leading-none">
            Get in <span className="text-brand-pink underline decoration-brand-green/10 underline-offset-[12px] decoration-4">Touch</span>.
          </h1>
          <p className="text-lg sm:text-xl font-bold italic text-brand-green/70 max-w-2xl mx-auto uppercase tracking-[0.2em]">
            We'd love to hear your story
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: CONTACT INFO */}
          <div className="space-y-12">
            <h2 className="text-4xl font-black italic text-brand-green leading-tight">
              Let's build a healthier <span className="text-brand-pink">community</span> together.
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="bg-brand-green text-white p-5 rounded-[1.5rem] shadow-xl transition-transform group-hover:scale-110">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-brand-green/50 mb-1">Email Us</p>
                  <p className="text-xl font-black italic text-brand-green">hello@humblfoods.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="bg-brand-green text-white p-5 rounded-[1.5rem] shadow-xl transition-transform group-hover:scale-110">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-brand-green/50 mb-1">Call Anytime</p>
                  <p className="text-xl font-black italic text-brand-green">+91 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="bg-brand-green text-white p-5 rounded-[1.5rem] shadow-xl transition-transform group-hover:scale-110">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-brand-green/50 mb-1">Cloud Kitchen</p>
                  <p className="text-xl font-black italic text-brand-green">Korrawala, Bengaluru, India</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-sm font-black uppercase tracking-widest text-brand-green/40 mb-6">Follow our journey</p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="bg-brand-green text-white p-4 rounded-full hover:bg-brand-dark transition-all shadow-lg hover:-translate-y-1">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-white p-10 sm:p-14 rounded-[4rem] shadow-2xl border-2 border-brand-green/10">
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-green/60 ml-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Aakash Maurya"
                    className="w-full bg-white/50 border-2 border-brand-green/5 rounded-2xl py-4 px-6 font-bold italic outline-none focus:border-brand-green transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-brand-green/60 ml-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Aakash@example.com"
                    className="w-full bg-white/50 border-2 border-brand-green/5 rounded-2xl py-4 px-6 font-bold italic outline-none focus:border-brand-green transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-green/60 ml-2">Subject</label>
                <select className="w-full bg-white/50 border-2 border-brand-green/5 rounded-2xl py-4 px-6 font-bold italic outline-none focus:border-brand-green transition-all appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Subscription Support</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-green/60 ml-2">Your Message</label>
                <textarea 
                  rows="4"
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-white/50 border-2 border-brand-green/5 rounded-2xl py-4 px-6 font-bold italic outline-none focus:border-brand-green transition-all resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-brand-green text-white py-5 rounded-3xl font-black text-xl italic flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-xl active:scale-95">
                <Send size={22} strokeWidth={3} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
