
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle } from 'lucide-react';
import { EcoRequest } from "@/types/EcoRequest";

interface EcoApprovalActionsProps {
  request: EcoRequest;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
}

export const EcoApprovalActions = ({ request, onApprove, onReject }: EcoApprovalActionsProps) => {
  const [rejectionReason, setRejectionReason] = useState('');

  return (
    <div className="flex flex-col gap-4 pt-4">
      <Button 
        onClick={() => onApprove(request.id)}
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
        onClick={() => {
          onReject(request.id, rejectionReason);
          setRejectionReason('');
        }}
        disabled={!rejectionReason}
      >
        <XCircle className="h-4 w-4 mr-2" />
        Reject Badge
      </Button>
    </div>
  );
};
