import { useEffect, useState } from "react"
import { floatToHex } from "$/utils/colors"
import { postsNumber } from "$/stores/postsNumber"

const useWallpaperEngine = () => {
  const [name, setName] = useState<string>()
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000")
  const [delay, setDelay] = useState<number>(60)
  const setPostsNumber = postsNumber.use.setPostsNumber()

  useEffect(() => {
    window.wallpaperPropertyListener = {
      applyUserProperties: function (properties: any) {
        if (properties.background) {
          const [red, green, blue] = properties.background.value.split(" ")
          setBackgroundColor(floatToHex(red, green, blue))
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
    backgroundColor,
    name,
    delay,
    setName
  }
}

export default useWallpaperEngine
