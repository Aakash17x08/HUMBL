import React from "react";

const About = () => {
  return (
    <section id="about" className="bg-brand-pink min-h-screen text-brand-green pt-32 pb-20">
      
      {/* HEADER */}
      <div className="text-center pb-16">
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">
          About Us<span className="text-white">.</span>
        </h1>
        <p className="text-brand-green/70 font-bold uppercase tracking-widest text-sm text-center">
          Fresh. Wholesome. Humbl.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <p className="text-gray-600 leading-relaxed mb-6">
          At HUMBL, we believe healthy eating should never be boring.
          Our goal is to bring fresh, delicious, and nutrient-rich bowls
          to your everyday lifestyle. Whether you're a fitness enthusiast
          or just starting your wellness journey, we craft meals that fuel
          your body and satisfy your taste.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          Every bowl is designed with balance — combining proteins,
          greens, and wholesome ingredients inspired by global flavors
          and Indian preferences.
        </p>

        <p className="text-gray-600 leading-relaxed">
          We're not just a food brand — we're building a lifestyle that
          prioritizes health, convenience, and consistency.
        </p>
      </div>
    </section>
  );
};

export default About;
