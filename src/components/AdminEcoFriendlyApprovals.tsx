
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Eye, Search, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// Sample eco-friendly product requests
const SAMPLE_ECO_REQUESTS = [
  {
    id: 1,
    productName: "Hand-woven Abaca Bag",
    artisanName: "Maria Santos",
    artisanId: 1,
    materials: "Organic abaca fibers, natural dyes",
    description: "These bags are made from sustainably harvested abaca fibers. We use natural plant-based dyes and avoid synthetic materials in our production process.",
    certifications: "Local Eco-certification",
    status: "pending",
    submittedDate: "2023-05-01",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    id: 2,
    productName: "Bamboo Cutlery Set",
    artisanName: "Pedro Reyes",
    artisanId: 2,
    materials: "Locally sourced bamboo, organic beeswax finish",
    description: "Our bamboo cutlery sets are made from bamboo grown without pesticides. We use a food-safe beeswax finish and compostable packaging.",
    certifications: "None yet, seeking approval",
    status: "pending",
    submittedDate: "2023-05-05",
    imageUrl: "https://images.unsplash.com/photo-1589923188651-268a9765e432?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    id: 3,
    productName: "Recycled Glass Vase",
    artisanName: "Elena Cruz",
    artisanId: 3,
    materials: "100% recycled glass",
    description: "These vases are created from glass bottles collected from local restaurants. They are melted down and hand-blown into new forms, reducing waste.",
    certifications: "Recycled Materials Certificate",
    status: "approved",
    submittedDate: "2023-04-10",
    approvedDate: "2023-04-15",
    imageUrl: "https://images.unsplash.com/photo-1612196808214-b7e69439cdba?auto=format&fit=crop&q=80&w=600&h=700"
  },
  {
    id: 4,
    productName: "Coconut Shell Bowls",
    artisanName: "Ricardo Lim",
    artisanId: 4,
    materials: "Coconut shells, organic lacquer",
    description: "We use discarded coconut shells that would otherwise be waste. Each bowl is hand-polished and finished with an organic, food-safe lacquer.",
    certifications: "None",
    status: "rejected",
    submittedDate: "2023-04-20",
    rejectedDate: "2023-04-25",
    rejectionReason: "Insufficient information about the lacquer's eco-friendly properties.",
    imageUrl: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&q=80&w=600&h=700"
  }
];

