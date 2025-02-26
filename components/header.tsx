import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface HeaderProps {
  onSearch: (term: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold">My Slide Bank</h1>
        <Button variant="default" className="bg-black text-white hover:bg-black/90">
          Upload Slide
        </Button>
      </div>
      <div className="container flex flex-col gap-4 pb-3 sm:pb-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search slides..."
            className="pl-10 md:max-w-[400px] bg-white"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  )
}

