import { Character } from '../../types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CharactersListLoader } from './CharactersListLoader'
import styles from './styles.module.scss'
import { EmptyScreen } from '../EmptyScreen'
import { FavoriteButton } from '../FavoriteButton'
import { useFavorite } from '../../hooks/useFavorite'
interface CharactersListProps {
  isLoading: boolean
  characters: Character[]
}

export function CharactersList({ isLoading, characters }: CharactersListProps) {
  if (isLoading) {
    return <CharactersListLoader />
  }

  if (characters.length <= 0) {
    return <EmptyScreen />
  }

  const router = useRouter()

  function handleCharacterClick(id: number) {
    router.push(`/character/${id}`)
  }

  const { toggleFavoriteCharacter, isCharacterFavorite } = useFavorite()

  const descriptionMaxLength = 85

  return (
    <div className={styles.charactersList}>
      {characters.map(
        ({ id, name, thumbnail, description, comics, series }) => (
          <div key={id} className={styles.characterCard}>
            <FavoriteButton
              isFavorite={isCharacterFavorite(id)}
              onClick={() =>
                toggleFavoriteCharacter({
                  id,
                  name,
                  thumbnail,
                  description,
                  comics,
                  series
                })
              }
            />

            <Image
              width="250"
              height="250"
              src={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`}
              alt={name}
            />

            <div className={styles.characterCardContent}>
              <h3>{name}</h3>
              {description && (
                <p>
                  {description.length > descriptionMaxLength
                    ? description.slice(0, descriptionMaxLength - 3) + '...'
                    : description}
                </p>
              )}

              <p onClick={() => handleCharacterClick(id)}>See more</p>
            </div>
          </div>
        )
      )}
    </div>
  )
}
