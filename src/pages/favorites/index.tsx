import Head from 'next/head'
import { CharactersList } from '../../components/CharactersList'
import { useFavorite } from '../../hooks/useFavorite'
import styles from './styles.module.scss'

export default function Favorites() {
  const { getFavoriteCharacters } = useFavorite()

  const characters = getFavoriteCharacters()

  return (
    <>
      <Head>
        <title>Favorites - Marvel Universe</title>
        <meta name="description" content="Marvel Universe" />
      </Head>

      <div className={styles.containerWithSpacer}>
        <h2>Favorites</h2>

        <CharactersList isLoading={false} characters={characters} />
      </div>
    </>
  )
}
