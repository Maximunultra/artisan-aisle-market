
import React from 'react';
import { Badge } from "@/components/ui/badge";

/**
 * @param {Object} props
 * @param {'pending' | 'approved' | 'rejected'} props.status
 */
export const EcoStatusBadge = ({ status }) => {
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
