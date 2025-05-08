
import React, { useState } from "react";
import { Play, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";

const ClaseItem = ({ clase, onClick }) => {
  const { titulo, descripcion, duracion, completado, video } = clase;

  const isMobile = useIsMobile();
  const handleClick = () => {
    if (onClick) {
      const videoUrl = clase.video;
      
      let youtubeUrl = videoUrl;
     
      if (videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = videoUrl.split('v=')[1].split('&')[0];
        youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes('youtu.be/')) {
        const videoId = videoUrl.split('youtu.be/')[1];
        youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes('youtube.com/')) {
        // extraer el id
        const match = videoUrl.match(/youtube.com\/([^\/?]+)\/([^\/?]+)\/([^\/?]+)/);
        if (match) {
          youtubeUrl = `https://www.youtube.com/embed/${match[3]}`;
        }
      }
      
      // porsia el protocolo
      if (!youtubeUrl.startsWith('http')) {
        youtubeUrl = `https://${youtubeUrl}`;
      }
      
      onClick({ ...clase, video: youtubeUrl + '?autoplay=1'});
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-xl p-4 transition-all hover:shadow-sm cursor-pointer",
        completado 
          ? "border-green-200 bg-green-50" 
          : "border-gray-200 hover:border-secondary/30 hover:bg-secondary/5"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {completado ? (
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
              <Check size={16} className="text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-sm">
              <Play size={16} className="text-white" fill="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-semibold text-gray-800">{titulo}</h4>
            <span className="text-xs text-gray-500 whitespace-nowrap">{duracion}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{descripcion}</p>
          
          {!completado && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 flex items-center gap-2 hover:bg-secondary hover:text-white"
                onClick={handleClick}

              >
                <Play size={14} />
                Ver clase
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaseItem;
