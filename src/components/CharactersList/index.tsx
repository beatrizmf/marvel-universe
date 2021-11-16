import { Character } from '../../types'
import Image from 'next/image'

import { CharactersListLoader } from './CharactersListLoader'
import styles from './styles.module.scss'
import { EmptyScreen } from '../EmptyScreen'

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

  const descriptionMaxLength = 85

  return (
    <div className={styles.charactersList}>
      {characters.map(({ id, name, thumbnail, description }) => (
        <a href={`/character/${id}`} key={id} className={styles.characterCard}>
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
            <p>See more</p>
          </div>
        </a>
      ))}
    </div>
  )
}