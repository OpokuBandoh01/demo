"use client"

import { useState, useEffect } from "react"
import { Clock, Download, Heart, Share2, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SlideCardProps {
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

export function SlideCard({ slide }: SlideCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [showUndo, setShowUndo] = useState(false)
  const [imageError, setImageError] = useState(false)
 

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showUndo) {
      timer = setTimeout(() => setShowUndo(false), 5000) // Hide undo after 5 seconds
    }
    return () => clearTimeout(timer)
  }, [showUndo])

  const handleSave = () => {
    setIsSaved(!isSaved)
    setShowUndo(true)
    toast( isSaved ? "Removed from saved" : "Saved successfully",{
      description: isSaved ? "Slide removed from your saved items" : "Slide added to your saved items",
      duration: 2000,
    })
  }

  const handleUndo = () => {
    setIsSaved(!isSaved)
    setShowUndo(false)
    toast( "Action undone",{
      description: isSaved ? "Slide added back to your saved items" : "Slide removed from your saved items",
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
    <TooltipProvider>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
            <img
              src={imageError ? "/placeholder.svg" : slide.thumbnail}
              alt={`${slide.course} - ${slide.title}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="font-semibold text-primary-foreground hover:text-primary line-clamp-2 cursor-help">
                {slide.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view full slide details</p>
            </TooltipContent>
          </Tooltip>
          <p className="mt-1 text-sm text-gray-500">{slide.course}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{slide.updatedAt}</span>
            <span>•</span>
            <span>{slide.downloads} downloads</span>
          </div>
        </CardContent>
        <CardFooter className="border-t p-2">
          <div className="flex w-full justify-between gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={isSaved ? "default" : "ghost"} size="sm" className="flex-1" onClick={handleSave}>
                  <Heart className={`mr-1 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  {isSaved ? "Saved" : "Save"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSaved ? "Remove from saved items" : "Save this slide"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this slide</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="flex-1" onClick={handleDownload}>
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download this slide</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardFooter>
        {showUndo && (
          <div className="absolute bottom-0 left-0 right-0 bg-primary text-white p-2 flex justify-between items-center">
            <span>{isSaved ? "Slide saved" : "Slide removed"}</span>
            <Button variant="ghost" size="sm" onClick={handleUndo} className="text-white hover:text-primary-foreground">
              <Undo2 className="mr-1 h-4 w-4" />
              Undo
            </Button>
          </div>
        )}
      </Card>
    </TooltipProvider>
  )
}

