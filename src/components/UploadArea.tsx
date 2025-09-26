import { useState, useCallback } from "react";
import { Upload, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onUpload: (file: File) => void;
  onClose: () => void;
  isProcessing: boolean;
}

export const UploadArea = ({ onUpload, onClose, isProcessing }: UploadAreaProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-elegant max-w-md w-full p-6 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload Product Photo</h2>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isProcessing}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {!selectedFile ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer",
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Drop your photo here</h3>
            <p className="text-muted-foreground mb-4">or click to browse</p>
            <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP</p>
            
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
              disabled={isProcessing}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected product"
                className="w-full h-48 object-cover"
              />
              {!isProcessing && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  onClick={() => setSelectedFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              {isProcessing && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button 
              variant="hero" 
              size="lg" 
              className="w-full" 
              onClick={handleUpload}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Variations
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};