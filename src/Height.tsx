import classNames from "classnames/bind"
import { format, formatDistanceToNow } from "date-fns"
import numeral from "numeral"
import { reverse } from "ramda"
import { GENESIS_ANC, GENESIS_MIR } from "./helpers/calc"
import { getNextAirdropDate, getNextAirdropHeight } from "./helpers/calc"
import Contents, { Props as ContentsProps } from "./Contents"
import styles from "./Height.module.scss"

const cx = classNames.bind(styles)

const FMT = "MMM d (E) aa HH:mm"
const IMAGE_MIR = "https://whitelist.mirror.finance/images/MIR.png"
const IMAGE_ANC = "https://whitelist.anchorprotocol.com/logo/ANC.png"

interface Props {
  height: number
  now: Date
  index?: number
}

const Height = ({ height, now, index = 0 }: Props) => {
  const nextAidropHeightMIR = getNextAirdropHeight(GENESIS_MIR, height, index)
  const nextAidropHeightANC = getNextAirdropHeight(GENESIS_ANC, height, index)
  const nextAirdropDateMIR = getNextAirdropDate(GENESIS_MIR, height, index, now)
  const nextAirdropDateANC = getNextAirdropDate(GENESIS_ANC, height, index, now)

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

  const renderContents = (props: ContentsProps) => (
    <Contents {...props} key={props.title} />
  )

  return (
    <>
      {sorted.map(({ img, text, contents }) => (
        <section className={cx(styles.card, { dim: index })} key={text}>
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

export default Height
