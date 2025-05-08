
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/Product';

interface FeaturedProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ 
  product, 
  onViewDetails, 
  onAddToCart,
  onBuyNow 
}) => {
  return (
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
              onAddToCart(product);
            }}
            className="w-full border-artisan-stone text-artisan-stone hover:bg-artisan-sand/50"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Add to Cart
          </Button>
          <Button 
            onClick={(e) => {
              e.preventDefault();
              onBuyNow(product);
            }}
            className="w-full bg-artisan-stone hover:bg-artisan-forest"
          >
            <CreditCard className="mr-1 h-4 w-4" />
            Buy Now
          </Button>
        </div>

        {/* Contact Seller Button */}
        <Button
          variant="ghost"
          className="w-full mt-2 text-artisan-accent hover:text-artisan-accent/80"
          onClick={(e) => {
            e.preventDefault();
            onViewDetails(product);
          }}
        >
          Contact Seller
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
