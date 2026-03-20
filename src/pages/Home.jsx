import React, { useState, useEffect } from "react";

const bowls = [
  {
    name: "Paneer Bowl",
    image:
      "https://sinfullyspicy.com/wp-content/uploads/2022/05/1-2.jpg",
    macros: {
      calories: 450,
      protein: "22g",
      carbs: "48g",
      fat: "18g",
    },
  },
  {
    name: "Chickpea Protein Bowl",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    macros: {
      calories: 420,
      protein: "20g",
      carbs: "55g",
      fat: "12g",
    },
  },
  {
    name: "Veggie Green Bowl",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    macros: {
      calories: 380,
      protein: "16g",
      carbs: "45g",
      fat: "10g",
    },
  },
];

const products = [
  {
    name: "Paneer Salad",
    type: "Vegetarian",
    price: "₹299",
    image:
      "https://sinfullyspicy.com/wp-content/uploads/2022/05/1-2.jpg",
  },
  {
    name: "Mediterranean Veg",
    type: "Vegetarian",
    price: "₹249",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  },
  {
    name: "Chickpea Bowl",
    type: "Vegetarian",
    price: "₹269",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    name: "Grilled Veggies",
    type: "Vegetarian",
    price: "₹259",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
  },
  {
    name: "Avocado Veg Bowl",
    type: "Vegetarian",
    price: "₹289",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bowls.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % bowls.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + bowls.length) % bowls.length);
  };

  return (
    <section id="home" className="bg-brand-pink min-h-screen flex items-center justify-center pt-32 pb-12 transition-colors duration-500">
      <div className="w-[94%] max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* LEFT SECTION */}
        <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic tracking-tighter text-brand-green mb-6">
            B<span className="text-white">O</span>WL'S
          </h1>

          <p className="text-brand-green font-medium mb-8 text-sm sm:text-base md:text-lg max-w-md lg:max-w-none opacity-80 italic">
            Fresh vegetarian bowls crafted for your lifestyle — packed with
            protein-rich ingredients and bold Indian flavors.
          </p>

          <button className="btn-primary mb-16">
            Start Order
          </button>

          {/* PRODUCTS LIST */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-16 sm:gap-8 justify-items-center justify-center lg:justify-start w-full">
            {products.map((item, index) => (
              <div
                key={index}
                className="product-card w-36 sm:w-40"
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <img
                    src={`${item.image}?w=200`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full border-2 border-brand-green shadow-sm"
                  />
                </div>

                <h3 className="font-bold text-brand-green text-sm sm:text-base mt-2">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-[10px] sm:text-xs font-semibold">{item.type}</p>
                <p className="font-bold text-brand-pink text-sm sm:text-lg mt-1">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SLIDER SECTION */}
        <div className="relative flex flex-col items-center w-full lg:w-auto">
          
          {/* IMAGE GLOW */}
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-brand-green rounded-full -z-10 opacity-20 blur-[80px]"></div>

          {/* MAIN IMAGE */}
          <div className="relative group">
             <img
              src={`${bowls[current].image}?w=600`}
              alt="bowl"
              className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] object-cover rounded-full shadow-2xl transition-all duration-700 transform group-hover:rotate-6 sm:border-8 border-brand-green/10"
            />
          </div>

          {/* MACROS CARD */}
          <div className="macros-card mt-12">
            <h3 className="font-black text-brand-green text-xl mb-6 italic">
              {bowls[current].name}
            </h3>

            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <p className="font-black text-brand-pink text-xl">
                  {bowls[current].macros.calories}
                </p>
                <p className="uppercase text-[10px] font-black text-gray-500 tracking-widest">Cals</p>
              </div>
              <div className="flex flex-col items-center border-l-2 border-brand-green/10 pl-4">
                <p className="font-black text-brand-green text-xl">
                  {bowls[current].macros.protein}
                </p>
                <p className="uppercase text-[10px] font-black text-gray-500 tracking-widest">Prot</p>
              </div>
              <div className="flex flex-col items-center border-l-2 border-brand-green/10 pl-4">
                <p className="font-black text-brand-green text-xl">
                  {bowls[current].macros.carbs}
                </p>
                <p className="uppercase text-[10px] font-black text-gray-500 tracking-widest">Carb</p>
              </div>
              <div className="flex flex-col items-center border-l-2 border-brand-green/10 pl-4">
                <p className="font-black text-brand-green text-xl">
                  {bowls[current].macros.fat}
                </p>
                <p className="uppercase text-[10px] font-black text-gray-500 tracking-widest">Fat</p>
              </div>
            </div>
          </div>

          {/* SLIDER CONTROLS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="bg-brand-green text-white p-3.5 rounded-full shadow-lg hover:bg-brand-dark transition-all hover:scale-110 active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={nextSlide}
              className="bg-brand-green text-white p-3.5 rounded-full shadow-lg hover:bg-brand-dark transition-all hover:scale-110 active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;