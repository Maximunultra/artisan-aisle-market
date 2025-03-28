
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { EcoStatusBadge } from "@/components/eco-approvals/EcoStatusBadge";
import { EcoRequestViewSheet } from "@/components/eco-approvals/EcoRequestViewSheet";
import { EcoRejectSheet } from "@/components/eco-approvals/EcoRejectSheet";

/**
 * @param {Object} props
 * @param {import('../../types/EcoRequest').EcoRequest[]} props.requests
 * @param {(id: number) => void} props.onApprove
 * @param {(id: number, reason: string) => void} props.onReject
 * @param {(request: import('../../types/EcoRequest').EcoRequest) => void} props.onSelectRequest
 */
export const EcoRequestTable = ({ requests, onApprove, onReject, onSelectRequest }) => {
  return (
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
          {requests.length > 0 ? (
            requests.map((request) => (
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
                <TableCell><EcoStatusBadge status={request.status} /></TableCell>
                <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EcoRequestViewSheet 
                      request={request}
                      onApprove={onApprove}
                      onReject={onReject}
                      onOpen={onSelectRequest}
                    />
                    
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          className="h-8 bg-green-500 hover:bg-green-600"
                          onClick={() => onApprove(request.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        
                        <EcoRejectSheet
                          request={request}
                          onReject={onReject}
                        />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
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
  );
};
