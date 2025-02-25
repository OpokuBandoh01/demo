import type React from "react"
import { ArrowLeft, ArrowRight, Lock, Redo } from "lucide-react"

interface MockBrowserFrameProps {
  children: React.ReactNode
}

export function MockBrowserFrame({ children }: MockBrowserFrameProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-200 p-2 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="bg-white border-b flex items-center p-2 space-x-2">
        <ArrowLeft className="text-gray-500 w-4 h-4" />
        <ArrowRight className="text-gray-500 w-4 h-4" />
        <Redo className="text-gray-500 w-4 h-4" />
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
          <Lock className="text-green-500 w-4 h-4 mr-2" />
          <span className="text-gray-800">myslidebank.com</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

