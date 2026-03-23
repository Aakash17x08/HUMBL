import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="bg-brand-beige min-h-screen py-24 px-4 sm:px-8 md:px-12 flex items-center justify-center overflow-hidden w-full">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT SECTION: TEXT CONTENT */}
        <div className="lg:col-span-6 space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl sm:text-6xl font-black italic text-brand-green leading-tight">
              About Our <span className="text-brand-pink underline decoration-brand-green/20 underline-offset-8 decoration-4">Kitchen</span>
            </h2>
            <div className="w-24 h-2 bg-brand-green rounded-full opacity-10"></div>
          </div>

          <div className="space-y-6 text-brand-green font-medium italic text-lg sm:text-xl leading-relaxed opacity-90">
            <p>
              We are a modern, delivery-only cloud kitchen committed to serving fresh, 
              hygienic, and delicious food. Our kitchen is designed to focus entirely 
              on quality cooking, safe food practices, and efficient delivery—so every 
              meal reaches you fresh and full of flavor.
            </p>
            <p>
              Every order is prepared fresh, packed hygienically, and delivered with care 
              to ensure a great food experience every time.
            </p>
          </div>

          <Link 
            to="/#subscription" 
            className="btn-primary inline-flex items-center px-10 py-4 text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Explore Our Menu
          </Link>
        </div>

        {/* RIGHT SECTION: IMAGE COLLAGE */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] mt-12 lg:mt-0 px-4">
          {/* Main Large Image */}
          <div className="relative z-10 w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 sm:border-8 border-white shadow-2xl transform hover:rotate-6 transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800" 
              alt="Fresh Salad Plate" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Image 1 (Smoothie) */}
          <div className="absolute -top-4 right-4 sm:top-0 sm:right-10 z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-xl animate-bounce-slow">
            <img 
              src="https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=400" 
              alt="Fresh Smoothie" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Image 2 (Chef/Prep) */}
          <div className="absolute -bottom-6 left-0 sm:left-10 z-20 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-xl hover:scale-110 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500" 
              alt="Kitchen Prep" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Image 3 (Salad Bowl) */}
          <div className="absolute top-1/2 -left-4 sm:-left-10 transform -translate-y-1/2 z-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-lg opacity-80">
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400" 
              alt="Salad Bowl" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-1/4 w-6 h-6 bg-brand-pink rounded-full opacity-40 blur-sm"></div>
          <div className="absolute bottom-10 right-1/4 w-10 h-10 bg-brand-green rounded-full opacity-20 blur-md"></div>
        </div>

      </div>
    </section>
  );
};

export default About;
