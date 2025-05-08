
import React from 'react';
import { ShoppingCart, Info, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  artisan: string;
  featured: boolean;
  isEcoFriendly?: boolean;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover-lift cursor-pointer"
      onClick={() => onViewDetails(product)}
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
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button 
            className="bg-white text-artisan-stone hover:bg-artisan-cream"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button 
            variant="outline"
            className="bg-white/80 border-artisan-stone text-artisan-stone hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            <Info className="mr-2 h-4 w-4" />
            View Details
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
          <button 
            className="text-artisan-stone text-sm font-medium inline-flex items-center hover:text-artisan-accent transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            View Details
            <ChevronDown className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
