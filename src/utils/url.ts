export const queryUrl = (skip = 0, searchQuery?: string) => {
  return `https://corsproxy.io/?url=${encodeURIComponent(`https://app-api.theunsentproject.com/posts?searchQuery=${searchQuery ?? ""}&skip=${skip}`)}`
}
