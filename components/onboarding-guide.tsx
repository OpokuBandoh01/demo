import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function OnboardingGuide() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-64 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <h3 className="font-semibold mb-2">Welcome to SlideBank!</h3>
      <ul className="text-sm space-y-2">
        <li>🔍 Use the search bar to find slides</li>
        <li>📚 Filter slides by course</li>
        <li>📊 Toggle between grid and list views</li>
        <li>💾 Save slides for quick access</li>
        <li>📤 Share and download slides easily</li>
      </ul>
      <Button className="mt-4 w-full" onClick={() => setIsOpen(false)}>
        Got it!
      </Button>
    </div>
  )
}