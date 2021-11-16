import Image from 'next/image'
import styles from './styles.module.scss'

export function EmptyScreen() {
  return (
    <div className={styles.container}>
      <h3>Nothing here</h3>
      <Image width="306" height="270" src="/images/cobweb.svg" alt="Cobweb" />
    </div>
  )
}
