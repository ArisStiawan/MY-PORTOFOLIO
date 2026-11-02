'use client'

import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import {
  fetchCommentsService,
  createCommentService,
  likeCommentService,
  uploadCommentImageService,
} from '@/lib/commentService'
import { CommentItem } from '@/data/portfolioData'

export type { CommentItem }

export default function useComments() {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadComments = async () => {
      try {
        const data = await fetchCommentsService()
        if (isMounted) {
          setComments(data || [])
        }
      } catch (err) {
        console.error('Error fetching comments:', err)
      }
    }

    loadComments()

    if (!isSupabaseConfigured) {
      return () => {
        isMounted = false
      }
    }

    const channel = supabase
      .channel('comments-live')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        async () => {
          const data = await fetchCommentsService()
          if (isMounted) {
            setComments(data || [])
          }
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  const addComment = async ({
    name,
    comment,
    image,
  }: {
    name: string
    comment: string
    image: File | null
  }) => {
    if (!name.trim()) return { success: false, error: 'Name is required' }
    if (!comment.trim()) return { success: false, error: 'Comment is required' }

    setLoading(true)

    try {
      let imageUrl: string | null = null

      if (image) {
        imageUrl = await uploadCommentImageService(image)
      }

      const newComment = await createCommentService({
        name,
        comment,
        imageUrl,
      })

      // instant UI update (tanpa nunggu realtime)
      setComments((prev) => [newComment, ...prev])
      return { success: true, data: newComment }
    } catch (err) {
      console.error('Error adding comment:', err)
      return { success: false, error: err }
    } finally {
      setLoading(false)
    }
  }

  const likeComment = async (
    id: number,
    currentLikes: number
  ) => {
    const liked = localStorage.getItem(`liked-${id}`)

    if (liked) return

    try {
      const newLikes = await likeCommentService(
        id,
        currentLikes
      )

      localStorage.setItem(`liked-${id}`, 'true')

      setComments((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, likes: newLikes }
            : item
        )
      )
    } catch (err) {
      console.error('Error liking comment:', err)
    }
  }

  return {
    comments,
    loading,
    addComment,
    likeComment,
  }
}
