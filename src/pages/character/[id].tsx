import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { api } from '../../services/api'
import { Character, Comic } from '../../types'
import { MdMenuBook, MdMovie } from 'react-icons/md'
import Image from 'next/image'
import styles from './styles.module.scss'
import { BackToHome } from '../../components/BackToHome'
import { useFavorite } from '../../hooks/useFavorite'
import { FavoriteButton } from '../../components/FavoriteButton'
interface CharacterProps {
  character: Character
  lastComics: Comic[]
}

export default function CharacterPage({
  character,
  lastComics
}: CharacterProps) {
  const { id, name, description, thumbnail, comics, series } = character

  const { toggleFavoriteCharacter, isCharacterFavorite } = useFavorite()
  return (
    <>
      <Head>
        <title>{name} - Marvel Universe</title>
        <meta name="description" content={`${name} - Marvel Universe`} />
      </Head>

      <BackToHome />

      <div className={styles.mainContainer}>
        <div className={styles.mainCoverContainer}>
          <Image
            width="216"
            height="324"
            src={`${thumbnail.path}/portrait_incredible.${thumbnail.extension}`}
            alt={name}
          />
        </div>

        <div className={styles.containerAside}>
          <div className={styles.titleArea}>
            <h2>{name}</h2>
            <FavoriteButton
              isFavorite={isCharacterFavorite(id)}
              onClick={() => toggleFavoriteCharacter(character)}
            />
          </div>
          <p>{description}</p>

          <div className={styles.infoCardsArea}>
            <div className={styles.infoCard}>
              <h3>Comics</h3>
              <div>
                <MdMenuBook size="1.5rem" /> <span>{comics.available}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Movies</h3>
              <div>
                <MdMovie size="1.5rem" /> <span>{series.available}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lastComics.length > 0 && (
        <div className={styles.lastComicsContainer}>
          <h2>Last Comics</h2>

          <div className={styles.lastComics}>
            {lastComics.map(comic => (
              <div className={styles.comicConteiner} key={comic.id}>
                <div className={styles.comic}>
                  <Image
                    className={styles.comicCover}
                    width="216"
                    height="324"
                    src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <h4>{comic.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const character = await api
    .get(`/characters/${id}`)
    .then(res => res.data.data.results[0])
    .catch(() => null)

  if (!character) {
    return {
      notFound: true
    }
  }

  const lastComics = await api
    .get(`/characters/${id}/comics`, {
      params: {
        orderBy: 'onsaleDate',
        limit: 10
      }
    })
    .then(res => res.data.data.results)
    .catch(() => [])

  return {
    props: { character, lastComics },
    revalidate: 60 * 60 * 24 // 1 day
  }
}
