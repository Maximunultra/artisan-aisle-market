
import React from 'react';

const FeaturedHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
        Handcrafted with Care
      </span>
      <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
        Our Featured Creations
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
        Discover extraordinary handmade products that showcase the exceptional craftsmanship 
        and cultural heritage of Legazpi City artisans.
      </p>
    </div>
  );
};

export default FeaturedHeader;
