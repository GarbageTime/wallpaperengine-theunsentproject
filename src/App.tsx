import { FunctionComponent, useCallback, useEffect, useMemo, useRef } from "react"
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

  const { name, delay } = useWallpaperEngine({ backgroundRef })

  const setPostsNumber = postsNumber.use.setPostsNumber()
  const totalPostsNumber = postsNumber.use.postsNumber()

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["theunsentproject", name, totalPostsNumber],
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

  const handleBackgroundColorChange = useCallback((value: string) => {
    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundColor = value
    }
  }, [])

  const handleNameChange = useCallback((value: string) => {
    window.wallpaperPropertyListener.applyUserProperties({
      name: {
        value
      }
    })
  }, [])

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
        import.meta.env.DEV && <div className="bg-black p-2 flex items-center justify-center gap-2 *:bg-white *:px-4 *:py-2">
          <div>
            <input
              type="text"
              className="w-60"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>

          <button
            onClick={() => handleNameChange("")}
          >
            Clear name
          </button>

          <div>
            <input
              type="color"
              className="w-60"
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
            />
          </div>

          <button onClick={() => refetch()}>
            Refetch
          </button>
        </div>
      }
    </main>
  )
}

export default App
