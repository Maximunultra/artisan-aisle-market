
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Users, ShoppingCart } from 'lucide-react';

const SummaryCards = ({ summaryMetrics, timeRange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">{summaryMetrics.totalSales}</div>
            <div className="text-xs text-green-500 flex items-center">
              {summaryMetrics.salesGrowth} <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            {timeRange === 'monthly' ? 'vs last month' : timeRange === 'yearly' ? 'vs last year' : 'vs previous period'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">{summaryMetrics.totalUsers}</div>
            <div className="text-xs text-green-500 flex items-center">
              {summaryMetrics.userGrowth} <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            {timeRange === 'monthly' ? 'vs last month' : timeRange === 'yearly' ? 'vs last year' : 'vs previous period'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Artisans</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">{summaryMetrics.totalArtisans}</div>
            <div className="text-xs text-green-500 flex items-center">
              {summaryMetrics.artisanGrowth} <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            {timeRange === 'monthly' ? 'vs last month' : timeRange === 'yearly' ? 'vs last year' : 'vs previous period'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">{summaryMetrics.totalOrders}</div>
            <div className="text-xs text-green-500 flex items-center">
              {summaryMetrics.orderGrowth} <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">
            {timeRange === 'monthly' ? 'vs last month' : timeRange === 'yearly' ? 'vs last year' : 'vs previous period'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
