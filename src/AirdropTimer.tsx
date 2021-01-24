import { format } from "date-fns"
import { formatDistanceToNow } from "date-fns"
import numeral from "numeral"
import { getNextAirdropDate, getNextAirdropHeight } from "./helpers/calc"
import styles from "./AirdropTimer.module.scss"

const FMT = "EEEE aa HH:mm"

const AirdopTimer = ({ height, now }: { height: number; now: Date }) => {
  const nextAidropHeight = getNextAirdropHeight(height)
  const nextAirdropDate = getNextAirdropDate(height, now)

  const contents = [
    {
      title: "Latest block",
      content: numeral(height).format(),
    },
    {
      title: "Next airdrop block",
      content: numeral(nextAidropHeight).format(),
    },
    {
      title: "Next airdrop date (estimated)",
      content: format(nextAirdropDate, FMT),
    },
    {
      title: "Next airdrop to now (estimated)",
      content: formatDistanceToNow(nextAirdropDate, { addSuffix: true }),
    },
  ]

  return (
    <>
      {contents.map(({ title, content }) => (
        <article className={styles.article} key={title}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.content}>{content}</p>
        </article>
      ))}
    </>
  )
}

export default AirdopTimer
