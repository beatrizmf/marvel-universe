import { FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import styles from './styles.module.scss'

export function BackToHome() {
  return (
    <Link passHref href="/#characters">
      <FiArrowLeft className={styles.arrow} size="2.6rem" />
    </Link>
  )
}
