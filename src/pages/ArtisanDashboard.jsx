
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Package, Users, CreditCard, Megaphone, BarChart } from 'lucide-react';
import ArtisanProducts from '../components/ArtisanProducts';
import ArtisanPromotions from '../components/ArtisanPromotions';
import ArtisanMessages from '../components/ArtisanMessages';
import ArtisanOrders from '../components/ArtisanOrders';
import ArtisanAnalytics from '../components/ArtisanAnalytics'; 
import { useIsMobile } from '../hooks/use-mobile';

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 pb-8 md:pb-12">
        <div className="artisan-container px-3 md:px-4">
          <div className="my-6 md:my-12">
            <h1 className="text-3xl md:text-5xl font-serif mb-2 md:mb-4">Artisan Dashboard</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Manage your products, promotions, orders, and connect with customers
            </p>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4 md:space-y-6"
          >
            <TabsList className={`grid ${isMobile ? 'grid-cols-2 gap-1' : 'md:grid-cols-5 gap-2'} w-full`}>
              <TabsTrigger value="products" className="flex items-center justify-center md:justify-start gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-1.5">
                <Package size={isMobile ? 14 : 16} />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center justify-center md:justify-start gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-1.5">
                <CreditCard size={isMobile ? 14 : 16} />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="promotions" className="flex items-center justify-center md:justify-start gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-1.5">
                <Megaphone size={isMobile ? 14 : 16} />
                <span>Promotions</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center justify-center md:justify-start gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-1.5">
                <Users size={isMobile ? 14 : 16} />
                <span>Messages</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center justify-center md:justify-start gap-1 md:gap-2 text-xs md:text-sm py-1 md:py-1.5">
                <BarChart size={isMobile ? 14 : 16} />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Tab Content Sections */}
            <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
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
              
              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <ArtisanAnalytics />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArtisanDashboard;
