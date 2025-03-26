
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Eye } from 'lucide-react';
import { EcoRequestDetails } from "@/components/eco-approvals/EcoRequestDetails";
import { EcoApprovalActions } from "@/components/eco-approvals/EcoApprovalActions";
import { EcoRequest } from "@/types/EcoRequest";

interface EcoRequestViewSheetProps {
  request: EcoRequest;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
  onOpen?: (request: EcoRequest) => void;
}

export const EcoRequestViewSheet = ({ 
  request, 
  onApprove, 
  onReject,
  onOpen
}: EcoRequestViewSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8"
          onClick={() => onOpen && onOpen(request)}
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Eco-Friendly Badge Request</SheetTitle>
          <SheetDescription>
            Review the details of this eco-friendly product request
          </SheetDescription>
        </SheetHeader>
        
        <EcoRequestDetails request={request} />
        
        {request.status === 'pending' && (
          <EcoApprovalActions 
            request={request}
            onApprove={onApprove}
            onReject={onReject}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
