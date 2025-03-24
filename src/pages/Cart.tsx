
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Hand-woven Abaca Bag",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Maria Santos",
    quantity: 1,
  },
  {
    id: 2,
    name: "Ceramic Vase with Bicol Patterns",
    price: 1850,
    image: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700",
    artisan: "Pedro Reyes",
    quantity: 2,
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();
  
  const updateItemQuantity = (id: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;
  
  const handleCheckout = () => {
    toast({
      title: "Processing checkout",
      description: "Redirecting to payment options...",
    });
    // In a real application, this would navigate to checkout page
    console.log("Proceeding to checkout", cartItems);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="artisan-container">
          <div className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Your Cart</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Review your selected items before proceeding to checkout
            </p>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-artisan-sand/50">
                    <h2 className="text-lg font-medium">Shopping Cart ({cartItems.length} items)</h2>
                  </div>
                  
                  <ul className="divide-y divide-artisan-sand/50">
                    {cartItems.map((item) => (
                      <li key={item.id} className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-grow text-center sm:text-left">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">By {item.artisan}</p>
                            <p className="text-artisan-accent font-semibold mt-1">₱{item.price.toLocaleString()}</p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateItemQuantity(item.id, -1)}
                              className="text-artisan-stone hover:text-artisan-accent transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <MinusCircle size={20} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateItemQuantity(item.id, 1)}
                              className="text-artisan-stone hover:text-artisan-accent transition-colors"
                              aria-label="Increase quantity"
                            >
                              <PlusCircle size={20} />
                            </button>
                          </div>
                          
                          {/* Item Total & Remove */}
                          <div className="flex flex-col items-center sm:items-end gap-2">
                            <span className="font-semibold">₱{(item.price * item.quantity).toLocaleString()}</span>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors"
                            >
                              <Trash2 size={16} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="p-4 bg-artisan-cream/20">
                    <Link to="/products" className="text-artisan-stone hover:text-artisan-accent text-sm font-medium inline-flex items-center transition-colors">
                      <ChevronRight className="mr-1 h-3 w-3 rotate-180" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
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
                  
                  <Button 
                    className="w-full bg-artisan-stone hover:bg-artisan-forest"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Delivery is available only within Legazpi City.</p>
                    <p className="mt-1">We accept: GCash, Maya, Bank Transfer, and Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <ShoppingBag size={64} className="text-artisan-sand" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products">
                <Button className="bg-artisan-stone hover:bg-artisan-forest">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Cart;
