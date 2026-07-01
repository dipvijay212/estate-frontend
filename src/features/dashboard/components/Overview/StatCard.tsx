import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="flex justify-between items-start">
          <div className="space-y-3 w-full">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-8 bg-muted rounded w-16"></div>
          </div>
          <div className="w-10 h-10 bg-muted rounded-lg"></div>
        </div>
        <div className="mt-4 h-4 bg-muted rounded w-32"></div>
      </div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm transition-all duration-200"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
          <Icon size={20} />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-sm">
          <span className={cn(
            "flex items-center font-medium",
            trend.isPositive ? "text-emerald-500" : "text-destructive"
          )}>
            {trend.isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
