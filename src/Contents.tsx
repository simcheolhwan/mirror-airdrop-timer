import styles from "./Contents.module.scss"

export interface Props {
  title: string
  content: string
}

const Contents = ({ title, content }: Props) => (
  <article className={styles.article} key={title}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.content}>{content}</p>
  </article>
)

export default Contents
