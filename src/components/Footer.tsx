
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-artisan-stone text-white">
      <div className="artisan-container">
        {/* Newsletter */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-artisan-forest/80 rounded-2xl -mt-12 relative z-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-serif mb-2">Join Our Community</h3>
              <p className="text-white/80">
                Subscribe to receive updates on new products, artisan stories, and exclusive offers.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                />
                <Button className="bg-artisan-accent hover:bg-artisan-accent/90 text-white whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="py-16 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h4 className="text-lg font-serif mb-4">Artisanal</h4>
            <p className="text-white/80 mb-4 text-sm">
              A premium marketplace connecting talented artisans from Legazpi City with customers who value exceptional craftsmanship and cultural heritage.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-serif mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/artisans" className="text-white/80 hover:text-white transition-colors">
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Categories */}
          <div>
            <h4 className="text-lg font-serif mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products/home-decor" className="text-white/80 hover:text-white transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products/accessories" className="text-white/80 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products/clothing" className="text-white/80 hover:text-white transition-colors">
                  Clothing & Textiles
                </Link>
              </li>
              <li>
                <Link to="/products/kitchen" className="text-white/80 hover:text-white transition-colors">
                  Kitchen & Dining
                </Link>
              </li>
              <li>
                <Link to="/products/jewelry" className="text-white/80 hover:text-white transition-colors">
                  Jewelry
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-serif mb-4">Contact Us</h4>
            <address className="not-italic text-sm text-white/80 space-y-2">
              <p>123 Mayon Avenue</p>
              <p>Legazpi City, Albay</p>
              <p>Philippines 4500</p>
              <p className="pt-2">
                <a href="mailto:hello@artisanal.ph" className="flex items-center hover:text-white transition-colors">
                  <Mail size={16} className="mr-2" />
                  hello@artisanal.ph
                </a>
              </p>
              <p>
                <a href="tel:+639123456789" className="hover:text-white transition-colors">
                  +63 912 345 6789
                </a>
              </p>
            </address>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-white/70 mb-4 md:mb-0">
            © {currentYear} Artisanal. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/terms" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/shipping" className="text-white/70 hover:text-white transition-colors">
              Shipping Info
            </Link>
            <Link to="/faq" className="text-white/70 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
