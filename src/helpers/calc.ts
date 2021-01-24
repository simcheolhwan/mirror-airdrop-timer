import { addSeconds } from "date-fns"

const BLOCK_TIME = 6.65 // seconds
const GENESIS = 920000
const INTERVAL = 100000

export const getNextAirdropHeight = (height: number) =>
  Math.ceil(height / INTERVAL) * INTERVAL + (GENESIS % INTERVAL)

export const getNextAirdropDate = (height: number, now: Date) => {
  const nextHeight = getNextAirdropHeight(height)
  const distance = (nextHeight - height) * BLOCK_TIME
  const nextDate = addSeconds(now, distance)
  return nextDate
}
