import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
  leadId: string;
  onSuccess?: () => void;
}

export function DeleteLeadModal({ isOpen, onClose, leadName, leadId, onSuccess }: DeleteLeadModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Mock soft delete process
    setTimeout(() => {
      setIsDeleting(false);
      toast.success(`Lead "${leadName}" has been successfully deleted.`);
      onClose();
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent showCloseButton={!isDeleting} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            Delete Lead
          </DialogTitle>
          <DialogDescription className="pt-4 text-base leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-foreground">"{leadName}"</span>? 
            <br/><br/>
            This action removes the lead from the active CRM pipeline.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="w-full sm:w-auto">
            {isDeleting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...</>
            ) : (
              'Confirm Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
