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
    <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center pt-28 pb-12 lg:py-0">
      <div className="w-[92%] max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
        
        {/* LEFT */}
        <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            B<span className="text-green-600">O</span>WL'S
          </h1>

          <p className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg max-w-md lg:max-w-none">
            Fresh vegetarian bowls crafted for your lifestyle — packed with
            protein-rich paneer, chickpeas, greens, and bold Indian flavors.
          </p>

          <button className="bg-green-600 text-white px-8 py-3.5 rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95 font-semibold">
            Start Order
          </button>

          {/* PRODUCTS */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-12 sm:gap-6 mt-16 justify-items-center justify-center lg:justify-start w-full">
            {products.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-4 w-32 sm:w-36 text-center transition-transform hover:-translate-y-1"
              >
                <img
                  src={`${item.image}?w=200`}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full mx-auto -mt-10 border-4 border-white shadow-sm"
                />

                <h3 className="font-semibold text-xs sm:text-sm mt-3">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs">{item.type}</p>
                <p className="font-bold mt-2 text-sm sm:text-base">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative flex flex-col items-center w-full lg:w-auto">
          
          {/* GREEN BG */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-green-500 rounded-full -z-10 opacity-20 blur-2xl lg:opacity-100 lg:blur-none lg:bg-green-500"></div>

          {/* IMAGE */}
          <div className="relative">
             <img
              src={`${bowls[current].image}?w=500`}
              alt="bowl"
              className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] object-cover rounded-full shadow-2xl transition-all duration-500 transform hover:rotate-3"
            />
          </div>

          {/* MACROS */}
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-[280px] sm:w-80 text-center border border-white/20">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {bowls[current].name}
            </h3>

            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <p className="font-black text-green-600 text-base sm:text-lg">
                  {bowls[current].macros.calories}
                </p>
                <p className="uppercase tracking-tighter font-semibold opacity-60">Cals</p>
              </div>
              <div className="flex flex-col items-center border-l border-gray-100 pl-3 sm:pl-4">
                <p className="font-black text-gray-800 text-base sm:text-lg">
                  {bowls[current].macros.protein}
                </p>
                <p className="uppercase tracking-tighter font-semibold opacity-60">Prot</p>
              </div>
              <div className="flex flex-col items-center border-l border-gray-100 pl-3 sm:pl-4">
                <p className="font-black text-gray-800 text-base sm:text-lg">
                  {bowls[current].macros.carbs}
                </p>
                <p className="uppercase tracking-tighter font-semibold opacity-60">Carb</p>
              </div>
              <div className="flex flex-col items-center border-l border-gray-100 pl-3 sm:pl-4">
                <p className="font-black text-gray-800 text-base sm:text-lg">
                  {bowls[current].macros.fat}
                </p>
                <p className="uppercase tracking-tighter font-semibold opacity-60">Fat</p>
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex gap-6 mt-6">
            <button
              onClick={prevSlide}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all hover:scale-110 active:scale-90 text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={nextSlide}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all hover:scale-110 active:scale-90 text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;