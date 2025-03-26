
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Search, UserCheck, UserX } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Sample customer data
const SAMPLE_CUSTOMERS = [
  {
    id: 1,
    name: "Ana Garcia",
    email: "ana@example.com",
    status: "active",
    orders: 12,
    totalSpent: 15250,
    lastOrder: "2023-05-10",
    joinDate: "2022-10-15",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    status: "active",
    orders: 5,
    totalSpent: 8750,
    lastOrder: "2023-04-22",
    joinDate: "2022-11-05",
  },
  {
    id: 3,
    name: "Liza Wong",
    email: "liza@example.com",
    status: "active",
    orders: 20,
    totalSpent: 24500,
    lastOrder: "2023-05-15",
    joinDate: "2022-08-17",
  },
  {
    id: 4,
    name: "Miguel Fernandez",
    email: "miguel@example.com",
    status: "suspended",
    orders: 2,
    totalSpent: 3200,
    lastOrder: "2023-02-08",
    joinDate: "2023-01-20",
  }
];

export const AdminCustomerMonitoring = () => {
  const [customers, setCustomers] = useState(SAMPLE_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === id ? {...customer, status: newStatus} : customer
    );
    
    setCustomers(updatedCustomers);
    
    const customer = customers.find(c => c.id === id);
    
    toast({
      title: `Customer status updated`,
      description: `${customer?.name}'s status changed to ${newStatus}.`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-sm">
        <Table>
          <TableCaption>A list of all customers on the platform</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {customer.name}
                  <div className="text-sm text-muted-foreground">{customer.email}</div>
                </TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>₱{customer.totalSpent.toLocaleString()}</TableCell>
                <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {customer.status === "active" ? (
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleStatusChange(customer.id, 'suspended')}
                        className="h-8"
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => handleStatusChange(customer.id, 'active')}
                        className="h-8"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Reactivate
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-3" />
                    <p>No customers found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
