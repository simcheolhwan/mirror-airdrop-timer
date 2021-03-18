import { format, formatDistanceToNow } from "date-fns"
import numeral from "numeral"
import { GENESIS_ANC, GENESIS_MIR } from "./helpers/calc"
import { getNextAirdropDate, getNextAirdropHeight } from "./helpers/calc"
import styles from "./AirdropTimer.module.scss"

const FMT = "MMM d (E) aa HH:mm"
const IMAGE_MIR = "https://whitelist.mirror.finance/images/MIR.png"
const IMAGE_ANC = "https://whitelist.anchorprotocol.com/logo/ANC.png"

interface Contents {
  title: string
  content: string
}

const AirdopTimer = ({ height, now }: { height: number; now: Date }) => {
  const nextAidropHeightMIR = getNextAirdropHeight(GENESIS_MIR, height)
  const nextAirdropDateMIR = getNextAirdropDate(GENESIS_MIR, height, now)
  const nextAidropHeightANC = getNextAirdropHeight(GENESIS_ANC, height)
  const nextAirdropDateANC = getNextAirdropDate(GENESIS_ANC, height, now)

  const contents = [
    {
      title: "Latest block",
      content: numeral(height).format(),
    },
  ]

  const contentsMIR = [
    {
      title: "Next airdrop block",
      content: numeral(nextAidropHeightMIR).format(),
    },
    {
      title: "Next airdrop date (estimated)",
      content: format(nextAirdropDateMIR, FMT),
    },
  ]

  const contentsANC = [
    {
      title: "Next airdrop block",
      content: numeral(nextAidropHeightANC).format(),
    },
    {
      title: "Next airdrop date (estimated)",
      content: format(nextAirdropDateANC, FMT),
    },
  ]

  const toNowMIR = formatDistanceToNow(nextAirdropDateMIR, { addSuffix: true })
  const toNowANC = formatDistanceToNow(nextAirdropDateANC, { addSuffix: true })

  const renderContents = ({ title, content }: Contents) => (
    <article className={styles.article} key={title}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.content}>{content}</p>
    </article>
  )

  return (
    <>
      <section className={styles.latest}>
        {contents.map(renderContents)}
      </section>

      <section className={styles.card}>
        <h1 className={styles.heading}>
          <img src={IMAGE_MIR} width={30} height={30} alt="MIR" />
          {toNowMIR}
        </h1>
        {contentsMIR.map(renderContents)}
      </section>

      <section className={styles.card}>
        <h1 className={styles.heading}>
          <img src={IMAGE_ANC} width={30} height={30} alt="ANC" />
          {toNowANC}
        </h1>
        {contentsANC.map(renderContents)}
      </section>
    </>
  )
}

export default AirdopTimer
