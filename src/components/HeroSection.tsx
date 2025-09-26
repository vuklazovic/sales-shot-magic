import { Upload, Sparkles, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onUploadClick: () => void;
}

export const HeroSection = ({ onUploadClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-bounce-in" style={{ animationDelay: '0.2s' }} />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-bounce-in" style={{ animationDelay: '0.4s' }} />
      <div className="absolute top-1/3 right-10 w-12 h-12 bg-primary/30 rounded-full blur-lg animate-bounce-in" style={{ animationDelay: '0.6s' }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            No photographer needed
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Turn boring product photos into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              sales machines
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Upload any product photo and get 20+ stunning variations in seconds. 
            Perfect for Instagram, Amazon, catalogs, and ads.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onUploadClick}
              className="group min-w-[200px]"
            >
              <Upload className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Upload Photo
            </Button>
            
            <Button variant="outline" size="xl" className="min-w-[200px]">
              <Camera className="w-5 h-5" />
              See Examples
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">20+</div>
            <div className="text-muted-foreground">Variations per photo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2s</div>
            <div className="text-muted-foreground">Processing time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4K+</div>
            <div className="text-muted-foreground">Happy creators</div>
          </div>
        </div>
      </div>
    </section>
  );
};