
import React from 'react';

interface FeaturedCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const FeaturedCategoryFilter: React.FC<FeaturedCategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
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
  );
};

export default FeaturedCategoryFilter;
