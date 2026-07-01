import React from 'react';
import { Lead } from '../types';
import { Flame, ArrowUp, Minus, ArrowDown } from 'lucide-react';

export function LeadPriorityBadge({ priority }: { priority: Lead['priority'] }) {
  const getPriorityConfig = () => {
    switch (priority) {
      case 'hot': return { label: 'Hot', icon: Flame, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' };
      case 'high': return { label: 'High', icon: ArrowUp, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' };
      case 'medium': return { label: 'Medium', icon: Minus, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
      case 'low': return { label: 'Low', icon: ArrowDown, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-900/20' };
      default: return { label: priority, icon: Minus, color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const config = getPriorityConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}
