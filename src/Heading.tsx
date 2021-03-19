import numeral from "numeral"
import Contents from "./Contents"
import styles from "./Heading.module.scss"

const Heading = ({ height }: { height: number }) => {
  const headingContents = {
    title: "Latest block",
    content: numeral(height).format(),
  }

  return (
    <section className={styles.latest}>
      <Contents {...headingContents} />
    </section>
  )
}

export default Heading
