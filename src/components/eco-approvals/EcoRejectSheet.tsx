
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { XCircle } from 'lucide-react';
import { EcoRequest } from "@/types/EcoRequest";

interface EcoRejectSheetProps {
  request: EcoRequest;
  onReject: (id: number, reason: string) => void;
}

export const EcoRejectSheet = ({ request, onReject }: EcoRejectSheetProps) => {
  const [rejectionReason, setRejectionReason] = useState('');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          size="sm" 
          variant="destructive" 
          className="h-8"
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
            onClick={() => {
              onReject(request.id, rejectionReason);
              setRejectionReason('');
            }}
            disabled={!rejectionReason}
            className="w-full"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject Badge
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
