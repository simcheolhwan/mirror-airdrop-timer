import { format, formatDistanceToNow } from "date-fns"
import numeral from "numeral"
import { reverse } from "ramda"
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

  const headingContents = [
    {
      title: "Latest block",
      content: numeral(height).format(),
    },
  ]

  const timerContents = [
    {
      img: { src: IMAGE_MIR, alt: "MIR" },
      text: formatDistanceToNow(nextAirdropDateMIR, { addSuffix: true }),
      contents: [
        {
          title: "Next airdrop block",
          content: numeral(nextAidropHeightMIR).format(),
        },
        {
          title: "Next airdrop date (estimated)",
          content: format(nextAirdropDateMIR, FMT),
        },
      ],
    },
    {
      img: { src: IMAGE_ANC, alt: "ANC" },
      text: formatDistanceToNow(nextAirdropDateANC, { addSuffix: true }),
      contents: [
        {
          title: "Next airdrop block",
          content: numeral(nextAidropHeightANC).format(),
        },
        {
          title: "Next airdrop date (estimated)",
          content: format(nextAirdropDateANC, FMT),
        },
      ],
    },
  ]

  const sorted =
    nextAidropHeightMIR < nextAidropHeightANC
      ? timerContents
      : reverse(timerContents)

  const renderContents = ({ title, content }: Contents) => (
    <article className={styles.article} key={title}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.content}>{content}</p>
    </article>
  )

  return (
    <>
      <section className={styles.latest}>
        {headingContents.map(renderContents)}
      </section>

      {sorted.map(({ img, text, contents }) => (
        <section className={styles.card}>
          <h1 className={styles.heading}>
            <img {...img} width={30} height={30} alt={img.alt} />
            {text}
          </h1>
          {contents.map(renderContents)}
        </section>
      ))}
    </>
  )
}

export default AirdopTimer
