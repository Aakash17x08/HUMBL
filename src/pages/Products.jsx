import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight, Apple, Soup, Coffee, LayoutGrid, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const categories = [
  { id: "All", icon: <LayoutGrid size={20} /> },
  { id: "Açaí Bowls", icon: <Apple size={20} /> },
  { id: "Salads", icon: <Soup size={20} /> },
  { id: "Smoothies", icon: <Coffee size={20} /> },
];

const products = [
  {
    id: 1,
    name: "Classic Açaí Power Bowl",
    category: "Açaí Bowls",
    price: "₹349",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600",
    description: "Pure Amazonian açaí, banana, berries, and artisanal granola.",
    micronutrients: ["Vitamin C", "Antioxidants", "Iron", '500kcal']
  },
  {
    id: 2,
    name: "Mediterranean Green Salad",
    category: "Salads",
    price: "₹299",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600",
    description: "Fresh kale, quinoa, feta cheese, and balsamic glaze.",
    micronutrients: ["Calcium", "Vitamin A", "Fiber"]
  },
  {
    id: 3,
    name: "Triple Berry Bliss",
    category: "Smoothies",
    price: "₹199",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600",
    description: "Cold-pressed blueberries, strawberries, and coconut milk.",
    micronutrients: ["Vitamin K", "Manganese", "Vitamin C"]
  },
  {
    id: 4,
    name: "Nutty Peanut Butter Bowl",
    category: "Açaí Bowls",
    price: "₹389",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600",
    description: "Açaí base topped with peanut butter and cacao nibs.",
    micronutrients: ["Protein", "Magnesium", "Potassium"]
  },
  {
    id: 5,
    name: "Zesty Chickpea Bowl",
    category: "Salads",
    price: "₹279",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600",
    description: "Spiced chickpeas, cucumber, cherry tomatoes, and tahini.",
    micronutrients: ["Folate", "Iron", "Fiber"]
  },
  {
    id: 6,
    name: "Tropical Mango Glow",
    category: "Smoothies",
    price: "₹229",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1536304911226-72bb95928883?q=80&w=600",
    description: "Fresh mango, pineapple, ginger, and turmeric.",
    micronutrients: ["Vitamin A", "Vitamin C", "Curcumin"]
  }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="bg-white min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* LEFT: CATEGORIES SIDEBAR */}
        <div className="lg:w-1/4 space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-black italic text-brand-green leading-tight text-center lg:text-left">
            Menu <span className="text-brand-pink underline underline-offset-4">Categories</span>
          </h2>
          
          <div className="flex lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-between min-w-[140px] sm:min-w-[180px] lg:w-full p-3 sm:p-4 rounded-2xl transition-all duration-300 shadow-sm border-2 ${
                  activeCategory === cat.id 
                  ? "bg-brand-pink text-white border-brand-pink scale-105" 
                  : "bg-white text-brand-green border-white hover:border-brand-pink/20"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-1.5 sm:p-2 rounded-xl ${activeCategory === cat.id ? "bg-white/20" : "bg-brand-pink/10"}`}>
                    {cat.icon}
                  </div>
                  <span className="font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap">{cat.id}</span>
                </div>
                <div className="hidden lg:block">
                  {activeCategory === cat.id && <ChevronRight size={18} />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT GRID */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-[2.5rem] p-4 shadow-xl border border-brand-green/5 flex flex-col hover:shadow-2xl transition-shadow group">
                {/* Image Container */}
                <div className="relative h-56 rounded-[2rem] overflow-hidden mb-5">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="px-2 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-brand-green italic leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm bg-yellow-50 px-2 py-0.5 rounded-lg shrink-0">
                      <Star size={14} fill="currentColor" /> {product.rating}
                    </div>
                  </div>

                  <p className="text-xs font-medium text-brand-green/60 italic mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Micronutrients Display */}
                  {product.micronutrients && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.micronutrients.map((micro, i) => (
                        <span key={i} className="text-[10px] font-black tracking-widest uppercase bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
                          {micro}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-brand-green/5 flex flex-col gap-4">
                    <div className="flex justify-between items-center px-1">
                      <p className="text-xl font-black text-brand-green uppercase tracking-tighter">{product.price}/-</p>
                    </div>

                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-brand-pink text-white py-4 rounded-2xl font-black italic text-center text-sm tracking-widest hover:bg-brand-green transition-all shadow-lg active:scale-95"
                    >
                      ORDER NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-brand-green/40 italic">
              <p className="text-xl font-bold">Coming Soon to our Kitchen...</p>
            </div>
          )}
        </div>

      </div>

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 bg-brand-green text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <CheckCircle className="text-brand-pink" size={24} />
        <span className="font-bold tracking-wide">{toastMessage}</span>
      </div>
    </section>
  );
};

export default Products;
