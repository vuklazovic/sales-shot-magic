import { useState } from "react";
import { Download, Heart, Share, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Import the mock images
import productOriginal from "@/assets/product-original.jpg";
import productVariation1 from "@/assets/product-variation-1.jpg";
import productVariation2 from "@/assets/product-variation-2.jpg";
import productVariation3 from "@/assets/product-variation-3.jpg";

interface ImageVariation {
  id: string;
  url: string;
  title: string;
  style: string;
  isOriginal?: boolean;
}

interface ImageGalleryProps {
  uploadedFile?: File;
}

export const ImageGallery = ({ uploadedFile }: ImageGalleryProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock variations - in a real app, these would come from the API
  const mockVariations: ImageVariation[] = [
    {
      id: "original",
      url: uploadedFile ? URL.createObjectURL(uploadedFile) : productOriginal,
      title: "Original",
      style: "Plain background",
      isOriginal: true,
    },
    {
      id: "variation-1",
      url: productVariation1,
      title: "Purple Gradient",
      style: "Modern lifestyle",
    },
    {
      id: "variation-2",
      url: productVariation2,
      title: "Neon Glow",
      style: "Futuristic vibe",
    },
    {
      id: "variation-3",
      url: productVariation3,
      title: "Pastel Dream",
      style: "Instagram ready",
    },
  ];

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Photo Variations
          </h2>
          <p className="text-lg text-muted-foreground">
            Here are stunning variations of your product photo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockVariations.map((variation, index) => (
            <Card 
              key={variation.id} 
              className="group cursor-pointer shadow-card hover:shadow-elegant transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(variation.url)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={variation.url}
                  alt={variation.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                
                {/* Original badge */}
                {variation.isOriginal && (
                  <div className="absolute top-3 left-3 bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Original
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-background/90 hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(variation.id);
                    }}
                  >
                    <Heart 
                      className={cn(
                        "w-4 h-4",
                        favorites.has(variation.id) ? "fill-red-500 text-red-500" : ""
                      )} 
                    />
                  </Button>
                </div>
                
                {/* Bottom action buttons */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1 bg-background/90 hover:bg-background"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-background/90 hover:bg-background"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold mb-1">{variation.title}</h3>
                <p className="text-sm text-muted-foreground">{variation.style}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Large image modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full animate-scale-in">
              <img
                src={selectedImage}
                alt="Selected variation"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSelectedImage(null)}
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};