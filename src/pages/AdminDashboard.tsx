
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AdminArtisanMonitoring } from "@/components/AdminArtisanMonitoring";
import { AdminCustomerMonitoring } from "@/components/AdminCustomerMonitoring";
import { AdminEcoFriendlyApprovals } from "@/components/AdminEcoFriendlyApprovals";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage artisans, customers, and eco-friendly badges</p>
      </header>

      <Tabs defaultValue="artisans" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="artisans">Artisans</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="eco-badges">
            Eco-Friendly Approvals
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
