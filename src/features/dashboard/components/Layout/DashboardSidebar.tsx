'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Properties', href: '/dashboard/properties', icon: Building2 },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Leads', href: '/dashboard/leads', icon: UserPlus },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar({ 
  isCollapsed, 
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border/50 transition-all duration-300 ease-in-out lg:static",
          isCollapsed ? "w-[72px]" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Area */}
        <div className="h-16 flex items-center px-4 border-b border-border/50 shrink-0">
          <Link href="/dashboard" className={cn("flex items-center gap-3 overflow-hidden transition-all", isCollapsed ? "justify-center w-full" : "")}>
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shrink-0">
              <Building2 size={24} />
            </div>
            {!isCollapsed && <span className="font-bold tracking-tight text-xl whitespace-nowrap">RealtyFlow</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors relative group",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon size={20} className={cn("shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-3 border-t border-border/50 shrink-0">
          <button
            onClick={logout}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group",
              isCollapsed ? "justify-center" : ""
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="truncate font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle (Desktop only) */}
        <div className="hidden lg:flex absolute -right-3 top-20">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 rounded-full bg-background border-border shadow-sm hover:bg-accent focus-visible:ring-0 z-10"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
