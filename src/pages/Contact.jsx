import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="bg-brand-pink min-h-screen text-brand-green pt-32 pb-20 px-6">
      
      {/* HEADER */}
      <div className="text-center pb-16">
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">
          Contact Us<span className="text-white">.</span>
        </h1>
        <p className="text-brand-green/70 font-bold uppercase tracking-widest text-sm">
          We'd love to hear from you.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-xl mx-auto bg-brand-beige border-2 border-brand-green rounded-3xl shadow-xl p-8 sm:p-12">
        <form className="flex flex-col gap-6">
          
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-xl border border-brand-green/20 outline-none focus:ring-2 focus:ring-brand-green bg-white/50"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-xl border border-brand-green/20 outline-none focus:ring-2 focus:ring-brand-green bg-white/50"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-4 rounded-xl border border-brand-green/20 outline-none focus:ring-2 focus:ring-brand-green bg-white/50"
          />

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* CONTACT INFO */}
      <div className="text-center mt-12 text-brand-green font-bold">
        <p>Email: hello@humbl.com</p>
        <p>Phone: +91 999999999</p>
      </div>
    </section>
  );
};

export default Contact;
