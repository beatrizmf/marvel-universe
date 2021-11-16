import { ActiveLink } from './ActiveLink'
import { SignInButton } from './SignInButton'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <span className={styles.headerTitle}>Marvel Universe</span>

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Explore</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/favorites">
            <a>Favorites</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
