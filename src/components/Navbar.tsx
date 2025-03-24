
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="artisan-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold">
            <span className="text-gradient">Artisanal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-artisan-accent' 
                    : 'text-foreground hover:text-artisan-accent'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/products') 
                    ? 'text-artisan-accent' 
                    : 'text-foreground hover:text-artisan-accent'
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'text-artisan-accent' 
                    : 'text-foreground hover:text-artisan-accent'
                }`}
              >
                About
              </Link>
            </li>
          </ul>
          
          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-artisan-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="default" className="bg-artisan-stone hover:bg-artisan-forest text-white">
              Sign In
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm animate-fade-in">
          <div className="artisan-container py-4">
            <ul className="flex flex-col space-y-4 pb-4">
              <li>
                <Link 
                  to="/" 
                  className={`block font-medium py-2 transition-colors duration-200 ${
                    isActive('/') 
                      ? 'text-artisan-accent' 
                      : 'text-foreground hover:text-artisan-accent'
                  }`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`block font-medium py-2 transition-colors duration-200 ${
                    isActive('/products') 
                      ? 'text-artisan-accent' 
                      : 'text-foreground hover:text-artisan-accent'
                  }`}
                  onClick={closeMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block font-medium py-2 transition-colors duration-200 ${
                    isActive('/about') 
                      ? 'text-artisan-accent' 
                      : 'text-foreground hover:text-artisan-accent'
                  }`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-4 pt-4 border-t">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="default" className="bg-artisan-stone hover:bg-artisan-forest text-white">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
