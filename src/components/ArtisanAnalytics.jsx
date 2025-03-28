
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Sector, Treemap,
  Area, AreaChart, ComposedChart
} from 'recharts';
import { Calendar, ArrowDownUp, ChevronDown, ArrowUpRight, Download, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

// Sample analytics data
const salesData = [
  { month: 'Jan', sales: 5000, orders: 45, avg: 111 },
  { month: 'Feb', sales: 7500, orders: 60, avg: 125 },
  { month: 'Mar', sales: 4000, orders: 35, avg: 114 },
  { month: 'Apr', sales: 6800, orders: 55, avg: 124 },
  { month: 'May', sales: 9000, orders: 75, avg: 120 },
  { month: 'Jun', sales: 10500, orders: 80, avg: 131 },
];

const quarterData = [
  { quarter: 'Q1', revenue: 16500, costs: 8250, profit: 8250 },
  { quarter: 'Q2', revenue: 26300, costs: 10520, profit: 15780 },
];

const productSalesData = [
  { name: 'Abaca Bags', sales: 120, stock: 35, revenue: 144000 },
  { name: 'Ceramic Vases', sales: 85, stock: 42, revenue: 157250 },
  { name: 'Wooden Crafts', sales: 65, stock: 28, revenue: 48750 },
  { name: 'Textile Art', sales: 43, stock: 15, revenue: 38700 },
  { name: 'Jewelry', sales: 78, stock: 22, revenue: 93600 },
];

const customerData = {
  demographics: [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 25 },
    { name: '45-54', value: 15 },
    { name: '55+', value: 10 },
  ],
  satisfaction: {
    overall: 4.7,
    ratings: [
      { name: '5 ★', value: 65 },
      { name: '4 ★', value: 25 },
      { name: '3 ★', value: 7 },
      { name: '2 ★', value: 2 },
      { name: '1 ★', value: 1 },
    ]
  }
};

const weeklyVisitors = [
  { name: 'Mon', visitors: 120 },
  { name: 'Tue', visitors: 145 },
  { name: 'Wed', visitors: 135 },
  { name: 'Thu', visitors: 170 },
  { name: 'Fri', visitors: 190 },
  { name: 'Sat', visitors: 250 },
  { name: 'Sun', visitors: 220 },
];

const regionSales = [
  { name: 'Luzon', value: 55 },
  { name: 'Visayas', value: 25 },
  { name: 'Mindanao', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props) => {
  const { 
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, 
    fill, payload, value 
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

// Customer Funnel Data
const funnelData = [
  { name: 'Visitors', value: 5000 },
  { name: 'Product Views', value: 3500 },
  { name: 'Add to Cart', value: 2200 },
  { name: 'Checkout', value: 1500 },
  { name: 'Purchases', value: 1000 },
];

// Cost vs Profit Data
const financialData = [
  { name: 'Jan', cost: 3000, profit: 2000 },
  { name: 'Feb', cost: 4000, profit: 3500 },
  { name: 'Mar', cost: 2500, profit: 1500 },
  { name: 'Apr', cost: 3800, profit: 3000 },
  { name: 'May', cost: 5000, profit: 4000 },
  { name: 'Jun', cost: 6000, profit: 4500 },
];

// Age Distribution Data
const ageData = [
  { name: '18-24', users: 120 },
  { name: '25-34', users: 380 },
  { name: '35-44', users: 250 },
  { name: '45-54', users: 180 },
  { name: '55-64', users: 120 },
  { name: '65+', users: 80 },
];

// Regional Sales Data for Map Chart
const regionalSalesData = [
  { name: 'Metro Manila', value: 10000 },
  { name: 'Calabarzon', value: 7500 },
  { name: 'Central Luzon', value: 5000 },
  { name: 'Western Visayas', value: 4000 },
  { name: 'Central Visayas', value: 3500 },
  { name: 'Davao Region', value: 3000 },
  { name: 'Northern Mindanao', value: 2500 },
  { name: 'Other Regions', value: 8000 },
];

// Visual configuration for charts
const chartConfig = {
  barChart: {
    colors: {
      sales: '#8884d8',
      orders: '#82ca9d',
      avg: '#ffc658'
    }
  },
  lineChart: {
    colors: {
      visitors: '#8884d8'
    }
  },
  pieChart: {
    colors: COLORS
  },
  regionalChart: {
    colors: {
      luzon: '#0088FE',
      visayas: '#00C49F',
      mindanao: '#FFBB28'
    }
  },
};

const CustomizedTreemapContent = (props) => {
  const { x, y, width, height, index, depth, payload } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? COLORS[index % COLORS.length] : 'transparent',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {width > 50 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={14}
        >
          {payload.name}
        </text>
      )}
      {width > 50 && height > 50 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={12}
        >
          ₱{payload.revenue?.toLocaleString()}
        </text>
      )}
    </g>
  );
};

