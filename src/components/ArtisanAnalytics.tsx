
import React, { useState } from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Package, Users, CreditCard, TrendingUp } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for the analytics
const productSalesData = [
  { name: 'Hand-woven Abaca Bag', sales: 12, stock: 5, revenue: 14400 },
  { name: 'Ceramic Vase', sales: 8, stock: 8, revenue: 14800 },
  { name: 'Woven Basket', sales: 15, stock: 2, revenue: 9000 },
  { name: 'Handmade Soap', sales: 20, stock: 15, revenue: 8000 },
  { name: 'Coconut Shell Bowl', sales: 6, stock: 4, revenue: 4800 },
];

const monthlySalesData = [
  { name: 'Jan', sales: 4, revenue: 6400 },
  { name: 'Feb', sales: 6, revenue: 8200 },
  { name: 'Mar', sales: 8, revenue: 12000 },
  { name: 'Apr', sales: 12, revenue: 16500 },
  { name: 'May', sales: 16, revenue: 21000 },
  { name: 'Jun', sales: 14, revenue: 18400 },
];

const customerData = [
  { name: 'New', value: 25 },
  { name: 'Returning', value: 45 },
  { name: 'Inactive', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const StatsCard = ({ title, value, subtitle, icon: Icon, trend = null }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </CardContent>
    {trend && (
      <CardFooter className="p-2">
        <Badge variant={trend.type === 'increase' ? 'default' : 'destructive'} className="text-xs">
          <TrendingUp className="mr-1 h-3 w-3" />
          {trend.value}% from last month
        </Badge>
      </CardFooter>
    )}
  </Card>
);

const ProductsTable = ({ data }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Product Name</TableHead>
        <TableHead className="text-right">Stock</TableHead>
        <TableHead className="text-right">Sales</TableHead>
        <TableHead className="text-right">Revenue</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((product) => (
        <TableRow key={product.name}>
          <TableCell className="font-medium">{product.name}</TableCell>
          <TableCell className="text-right">
            <Badge variant={product.stock <= 3 ? "destructive" : "outline"}>
              {product.stock}
            </Badge>
          </TableCell>
          <TableCell className="text-right">{product.sales}</TableCell>
          <TableCell className="text-right">₱{product.revenue.toLocaleString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const chartConfig = {
  sales: {
    label: "Sales",
    theme: {
      light: "#8B5CF6",
      dark: "#8B5CF6",
    },
  },
  stock: {
    label: "Stock",
    theme: {
      light: "#F97316",
      dark: "#F97316",
    },
  },
  revenue: {
    label: "Revenue",
    theme: {
      light: "#0EA5E9",
      dark: "#0EA5E9",
    },
  },
};

const ArtisanAnalytics = () => {
  const [analyticView, setAnalyticView] = useState("overview");
  
  // Calculate overall statistics
  const totalSales = productSalesData.reduce((sum, product) => sum + product.sales, 0);
  const totalRevenue = productSalesData.reduce((sum, product) => sum + product.revenue, 0);
  const totalStock = productSalesData.reduce((sum, product) => sum + product.stock, 0);
  const lowStockItems = productSalesData.filter(product => product.stock <= 3).length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Analytics Dashboard</h2>
        
        <Tabs value={analyticView} onValueChange={setAnalyticView} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Sales" 
          value={totalSales} 
          subtitle="All time product sales" 
          icon={CreditCard}
          trend={{ type: 'increase', value: 12 }}
        />
        <StatsCard 
          title="Revenue" 
          value={`₱${totalRevenue.toLocaleString()}`} 
          subtitle="Total earnings" 
          icon={TrendingUp}
          trend={{ type: 'increase', value: 8 }}
        />
        <StatsCard 
          title="Total Stock" 
          value={totalStock} 
          subtitle="Units in inventory" 
          icon={Package}
        />
        <StatsCard 
          title="Customers" 
          value="80" 
          subtitle="Active buyers" 
          icon={Users}
          trend={{ type: 'increase', value: 5 }}
        />
      </div>
      
      <TabsContent value="overview" className="space-y-6">
        {/* Monthly Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
            <CardDescription>The trend of your sales over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="sales" 
                  name="sales" 
                  stroke="var(--color-sales)" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  name="revenue" 
                  stroke="var(--color-revenue)" 
                />
                <ChartLegend />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Table of products */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Sales and stock levels for your products</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductsTable data={productSalesData} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="products" className="space-y-6">
        {/* Product Sales Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Product Sales Comparison</CardTitle>
            <CardDescription>Compare sales across your products</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={productSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" name="sales" fill="var(--color-sales)" />
                <ChartLegend />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Product Stock Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Product Stock Levels</CardTitle>
            <CardDescription>Current inventory for each product</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={productSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="stock" name="stock" fill="var(--color-stock)" />
                <ChartLegend />
              </BarChart>
            </ChartContainer>
          </CardContent>
          {lowStockItems > 0 && (
            <CardFooter>
              <Badge variant="destructive">
                {lowStockItems} {lowStockItems === 1 ? 'product' : 'products'} with low stock!
              </Badge>
            </CardFooter>
          )}
        </Card>
      </TabsContent>
      
      <TabsContent value="customers" className="space-y-6">
        {/* Customer Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution of your customer types</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Customers (could expand this with a table of recent customer transactions) */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
            <CardDescription>Summary of customer activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Returning customer rate</span>
                <span className="text-sm font-medium">56%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average order value</span>
                <span className="text-sm font-medium">₱875</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">New customers (this month)</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Customer satisfaction</span>
                <span className="text-sm font-medium">4.8/5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default ArtisanAnalytics;
