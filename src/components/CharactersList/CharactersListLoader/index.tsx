import { ProfileShimmer } from 'react-content-shimmer'
import styles from './styles.module.scss'

export function CharactersListLoader() {
  return (
    <div className={styles.container}>
      <ProfileShimmer
        background="#eaeaea"
        rows={8}
        size={{ height: 470, width: 250 }}
        rounded="1rem"
      />
    </div>
  )
}
