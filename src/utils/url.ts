export const queryUrl = (skip = 0, searchQuery?: string) => {
  const unsentProjectApiUrl = new URL("https://app-api.theunsentproject.com/posts")
  const corsProxyUrl = new URL("https://corsproxy.io/")

  unsentProjectApiUrl.searchParams.set("skip", skip.toString())

  if (searchQuery) {
    unsentProjectApiUrl.searchParams.set("searchQuery", searchQuery)
  }

  corsProxyUrl.searchParams.set("url", unsentProjectApiUrl.toString())

  return corsProxyUrl.toString()
}
