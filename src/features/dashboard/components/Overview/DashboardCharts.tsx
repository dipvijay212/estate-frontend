'use client';

import React from 'react';

import { ChartData } from '@/services/mock/dashboard.service';

interface DashboardChartsProps {
  data: ChartData[];
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue / Leads Line Chart Placeholder */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Revenue & Leads</h3>
            <p className="text-sm text-muted-foreground">Performance over the last 6 months</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-muted-foreground">Leads</span>
            </div>
          </div>
        </div>

        <div className="relative h-[250px] w-full mt-auto flex items-end justify-between gap-2 px-2 pb-6">
          {/* Mock Y-Axis */}
          <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[10px] text-muted-foreground">
            <span>$50k</span>
            <span>$40k</span>
            <span>$30k</span>
            <span>$20k</span>
            <span>$10k</span>
            <span>0</span>
          </div>
          
          {/* Grid lines */}
          <div className="absolute left-10 right-0 top-0 bottom-6 flex flex-col justify-between">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-px bg-border/40"></div>
            ))}
          </div>

          {/* SVG Line Chart Mock */}
          <svg className="absolute left-10 right-0 top-0 bottom-6 w-[calc(100%-40px)] h-full overflow-visible preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Revenue Line */}
            <path 
              d="M 0,80 C 20,70 30,50 50,40 C 70,30 80,10 100,20" 
              fill="none" 
              className="stroke-primary" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
            {/* Area under Revenue */}
            <path 
              d="M 0,80 C 20,70 30,50 50,40 C 70,30 80,10 100,20 L 100,100 L 0,100 Z" 
              className="fill-primary/10" 
            />
            
            {/* Leads Line */}
            <path 
              d="M 0,60 C 20,80 40,60 60,30 C 80,0 90,40 100,10" 
              fill="none" 
              className="stroke-blue-500" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Mock X-Axis */}
          <div className="absolute left-10 right-0 -bottom-6 flex justify-between text-[10px] text-muted-foreground px-2">
            {data.map(item => (
              <span key={item.name}>{item.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Properties by Status Bar Chart Placeholder */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground">Properties by Status</h3>
          <p className="text-sm text-muted-foreground">Current distribution of your portfolio</p>
        </div>

        <div className="relative h-[250px] w-full mt-auto flex items-end justify-around gap-2 px-10 pb-6">
          {/* Grid lines */}
          <div className="absolute left-0 right-0 top-0 bottom-6 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-px bg-border/40"></div>
            ))}
          </div>

          {/* Bars */}
          <div className="relative w-12 h-[80%] bg-blue-500/80 hover:bg-blue-500 transition-colors rounded-t-md z-10 group cursor-pointer">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
              Active: 45
            </div>
          </div>
          <div className="relative w-12 h-[40%] bg-emerald-500/80 hover:bg-emerald-500 transition-colors rounded-t-md z-10 group cursor-pointer">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
              Sold: 22
            </div>
          </div>
          <div className="relative w-12 h-[60%] bg-amber-500/80 hover:bg-amber-500 transition-colors rounded-t-md z-10 group cursor-pointer">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
              Pending: 34
            </div>
          </div>
          <div className="relative w-12 h-[20%] bg-muted-foreground/50 hover:bg-muted-foreground/80 transition-colors rounded-t-md z-10 group cursor-pointer">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
              Off Market: 11
            </div>
          </div>

          {/* X-Axis labels */}
          <div className="absolute left-10 right-10 bottom-0 flex justify-around text-xs text-muted-foreground font-medium">
            <span className="w-12 text-center">Active</span>
            <span className="w-12 text-center">Sold</span>
            <span className="w-12 text-center">Pending</span>
            <span className="w-12 text-center">Off Mkt</span>
          </div>
        </div>
      </div>
    </div>
  );
}
