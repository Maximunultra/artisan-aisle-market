
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const EcoRequestsChart = ({ data, config }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Eco-Friendly Requests</CardTitle>
        <CardDescription>Monthly trends of eco-friendly badge requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer 
            config={config}
            className="w-full aspect-[4/3]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="approved" stackId="a" fill={config.approved.color} name="Approved" />
                <Bar dataKey="rejected" stackId="a" fill={config.rejected.color} name="Rejected" />
                <Bar dataKey="pending" stackId="a" fill={config.pending.color} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoRequestsChart;
