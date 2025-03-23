import { createSelectors } from "$/utils/zustand"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type PostsNumberStore = {
  postsNumber: number
  setPostsNumber: (postsNumber: number) => void
}

const usePostsNumber = create<PostsNumberStore>()(
  immer(
    persist(
      (set) => ({
        postsNumber: 0,
        setPostsNumber: (postsNumber) => set(() => ({ postsNumber })),
      }),
      {
        name: "posts-number",
        version: 0
      }
    )
  )
)


export const postsNumber = createSelectors(usePostsNumber)

export default usePostsNumber
