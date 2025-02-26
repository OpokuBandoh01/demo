"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import ViewToggle from "@/components/view-toggle"
import SlideCard from "@/components/slide-card"
import EmptyState from "@/components/empty-state"
import WelcomeTooltip from "@/components/welcome-tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import ChatWidget from "@/components/chat/chat-widget"

const SAMPLE_SLIDES = [
  // Artificial Intelligence Slides
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    image: "https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg",
    timeAgo: "2 days ago",
    downloads: 145,
    course: "Artificial Intelligence",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    image: "https://cdn.pixabay.com/photo/2018/03/06/08/31/technology-3202409_1280.jpg",
    timeAgo: "3 days ago",
    downloads: 167,
    course: "Artificial Intelligence",
  },
  {
    id: 3,
    title: "Neural Networks Architecture",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/1200px-Colored_neural_network.svg.png",
    timeAgo: "1 week ago",
    downloads: 234,
    course: "Artificial Intelligence",
  },
  {
    id: 4,
    title: "Deep Learning Applications",
    image: "https://cdn.pixabay.com/photo/2020/01/26/20/14/computer-4795762_1280.jpg",
    timeAgo: "5 days ago",
    downloads: 198,
    course: "Artificial Intelligence",
  },
  {
    id: 5,
    title: "Natural Language Processing",
    image: "https://cdn.pixabay.com/photo/2017/08/01/08/29/data-2562635_1280.jpg",
    timeAgo: "1 week ago",
    downloads: 176,
    course: "Artificial Intelligence",
  },
  {
    id: 6,
    title: "Computer Vision Basics",
    image: "https://cdn.pixabay.com/photo/2017/05/15/23/53/artificial-intelligence-2316208_1280.jpg",
    timeAgo: "2 weeks ago",
    downloads: 143,
    course: "Artificial Intelligence",
  },

  // Financial Accounting Slides
  {
    id: 7,
    title: "Accounting Principles & Concepts",
    image: "https://cdn.pixabay.com/photo/2017/01/31/23/42/accounting-2026300_1280.jpg",
    timeAgo: "1 week ago",
    downloads: 189,
    course: "Financial Accounting",
  },
  {
    id: 8,
    title: "Balance Sheet Analysis",
    image: "https://cdn.pixabay.com/photo/2016/11/29/06/18/balance-1867141_1280.jpg",
    timeAgo: "2 weeks ago",
    downloads: 156,
    course: "Financial Accounting",
  },
  {
    id: 9,
    title: "Income Statement Overview",
    image: "https://cdn.pixabay.com/photo/2016/11/29/03/36/calculations-1867140_1280.jpg",
    timeAgo: "3 days ago",
    downloads: 134,
    course: "Financial Accounting",
  },
  {
    id: 10,
    title: "Cash Flow Statement Analysis",
    image: "https://cdn.pixabay.com/photo/2015/11/15/22/09/office-1044919_1280.jpg",
    timeAgo: "5 days ago",
    downloads: 198,
    course: "Financial Accounting",
  },
  {
    id: 11,
    title: "Financial Ratios & Metrics",
    image: "https://cdn.pixabay.com/photo/2016/11/29/03/35/analytics-1867142_1280.jpg",
    timeAgo: "1 week ago",
    downloads: 167,
    course: "Financial Accounting",
  },
  {
    id: 12,
    title: "Auditing Fundamentals",
    image: "https://cdn.pixabay.com/photo/2016/11/29/03/34/audit-1867143_1280.jpg",
    timeAgo: "2 weeks ago",
    downloads: 145,
    course: "Financial Accounting",
  },

  // Linear Programming Slides
  {
    id: 13,
    title: "Introduction to Linear Programming",
    image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
    timeAgo: "3 days ago",
    downloads: 167,
    course: "Linear Programming",
  },
  {
    id: 14,
    title: "Simplex Method & Applications",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Simplex-method-3d.png/1200px-Simplex-method-3d.png",
    timeAgo: "5 days ago",
    downloads: 145,
    course: "Linear Programming",
  },
  {
    id: 15,
    title: "Duality Theory",
    image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/math-1839405_1280.jpg",
    timeAgo: "1 week ago",
    downloads: 178,
    course: "Linear Programming",
  },
  {
    id: 16,
    title: "Sensitivity Analysis",
    image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/graph-1839407_1280.jpg",
    timeAgo: "2 weeks ago",
    downloads: 156,
    course: "Linear Programming",
  },
  {
    id: 17,
    title: "Transportation Problems",
    image: "https://cdn.pixabay.com/photo/2015/11/06/13/27/analytics-1026935_1280.jpg",
    timeAgo: "3 weeks ago",
    downloads: 189,
    course: "Linear Programming",
  },
  {
    id: 18,
    title: "Assignment Problems",
    image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/matrix-1839408_1280.jpg",
    timeAgo: "1 month ago",
    downloads: 167,
    course: "Linear Programming",
  },

  // Java Programming Slides
  {
    id: 19,
    title: "Java Fundamentals",
    image: "https://cdn.pixabay.com/photo/2017/04/24/13/37/java-2255416_1280.png",
    timeAgo: "5 days ago",
    downloads: 234,
    course: "Programming with JAVA",
  },
  {
    id: 20,
    title: "Object-Oriented Programming in Java",
    image: "https://cdn.pixabay.com/photo/2017/08/07/19/07/software-2607279_1280.jpg",
    timeAgo: "1 week ago",
    downloads: 189,
    course: "Programming with JAVA",
  },
  {
    id: 21,
    title: "Java Collections Framework",
    image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
    timeAgo: "2 weeks ago",
    downloads: 167,
    course: "Programming with JAVA",
  },
  {
    id: 22,
    title: "Exception Handling in Java",
    image: "https://cdn.pixabay.com/photo/2017/08/07/19/07/error-2607280_1280.jpg",
    timeAgo: "3 weeks ago",
    downloads: 145,
    course: "Programming with JAVA",
  },
  {
    id: 23,
    title: "Multithreading & Concurrency",
    image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/threads-1839409_1280.jpg",
    timeAgo: "1 month ago",
    downloads: 178,
    course: "Programming with JAVA",
  },
  {
    id: 24,
    title: "Java IO & File Handling",
    image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/files-1839410_1280.jpg",
    timeAgo: "1 month ago",
    downloads: 156,
    course: "Programming with JAVA",
  },
];

