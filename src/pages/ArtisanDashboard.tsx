
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Package, Users, CreditCard, Megaphone, PlusCircle, Edit, Trash2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArtisanProducts from '@/components/ArtisanProducts';
import ArtisanPromotions from '@/components/ArtisanPromotions';
import ArtisanMessages from '@/components/ArtisanMessages';
import ArtisanOrders from '@/components/ArtisanOrders';

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="artisan-container">
          <div className="my-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Artisan Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl">
              Manage your products, promotions, orders, and connect with customers
            </p>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package size={16} />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <CreditCard size={16} />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="promotions" className="flex items-center gap-2">
                <Megaphone size={16} />
                <span>Promotions</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <Users size={16} />
                <span>Messages</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <ArtisanProducts />
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders">
              <ArtisanOrders />
            </TabsContent>
            
            {/* Promotions Tab */}
            <TabsContent value="promotions">
              <ArtisanPromotions />
            </TabsContent>
            
            {/* Messages Tab */}
            <TabsContent value="messages">
              <ArtisanMessages />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArtisanDashboard;
