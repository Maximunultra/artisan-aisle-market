
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative h-screen overflow-hidden bg-artisan-cream">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTAgNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyOGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyOGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="artisan-container h-full flex flex-col items-center justify-center pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <span 
            className={`inline-block px-4 py-1.5 mb-6 text-sm font-semibold rounded-full bg-artisan-sand text-artisan-stone transition-all duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0 -translate-y-4'
            }`}
          >
            Discover Handcrafted Excellence in Legazpi City
          </span>
          
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight md:leading-tight lg:leading-tight mb-6 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100' : 'opacity-0 -translate-y-4'
            }`}
          >
            <span className="text-gradient">Artisanal</span> Creations <br className="hidden md:block" />
            from Local Masters
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100' : 'opacity-0 -translate-y-4'
            }`}
          >
            A premium marketplace showcasing extraordinary handmade products crafted by talented artisans from Legazpi City and the Bicol region.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100' : 'opacity-0 -translate-y-4'
            }`}
          >
            <Button 
              className="bg-artisan-stone hover:bg-artisan-forest text-white px-8 py-6 rounded-md text-base"
            >
              Explore Collection
            </Button>
            <Button 
              variant="outline" 
              className="border-artisan-clay text-artisan-stone hover:bg-artisan-sand hover:text-artisan-stone px-8 py-6 rounded-md text-base"
            >
              Meet Our Artisans
            </Button>
          </div>
        </div>
        
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={scrollToProducts}
            className="p-2 rounded-full bg-white/80 shadow-md animate-float"
            aria-label="Scroll down"
          >
            <ChevronDown size={24} className="text-artisan-stone" />
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className={`absolute top-1/4 right-0 w-64 h-64 bg-artisan-clay/20 rounded-full filter blur-3xl transition-all duration-1000 ${loaded ? 'opacity-30' : 'opacity-0'}`}></div>
      <div className={`absolute bottom-1/4 left-0 w-80 h-80 bg-artisan-sand/30 rounded-full filter blur-3xl transition-all duration-1000 delay-300 ${loaded ? 'opacity-30' : 'opacity-0'}`}></div>
    </section>
  );
};

export default Hero;
