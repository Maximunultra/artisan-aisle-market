
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import ArtisanProfiles from '@/components/ArtisanProfiles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <ArtisanProfiles />
        
        {/* Story/About Section */}
        <section className="section-spacing bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTAgNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyOGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyOGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
          
          <div className="artisan-container relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
                  Preserving Heritage Through Craftsmanship
                </h2>
                <div className="prose text-muted-foreground">
                  <p className="mb-4">
                    Artisanal was founded with a mission to preserve and promote the rich cultural heritage of Legazpi City and the wider Bicol region through exceptional handcrafted products.
                  </p>
                  <p className="mb-4">
                    Our marketplace connects skilled local artisans with customers who appreciate authentic, handmade creations that tell a story. Each product represents hours of dedication, generations of passed-down techniques, and a deep connection to our cultural roots.
                  </p>
                  <p>
                    By supporting these craftspeople, you're not just purchasing a beautiful item – you're helping preserve traditional skills, provide sustainable livelihoods, and keep our cultural heritage alive for generations to come.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1604861737629-3e12e1a486a8?auto=format&fit=crop&q=80&w=600&h=450" 
                    alt="Artisan crafting" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-artisan-sand rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-artisan-clay rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="section-spacing bg-artisan-cream">
          <div className="artisan-container">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
                Customer Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                What People Are Saying
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Discover what our customers love about their Artisanal purchases and experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Sofia Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Manila</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "The abaca bag I purchased is absolutely stunning. The craftsmanship is impeccable, and I love knowing the story behind who made it. I've received so many compliments!"
                </p>
                <div className="flex text-artisan-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Miguel Santos</h4>
                    <p className="text-sm text-muted-foreground">Cebu City</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "The ceramic set I ordered exceeded my expectations. The intricate Bicol patterns are beautiful, and you can really feel the care put into making each piece. Shipping was fast too!"
                </p>
                <div className="flex text-artisan-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Andrea Reyes</h4>
                    <p className="text-sm text-muted-foreground">Davao</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "I purchased several items as gifts, and everyone loved them! The packaging was beautiful, and the handwritten note from the artisan made it extra special. Will definitely shop here again."
                </p>
                <div className="flex text-artisan-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
