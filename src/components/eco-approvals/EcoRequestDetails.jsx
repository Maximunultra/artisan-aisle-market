
import React from 'react';
import { Label } from "@/components/ui/label";
import { EcoStatusBadge } from "@/components/eco-approvals/EcoStatusBadge";

/**
 * @param {Object} props
 * @param {import('../../types/EcoRequest').EcoRequest} props.request
 */
export const EcoRequestDetails = ({ request }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square max-w-sm mx-auto mb-4 rounded-md overflow-hidden">
        <img 
          src={request.imageUrl} 
          alt={request.productName} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="text-muted-foreground">Product Name</Label>
          <p className="font-medium">{request.productName}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">Artisan</Label>
          <p className="font-medium">{request.artisanName}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">Status</Label>
          <p><EcoStatusBadge status={request.status} /></p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">Materials</Label>
          <p>{request.materials}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">Description</Label>
          <p className="text-sm">{request.description}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">Certifications</Label>
          <p>{request.certifications}</p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">Submitted Date</Label>
          <p>{new Date(request.submittedDate).toLocaleDateString()}</p>
        </div>
        
        {request.status === 'approved' && request.approvedDate && (
          <div>
            <Label className="text-muted-foreground">Approved Date</Label>
            <p>{new Date(request.approvedDate).toLocaleDateString()}</p>
          </div>
        )}
        
        {request.status === 'rejected' && request.rejectedDate && (
          <>
            <div>
              <Label className="text-muted-foreground">Rejected Date</Label>
              <p>{new Date(request.rejectedDate).toLocaleDateString()}</p>
            </div>
            {request.rejectionReason && (
              <div>
                <Label className="text-muted-foreground">Rejection Reason</Label>
                <p className="text-sm">{request.rejectionReason}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
