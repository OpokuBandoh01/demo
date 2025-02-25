"use client"

import { useState } from 'react'
import { Clock, Download, Heart, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface SlideListProps {
  slide: {
    id: number
    title: string
    course: string
    thumbnail: string
    updatedAt: string
    downloads: number
    fileUrl: string
  }
}

export function SlideList({ slide }: SlideListProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [imageError, setImageError] = useState(false)
  

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast( isSaved ? "Removed from saved" : "Saved successfully",{
      description: isSaved ? "Slide removed from your saved items" : "Slide added to your saved items",
      duration: 2000,
    })
  }

  const handleShare = () => {
    toast( "Share link copied",{
      description: "The link has been copied to your clipboard",
      duration: 2000,
    })
  }

  const handleDownload = () => {
    toast( "Download started",{
      description: "Your download will begin shortly",
      duration: 2000,
    })
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-4 transition-all hover:shadow-md hover:scale-[1.01]">
      <div className="h-20 w-32 overflow-hidden rounded bg-gradient-to-br from-gray-900 to-gray-800">
        <img
          src={imageError ? "/placeholder.svg" : slide.thumbnail}
          alt={`${slide.course} - ${slide.title}`}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-primary-foreground hover:text-primary truncate">
          {slide.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{slide.course}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{slide.updatedAt}</span>
          <span>•</span>
          <span>{slide.downloads} downloads</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant={isSaved ? "default" : "ghost"} 
          size="sm"
          onClick={handleSave}
        >
          <Heart className={`mr-1 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDownload}>
          <Download className="mr-1 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  )
}