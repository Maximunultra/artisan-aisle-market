
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MessageCircle, Phone } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the message to the backend
      console.log("Form values:", values);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: "Message sent successfully!",
        description: "We will get back to you as soon as possible.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      // Show error toast
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="artisan-container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products or want to connect directly with our artisans? 
              We're here to help you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="space-y-6">
                <div className="bg-artisan-sand/30 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-artisan-accent mr-3 mt-1" />
                      <div>
                        <span className="block font-medium">Phone</span>
                        <span className="text-muted-foreground">+63 945 123 4567</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-artisan-accent mr-3 mt-1" />
                      <div>
                        <span className="block font-medium">Email</span>
                        <span className="text-muted-foreground">contact@artisanmarketplace.ph</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageCircle className="h-5 w-5 text-artisan-accent mr-3 mt-1" />
                      <div>
                        <span className="block font-medium">Social Media</span>
                        <div className="flex gap-2 mt-1">
                          <a href="#" className="text-artisan-stone hover:text-artisan-accent">Facebook</a>
                          <a href="#" className="text-artisan-stone hover:text-artisan-accent">Instagram</a>
                          <a href="#" className="text-artisan-stone hover:text-artisan-accent">Twitter</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-artisan-sand/30 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
                <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter message subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your message here..." 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide as much detail as possible so we can best assist you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-artisan-stone hover:bg-artisan-forest w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          {/* Map or Additional Information Section */}
          <div className="mt-12 p-8 bg-artisan-sand/20 rounded-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif">Visit Our Marketplace</h2>
              <p className="text-muted-foreground">
                Experience the beauty of handcrafted products in person at our physical marketplace in Legazpi City.
              </p>
            </div>
            
            <div className="bg-gray-300 h-80 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map placeholder - In a real app, this would be an embedded map.</p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="font-medium">Artisan Marketplace</p>
              <p className="text-muted-foreground">123 Crafts Avenue, Legazpi City, Albay, Philippines</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Contact;
