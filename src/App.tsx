import { FunctionComponent } from "react"
import Card from "$/components/Card"

const App: FunctionComponent = () => {
  return (
    <main className="w-screen h-screen grid place-items-center bg-black">
      <Card name="atlantis" message="a message to myself." color="light-blue" />
    </main>
  )
}

export default App
