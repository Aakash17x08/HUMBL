import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronUp, Activity, Flame, Wind, Droplets } from "lucide-react";
import homeVideo from "../assets/logo/Sample_Video.mp4";

const bowls = [
  {
    name: "Açaí Berry Mix",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733",
    macros: { calories: 350, protein: "12g", carbs: "65g", fat: "8g" },
    tag: "Antioxidant"
  },
  {
    name: "Mediterranean Kale",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    macros: { calories: 420, protein: "20g", carbs: "55g", fat: "12g" },
    tag: "High Fiber"
  },
  {
    name: "Quinoa Veggie Mix",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    macros: { calories: 400, protein: "18g", carbs: "50g", fat: "15g" },
    tag: "Nutrient Dense"
  },
];

const miniProducts = [
  { name: "Paneer Salad", price: "₹299", image: "https://sinfullyspicy.com/wp-content/uploads/2022/05/1-2.jpg" },
  { name: "Med Veg", price: "₹249", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },
  { name: "Chickpea", price: "₹269", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { name: "Avocado", price: "₹289", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bowls.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 250);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % bowls.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + bowls.length) % bowls.length);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden w-full">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={homeVideo} type="video/mp4" />
      </video>

      {/* Overlay to make text and elements readable while maintaining the brand pink color */}
      <div className="absolute inset-0 bg-brand-pink/40 z-10"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-20">
        
        {/* LEFT SECTION */}
        <div className="w-full lg:flex-1 space-y-10 text-center lg:text-left animate-fade-in px-2 sm:px-0">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest italic mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              Premium Healthy Bowls
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-brand-green uppercase leading-[0.9]">
              Eat <span className="text-white">Fresh</span>,<br />
              Stay <span className="text-white">H</span>umble.
            </h1>
          </div>

          <p className="text-base sm:text-xl font-medium text-brand-green/80 italic max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Revolutionizing your everyday meal with nutrient-dense, protein-rich 
            vegetarian bowls inspired by bold global flavors.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <Link to="/#subscription" className="btn-primary px-10 py-5 text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
              Try Now
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-brand-beige"></div>
                ))}
              </div>
              <p className="text-sm font-bold italic text-brand-green/60">Join <span className="text-brand-green">Many</span> happy eaters</p>
            </div>
          </div>

          {/* QUICK MINI PRODUCTS */}
          <div className="hidden sm:flex flex-wrap gap-6 pt-10">
            {miniProducts.map((item, idx) => (
              <div key={idx} className="bg-white/40 backdrop-blur-sm p-4 rounded-[2rem] border border-white/20 flex items-center gap-4 hover:bg-white/60 transition-all cursor-pointer group shadow-lg">
                <img src={item.image} className="w-12 h-12 rounded-full object-cover group-hover:rotate-12 transition-transform" alt={item.name} />
                <div>
                  <p className="text-xs font-black text-brand-green">{item.name}</p>
                  <p className="text-xs font-bold text-brand-green">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: SLIDER */}
        <div className="w-full lg:flex-1 relative flex flex-col items-center">
          
          {/* Main Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-brand-green/20 rounded-full blur-[100px] -z-10"></div>

          {/* Main Image with floating effect */}
          <div className="relative group animate-bounce-slow mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-brand-green/5 rounded-full blur-2xl"></div>
            <img
              src={`${bowls[current].image}?w=800`}
              alt="featured-bowl"
              className="w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] object-cover rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-[10px] sm:border-[12px] border-white/50 transition-all duration-1000 transform group-hover:scale-105"
            />
            
            {/* Tag Badge */}
            <div className="absolute top-10 right-0 bg-brand-pink text-white px-4 sm:px-6 py-2 rounded-full font-black italic shadow-xl transform rotate-12 text-xs sm:text-base">
              {bowls[current].tag}
            </div>
          </div>

          {/* MACROS CARD - High Intensity Style */}
          <div className="mt-8 sm:mt-12 w-full max-w-[92%] sm:max-w-md bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[3rem] sm:rounded-[3.5rem] border-2 border-white shadow-2xl space-y-6 sm:space-y-8">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xl sm:text-2xl font-black italic text-brand-green">{bowls[current].name}</h3>
              <div className="flex gap-2">
                <button onClick={prevSlide} className="p-1.5 sm:p-2 bg-brand-green/10 text-brand-green rounded-full hover:bg-brand-green hover:text-white transition-all"><ChevronLeft size={18}/></button>
                <button onClick={nextSlide} className="p-1.5 sm:p-2 bg-brand-green/10 text-brand-green rounded-full hover:bg-brand-green hover:text-white transition-all"><ChevronRight size={18}/></button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { val: bowls[current].macros.calories, label: "Cals", icon: <Flame size={14}/> },
                { val: bowls[current].macros.protein, label: "Prot", icon: <Activity size={14}/> },
                { val: bowls[current].macros.carbs, label: "Carb", icon: <Wind size={14}/> },
                { val: bowls[current].macros.fat, label: "Fat", icon: <Droplets size={14}/> },
              ].map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="bg-brand-green/5 p-1.5 sm:p-2 rounded-xl text-brand-green mb-1">
                    {m.icon}
                  </div>
                  <p className="font-black text-brand-green text-sm sm:text-lg">{m.val}</p>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase text-brand-green/40 tracking-widest">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-brand-pink text-green shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </section>
  );
};

export default Home;