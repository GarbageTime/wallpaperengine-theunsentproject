import { RefObject, useEffect, useState } from "react"
import { floatToHex } from "$/utils/colors"
import { postsNumber } from "$/stores/postsNumber"

type Options = {
  backgroundRef: RefObject<HTMLDivElement | null>
}

const useWallpaperEngine = ({
  backgroundRef,
}: Options) => {
  const [name, setName] = useState<string>()
  const [delay, setDelay] = useState<number>(60)
  const setPostsNumber = postsNumber.use.setPostsNumber()

  useEffect(() => {
    window.wallpaperPropertyListener = {
      applyUserProperties: function (properties: any) {
        if (properties.background) {
          const [red, green, blue] = properties.background.value.split(" ")
          if (backgroundRef.current) {
            backgroundRef.current.style.backgroundColor = floatToHex(red, green, blue)
          }
        }

        if (properties.delay) {
          setDelay(properties.delay.value)
        }

        if (properties.name) {
          setName(properties.name.value)
          setPostsNumber(0)
        }
      },
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
