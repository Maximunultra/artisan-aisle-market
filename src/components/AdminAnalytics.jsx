
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  monthlySalesData, 
  userGrowthData, 
  productCategoryData, 
  ecoRequestsData,
  summaryMetrics,
} from '../utils/adminAnalyticsData';
import { chartConfig, CHART_COLORS } from '../utils/chartConfigs';
import SummaryCards from './analytics/SummaryCards';
import SalesChart from './analytics/SalesChart';
import UserGrowthChart from './analytics/UserGrowthChart';
import ProductCategoriesChart from './analytics/ProductCategoriesChart';
import EcoRequestsChart from './analytics/EcoRequestsChart';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
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
      <SummaryCards summaryMetrics={summaryMetrics} timeRange={timeRange} />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <SalesChart data={monthlySalesData} config={chartConfig.sales} />

        {/* User Growth Chart */}
        <UserGrowthChart data={userGrowthData} config={chartConfig.users} />

        {/* Product Categories */}
        <ProductCategoriesChart data={productCategoryData} colors={CHART_COLORS} />

        {/* Eco Request Trends */}
        <EcoRequestsChart data={ecoRequestsData} config={chartConfig.ecoRequests} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
