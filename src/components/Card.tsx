import { FunctionComponent } from "react"
import { colors } from "$/constants/colors"
import { getTextColor } from "$/utils/colors"

type Props = {
  name: string
  message: string
  color: keyof typeof colors
}

const Card: FunctionComponent<Props> = ({ name, message, color }) => {
  const textColor = colors[color].split(", ").map(Number) as [
    number,
    number,
    number
  ]

  return (
    <div className="card-border flex h-[400px] w-[350px] flex-col gap-[5px] bg-white p-[5px]">
      <header>
        <p className="text-center text-lg">To: {name}</p>
      </header>

      <section
        className="flex-1 p-[5px]"
        style={{ backgroundColor: `rgb(${colors[color]})` }}
      >
        <p className="text-2xl" style={{ color: getTextColor(...textColor) }}>
          {message}
        </p>
      </section>

      <footer className="flex justify-between text-lg">
        <b>Send</b>
        <p>#unsentproject x atlantis</p>
        <b>Back</b>
      </footer>
    </div>
  )
}

export default Card
