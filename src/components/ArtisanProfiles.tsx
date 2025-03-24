
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample artisan data
const artisans = [
  {
    id: 1,
    name: "Maria Santos",
    craft: "Abaca Weaving",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300",
    products: 16,
    bio: "A master weaver with over 20 years of experience crafting premium abaca products using traditional techniques."
  },
  {
    id: 2,
    name: "Pedro Reyes",
    craft: "Pottery & Ceramics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300",
    products: 24,
    bio: "Specializes in ceramic art inspired by Bicol's volcanic landscapes and traditional patterns."
  },
  {
    id: 3,
    name: "Elena Cruz",
    craft: "Textile Artist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300",
    products: 12,
    bio: "Creates exquisite hand-painted textiles that tell stories of Bicol's rich cultural heritage."
  }
];

const ArtisanProfiles = () => {
  return (
    <section className="section-spacing bg-artisan-cream">
      <div className="artisan-container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
            The Masters Behind the Craft
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
            Meet Our Artisans
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            These skilled creators combine generations of traditional knowledge with innovative techniques
            to bring you exceptional handcrafted treasures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <div 
              key={artisan.id}
              className={`glass-card rounded-2xl overflow-hidden hover-lift animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={artisan.image} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Overlay with crafttype */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <span className="text-white text-sm font-medium px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                    {artisan.craft}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">{artisan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {artisan.bio}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-artisan-stone">
                    <strong>{artisan.products}</strong> Products
                  </span>
                  <Link to={`/artisans/${artisan.id}`}>
                    <Button variant="ghost" className="text-artisan-accent hover:text-artisan-forest p-0 h-auto">
                      View Profile
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl md:text-2xl font-serif mb-4">
            Are You an Artisan from Legazpi City?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-balance">
            Join our community of skilled craftspeople and showcase your creations to customers around the world.
          </p>
          <Button className="bg-artisan-stone hover:bg-artisan-forest text-white">
            Apply to Become a Seller
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArtisanProfiles;
