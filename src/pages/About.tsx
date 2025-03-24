
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative bg-artisan-cream py-16 md:py-24">
          <div className="artisan-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-fade-in">
                <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
                  About Us
                </span>
                <h1 className="text-4xl md:text-5xl font-serif mt-2 mb-6">
                  Celebrating Legazpi City's Rich Artisanal Heritage
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  Artisanal is more than a marketplace—it's a movement dedicated to preserving traditional crafts 
                  and empowering local artisans in Legazpi City and beyond.
                </p>
                <Button className="bg-artisan-stone hover:bg-artisan-forest text-white">
                  Our Mission
                </Button>
              </div>
              
              <div className="order-1 lg:order-2 relative animate-fade-in-right">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&q=80&w=800&h=450" 
                    alt="Legazpi City with Mayon Volcano" 
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
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="artisan-container">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                From Tradition to Innovation
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-balance">
                The journey of Artisanal began with a deep appreciation for the craftsmanship that has been passed down through generations in Legazpi City.
              </p>
            </div>
            
            {/* Timeline */}
            <div className="space-y-16">
              {/* 2018 */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
                <div className="md:col-span-3 order-2 md:order-1">
                  <span className="inline-block px-3 py-1 bg-artisan-sand text-artisan-stone text-sm font-medium rounded-full mb-2">
                    2018
                  </span>
                  <h3 className="text-2xl font-serif mb-4">A Vision Takes Shape</h3>
                  <p className="text-muted-foreground mb-4">
                    Our founder, Isabella Santos, recognized the untapped potential of Legazpi City's artisans. Dismayed by the declining interest in traditional crafts, she envisioned a platform that would connect these skilled creators with a global audience.
                  </p>
                  <p className="text-muted-foreground">
                    Initial research began with visits to small workshops and homes where artisans were keeping centuries-old techniques alive despite modern challenges.
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-center order-1 md:order-2">
                  <div className="w-2 h-full bg-artisan-clay hidden md:block"></div>
                  <div className="w-16 h-16 rounded-full bg-artisan-clay flex items-center justify-center text-white font-bold text-xl">1</div>
                </div>
                <div className="md:col-span-3 order-3">
                  <img 
                    src="https://images.unsplash.com/photo-1557842458-11e7f23e3616?auto=format&fit=crop&q=80&w=600&h=400" 
                    alt="Market research" 
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
              </div>
              
              {/* 2020 */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
                <div className="md:col-span-3 order-3 md:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1531592937781-344ad608fabf?auto=format&fit=crop&q=80&w=600&h=400" 
                    alt="Team collaboration" 
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
                <div className="md:col-span-1 flex justify-center order-1 md:order-2">
                  <div className="w-2 h-full bg-artisan-clay hidden md:block"></div>
                  <div className="w-16 h-16 rounded-full bg-artisan-clay flex items-center justify-center text-white font-bold text-xl">2</div>
                </div>
                <div className="md:col-span-3 order-2 md:order-3">
                  <span className="inline-block px-3 py-1 bg-artisan-sand text-artisan-stone text-sm font-medium rounded-full mb-2">
                    2020
                  </span>
                  <h3 className="text-2xl font-serif mb-4">Building Partnerships</h3>
                  <p className="text-muted-foreground mb-4">
                    Despite the challenges of the pandemic, we formed our core team and established relationships with our first group of artisans. We developed fair trade practices and quality standards while respecting traditional methods.
                  </p>
                  <p className="text-muted-foreground">
                    We also partnered with local organizations to provide workshops and resources for artisans to enhance their skills while preserving authentic techniques.
                  </p>
                </div>
              </div>
              
              {/* 2021 */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
                <div className="md:col-span-3 order-2 md:order-1">
                  <span className="inline-block px-3 py-1 bg-artisan-sand text-artisan-stone text-sm font-medium rounded-full mb-2">
                    2021
                  </span>
                  <h3 className="text-2xl font-serif mb-4">Launching Artisanal</h3>
                  <p className="text-muted-foreground mb-4">
                    Our platform officially launched, featuring carefully curated products from 15 artisans. Each item included the creator's story and highlighted the cultural significance of the techniques used.
                  </p>
                  <p className="text-muted-foreground">
                    The response exceeded our expectations, with customers from across the Philippines and internationally embracing these authentic, handcrafted treasures.
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-center order-1 md:order-2">
                  <div className="w-2 h-full bg-artisan-clay hidden md:block"></div>
                  <div className="w-16 h-16 rounded-full bg-artisan-clay flex items-center justify-center text-white font-bold text-xl">3</div>
                </div>
                <div className="md:col-span-3 order-3">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=400" 
                    alt="Website launch celebration" 
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
              </div>
              
              {/* Present */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
                <div className="md:col-span-3 order-3 md:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=400" 
                    alt="Growing community" 
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
                <div className="md:col-span-1 flex justify-center order-1 md:order-2">
                  <div className="w-2 h-full bg-artisan-clay hidden md:block"></div>
                  <div className="w-16 h-16 rounded-full bg-artisan-clay flex items-center justify-center text-white font-bold text-xl">4</div>
                </div>
                <div className="md:col-span-3 order-2 md:order-3">
                  <span className="inline-block px-3 py-1 bg-artisan-sand text-artisan-stone text-sm font-medium rounded-full mb-2">
                    Present
                  </span>
                  <h3 className="text-2xl font-serif mb-4">Growing Our Community</h3>
                  <p className="text-muted-foreground mb-4">
                    Today, Artisanal represents over 50 artisans from Legazpi City and surrounding regions, offering hundreds of unique products. We've expanded our educational initiatives and advocacy work for sustainable crafting practices.
                  </p>
                  <p className="text-muted-foreground">
                    Our artisans have seen an average income increase of 40%, allowing many to make crafting their full-time profession again and train the next generation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="py-16 md:py-24 bg-artisan-cream">
          <div className="artisan-container">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
                Why We Exist
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                Our Mission & Values
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-balance">
                At the heart of everything we do is a commitment to preserving cultural heritage 
                while empowering local communities through sustainable economic opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="w-16 h-16 rounded-full bg-artisan-stone/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-artisan-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-3">Preserve Cultural Heritage</h3>
                <p className="text-muted-foreground">
                  We're dedicated to documenting and preserving traditional crafting techniques that are at risk of being lost to modernization. Each product sold includes educational content about its cultural significance.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="w-16 h-16 rounded-full bg-artisan-stone/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-artisan-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-3">Economic Empowerment</h3>
                <p className="text-muted-foreground">
                  We ensure our artisans receive fair compensation for their work, helping transform traditional crafts from a struggling profession into a sustainable livelihood that can support families and communities.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="w-16 h-16 rounded-full bg-artisan-stone/10 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-artisan-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-3">Environmental Responsibility</h3>
                <p className="text-muted-foreground">
                  We prioritize sustainable materials and production methods, working with artisans to incorporate eco-friendly practices without compromising traditional techniques or the quality of their creations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="artisan-container">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
                Meet The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                The People Behind Artisanal
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-balance">
                Our diverse team brings together expertise in craftsmanship, design, 
                technology, and cultural preservation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="mb-4 aspect-square overflow-hidden rounded-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300" 
                    alt="Isabella Santos" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-medium">Isabella Santos</h3>
                <p className="text-artisan-accent mb-2">Founder & CEO</p>
                <p className="text-muted-foreground text-sm">
                  A Legazpi native with a passion for preserving local craftsmanship.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="mb-4 aspect-square overflow-hidden rounded-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=300&h=300" 
                    alt="Miguel Reyes" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-medium">Miguel Reyes</h3>
                <p className="text-artisan-accent mb-2">Artisan Relations</p>
                <p className="text-muted-foreground text-sm">
                  Former craftsman who now helps artisans develop and market their products.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="mb-4 aspect-square overflow-hidden rounded-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300&h=300" 
                    alt="Sophia Cruz" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-medium">Sophia Cruz</h3>
                <p className="text-artisan-accent mb-2">Creative Director</p>
                <p className="text-muted-foreground text-sm">
                  Brings 15 years of experience in design and sustainable product development.
                </p>
              </div>
              
              {/* Team Member 4 */}
              <div className="text-center">
                <div className="mb-4 aspect-square overflow-hidden rounded-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300" 
                    alt="Gabriel Lim" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-medium">Gabriel Lim</h3>
                <p className="text-artisan-accent mb-2">Technology & Operations</p>
                <p className="text-muted-foreground text-sm">
                  Ensures our platform runs smoothly while developing new features.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-artisan-cream">
          <div className="artisan-container">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-artisan-accent tracking-wider uppercase">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-balance">
                Have questions about our products, interested in becoming an artisan, or want to learn more about our mission? We'd love to hear from you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-serif mb-6">Send Us a Message</h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-artisan-stone hover:bg-artisan-forest text-white">
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-serif mb-6">Our Location</h3>
                  <div className="aspect-video rounded-xl overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1627894475997-832953bd5ac6?auto=format&fit=crop&q=80&w=600&h=340" 
                      alt="Map of Legazpi City" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-artisan-accent mt-1 mr-3 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      123 Mayon Avenue<br />
                      Legazpi City, Albay<br />
                      Philippines 4500
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-serif mb-4">Contact Information</h3>
                  
                  <div className="flex items-center">
                    <Mail className="text-artisan-accent mr-3 flex-shrink-0" />
                    <a href="mailto:hello@artisanal.ph" className="text-muted-foreground hover:text-artisan-accent transition-colors">
                      hello@artisanal.ph
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="text-artisan-accent mr-3 flex-shrink-0" />
                    <a href="tel:+639123456789" className="text-muted-foreground hover:text-artisan-accent transition-colors">
                      +63 912 345 6789
                    </a>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Operating Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
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

export default About;
