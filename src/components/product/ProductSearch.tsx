
import React from 'react';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
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
  );
};

export default ProductSearch;
