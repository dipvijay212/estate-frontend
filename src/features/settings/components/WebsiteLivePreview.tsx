'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Monitor, Tablet, Smartphone, Search, MapPin, Bed, Bath, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export function WebsiteLivePreview() {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const config = useSelector((state: RootState) => state.websiteTheme.config);

  const getWidth = () => {
    switch (device) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-100 rounded-xl overflow-hidden border">
      {/* Browser Toolbar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="bg-zinc-100 border text-xs text-muted-foreground px-4 py-1.5 rounded-md hidden sm:block truncate max-w-[250px]">
            preview.realtyflow.com
          </div>
        </div>

        <div className="flex bg-zinc-100 p-1 rounded-lg">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-md transition-colors ${device === 'desktop' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-md transition-colors ${device === 'tablet' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-md transition-colors ${device === 'mobile' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Area Background */}
      <div className="flex-1 bg-zinc-200/50 p-2 sm:p-4 md:p-8 overflow-y-auto flex justify-center">
        
        {/* Dynamic Frame */}
        <motion.div
          layout
          initial={false}
          animate={{ width: getWidth() }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-200 flex flex-col relative"
          style={{ 
            height: '100%', 
            minHeight: '700px',
            '--preview-primary': config.primaryColor,
            '--preview-secondary': config.secondaryColor,
          } as React.CSSProperties}
        >
          {/* ----- MOCK WEBSITE CONTENT ----- */}
          
          {/* Navbar */}
          <nav className="h-16 border-b flex items-center justify-between px-6 shrink-0 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-2">
              {config.logo ? (
                <div className="w-8 h-8 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                  <span className="text-[10px] text-zinc-400">LOGO</span>
                </div>
              ) : (
                <div className="w-6 h-6 rounded bg-[var(--preview-primary)]" />
              )}
              <span className="font-bold text-lg">{config.businessName}</span>
            </div>
            {device !== 'mobile' && (
              <div className="flex gap-6 text-sm font-medium text-zinc-600">
                <span className="hover:text-[var(--preview-primary)] cursor-pointer transition-colors">Home</span>
                <span className="hover:text-[var(--preview-primary)] cursor-pointer transition-colors">Properties</span>
                <span className="hover:text-[var(--preview-primary)] cursor-pointer transition-colors">About</span>
                <span className="hover:text-[var(--preview-primary)] cursor-pointer transition-colors">Contact</span>
              </div>
            )}
          </nav>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            
            {/* Hero Section */}
            <section className="relative w-full py-20 px-6 flex flex-col items-center justify-center text-center text-white overflow-hidden transition-colors" style={{ backgroundColor: config.primaryColor }}>
              {config.heroBanner && (
                <div className="absolute inset-0 bg-black/40 z-10" />
              )}
              <div className="relative z-20 max-w-2xl mx-auto space-y-6">
                <motion.h1 
                  key={config.heroTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                >
                  {config.heroTitle}
                </motion.h1>
                <motion.p 
                  key={config.heroSubtitle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg sm:text-xl opacity-90"
                >
                  {config.heroSubtitle}
                </motion.p>
                
                {/* Search Mock */}
                <div className="mt-8 bg-white p-2 rounded-full flex items-center max-w-md mx-auto shadow-xl">
                  <input type="text" placeholder="Search properties..." className="flex-1 bg-transparent px-4 outline-none text-zinc-900 text-sm" readOnly />
                  <div className="p-3 rounded-full text-white" style={{ backgroundColor: config.secondaryColor }}>
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Properties */}
            <section className="py-16 px-6 bg-zinc-50">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center text-zinc-800">Featured Properties</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-40 bg-zinc-200 relative">
                         <div className="absolute top-2 right-2 px-2 py-1 text-[10px] font-bold text-white rounded bg-[var(--preview-primary)]">
                           FOR SALE
                         </div>
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-lg mb-1" style={{ color: config.secondaryColor }}>$850,000</p>
                        <p className="text-sm font-medium text-zinc-800 mb-2 truncate">123 Example Street, NY</p>
                        <div className="flex gap-3 text-xs text-zinc-500 mb-4 border-b pb-4">
                          <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> 3 Bed</span>
                          <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> 2 Bath</span>
                        </div>
                        <button className="w-full py-2 text-sm font-medium rounded-lg text-[var(--preview-primary)] bg-[var(--preview-primary)]/10 hover:bg-[var(--preview-primary)]/20 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6 bg-white border-t border-zinc-100">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h2 className="text-2xl font-bold text-zinc-800">About {config.businessName}</h2>
                <p className="text-zinc-600 leading-relaxed text-sm">
                  {config.aboutText}
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 text-zinc-400 py-12 px-6">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="space-y-4 lg:col-span-2">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-6 h-6 rounded bg-[var(--preview-primary)]" />
                    <span className="font-bold text-lg">{config.businessName}</span>
                  </div>
                  <p className="text-sm leading-relaxed max-w-sm">
                    {config.footerText}
                  </p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{config.address}</span>
                  </p>
                  <p>{config.phone}</p>
                  <p>{config.email}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-2">
                    {config.facebook && <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[var(--preview-secondary)] hover:text-white transition-colors cursor-pointer text-xs">FB</div>}
                    {config.instagram && <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[var(--preview-secondary)] hover:text-white transition-colors cursor-pointer text-xs">IG</div>}
                    {config.linkedin && <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[var(--preview-secondary)] hover:text-white transition-colors cursor-pointer text-xs">IN</div>}
                    {config.youtube && <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[var(--preview-secondary)] hover:text-white transition-colors cursor-pointer text-xs">YT</div>}
                  </div>
                </div>
              </div>
            </footer>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
