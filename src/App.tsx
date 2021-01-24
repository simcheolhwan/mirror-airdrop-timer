import AirdopTimer from "./AirdropTimer"
import useMantleHeight from "./hooks/useMantleHeight"
import useNow from "./hooks/useNow"

const App = () => {
  const height = useMantleHeight()
  const now = useNow()
  return height && now ? <AirdopTimer height={height} now={now} /> : null
}

export default App
