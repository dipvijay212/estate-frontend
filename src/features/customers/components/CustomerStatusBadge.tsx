import React from 'react';
import { Customer } from '../types';

interface CustomerStatusBadgeProps {
  status: Customer['status'];
}

export function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'new':
        return { label: 'New Lead', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200' };
      case 'contacted':
        return { label: 'Contacted', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200' };
      case 'viewing':
        return { label: 'Viewing', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200' };
      case 'negotiating':
        return { label: 'Negotiating', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200' };
      case 'closed':
        return { label: 'Closed/Won', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200' };
      case 'lost':
        return { label: 'Lost', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200' };
      default:
        return { label: status, className: 'bg-gray-100 text-gray-700' };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}
