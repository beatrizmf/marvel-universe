import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'

import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marvel Universe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Marvel Universe</h1>

        <p className={styles.description}>
          Browse between all Marvel comic characters.
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
