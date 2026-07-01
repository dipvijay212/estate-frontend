'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { websiteMockData } from '../constants/mockData';
import { PropertyCard } from './PropertyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EmptyState } from './EmptyState';

export function FeaturedProperties({ agencyName }: { agencyName: string }) {
  const { featuredProperties } = websiteMockData;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Exclusive Listings</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Featured Properties</h3>
            <p className="text-muted-foreground mt-4 text-lg">
              Explore our handpicked selection of premium properties tailored to fit your lifestyle and budget.
            </p>
          </motion.div>

          {featuredProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Button variant="outline" className="rounded-full px-6" asChild>
                <Link href={`/${agencyName}/properties`}>
                  View All Properties <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        {featuredProperties.length === 0 ? (
          <EmptyState 
            title="No featured properties" 
            message="We are currently updating our premium listings. Please check back later."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} agencyName={agencyName} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
