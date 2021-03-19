import Heading from "./Heading"
import Height from "./Height"
import useMantleHeight from "./hooks/useMantleHeight"
import useNow from "./hooks/useNow"

const App = () => {
  const height = useMantleHeight()
  const now = useNow()
  return !(height && now) ? null : (
    <>
      <Heading height={height} />
      <Height height={height} now={now} />
      <Height height={height} now={now} index={1} />
      <Height height={height} now={now} index={2} />
      <Height height={height} now={now} index={3} />
    </>
  )
}

export default App
