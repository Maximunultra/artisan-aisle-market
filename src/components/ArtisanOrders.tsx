
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, PackageCheck, Truck, CheckCircle, AlertCircle, Calendar, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Sample orders data
const initialOrders = [
  {
    id: "ORD-001-2023",
    customerName: "Maria Santos",
    customerEmail: "maria@example.com",
    date: "2023-03-18",
    total: 3050,
    status: "Processing",
    items: [
      {
        id: 1,
        name: "Hand-woven Abaca Bag",
        price: 1200,
        quantity: 1,
      },
      {
        id: 2,
        name: "Ceramic Vase with Bicol Patterns",
        price: 1850,
        quantity: 1,
      }
    ],
    shippingAddress: "123 Main St, Legazpi City, Albay, Philippines",
    paymentMethod: "Card Payment",
  },
  {
    id: "ORD-002-2023",
    customerName: "John Diaz",
    customerEmail: "john@example.com",
    date: "2023-03-23",
    total: 1200,
    status: "Shipped",
    items: [
      {
        id: 1,
        name: "Hand-woven Abaca Bag",
        price: 1200,
        quantity: 1,
      }
    ],
    shippingAddress: "456 Ocean Ave, Naga City, Camarines Sur, Philippines",
    paymentMethod: "GCash",
    trackingNumber: "PKG12345678",
  },
  {
    id: "ORD-003-2023",
    customerName: "Lisa Cruz",
    customerEmail: "lisa@example.com",
    date: "2023-03-15",
    total: 1850,
    status: "Delivered",
    items: [
      {
        id: 2,
        name: "Ceramic Vase with Bicol Patterns",
        price: 1850,
        quantity: 1,
      }
    ],
    shippingAddress: "789 Mountain Rd, Sorsogon City, Sorsogon, Philippines",
    paymentMethod: "Bank Transfer",
    trackingNumber: "PKG87654321",
  }
];

const ArtisanOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  
  const { toast } = useToast();
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  const openOrderDetails = (order: any) => {
    setCurrentOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  const openUpdateStatus = (order: any) => {
    setCurrentOrder(order);
    setNewStatus(order.status);
    setTrackingNumber(order.trackingNumber || '');
    setIsUpdateStatusOpen(true);
  };
  
  const handleUpdateStatus = () => {
    if (!currentOrder) return;
    
    const updatedOrders = orders.map(order => {
      if (order.id === currentOrder.id) {
        return {
          ...order,
          status: newStatus,
          trackingNumber: newStatus === 'Shipped' ? trackingNumber : order.trackingNumber
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setIsUpdateStatusOpen(false);
    
    toast({
      title: "Order Status Updated",
      description: `Order ${currentOrder.id} has been updated to ${newStatus}.`,
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <PackageCheck size={16} className="text-yellow-600" />;
      case 'shipped':
        return <Truck size={16} className="text-blue-600" />;
      case 'delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'cancelled':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <PackageCheck size={16} className="text-gray-600" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-medium">Customer Orders</h2>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <select 
            className="border border-input rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-artisan-clay text-sm"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {filteredOrders.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-artisan-sand/50">
              <thead>
                <tr className="bg-artisan-sand/20">
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-artisan-sand/50">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 px-4 text-sm font-medium">{order.id}</td>
                    <td className="py-4 px-4 text-sm">{order.customerName}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm">₱{order.total.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => openOrderDetails(order)}>
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => openUpdateStatus(order)}>
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <PackageCheck size={64} className="text-artisan-sand" />
          </div>
          <h3 className="text-xl font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || statusFilter !== 'all'
              ? "No orders match your search criteria."
              : "You don't have any orders yet."}
          </p>
        </div>
      )}
      
      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Order Details</DialogTitle>
            <DialogDescription>
              {currentOrder?.id} - Placed on {currentOrder && new Date(currentOrder.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          {currentOrder && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Customer Information</h3>
                  <p className="text-sm">{currentOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">{currentOrder.customerEmail}</p>
                </div>
                
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(currentOrder.status)}`}>
                  {getStatusIcon(currentOrder.status)}
                  <span className="ml-1">{currentOrder.status}</span>
                </span>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <ul className="divide-y divide-artisan-sand/30 border rounded-md overflow-hidden">
                  {currentOrder.items.map((item: any) => (
                    <li key={item.id} className="p-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₱{item.price.toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-end mt-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-medium text-lg">₱{currentOrder.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-sm">{currentOrder.shippingAddress}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Payment Information</h3>
                  <p className="text-sm">Method: {currentOrder.paymentMethod}</p>
                  <p className="text-sm">Status: Paid</p>
                </div>
              </div>
              
              {currentOrder.trackingNumber && (
                <div>
                  <h3 className="font-medium mb-2">Tracking Information</h3>
                  <p className="text-sm">Tracking Number: {currentOrder.trackingNumber}</p>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>Close</Button>
                <Button onClick={() => {
                  setIsOrderDetailsOpen(false);
                  openUpdateStatus(currentOrder);
                }}>
                  Update Status
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status of order {currentOrder?.id}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">Order Status</label>
              <select
                id="status"
                className="w-full rounded-md border border-input p-2 focus:outline-none focus:ring-2 focus:ring-artisan-clay"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            {newStatus === 'Shipped' && (
              <div className="grid gap-2">
                <label htmlFor="tracking" className="text-sm font-medium">Tracking Number</label>
                <Input
                  id="tracking"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>Cancel</Button>
            <Button className="bg-artisan-stone hover:bg-artisan-forest" onClick={handleUpdateStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtisanOrders;
