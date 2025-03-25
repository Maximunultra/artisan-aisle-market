
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types/CartItem";

// Sample products data (expanded)
const products = [
  {
    id: 1,
    name: "Hand-woven Abaca Bag",
    category: "Accessories",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Maria Santos",
    featured: true,
    isEcoFriendly: true
  },
  {
    id: 2,
    name: "Ceramic Vase with Bicol Patterns",
    category: "Home Decor",
    price: 1850,
    image: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Pedro Reyes",
    featured: true,
    isEcoFriendly: false
  },
  {
    id: 3,
    name: "Handcrafted Wooden Serving Tray",
    category: "Kitchen",
    price: 1500,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Juan Mendoza",
    featured: true
  },
  {
    id: 4,
    name: "Hand-painted Mayon Silk Scarf",
    category: "Clothing",
    price: 2200,
    image: "https://images.unsplash.com/photo-1520299607509-dcd935f9a025?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Elena Cruz",
    featured: true
  },
  {
    id: 5,
    name: "Bamboo Table Lamp",
    category: "Home Decor",
    price: 1700,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Ramon Ignacio",
    featured: false
  },
  {
    id: 6,
    name: "Handwoven Placemats (Set of 4)",
    category: "Kitchen",
    price: 950,
    image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Teresa Lim",
    featured: false
  },
  {
    id: 7,
    name: "Coconut Shell Candle Holder",
    category: "Home Decor",
    price: 750,
    image: "https://images.unsplash.com/photo-1606293924735-11aaaf8b5625?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Carlos Santos",
    featured: false
  },
  {
    id: 8,
    name: "Abaca Rope Plant Hanger",
    category: "Home Decor",
    price: 850,
    image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Maria Santos",
    featured: false
  },
  {
    id: 9,
    name: "Hand-carved Wooden Spoon Set",
    category: "Kitchen",
    price: 1250,
    image: "https://images.unsplash.com/photo-1593853963555-013dcbeb8fc0?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Juan Mendoza",
    featured: false
  },
  {
    id: 10,
    name: "Woven Rattan Basket",
    category: "Home Decor",
    price: 980,
    image: "https://images.unsplash.com/photo-1622402815427-58bfd4457095?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Sofia Cruz",
    featured: false
  },
  {
    id: 11,
    name: "Handloom Cotton Table Runner",
    category: "Home Decor",
    price: 1150,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Elena Cruz",
    featured: false
  },
  {
    id: 12,
    name: "Shell and Bead Necklace",
    category: "Accessories",
    price: 780,
    image: "https://images.unsplash.com/photo-1535632066274-65209aa3d82f?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Teresa Lim",
    featured: false
  }
];

// Categories
const categories = ["All", "Accessories", "Home Decor", "Kitchen", "Clothing"];

// Price ranges
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₱1,000", min: 0, max: 1000 },
  { label: "₱1,000 - ₱1,500", min: 1000, max: 1500 },
  { label: "₱1,500 - ₱2,000", min: 1500, max: 2000 },
  { label: "Over ₱2,000", min: 2000, max: Infinity }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(priceRanges[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => (
      (activeCategory === "All" || product.category === activeCategory) &&
      (product.price >= activePriceRange.min && product.price <= activePriceRange.max) &&
      (searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ))
    .sort((a, b) => {
      switch(sortBy) {
        case "priceLowToHigh":
          return a.price - b.price;
        case "priceHighToLow":
          return b.price - a.price;
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="artisan-container">
          {/* Page Header */}
          <div className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of handcrafted treasures, each piece telling a unique story of tradition, skill, and cultural heritage.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, artisans, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                />
              </div>
              
              {/* Sort Dropdown */}
              <div className="w-full md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </select>
              </div>
              
              {/* Mobile Filter Toggle */}
              <Button 
                variant="outline" 
                className="md:hidden flex items-center justify-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Filter Section */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 bg-artisan-sand/50 p-4 rounded-lg ${isFilterOpen || window.innerWidth >= 768 ? 'block' : 'hidden md:block'}`}>
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        activeCategory === category 
                          ? 'bg-artisan-stone text-white' 
                          : 'bg-white text-artisan-stone hover:bg-artisan-sand'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Ranges */}
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Price Range
                </h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePriceRange(range)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        activePriceRange.label === range.label 
                          ? 'bg-artisan-stone text-white' 
                          : 'bg-white text-artisan-stone hover:bg-artisan-sand'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
                    
                    {/* Eco-Friendly Badge */}
                    {product.isEcoFriendly && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Eco-Friendly
                      </div>
                    )}
                    
                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button 
                        className="bg-white text-artisan-stone hover:bg-artisan-cream"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
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
                      <button className="text-artisan-stone text-sm font-medium inline-flex items-center hover:text-artisan-accent transition-colors">
                        View Details
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setActiveCategory("All");
                  setActivePriceRange(priceRanges[0]);
                  setSearchQuery("");
                }}
                className="bg-artisan-stone hover:bg-artisan-forest text-white"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Products;
