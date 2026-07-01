import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Property } from "../types";

export function PropertyStatusBadge({ status }: { status: Property['status'] }) {
  const variantMap: Record<Property['status'], "default" | "secondary" | "destructive" | "outline"> = {
    available: "default",
    pending: "secondary",
    sold: "destructive",
    rented: "outline"
  };

  return (
    <Badge variant={variantMap[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
