import { RefObject, useEffect } from "react"
import { floatToHex } from "$/utils/colors"
import { postsNumber } from "$/stores/postsNumber"
import { requestParams } from "$/stores/queryOptions"

type Options = {
  backgroundRef: RefObject<HTMLDivElement | null>
}

const useWallpaperEngine = ({ backgroundRef }: Options) => {
  const name = requestParams.use.name()
  const setName = requestParams.use.setName()
  const delay = requestParams.use.delay()
  const setDelay = requestParams.use.setDelay()
  const setPostsNumber = postsNumber.use.setPostsNumber()

  useEffect(() => {
    window.wallpaperPropertyListener = {
      applyUserProperties: function (properties: any) {
        if (properties.background) {
          const [red, green, blue] = properties.background.value.split(" ")

          if (backgroundRef.current) {
            backgroundRef.current.style.backgroundColor = floatToHex(
              red,
              green,
              blue
            )
          }
        }

        if (properties.delay) {
          setDelay(properties.delay.value)
        }

        if (properties.name) {
          setPostsNumber(0)
          setName(properties.name.value)
        }
      }
    }

    return () => {
      window.wallpaperPropertyListener = undefined
    }
  }, [])

  return {
    name,
    delay,
    setName
  }
}

export default useWallpaperEngine
