import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { LoadingDots } from "@/ui/LoadingDots"
import cx from "clsx"
import React from "react"
import { useRouter } from "next/router"

type Comment = {
  id: string
  author: string
  content: string
  createdAt: string
}

export const CommentSection = ({ slug }: { slug: string }) => {
  const [comments, setComments] = React.useState<Comment[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [author, setAuthor] = React.useState("")
  const [content, setContent] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(true)

  React.useEffect(() => {
    fetchComments()
  }, [slug])

  // Close modal if Escape key is pressed
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${slug}`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !content.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/comments/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, content }),
      })

      if (response.ok) {
        setContent("")
        setAuthor("")
        await fetchComments()
        // Show success message
        alert("Thank you for your comment! It will be visible after review.")
      }
    } catch (error) {
      console.error("Error posting comment:", error)
    }
    setIsLoading(false)
  }

  return (
    <div className="mt-16 space-y-8">
      <div className="flex justify-between align-center">
        <div className="flex justify-between align-center space-x-2">
          <h2 className="text-4xl font-medium text-rose-100/90">Comments</h2>
          <p className="text-4xl font-medium text-rose-100/70">
            ({ comments.length })
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className={cx(
            "flex h-8 w-8 mr-1 mt-1 items-center justify-center rounded-full",
            "bg-gradient-to-tl from-purple-500 to-rose-400",
            "text-rose-100 shadow-lg text-xl font-medium",
            "transition-all duration-200",
            "hover:shadow-purple-500/25",
            FOCUS_VISIBLE_OUTLINE
          )}
        >
          { isModalOpen ? '-' : '+'}
        </button>
      </div>

      {/* Comment Input Modal */}
      {isModalOpen && (
        <div className="mb-8 overflow-hidden">
          <div className="animate-slideDown relative rounded-lg border border-rose-200/10 bg-[#1a1a1a] p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-rose-100/50 hover:text-rose-100"
            >
              ✕
            </button>
            <h3 className="mb-4 text-xl font-medium text-rose-100/90">Add a Comment</h3>
              
              {/* Comment Form */}
              <form 
                onSubmit={(e) => {
                  handleSubmit(e)
                  setIsModalOpen(false)
                }} 
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={cx(
                      "w-full rounded-lg bg-rose-100/5 px-4 py-2 text-rose-100/90 placeholder-rose-100/30",
                      "border border-rose-200/10 focus:border-rose-200/20",
                      "transition-colors duration-200",
                      FOCUS_VISIBLE_OUTLINE
                    )}
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className={cx(
                      "w-full rounded-lg bg-rose-100/5 px-4 py-2 text-rose-100/90 placeholder-rose-100/30",
                      "border border-rose-200/10 focus:border-rose-200/20",
                      "transition-colors duration-200 resize-y",
                      FOCUS_VISIBLE_OUTLINE
                    )}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cx(
                      "rounded-lg px-4 py-2 text-sm font-medium",
                      "bg-gradient-to-tl from-purple-500 to-rose-400",
                      "text-rose-100 shadow-lg",
                      "transition-all duration-200",
                      "hover:shadow-purple-500/25",
                      "disabled:opacity-50",
                      FOCUS_VISIBLE_OUTLINE
                    )}
                  >
                    {isLoading ? <LoadingDots /> : "Post Comment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border border-rose-200/10 bg-rose-100/5 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-rose-100/90">
                {comment.author}
              </span>
              <span className="text-sm text-rose-100/50">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-rose-100/70">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
