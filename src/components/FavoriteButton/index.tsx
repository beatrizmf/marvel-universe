import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import styles from './styles.module.scss'

interface FavoriteButtonProps {
  onClick(): void
  isFavorite: boolean
}

export function FavoriteButton({ onClick, isFavorite }: FavoriteButtonProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      {/* eslint-disable-next-line multiline-ternary */}
      {isFavorite ? (
        <BsSuitHeartFill size="1.2rem" />
      ) : (
        <BsSuitHeart size="1.2rem" />
      )}
    </div>
  )
}
