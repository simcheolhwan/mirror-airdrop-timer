import { getNextAirdropHeight } from "./calc"

test("Next airdop height", () => {
  expect(getNextAirdropHeight(950000)).toBe(1020000)
  expect(getNextAirdropHeight(1250000)).toBe(1320000)
  expect(getNextAirdropHeight(1319999)).toBe(1320000)
  expect(getNextAirdropHeight(1320001)).toBe(1420000)
})
