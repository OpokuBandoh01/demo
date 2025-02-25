"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your server
    console.log("Feedback submitted:", feedback)
    toast( "Feedback received",{
      description: "Thank you for your feedback!",
      duration: 3000,
    })
    setFeedback("")
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
        <X className="h-4 w-4" />
      </Button>
      <h3 className="font-semibold mb-2">We value your feedback!</h3>
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-2"
        />
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </div>
  )
}

