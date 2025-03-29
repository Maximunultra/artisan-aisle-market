
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

// Sample data for charts
const monthlySalesData = [
  { name: 'Jan', artisanSales: 4000, customerOrders: 2400 },
  { name: 'Feb', artisanSales: 3000, customerOrders: 1398 },
  { name: 'Mar', artisanSales: 2000, customerOrders: 9800 },
  { name: 'Apr', artisanSales: 2780, customerOrders: 3908 },
  { name: 'May', artisanSales: 1890, customerOrders: 4800 },
  { name: 'Jun', artisanSales: 2390, customerOrders: 3800 },
  { name: 'Jul', artisanSales: 3490, customerOrders: 4300 },
];

const userGrowthData = [
  { name: 'Jan', artisans: 20, customers: 140 },
  { name: 'Feb', artisans: 25, customers: 180 },
  { name: 'Mar', artisans: 35, customers: 240 },
  { name: 'Apr', artisans: 45, customers: 320 },
  { name: 'May', artisans: 50, customers: 390 },
  { name: 'Jun', artisans: 62, customers: 480 },
  { name: 'Jul', artisans: 78, customers: 590 },
];

const productCategoryData = [
  { name: 'Textiles', value: 400 },
  { name: 'Pottery', value: 300 },
  { name: 'Baskets', value: 300 },
  { name: 'Jewelry', value: 200 },
  { name: 'Woodcrafts', value: 150 },
];

const ecoRequestsData = [
  { name: 'Jan', approved: 40, rejected: 20, pending: 5 },
  { name: 'Feb', approved: 30, rejected: 15, pending: 12 },
  { name: 'Mar', approved: 50, rejected: 10, pending: 8 },
  { name: 'Apr', approved: 70, rejected: 25, pending: 15 },
  { name: 'May', approved: 85, rejected: 20, pending: 10 },
  { name: 'Jun', approved: 95, rejected: 15, pending: 5 },
  { name: 'Jul', approved: 110, rejected: 10, pending: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const chartConfig = {
  sales: {
    artisanSales: { label: "Artisan Sales", color: "#8884d8" },
    customerOrders: { label: "Customer Orders", color: "#82ca9d" },
  },
  users: {
    artisans: { label: "Artisans", color: "#8884d8" },
    customers: { label: "Customers", color: "#82ca9d" },
  },
  ecoRequests: {
    approved: { label: "Approved", color: "#82ca9d" },
    rejected: { label: "Rejected", color: "#ff8042" },
    pending: { label: "Pending", color: "#ffc658" },
  }
};

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Sample summary metrics
  const summaryMetrics = {
    totalSales: 'P521,240',
    salesGrowth: '+12.5%',
    totalUsers: '1,428',
    userGrowth: '+24.3%',
    totalArtisans: '78',
    artisanGrowth: '+15.8%',
    totalOrders: '3,582',
    orderGrowth: '+18.2%'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales & Orders</CardTitle>
            <CardDescription>Monthly breakdown of artisan sales and customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={chartConfig.sales}
                className="w-full aspect-[4/3]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySalesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="artisanSales" fill={chartConfig.sales.artisanSales.color} name="Artisan Sales" />
                    <Bar dataKey="customerOrders" fill={chartConfig.sales.customerOrders.color} name="Customer Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly growth of artisans and customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={chartConfig.users}
                className="w-full aspect-[4/3]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="artisans" 
                      stroke={chartConfig.users.artisans.color} 
                      activeDot={{ r: 8 }} 
                      name="Artisans"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="customers" 
                      stroke={chartConfig.users.customers.color} 
                      name="Customers"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution of products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Eco Request Trends */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Eco-Friendly Requests</CardTitle>
            <CardDescription>Monthly trends of eco-friendly badge requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={chartConfig.ecoRequests}
                className="w-full aspect-[4/3]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ecoRequestsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="approved" stackId="a" fill={chartConfig.ecoRequests.approved.color} name="Approved" />
                    <Bar dataKey="rejected" stackId="a" fill={chartConfig.ecoRequests.rejected.color} name="Rejected" />
                    <Bar dataKey="pending" stackId="a" fill={chartConfig.ecoRequests.pending.color} name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
