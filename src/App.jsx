import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Blogs from './pages/Blogs';
import Subscription from './pages/Subscription';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ScrollToHash from './components/ScrollToHash';

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
        <Navbar />
        <main className="flex-1 flex flex-col overflow-x-hidden">
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <Products />
                <About />
                <Subscription />
                <Blogs />
                <Contact />
              </>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
