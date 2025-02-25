import { FileQuestion } from 'lucide-react'

interface NoResultsProps {
  searchQuery: string;
}

export function NoResults({ searchQuery }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No slides found
      </h3>
      <p className="text-gray-500 max-w-md mb-4">
        {searchQuery ? (
          <>
            No results found for "<span className="font-medium">{searchQuery}</span>".
            <br />
            Please try searching for a different course or topic.
          </>
        ) : (
          "No slides match the selected filters. Try adjusting your search criteria."
        )}
      </p>
      <div className="text-sm text-gray-500">
        Available courses: Artificial Intelligence, Financial Accounting, Linear Programming, Programming with Java
      </div>
    </div>
  )
}