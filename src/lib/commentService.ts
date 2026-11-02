import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { dummyComments, CommentItem } from '@/data/portfolioData'

export const fetchCommentsService = async (): Promise<CommentItem[]> => {
  if (!isSupabaseConfigured) {
    return dummyComments
  }

  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return dummyComments
    }

    return data as CommentItem[]
  } catch {
    return dummyComments
  }
}

export const likeCommentService = async (
  id: number,
  currentLikes: number
) => {
  const newLikes = (currentLikes || 0) + 1

  if (!isSupabaseConfigured) {
    return newLikes
  }

  try {
    const { error } = await supabase
      .from('comments')
      .update({ likes: newLikes })
      .eq('id', id)

    if (error) {
      console.warn('Supabase like error, fallback locally:', error.message)
    }
  } catch {
    // continue with optimistic update
  }

  return newLikes
}

export const uploadCommentImageService = async (
  image: File
) => {
  if (!isSupabaseConfigured) {
    return URL.createObjectURL(image)
  }

  try {
    const fileName = `${Date.now()}-${image.name}`

    const { error } = await supabase.storage
      .from('comments')
      .upload(fileName, image)

    if (error) throw error

    const { data } = supabase.storage
      .from('comments')
      .getPublicUrl(fileName)

    return data.publicUrl
  } catch {
    return URL.createObjectURL(image)
  }
}

export const createCommentService = async ({
  name,
  comment,
  imageUrl,
}: {
  name: string
  comment: string
  imageUrl: string | null
}): Promise<CommentItem> => {
  const mockComment: CommentItem = {
    id: Date.now(),
    name,
    comment,
    image_url: imageUrl,
    likes: 0,
    replies: [],
    is_pinned: false,
    created_at: new Date().toISOString(),
  }

  if (!isSupabaseConfigured) {
    return mockComment
  }

  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          name,
          comment,
          image_url: imageUrl,
          likes: 0,
          replies: [],
          is_pinned: false,
        },
      ])
      .select()
      .single()

    if (error) {
      console.warn('Supabase comment insert failed, using fallback:', error.message)
      return mockComment
    }

    return (data as CommentItem) || mockComment
  } catch {
    return mockComment
  }
}
