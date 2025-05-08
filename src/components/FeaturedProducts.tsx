
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingCart, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types/CartItem";

// Sample product data
const products = [
  {
    id: 1,
    name: "Hand-woven Abaca Bag",
    category: "Accessories",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Maria Santos",
  },
  {
    id: 2,
    name: "Ceramic Vase with Bicol Patterns",
    category: "Home Decor",
    price: 1850,
    image: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Pedro Reyes",
  },
  {
    id: 3,
    name: "Handcrafted Wooden Serving Tray",
    category: "Kitchen",
    price: 1500,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Juan Mendoza",
  },
  {
    id: 4,
    name: "Hand-painted Mayon Silk Scarf",
    category: "Clothing",
    price: 2200,
    image: "https://images.unsplash.com/photo-1520299607509-dcd935f9a025?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Elena Cruz",
  }
];

// Product categories for filtering
const categories = ["All", "Accessories", "Home Decor", "Kitchen", "Clothing"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const addToCart = (product: any) => {
    // Get existing cart items from localStorage
    const existingCart = localStorage.getItem('cart');
    const cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        artisan: product.artisan,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const buyNow = (product: any) => {
    // Add item to cart first
    addToCart(product);
    // Navigate to checkout page
    navigate('/checkout');
  };
  
  return (
    <section id="featured-products" className="section-spacing bg-white">
      <div className="artisan-container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
            Handcrafted with Care
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
            Our Featured Creations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover extraordinary handmade products that showcase the exceptional craftsmanship 
            and cultural heritage of Legazpi City artisans.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-artisan-stone text-white shadow-md' 
                  : 'bg-artisan-sand/50 text-artisan-stone hover:bg-artisan-sand'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover-lift"
            >
              {/* Product Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">By {product.artisan}</p>
                  </div>
                  <span className="text-artisan-accent font-semibold">₱{product.price.toLocaleString()}</span>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs py-1 px-2 bg-artisan-sand/50 rounded-full">
                    {product.category}
                  </span>
                  <Link to={`/products/${product.id}`} className="text-artisan-stone text-sm font-medium inline-flex items-center hover:text-artisan-accent transition-colors">
                    View Details
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="w-full border-artisan-stone text-artisan-stone hover:bg-artisan-sand/50"
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      buyNow(product);
                    }}
                    className="w-full bg-artisan-stone hover:bg-artisan-forest"
                  >
                    <CreditCard className="mr-1 h-4 w-4" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" className="border-artisan-clay text-artisan-stone hover:bg-artisan-sand">
              View All Products
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
