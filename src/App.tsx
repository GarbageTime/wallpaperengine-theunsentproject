import { FunctionComponent } from "react"
import Card from "$/components/Card"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostsResponse } from "$/types/theunsentproject"
import { queryUrl } from "$/utils/url"
import useWallpaperEngine from "$/hooks/useWallpaperEngine"
import { postsNumber } from "$/stores/postsNumber"
import { POSTS_PER_PAGE } from "$/constants/theunsentproject"

const App: FunctionComponent = () => {
  const { backgroundColor, name, delay, setName } = useWallpaperEngine()
  const setPostsNumber = postsNumber.use.setPostsNumber()
  const totalPostsNumber = postsNumber.use.postsNumber()

  const { data: post, isPending, isError, refetch } = useQuery({
    queryKey: ["theunsentproject", name],
    queryFn: async () => {
      const randomPage = Math.floor(Math.random() * Math.floor(totalPostsNumber / POSTS_PER_PAGE))
      const url = queryUrl(randomPage, name)
      const res = await axios.get<PostsResponse>(url)
      return res.data
    },
    select: (data) => {
      setPostsNumber(data.count)
      const items = data.posts
      return items[Math.floor(Math.random() * items.length)];
    },
    placeholderData: keepPreviousData,
    refetchInterval: delay * 1000,
  })

  return (
    <main
      className="w-screen h-screen grid place-items-center"
      style={{ backgroundColor }}
    >
      {
        isPending || isError
          ? <Card name="atlantis" message="a message to myself." color="light-blue" />
          : <Card name={post.name} message={post.message} color={post.color} />
      }
      {
        import.meta.env.DEV && <div className="flex gap-2 *:bg-white *:px-4 *:py-2">
          <button onClick={() => setName("Aurora")}>
            Set name to Aurora
          </button>
          <button onClick={() => setName(undefined)}>
            Clear name
          </button>
          <button onClick={() => refetch()}>
            Refetch
          </button>
        </div>
      }
    </main>
  )
}

export default App
