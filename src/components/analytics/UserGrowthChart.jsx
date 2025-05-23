
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const UserGrowthChart = ({ data, config }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>Monthly growth of artisans and customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer 
            config={config}
            className="w-full aspect-[4/3]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
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
                  stroke={config.artisans.color} 
                  activeDot={{ r: 8 }} 
                  name="Artisans"
                />
                <Line 
                  type="monotone" 
                  dataKey="customers" 
                  stroke={config.customers.color} 
                  name="Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;
