import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query

  if (typeof slug !== "string") {
    return res.status(400).json({ message: "Invalid slug" })
  }

  if (req.method === "GET") {
    try {
      const comments = await prisma.comment.findMany({
        where: { 
          postSlug: slug,
          visible: true 
        },
        orderBy: { createdAt: "desc" },
      })
      return res.status(200).json(comments)
    } catch (error) {
      console.error("Error fetching comments:", error)
      return res.status(500).json({ message: "Error fetching comments" })
    }
  }

  if (req.method === "POST") {
    try {
      const { author, content } = req.body

      if (!author || !content) {
        return res.status(400).json({ message: "Missing required fields" })
      }

      const comment = await prisma.comment.create({
        data: {
          postSlug: slug,
          author,
          content,
          visible: false, // Comments are hidden by default
        },
      })

      return res.status(201).json(comment)
    } catch (error) {
      console.error("Error creating comment:", error)
      return res.status(500).json({ message: "Error creating comment" })
    }
  }

  return res.status(405).json({ message: "Method not allowed" })
}
