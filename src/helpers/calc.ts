import { addSeconds } from "date-fns"

const BLOCK_TIME = 6.47 // seconds
export const GENESIS_MIR = 920000
export const GENESIS_ANC = 2179600
const INTERVAL = 100000

export const getNextAirdropHeight = (
  genesis: number,
  height: number,
  index = 0
) => {
  const rest = genesis % INTERVAL
  return (
    Math.ceil((height - rest) / INTERVAL) * INTERVAL + rest + INTERVAL * index
  )
}

export const getNextAirdropDate = (
  genesis: number,
  height: number,
  index = 0,
  now: Date
) => {
  const nextHeight = getNextAirdropHeight(genesis, height, index)
  const distance = (nextHeight - height) * BLOCK_TIME
  const nextDate = addSeconds(now, distance)
  return nextDate
}
