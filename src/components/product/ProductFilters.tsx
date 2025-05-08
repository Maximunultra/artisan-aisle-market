
import React from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface ProductFiltersProps {
  categories: string[];
  priceRanges: PriceRange[];
  activeCategory: string;
  activePriceRange: PriceRange;
  isFilterOpen: boolean;
  setActiveCategory: (category: string) => void;
  setActivePriceRange: (range: PriceRange) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  priceRanges,
  activeCategory,
  activePriceRange,
  isFilterOpen,
  setActiveCategory,
  setActivePriceRange,
  setIsFilterOpen
}) => {
  return (
    <>
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
    </>
  );
};

export default ProductFilters;
