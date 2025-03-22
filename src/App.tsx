import { FunctionComponent } from "react"
import Card from "$/components/Card"
import { DefaultError, keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Post, PostsResponse } from "$/types/theunsentproject"
import { queryUrl } from "$/utils/url"

const App: FunctionComponent = () => {

  const { data: post, isPending, isError } = useQuery<PostsResponse, DefaultError, Post>({
    queryKey: ["theunsentproject"],
    queryFn: async () => {
      const res = await axios.get<PostsResponse>(queryUrl())
      return res.data
    },
    select: (data) => {
      const items = data.posts
      return items[Math.floor(Math.random()*items.length)];
    },
    placeholderData: keepPreviousData
  })

  return (
    <main className="w-screen h-screen grid place-items-center bg-black">
      {
        isPending || isError
          ? <Card name="atlantis" message="a message to myself." color="light-blue" />
          : <Card name={post.name} message={post.message} color={post.color} />
      }
    </main>
  )
}

export default App
