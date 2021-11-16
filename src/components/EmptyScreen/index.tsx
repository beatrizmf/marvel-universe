import Image from 'next/image'
import styles from './styles.module.scss'

interface EmptyScreenProps {
  title?: string
}

export function EmptyScreen({ title }: EmptyScreenProps) {
  return (
    <div className={styles.container}>
      <h3>{title || 'Nothing here'}</h3>
      <Image width="306" height="270" src="/images/cobweb.svg" alt="Cobweb" />
    </div>
  )
}
