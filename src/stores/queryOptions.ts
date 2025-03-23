import { createSelectors } from "$/utils/zustand"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type RequestParamsStore = {
  name: string
  setName: (name: string) => void
  delay: number
  setDelay: (delay: number) => void
}

const useRequestParams = create<RequestParamsStore>()(
  immer(
    (set) => ({
      name: "",
      setName: (name: string) => set({ name }),
      delay: 60,
      setDelay: (delay: number) => set({ delay }),
    })
  )
)


export const requestParams = createSelectors(useRequestParams)

export default useRequestParams
