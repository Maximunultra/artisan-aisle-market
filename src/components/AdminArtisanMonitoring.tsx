
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Search, UserCheck, UserX } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Sample artisan data
const SAMPLE_ARTISANS = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria@example.com",
    craft: "Abaca Weaving",
    status: "active",
    products: 16,
    sales: 24,
    rating: 4.8,
    joinDate: "2023-02-15",
  },
  {
    id: 2,
    name: "Pedro Reyes",
    email: "pedro@example.com",
    craft: "Pottery & Ceramics",
    status: "active",
    products: 24,
    sales: 42,
    rating: 4.6,
    joinDate: "2023-01-10",
  },
  {
    id: 3,
    name: "Elena Cruz",
    email: "elena@example.com",
    craft: "Textile Artist",
    status: "pending",
    products: 0,
    sales: 0,
    rating: 0,
    joinDate: "2023-05-05",
  },
  {
    id: 4,
    name: "Ricardo Lim",
    email: "ricardo@example.com",
    craft: "Wood Carving",
    status: "suspended",
    products: 8,
    sales: 3,
    rating: 3.2,
    joinDate: "2023-03-22",
  }
];

export const AdminArtisanMonitoring = () => {
  const [artisans, setArtisans] = useState(SAMPLE_ARTISANS);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const filteredArtisans = artisans.filter(artisan => 
    artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    artisan.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artisan.craft.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedArtisans = artisans.map(artisan => 
      artisan.id === id ? {...artisan, status: newStatus} : artisan
    );
    
    setArtisans(updatedArtisans);
    
    const artisan = artisans.find(a => a.id === id);
    
    toast({
      title: `Artisan status updated`,
      description: `${artisan?.name}'s status changed to ${newStatus}.`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Pending</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Artisan Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artisans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-sm">
        <Table>
          <TableCaption>A list of all artisans on the platform</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Craft</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtisans.map((artisan) => (
              <TableRow key={artisan.id}>
                <TableCell className="font-medium">
                  {artisan.name}
                  <div className="text-sm text-muted-foreground">{artisan.email}</div>
                </TableCell>
                <TableCell>{artisan.craft}</TableCell>
                <TableCell>{getStatusBadge(artisan.status)}</TableCell>
                <TableCell>{artisan.products}</TableCell>
                <TableCell>{artisan.sales}</TableCell>
                <TableCell>
                  {artisan.rating > 0 ? (
                    <div className="flex items-center">
                      {artisan.rating.toFixed(1)}
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{new Date(artisan.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {artisan.status === "pending" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusChange(artisan.id, 'active')}
                        className="h-8"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    )}
                    {artisan.status === "active" && (
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleStatusChange(artisan.id, 'suspended')}
                        className="h-8"
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    )}
                    {artisan.status === "suspended" && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => handleStatusChange(artisan.id, 'active')}
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
            
            {filteredArtisans.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-3" />
                    <p>No artisans found</p>
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
