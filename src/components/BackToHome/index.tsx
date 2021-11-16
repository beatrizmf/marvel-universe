import { FiArrowLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

export function BackToHome() {
  const router = useRouter()
  return (
    <FiArrowLeft
      onClick={() => router.push('/#characters')}
      className={styles.arrow}
      size="2.6rem"
    />
  )
}
