import { useEffect, useState } from "react"

const useNow = () => {
  const [now, setNow] = useState<Date>(new Date())
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    setIntervalId(id)
  }, [])

  useEffect(() => {
    return () => intervalId && clearInterval(intervalId)
  }, [intervalId])

  return now
}

export default useNow
