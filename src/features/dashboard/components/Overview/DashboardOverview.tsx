'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Building2, Users, UserPlus, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from './StatCard';
import { DashboardCharts } from './DashboardCharts';
import { RecentLeads } from './RecentLeads';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { dashboardService, DashboardMetrics } from '@/services/mock/dashboard.service';

export function DashboardOverview() {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const metrics = await dashboardService.getMetrics();
      setData(metrics);
    } catch (err) {
      setError('Failed to load dashboard metrics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchMetrics} 
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
          <Button variant="outline" size="sm" onClick={fetchMetrics} className="ml-auto bg-background text-foreground">
            Retry
          </Button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Properties" 
          value={data?.totalProperties.toLocaleString() || "0"} 
          icon={Building2} 
          trend={{ value: 12, isPositive: true }} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Total Customers" 
          value={data?.totalCustomers.toLocaleString() || "0"} 
          icon={Users} 
          trend={{ value: 4.5, isPositive: true }} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Total Leads" 
          value={data?.totalLeads.toLocaleString() || "0"} 
          icon={UserPlus} 
          trend={{ value: 2.1, isPositive: false }} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Today's Follow-ups" 
          value={data?.newLeads.toLocaleString() || "0"} 
          icon={Clock} 
          isLoading={isLoading} 
        />
      </div>

      {/* Main Charts Area */}
      {!isLoading && data && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <DashboardCharts data={data.chartData} />
        </div>
      )}

      {/* Bottom Grid: Leads, Activity, Quick Actions */}
      {!isLoading && data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="lg:col-span-1">
            <RecentLeads leads={data.recentLeads} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity activities={data.recentActivity} />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      )}
    </div>
  );
}
