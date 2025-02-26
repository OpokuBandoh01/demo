import Image from "next/image"
import { Clock, Download, Share2, BookmarkCheck, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SlideCardProps {
  title: string
  image: string
  timeAgo: string
  downloads: number
  saved?: boolean
  viewType: "grid" | "list"
  onSave?: () => void
}

export default function SlideCard({
  title,
  image,
  timeAgo,
  downloads,
  saved = false,
  viewType,
  onSave,
}: SlideCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md",
        viewType === "list" ? "flex gap-3" : "flex flex-col",
      )}
    >
      <div
        className={cn(
          "overflow-hidden",
          viewType === "list" ? "h-24 w-24 shrink-0 sm:h-32 sm:w-32" : "aspect-video w-full",
        )}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={225}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          <h3 className="line-clamp-2 font-semibold text-sm sm:text-base">{title}</h3>
          <div className="mt-1 sm:mt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              {timeAgo}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              {downloads} downloads
            </span>
          </div>
        </div>
        <div className="mt-2 sm:mt-4 flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className={cn(
              "h-8 w-8 p-0 sm:h-9 sm:w-9 transition-colors hover:bg-primary/10",
              saved && "text-primary hover:text-primary",
            )}
          >
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            <span className="sr-only">{saved ? "Remove from saved" : "Save slide"}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 sm:h-9 sm:w-9">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="default" size="sm" className="ml-auto h-8 px-2 sm:h-9 sm:px-3">
            <Download className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Download</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