const COURSES = [
  "All Courses",
  "Artificial Intelligence",
  "Financial Accounting",
  "Linear Programming",
  "Programming with JAVA",
]

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "title", label: "Alphabetical" },
]

export default function Page() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showWelcome, setShowWelcome] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [sortBy, setSortBy] = useState("recent")
  const [savedSlides, setSavedSlides] = useState<number[]>([])

  const filteredAndSortedSlides = useMemo(() => {
    let slides = [...SAMPLE_SLIDES]

    // Filter by course
    if (selectedCourse !== "All Courses") {
      slides = slides.filter((slide) => slide.course === selectedCourse)
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      slides = slides.filter(
        (slide) => slide.title.toLowerCase().includes(searchLower) || slide.course.toLowerCase().includes(searchLower),
      )
    }

    // Sort slides
    return slides.sort((a, b) => {
      switch (sortBy) {
        case "downloads":
          return b.downloads - a.downloads
        case "title":
          return a.title.localeCompare(b.title)
        case "recent":
        default:
          // Convert timeAgo to comparable values (simplified version)
          const getTimeValue = (timeStr: string) => {
            const [num, unit] = timeStr.split(" ")
            const multiplier = unit.includes("month") ? 30 : unit.includes("week") ? 7 : 1
            return Number.parseInt(num) * multiplier
          }
          return getTimeValue(a.timeAgo) - getTimeValue(b.timeAgo)
      }
    })
  }, [selectedCourse, searchTerm, sortBy])

  const toggleSave = (slideId: number) => {
    setSavedSlides((prev) => (prev.includes(slideId) ? prev.filter((id) => id !== slideId) : [...prev, slideId]))
  }

  return (
    <div className="min-h-screen">
      <Header onSearch={setSearchTerm} />
      <main className="container py-4 sm:py-6">
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ViewToggle view={view} onViewChange={setView} />
          <div className="flex gap-2">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAndSortedSlides.length > 0 ? (
          <div
            className={cn(
              "grid gap-3 sm:gap-4",
              view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
            )}
          >
            {filteredAndSortedSlides.map((slide) => (
              <SlideCard
                key={slide.id}
                {...slide}
                viewType={view}
                saved={savedSlides.includes(slide.id)}
                onSave={() => toggleSave(slide.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState searchTerm={searchTerm} />
        )}
      </main>

      {showWelcome && <WelcomeTooltip onClose={() => setShowWelcome(false)} />}

      <ChatWidget />
    </div>
  )
}


