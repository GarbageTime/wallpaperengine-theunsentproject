import { FunctionComponent, useEffect, useMemo, useRef } from "react"
import Card from "$/components/Card"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostsResponse } from "$/types/theunsentproject"
import { queryUrl } from "$/utils/url"
import useWallpaperEngine from "$/hooks/useWallpaperEngine"
import { postsNumber } from "$/stores/postsNumber"
import { POSTS_PER_PAGE } from "$/constants/theunsentproject"

const App: FunctionComponent = () => {
  const backgroundRef = useRef<HTMLDivElement>(null)

  const { name, delay, setName } = useWallpaperEngine({ backgroundRef })

  const setPostsNumber = postsNumber.use.setPostsNumber()
  const totalPostsNumber = postsNumber.use.postsNumber()

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["theunsentproject", name],
    queryFn: async () => {
      const randomPage = Math.floor(Math.random() * Math.floor(totalPostsNumber / POSTS_PER_PAGE))
      const url = queryUrl(randomPage, name)
      const res = await axios.get<PostsResponse>(url)
      return res.data
    },
    placeholderData: keepPreviousData,
    refetchInterval: delay * 1000,
    staleTime: 0,
    gcTime: Infinity
  })

  const post = useMemo(() => {
    if (isPending || isError) {
      return undefined
    }

    return data.posts[Math.floor(Math.random() * data.posts.length)]
  }, [isPending, isError, data])

  useEffect(() => {
    setPostsNumber(data?.count ?? 0)
  }, [data])

  return (
    <main
      ref={backgroundRef}
      className="w-screen h-screen grid place-items-center"
    >
      {
        !post
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
