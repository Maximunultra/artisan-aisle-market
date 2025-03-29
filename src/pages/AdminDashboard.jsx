
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AdminArtisanMonitoring } from "@/components/AdminArtisanMonitoring";
import { AdminCustomerMonitoring } from "@/components/AdminCustomerMonitoring";
import { AdminEcoFriendlyApprovals } from "@/components/AdminEcoFriendlyApprovals";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { BarChart, Users, BadgeCheck, LineChart } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("artisans");
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage artisans, customers, eco-friendly badges, and view analytics</p>
      </header>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="artisans" className="flex items-center gap-2">
            <Users size={16} /> 
            <span>Artisans</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users size={16} />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="eco-badges" className="flex items-center gap-2">
            <BadgeCheck size={16} />
            <span>Eco-Friendly</span>
            <Badge variant="secondary" className="ml-2">New</Badge>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart size={16} />
            <span>Analytics</span>
            <Badge variant="secondary" className="ml-2">New</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="artisans">
          <AdminArtisanMonitoring />
        </TabsContent>
        <TabsContent value="customers">
          <AdminCustomerMonitoring />
        </TabsContent>
        <TabsContent value="eco-badges">
          <AdminEcoFriendlyApprovals />
        </TabsContent>
        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
