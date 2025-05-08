
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types/CartItem";
import { useNavigate } from 'react-router-dom';
import { Product, PriceRange } from '@/types/Product';
import ProductSearch from '@/components/product/ProductSearch';
import ProductSorter from '@/components/product/ProductSorter';
import ProductFilters from '@/components/product/ProductFilters';
import ProductGrid from '@/components/product/ProductGrid';
import ProductDetailsDrawer from '@/components/product/ProductDetailsDrawer';
import { products, categories, priceRanges } from '@/constants/productData';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(priceRanges[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
  
  const addToCart = (product: Product) => {
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

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleProceedToCheckout = () => {
    // First add the selected product to cart
    if (selectedProduct) {
      addToCart(selectedProduct);
    }
    // Navigate to checkout page
    navigate('/checkout');
  };

  const handleResetFilters = () => {
    setActiveCategory("All");
    setActivePriceRange(priceRanges[0]);
    setSearchQuery("");
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
              <ProductSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              
              {/* Sort Dropdown */}
              <ProductSorter sortBy={sortBy} setSortBy={setSortBy} />
              
              <ProductFilters 
                categories={categories}
                priceRanges={priceRanges}
                activeCategory={activeCategory}
                activePriceRange={activePriceRange}
                isFilterOpen={isFilterOpen}
                setActiveCategory={setActiveCategory}
                setActivePriceRange={setActivePriceRange}
                setIsFilterOpen={setIsFilterOpen}
              />
            </div>
          </div>
          
          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          
          {/* Products Grid */}
          <ProductGrid 
            products={filteredProducts}
            onViewDetails={handleViewProductDetails}
            onAddToCart={addToCart}
            onResetFilters={handleResetFilters}
          />
        </div>
      </main>

      {/* Product Details Drawer */}
      <ProductDetailsDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        selectedProduct={selectedProduct}
        onAddToCart={addToCart}
        onProceedToCheckout={handleProceedToCheckout}
      />
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Products;
