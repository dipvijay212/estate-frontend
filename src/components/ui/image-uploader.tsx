import React, { useState, useRef, DragEvent } from 'react';
import { UploadCloud, X, ArrowLeft, ArrowRight, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
}

export function ImageUploader({ value = [], onChange, maxFiles = 10 }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    // Check max files
    if (value.length + validFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    // Mock upload process
    const newUploads = validFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      progress: 0
    }));

    setUploadingFiles(prev => [...prev, ...newUploads]);

    newUploads.forEach(upload => {
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress >= 100) {
          clearInterval(interval);
          setUploadingFiles(prev => prev.filter(p => p.id !== upload.id));
          // Provide mock URL
          const mockUrl = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=800&q=80`;
          onChange([...value, mockUrl]);
        } else {
          setUploadingFiles(prev => 
            prev.map(p => p.id === upload.id ? { ...p, progress } : p)
          );
        }
      }, 300);
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index > 0) {
      const newValue = [...value];
      [newValue[index - 1], newValue[index]] = [newValue[index], newValue[index - 1]];
      onChange(newValue);
    } else if (direction === 'right' && index < value.length - 1) {
      const newValue = [...value];
      [newValue[index], newValue[index + 1]] = [newValue[index + 1], newValue[index]];
      onChange(newValue);
    }
  };

  const setAsThumbnail = (index: number) => {
    if (index === 0) return;
    const newValue = [...value];
    const item = newValue.splice(index, 1)[0];
    newValue.unshift(item);
    onChange(newValue);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Drop Zone */}
      <div 
        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/30'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className={`rounded-full p-4 mb-4 transition-transform ${isDragging ? 'bg-primary/20 scale-110' : 'bg-primary/10 group-hover:scale-110'}`}>
          <UploadCloud className="w-8 h-8 text-primary" />
        </div>
        <h4 className="text-base font-semibold mb-1">
          {isDragging ? 'Drop images here' : 'Click to upload or drag and drop'}
        </h4>
        <p className="text-sm text-muted-foreground mb-4">SVG, PNG, JPG or GIF (max. 800x400px)</p>
        <Button variant="outline" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
          Select Files
        </Button>
      </div>

      {/* Uploading Progress */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Uploading ({uploadingFiles.length})</h4>
          {uploadingFiles.map(file => (
            <div key={file.id} className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg border">
              <div className="p-2 bg-background rounded border">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium line-clamp-1">{file.name}</span>
                  <span className="text-muted-foreground">{file.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${file.progress}%` }} />
                </div>
              </div>
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* Image Gallery */}
      {value.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Image Gallery ({value.length}/{maxFiles})</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((url, index) => (
              <div key={`${url}-${index}`} className="relative group rounded-lg overflow-hidden border aspect-video bg-muted/20">
                <img src={url} alt={`Property image ${index + 1}`} className="w-full h-full object-cover" />
                
                {/* Thumbnail Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded shadow-sm z-10 font-medium">
                    Thumbnail
                  </div>
                )}

                {/* Hover Overlay Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-between w-full">
                    {index !== 0 ? (
                      <Button variant="secondary" size="sm" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); setAsThumbnail(index); }}>
                        Set Thumbnail
                      </Button>
                    ) : <div></div>}
                    <Button variant="destructive" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); removeImage(index); }}>
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  
                  {/* Reorder Controls */}
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-7 w-7" 
                      disabled={index === 0}
                      onClick={(e) => { e.stopPropagation(); moveImage(index, 'left'); }}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="h-7 w-7" 
                      disabled={index === value.length - 1}
                      onClick={(e) => { e.stopPropagation(); moveImage(index, 'right'); }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
