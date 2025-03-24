
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Package, MessageSquare, Settings, PlusCircle, Edit, ChevronRight, Truck } from 'lucide-react';

// Sample user data for the profile
const user = {
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  phone: "+63 912 345 6789",
  address: "123 Mayon St., Legazpi City, Albay",
  type: "artisan", // or "buyer"
  joinDate: "January 15, 2023",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

// Sample order data
const orders = [
  {
    id: "ORD-001-2023",
    date: "March 18, 2023",
    total: 3050,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-002-2023",
    date: "March 23, 2023",
    total: 1200,
    status: "Processing",
    items: 1,
  }
];

// Sample products data (for artisan)
const myProducts = [
  {
    id: 1,
    name: "Hand-woven Abaca Bag",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700",
    inventory: 5,
    sales: 12,
    isEcoFriendly: true,
  },
  {
    id: 2,
    name: "Ceramic Vase with Bicol Patterns",
    price: 1850,
    image: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700",
    inventory: 8,
    sales: 4,
    isEcoFriendly: false,
  }
];

// Sample messages
const messages = [
  {
    id: 1,
    from: "Maria Santos",
    preview: "Hello! I was wondering if you have any other colors available for the ceramic vase?",
    date: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    from: "Customer Support",
    preview: "Your product has been approved and is now listed on the marketplace.",
    date: "Yesterday",
    unread: false,
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="artisan-container">
          <div className="my-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">My Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl">
              {user.type === "artisan" 
                ? "Manage your products, orders, and seller profile"
                : "Manage your orders, profile, and settings"}
            </p>
          </div>
          
          {/* User Profile Overview */}
          <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-artisan-sand flex-shrink-0">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-medium">{user.name}</h2>
                <p className="text-muted-foreground">{user.email} · {user.phone}</p>
                <p className="text-muted-foreground">{user.address}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="text-xs py-1 px-2 bg-artisan-sand/50 rounded-full">
                    {user.type === "artisan" ? "Verified Artisan" : "Buyer"}
                  </span>
                  <span className="text-xs py-1 px-2 bg-artisan-sand/50 rounded-full">
                    Member since {user.joinDate}
                  </span>
                </div>
              </div>
              
              <div className="md:ml-auto">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-artisan-clay"
                >
                  <Settings size={16} />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag size={16} />
                <span>My Orders</span>
              </TabsTrigger>
              {user.type === "artisan" ? (
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package size={16} />
                  <span>My Products</span>
                </TabsTrigger>
              ) : (
                <TabsTrigger value="favorites" className="flex items-center gap-2">
                  <Package size={16} />
                  <span>Favorites</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span>Messages</span>
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-2">
                <Truck size={16} />
                <span>Order Tracking</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-medium">Your Orders</h2>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-grow md:flex-grow-0 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input 
                      type="text" 
                      placeholder="Search orders..." 
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-artisan-clay text-sm"
                    />
                  </div>
                  
                  <select className="border border-input rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-artisan-clay text-sm">
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              {orders.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-artisan-sand/50">
                    <thead>
                      <tr className="bg-artisan-sand/20">
                        <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Items</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-artisan-sand/50">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="py-4 px-4 text-sm font-medium">{order.id}</td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{order.date}</td>
                          <td className="py-4 px-4 text-sm">₱{order.total.toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{order.items} items</td>
                          <td className="py-4 px-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 text-xs">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-center mb-4">
                    <ShoppingBag size={64} className="text-artisan-sand" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't placed any orders yet.
                  </p>
                  <Button className="bg-artisan-stone hover:bg-artisan-forest">
                    Start Shopping
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Products Tab (For Artisans) */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-medium">Your Products</h2>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-grow md:flex-grow-0 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-artisan-clay text-sm"
                    />
                  </div>
                  
                  <Button className="bg-artisan-stone hover:bg-artisan-forest">
                    <PlusCircle size={16} className="mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>
              
              {myProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex">
                      {/* Product Image */}
                      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="p-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium line-clamp-1">{product.name}</h3>
                            <p className="text-artisan-accent font-semibold mt-1">₱{product.price.toLocaleString()}</p>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 text-xs">
                                <Edit size={14} className="mr-1" />
                                Edit
                              </Button>
                            </div>
                            
                            {product.isEcoFriendly && (
                              <span className="text-xs py-0.5 px-1.5 bg-green-100 text-green-800 rounded-full mt-2">
                                Eco-Friendly
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Inventory:</span>{" "}
                            <span className="font-medium">{product.inventory} units</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total Sales:</span>{" "}
                            <span className="font-medium">{product.sales} units</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-center mb-4">
                    <Package size={64} className="text-artisan-sand" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No products listed</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't listed any products yet.
                  </p>
                  <Button className="bg-artisan-stone hover:bg-artisan-forest">
                    <PlusCircle size={16} className="mr-2" />
                    Add Your First Product
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Your Messages</h2>
              </div>
              
              {messages.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <ul className="divide-y divide-artisan-sand/50">
                    {messages.map((message) => (
                      <li key={message.id} className="p-4 hover:bg-artisan-sand/10 transition-colors">
                        <a href="#" className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium flex items-center">
                              {message.unread && (
                                <span className="w-2 h-2 bg-artisan-accent rounded-full mr-2" />
                              )}
                              {message.from}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                              {message.preview}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">{message.date}</span>
                            <ChevronRight size={16} className="text-muted-foreground" />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-center mb-4">
                    <MessageSquare size={64} className="text-artisan-sand" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No messages</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any messages yet.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Order Tracking Tab */}
            <TabsContent value="tracking" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Order Tracking</h2>
              </div>
              
              {orders.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Enter Order ID</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="e.g., ORD-001-2023" 
                        className="flex-grow px-4 py-2 border border-input rounded-l-md focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                      />
                      <Button className="rounded-l-none bg-artisan-stone hover:bg-artisan-forest">
                        Track Order
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Your Recent Orders</h3>
                    <ul className="space-y-4">
                      {orders.map((order) => (
                        <li key={order.id} className="border border-artisan-sand/50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h4 className="font-medium">{order.id}</h4>
                              <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Total:</span>{" "}
                              <span className="font-medium">₱{order.total.toLocaleString()}</span>
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-xs border-artisan-clay">
                              Track Details
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-center mb-4">
                    <Truck size={64} className="text-artisan-sand" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No orders to track</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any orders to track yet.
                  </p>
                  <Button className="bg-artisan-stone hover:bg-artisan-forest">
                    Start Shopping
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
