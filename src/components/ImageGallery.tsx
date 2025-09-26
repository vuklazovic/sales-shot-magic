import { useState } from "react";
import { Download, Heart, Share, ChevronLeft, ChevronRight, X, Grid, ArrowLeft } from "lucide-react";
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

interface Generation {
  id: string;
  timestamp: string;
  originalFile?: File;
  variations: ImageVariation[];
}

interface ImageGalleryProps {
  uploadedFile?: File;
}

export const ImageGallery = ({ uploadedFile }: ImageGalleryProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'generations' | 'images'>('generations');

  // Mock generations - in a real app, these would come from the API
  const mockGenerations: Generation[] = [
    {
      id: "gen-1",
      timestamp: "2 minutes ago",
      originalFile: uploadedFile,
      variations: [
        {
          id: "original-1",
          url: uploadedFile ? URL.createObjectURL(uploadedFile) : productOriginal,
          title: "Original",
          style: "Plain background",
          isOriginal: true,
        },
        {
          id: "variation-1-1",
          url: productVariation1,
          title: "Purple Gradient",
          style: "Modern lifestyle",
        },
        {
          id: "variation-1-2",
          url: productVariation2,
          title: "Neon Glow",
          style: "Futuristic vibe",
        },
        {
          id: "variation-1-3",
          url: productVariation3,
          title: "Pastel Dream",
          style: "Instagram ready",
        },
      ]
    },
    {
      id: "gen-2", 
      timestamp: "1 hour ago",
      variations: [
        {
          id: "original-2",
          url: productOriginal,
          title: "Original",
          style: "Plain background",
          isOriginal: true,
        },
        {
          id: "variation-2-1",
          url: productVariation2,
          title: "Neon Glow",
          style: "Futuristic vibe",
        },
        {
          id: "variation-2-2",
          url: productVariation1,
          title: "Purple Gradient", 
          style: "Modern lifestyle",
        },
        {
          id: "variation-2-3",
          url: productVariation3,
          title: "Pastel Dream",
          style: "Instagram ready",
        },
      ]
    },
    {
      id: "gen-3",
      timestamp: "Yesterday",
      variations: [
        {
          id: "original-3",
          url: productOriginal,
          title: "Original",
          style: "Plain background", 
          isOriginal: true,
        },
        {
          id: "variation-3-1",
          url: productVariation3,
          title: "Pastel Dream",
          style: "Instagram ready",
        },
        {
          id: "variation-3-2",
          url: productVariation1,
          title: "Purple Gradient",
          style: "Modern lifestyle",
        },
        {
          id: "variation-3-3",
          url: productVariation2,
          title: "Neon Glow", 
          style: "Futuristic vibe",
        },
      ]
    }
  ];

  // Get all images from selected generation or all generations
  const getAllImages = () => {
    if (selectedGeneration) {
      const generation = mockGenerations.find(g => g.id === selectedGeneration);
      return generation?.variations || [];
    }
    return mockGenerations.flatMap(gen => gen.variations);
  };

  const allImages = getAllImages();

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleImageClick = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : allImages.length - 1;
    } else {
      newIndex = selectedImageIndex < allImages.length - 1 ? selectedImageIndex + 1 : 0;
    }
    setSelectedImageIndex(newIndex);
  };

  const handleGenerationClick = (generationId: string) => {
    setSelectedGeneration(generationId);
    setViewMode('images');
  };

  const handleBackToGenerations = () => {
    setSelectedGeneration(null);
    setViewMode('generations');
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          {viewMode === 'generations' ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Photo Generations
              </h2>
              <p className="text-lg text-muted-foreground">
                Click on any generation to explore all variations
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button variant="ghost" onClick={handleBackToGenerations} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Generations
              </Button>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Generation Images
                </h2>
                <p className="text-lg text-muted-foreground">
                  {mockGenerations.find(g => g.id === selectedGeneration)?.timestamp}
                </p>
              </div>
            </div>
          )}
        </div>

        {viewMode === 'generations' ? (
          // Generations view
          <div className="space-y-8">
            {mockGenerations.map((generation, genIndex) => (
              <div key={generation.id} className="animate-fade-in" style={{ animationDelay: `${genIndex * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{generation.timestamp}</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => handleGenerationClick(generation.id)}
                    className="flex items-center gap-2"
                  >
                    <Grid className="w-4 h-4" />
                    View All ({generation.variations.length})
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {generation.variations.slice(0, 4).map((variation, index) => (
                    <Card 
                      key={variation.id} 
                      className="group cursor-pointer shadow-card hover:shadow-elegant transition-smooth"
                      onClick={() => {
                        setSelectedGeneration(generation.id);
                        handleImageClick(index);
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={variation.url}
                          alt={variation.title}
                          className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-smooth"
                        />
                        
                        {variation.isOriginal && (
                          <div className="absolute top-2 left-2 bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-medium">
                            Original
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                        
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth">
                          <p className="text-white text-sm font-medium truncate">{variation.title}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Images view for selected generation
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allImages.map((variation, index) => (
              <Card 
                key={variation.id} 
                className="group cursor-pointer shadow-card hover:shadow-elegant transition-smooth animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleImageClick(index)}
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
        )}

        {/* Full-screen image modal with navigation */}
        {selectedImageIndex !== null && (
          <div 
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="relative max-w-4xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
              {/* Navigation arrows */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              
              {/* Close button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                onClick={() => setSelectedImageIndex(null)}
              >
                <X className="w-5 h-5" />
              </Button>
              
              {/* Image counter */}
              <div className="absolute top-4 left-4 z-10 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
              
              {/* Main image */}
              <img
                src={allImages[selectedImageIndex]?.url}
                alt={allImages[selectedImageIndex]?.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              
              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-1">{allImages[selectedImageIndex]?.title}</h3>
                <p className="text-muted-foreground mb-3">{allImages[selectedImageIndex]?.style}</p>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="hero" className="flex-1">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleFavorite(allImages[selectedImageIndex]?.id || '')}
                  >
                    <Heart 
                      className={cn(
                        "w-4 h-4",
                        favorites.has(allImages[selectedImageIndex]?.id || '') ? "fill-red-500 text-red-500" : ""
                      )} 
                    />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};