
import React from 'react';

interface ProductSorterProps {
  sortBy: string;
  setSortBy: (sortOption: string) => void;
}

const ProductSorter: React.FC<ProductSorterProps> = ({ sortBy, setSortBy }) => {
  return (
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
  );
};

export default ProductSorter;
