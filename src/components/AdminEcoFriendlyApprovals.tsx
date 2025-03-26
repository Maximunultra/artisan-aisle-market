
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { EcoRequestTable } from "@/components/eco-approvals/EcoRequestTable";
import { EcoRequest, SAMPLE_ECO_REQUESTS } from "@/types/EcoRequest";

export const AdminEcoFriendlyApprovals = () => {
  const [ecoRequests, setEcoRequests] = useState<EcoRequest[]>(SAMPLE_ECO_REQUESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<EcoRequest | null>(null);
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
        status: 'approved' as const,
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
        status: 'rejected' as const,
        rejectedDate: new Date().toISOString().split('T')[0],
        rejectionReason: reason
      } : request
    );
    
    setEcoRequests(updatedRequests);
    
    const request = ecoRequests.find(r => r.id === id);
    
    toast({
      title: `Eco-friendly badge rejected`,
      description: `The eco-friendly badge request for ${request?.productName} has been rejected.`,
    });
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
      
      <EcoRequestTable 
        requests={filteredRequests}
        onApprove={handleApprove}
        onReject={handleReject}
        onSelectRequest={setSelectedRequest}
      />
    </div>
  );
};
