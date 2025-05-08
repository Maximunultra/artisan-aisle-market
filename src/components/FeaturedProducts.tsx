
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types/CartItem";
import { Product } from '@/types/Product';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import ProductContactOptions from './ProductContactOptions';
import FeaturedProductCard from './product/FeaturedProductCard';
import FeaturedCategoryFilter from './product/FeaturedCategoryFilter';
import FeaturedHeader from './product/FeaturedHeader';

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Hand-woven Abaca Bag",
    category: "Accessories",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Maria Santos",
    featured: true
  },
  {
    id: 2,
    name: "Ceramic Vase with Bicol Patterns",
    category: "Home Decor",
    price: 1850,
    image: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Pedro Reyes",
    featured: true
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
  }
];

// Product categories for filtering
const categories = ["All", "Accessories", "Home Decor", "Kitchen", "Clothing"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
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
  
  const buyNow = (product: Product) => {
    // Add item to cart first
    addToCart(product);
    // Navigate to checkout page
    navigate('/checkout');
  };
  
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };
  
  return (
    <section id="featured-products" className="section-spacing bg-white">
      <div className="artisan-container">
        <FeaturedHeader />
        
        {/* Category Filter */}
        <FeaturedCategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
              onAddToCart={addToCart}
              onBuyNow={buyNow}
            />
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

      {/* Product Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>By {selectedProduct.artisan}</DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="aspect-[4/3] mb-4 overflow-hidden rounded-md">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm py-1 px-2 bg-artisan-sand/50 rounded-full">
                    {selectedProduct.category}
                  </span>
                  <span className="text-artisan-accent font-semibold">₱{selectedProduct.price.toLocaleString()}</span>
                </div>
                
                <ProductContactOptions 
                  productName={selectedProduct.name}
                  artisanName={selectedProduct.artisan}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedProducts;
