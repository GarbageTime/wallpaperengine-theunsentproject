import { colors } from "$/constants/colors"

export type PostsResponse = {
  posts: Array<Post>
  count: number
}

export type Post = {
  id: string
  name: string
  message: string
  color: keyof typeof colors
  oldPostSlug: string
  createdAt: string
  updatedAt: string
  isReported: boolean
  isHidden: boolean
  isReviewed: boolean
}
