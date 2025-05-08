
import React from 'react';
import ProductCard from './ProductCard';
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

interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onResetFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onViewDetails, 
  onAddToCart,
  onResetFilters
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search term to find what you're looking for.
        </p>
        <Button 
          onClick={onResetFilters}
          className="bg-artisan-stone hover:bg-artisan-forest text-white"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
