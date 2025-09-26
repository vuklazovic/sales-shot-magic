import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { UploadArea } from "@/components/UploadArea";
import { ImageGallery } from "@/components/ImageGallery";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const { toast } = useToast();

  const handleUploadClick = () => {
    setShowUpload(true);
  };

  const handleCloseUpload = () => {
    setShowUpload(false);
    setUploadedFile(null);
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowUpload(false);
      setShowGallery(true);
      
      toast({
        title: "Success!",
        description: "Your photo variations have been generated.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {!showGallery ? (
        <HeroSection onUploadClick={handleUploadClick} />
      ) : (
        <ImageGallery uploadedFile={uploadedFile} />
      )}

      {showUpload && (
        <UploadArea
          onUpload={handleFileUpload}
          onClose={handleCloseUpload}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default Index;