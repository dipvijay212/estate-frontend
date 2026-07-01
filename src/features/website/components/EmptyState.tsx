import React from 'react';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState({ 
  title = "No results found", 
  message = "We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.",
  actionLabel = "Clear Filters",
  onAction
}: { 
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center bg-card rounded-3xl border border-dashed shadow-sm"
    >
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
        <SearchX className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        {message}
      </p>
      {onAction && (
        <Button onClick={onAction} size="lg" className="rounded-full px-8">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