export const AdminEcoFriendlyApprovals = () => {
  const [ecoRequests, setEcoRequests] = useState(SAMPLE_ECO_REQUESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const { toast } = useToast();
  
  const filteredRequests = ecoRequests.filter(request => 
    request.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    request.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.materials.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleApprove = (id: number) => {
    const updatedRequests = ecoRequests.map(request => 
      request.id === id ? {
        ...request, 
        status: 'approved',
        approvedDate: new Date().toISOString().split('T')[0]
      } : request
    );
    
    setEcoRequests(updatedRequests);
    
    const request = ecoRequests.find(r => r.id === id);
    
    toast({
      title: `Eco-friendly badge approved`,
      description: `The eco-friendly badge has been granted to ${request?.productName}.`,
    });
  };
  
  const handleReject = (id: number, reason: string) => {
    const updatedRequests = ecoRequests.map(request => 
      request.id === id ? {
        ...request, 
        status: 'rejected',
        rejectedDate: new Date().toISOString().split('T')[0],
        rejectionReason: reason
      } : request
    );
    
    setEcoRequests(updatedRequests);
    setRejectionReason('');
    
    const request = ecoRequests.find(r => r.id === id);
    
    toast({
      title: `Eco-friendly badge rejected`,
      description: `The eco-friendly badge request for ${request?.productName} has been rejected.`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Pending Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Eco-Friendly Badge Approvals</h2>
          <p className="text-sm text-muted-foreground">Review and approve eco-friendly badge requests from artisans</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow-sm">
        <Table>
          <TableCaption>Eco-friendly badge approval requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Artisan</TableHead>
              <TableHead>Materials</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.productName}
                </TableCell>
                <TableCell>{request.artisanName}</TableCell>
                <TableCell>
                  <div className="line-clamp-2 max-w-xs">
                    {request.materials}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="overflow-y-auto">
                        {selectedRequest && (
                          <div className="space-y-5">
                            <SheetHeader>
                              <SheetTitle>Eco-Friendly Badge Request</SheetTitle>
                              <SheetDescription>
                                Review the details of this eco-friendly product request
                              </SheetDescription>
                            </SheetHeader>
                            
                            <div className="aspect-square max-w-sm mx-auto mb-4 rounded-md overflow-hidden">
                              <img 
                                src={selectedRequest.imageUrl} 
                                alt={selectedRequest.productName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <Label className="text-muted-foreground">Product Name</Label>
                                <p className="font-medium">{selectedRequest.productName}</p>
                              </div>
                              
                              <div>
                                <Label className="text-muted-foreground">Artisan</Label>
                                <p className="font-medium">{selectedRequest.artisanName}</p>
                              </div>
                              
                              <div>
                                <Label className="text-muted-foreground">Status</Label>
                                <p>{getStatusBadge(selectedRequest.status)}</p>
                              </div>
                              
                              <div>
                                <Label className="text-muted-foreground">Materials</Label>
                                <p>{selectedRequest.materials}</p>
                              </div>
                              
                              <div>
                                <Label className="text-muted-foreground">Description</Label>
                                <p className="text-sm">{selectedRequest.description}</p>
                              </div>
                              
                              <div>
                                <Label className="text-muted-foreground">Certifications</Label>
                                <p>{selectedRequest.certifications}</p>
                              </div>
                              
                              <div>
                                <Label className="text-muted-foreground">Submitted Date</Label>
                                <p>{new Date(selectedRequest.submittedDate).toLocaleDateString()}</p>
                              </div>
                              
                              {selectedRequest.status === 'approved' && (
                                <div>
                                  <Label className="text-muted-foreground">Approved Date</Label>
                                  <p>{new Date(selectedRequest.approvedDate).toLocaleDateString()}</p>
                                </div>
                              )}
                              
                              {selectedRequest.status === 'rejected' && (
                                <>
                                  <div>
                                    <Label className="text-muted-foreground">Rejected Date</Label>
                                    <p>{new Date(selectedRequest.rejectedDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Rejection Reason</Label>
                                    <p className="text-sm">{selectedRequest.rejectionReason}</p>
                                  </div>
                                </>
                              )}
                              
                              {selectedRequest.status === 'pending' && (
                                <div className="flex flex-col gap-4 pt-4">
                                  <Button 
                                    onClick={() => handleApprove(selectedRequest.id)}
                                    className="bg-green-500 hover:bg-green-600"
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Approve Badge
                                  </Button>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="rejection-reason">Rejection Reason</Label>
                                    <Textarea 
                                      id="rejection-reason"
                                      placeholder="Provide a reason for rejection..."
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                    />
                                  </div>
                                  
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleReject(selectedRequest.id, rejectionReason)}
                                    disabled={!rejectionReason}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject Badge
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </SheetContent>
                    </Sheet>
                    
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          className="h-8 bg-green-500 hover:bg-green-600"
                          onClick={() => handleApprove(request.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="h-8"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Reject Eco-Friendly Badge</SheetTitle>
                              <SheetDescription>
                                Provide a reason for rejecting this eco-friendly badge request
                              </SheetDescription>
                            </SheetHeader>
                            
                            <div className="py-4 space-y-4">
                              <div className="space-y-2">
                                <Label>Product</Label>
                                <p className="font-medium">{request.productName}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                                <Textarea 
                                  id="rejection-reason"
                                  placeholder="Provide a reason for rejection..."
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                />
                                <p className="text-sm text-muted-foreground">
                                  This reason will be shared with the artisan
                                </p>
                              </div>
                              
                              <Button 
                                variant="destructive"
                                onClick={() => handleReject(request.id, rejectionReason)}
                                disabled={!rejectionReason}
                                className="w-full"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Badge
                              </Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredRequests.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-3" />
                    <p>No requests found</p>
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
