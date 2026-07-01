import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { propertyService } from '@/services/mock/property.service';

interface DeletePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyId: string;
  onSuccess?: () => void;
}

export function DeletePropertyModal({ isOpen, onClose, propertyTitle, propertyId, onSuccess }: DeletePropertyModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await propertyService.deleteProperty(propertyId);
      toast.success(`Listing "${propertyTitle}" has been moved to trash.`);
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Failed to delete property. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent showCloseButton={!isDeleting} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            Delete Property
          </DialogTitle>
          <DialogDescription className="pt-4 text-base leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-foreground">"{propertyTitle}"</span>? 
            <br/><br/>
            This is a soft delete. The listing will be removed from active directories but can be restored by an admin within 30 days.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="w-full sm:w-auto">
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
              </>
            ) : (
              'Confirm Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
