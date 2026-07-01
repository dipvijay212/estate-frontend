'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Search, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Link from 'next/link';

interface DashboardHeaderProps {
  setIsMobileOpen: (value: boolean) => void;
}

export function DashboardHeader({ setIsMobileOpen }: DashboardHeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  // Generate simple breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment) => {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  });

  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      {/* Left side: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={20} />
          <span className="sr-only">Open menu</span>
        </Button>
        
        <nav className="hidden sm:flex items-center space-x-2 text-sm font-medium text-muted-foreground">
          <span>RealtyFlow</span>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span>/</span>
              <span className="text-foreground">{crumb}</span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right side: Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search..." 
            className="w-64 pl-9 bg-muted/30 border-border/50 focus-visible:bg-background h-9 rounded-full" 
          />
        </div>

        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-muted-foreground hover:text-foreground rounded-full"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </Button>
          
          {/* Mock Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border shadow-lg rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-border font-semibold flex justify-between items-center">
                Notifications
                <span className="text-xs font-normal text-primary cursor-pointer hover:underline">Mark all as read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer mb-1">
                  <p className="text-sm font-medium text-foreground">New Lead Assignment</p>
                  <p className="text-xs text-muted-foreground mt-0.5">You have been assigned a new lead from Zillow.</p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">2 mins ago</p>
                </div>
                <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer mb-1">
                  <p className="text-sm font-medium text-foreground">Property Sold!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">123 Main St has been marked as sold.</p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Button 
            variant="ghost" 
            className="relative h-9 w-9 rounded-full ml-1 border border-border/50 bg-muted/30 hover:bg-muted p-0 overflow-hidden"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-blue-500/20 text-primary font-bold text-sm">
              {user?.firstName?.[0] || 'U'}
            </div>
          </Button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-card border border-border shadow-lg rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-border bg-muted/10">
                <p className="font-semibold text-sm truncate">{user ? `${user.firstName} ${user.lastName}` : 'User'}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
              </div>
              <div className="p-2">
                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Settings size={16} className="text-muted-foreground" />
                  Account Settings
                </Link>
                <div className="my-1 border-t border-border/50" />
                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 text-destructive transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside overlay for dropdowns */}
      {(showProfileMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }} 
        />
      )}
    </header>
  );
}
