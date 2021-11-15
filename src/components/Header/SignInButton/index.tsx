import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
// import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss'

export function SignInButton() {
  const [session] = [{ user: { name: 'bea' } }] // useSession()
  function SignIn() {
    return (
      <button
        type="button"
        className={styles.signInButton}
        // onClick={() => signIn('github')}
      >
        <FaGithub color="#e3e3e3" />
        Sign in with Github
      </button>
    )
  }
  function SignOut() {
    return (
      <button
        type="button"
        className={styles.signInButton}
        // onClick={() => signOut()}
      >
        <FaGithub color="#04d361" />
        {session.user?.name}
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    )
  }
  return session ? <SignOut /> : <SignIn />
}
