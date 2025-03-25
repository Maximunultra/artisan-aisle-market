
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types/CartItem";
import CheckoutForm from '@/components/CheckoutForm';

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before checkout.",
      });
    }
  }, [cartItems, navigate, toast]);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;
  
  const handleCheckout = (values: any) => {
    console.log("Order details:", { orderItems: cartItems, customer: values, total });
    
    // Show success message
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to a success page or home
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="artisan-container">
          <div className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Checkout</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete your order by providing your delivery and payment details
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
                <CheckoutForm onSubmit={handleCheckout} />
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="mb-4">
                  <ul className="divide-y divide-artisan-sand/50 mb-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">₱{(item.price * item.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/cart" className="text-artisan-stone hover:text-artisan-accent text-sm font-medium inline-flex items-center transition-colors mb-4">
                    <ChevronRight className="mr-1 h-3 w-3 rotate-180" />
                    Edit cart
                  </Link>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₱{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>₱{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-artisan-sand/50 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-artisan-accent">₱{total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      (Inclusive of VAT where applicable)
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Delivery is available only within Legazpi City.</p>
                  <p className="mt-1">Your order will typically be delivered within 2-3 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Checkout;