const ArtisanAnalytics = () => {
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [isDateRangeSelectorOpen, setIsDateRangeSelectorOpen] = useState(false);
  const [isPeriodDialogOpen, setIsPeriodDialogOpen] = useState(false);
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  
  const onRegionPieEnter = (_, index) => {
    setActiveRegionIndex(index);
  };
  
  // Calculate some metrics
  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const conversionRate = 5.4; // Example - would be calculated from actual data
  
  // Period change modal
  const handleOpenPeriodDialog = () => {
    setIsPeriodDialogOpen(true);
  };
  
  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-medium">Analytics Overview</h2>
          <p className="text-muted-foreground">Track your store's performance and growth</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Popover open={isFilterPopoverOpen} onOpenChange={setIsFilterPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Filter Analytics</h3>
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="product-category">Product Category</label>
                  <select id="product-category" className="w-full p-2 border rounded-md">
                    <option value="all">All Categories</option>
                    <option value="bags">Bags</option>
                    <option value="ceramics">Ceramics</option>
                    <option value="textiles">Textiles</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm" htmlFor="price-range">Price Range</label>
                  <div className="flex items-center gap-2">
                    <Input id="min-price" placeholder="Min" className="w-1/2" />
                    <span>to</span>
                    <Input id="max-price" placeholder="Max" className="w-1/2" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsFilterPopoverOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" className="bg-artisan-stone hover:bg-artisan-forest">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={isDateRangeSelectorOpen} onOpenChange={setIsDateRangeSelectorOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{dateRange}</span>
                <ChevronDown size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="space-y-2 p-4">
                <h3 className="font-medium">Select Date Range</h3>
                <div className="space-y-1">
                  {["Today", "Yesterday", "Last 7 days", "Last 30 days", "This Month", "Last Month", "Custom Range"].map((range) => (
                    <div 
                      key={range} 
                      className={`px-3 py-2 rounded-md cursor-pointer transition-colors hover:bg-muted ${
                        dateRange === range ? 'bg-muted' : ''
                      }`}
                      onClick={() => {
                        setDateRange(range);
                        if (range === "Custom Range") {
                          handleOpenPeriodDialog();
                        }
                        setIsDateRangeSelectorOpen(false);
                      }}
                    >
                      {range}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Revenue</h3>
            <HoverCard>
              <HoverCardTrigger asChild>
                <ArrowUpRight size={18} className="text-green-600" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex flex-col space-y-1 p-2">
                  <h4 className="font-semibold">Revenue Growth</h4>
                  <p className="text-sm text-muted-foreground">
                    Revenue has increased by 24% compared to the previous period.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">₱{totalRevenue.toLocaleString()}</span>
            <span className="text-xs text-green-600 font-medium bg-green-100 rounded-full px-2 py-0.5">+24%</span>
          </div>
          <div className="h-10 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Orders</h3>
            <HoverCard>
              <HoverCardTrigger asChild>
                <ArrowUpRight size={18} className="text-green-600" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex flex-col space-y-1 p-2">
                  <h4 className="font-semibold">Order Metrics</h4>
                  <p className="text-sm text-muted-foreground">
                    Orders have increased by 18% compared to the previous period.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{totalOrders}</span>
            <span className="text-xs text-green-600 font-medium bg-green-100 rounded-full px-2 py-0.5">+18%</span>
          </div>
          <div className="h-10 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Area type="monotone" dataKey="orders" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Avg Order Value */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Avg. Order Value</h3>
            <ArrowDownUp size={18} className="text-gray-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">₱{avgOrderValue.toFixed(0)}</span>
            <span className="text-xs text-green-600 font-medium bg-green-100 rounded-full px-2 py-0.5">+5%</span>
          </div>
          <div className="h-10 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Area type="monotone" dataKey="avg" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-muted-foreground text-sm font-medium">Conversion Rate</h3>
            <ArrowUpRight size={18} className="text-green-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{conversionRate}%</span>
            <span className="text-xs text-green-600 font-medium bg-green-100 rounded-full px-2 py-0.5">+2.1%</span>
          </div>
          <div className="h-10 mt-4">
            <Progress value={conversionRate * 10} className="h-2" />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>Target: 6%</span>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Sections */}
      <div className="space-y-6">
        {/* Revenue and Orders Chart Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-medium mb-6">Revenue & Orders</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" name="Revenue (₱)" fill={chartConfig.barChart.colors.sales} />
                <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke={chartConfig.barChart.colors.orders} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Multiple Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-6">Cost vs. Profit Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={financialData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cost" fill="#8884d8" name="Cost" />
                  <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
                  <Line type="monotone" dataKey="profit" stroke="#ff7300" name="Profit Trend" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-6">Product Revenue Share</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={productSalesData}
                  dataKey="revenue"
                  stroke="#fff"
                  fill="#8884d8"
                  content={<CustomizedTreemapContent />}
                >
                </Treemap>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-6">Customer Age Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#8884d8" name="Number of Customers" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-6">Customer Journey Funnel</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" name="Conversion Funnel" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-6">Regional Sales Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeRegionIndex}
                    activeShape={renderActiveShape}
                    data={regionalSalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onRegionPieEnter}
                  >
                    {regionalSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-6">Visitor Traffic</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyVisitors}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke={chartConfig.lineChart.colors.visitors} 
                    activeDot={{ r: 8 }}
                    name="Weekly Visitors"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      {/* Period Selection Dialog */}
      <Dialog open={isPeriodDialogOpen} onOpenChange={setIsPeriodDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Date Range</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
                <Input id="start-date" type="date" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsPeriodDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setDateRange("2023-01-01 to 2023-06-30");
                setIsPeriodDialogOpen(false);
              }}>
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtisanAnalytics;
