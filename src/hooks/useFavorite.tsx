import { createContext, useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Character, Comic } from '../types'

interface FavoriteContext {
  getFavoriteCharacters(): Character[]
  toggleFavoriteCharacter(character: Character): void
  // toggleFavoriteComic(comic: Comic): void

  isCharacterFavorite(characterId: number): boolean
  // isComicFavorite(comicId): boolean
}

const FavoriteContext = createContext<FavoriteContext>({} as FavoriteContext)

export const FavoriteProvider: React.FC = ({ children }) => {
  const baseStoragePath = '@marvel-universe-app/favorites'

  const [favoritesCharacters, setFavoritesCharacters] = useState<Character[]>(
    []
  )

  useEffect(() => {
    const storageFavoritesCharacters = JSON.parse(
      localStorage?.getItem(`${baseStoragePath}/characters`) || '[]'
    )

    setFavoritesCharacters(storageFavoritesCharacters)
  }, [])

  // function toggleFavoriteComic(comic: Comic) {
  // }

  function isCharacterFavorite(characterId: number) {
    return (
      favoritesCharacters.findIndex(
        character => character.id === characterId
      ) !== -1
    )
  }

  function addFavoriteCharacter(character: Character) {
    if (favoritesCharacters.length === 5) {
      toast('You can only save 5 favorites', { type: 'info' })
      return
    }

    const newFavoritesCharacters = [...favoritesCharacters, character]

    localStorage.setItem(
      `${baseStoragePath}/characters`,
      JSON.stringify(newFavoritesCharacters)
    )

    setFavoritesCharacters(newFavoritesCharacters)
  }

  function removeFavoriteCharacter(characterId: number) {
    const newFavoritesCharacters = favoritesCharacters.filter(
      character => character.id !== characterId
    )

    localStorage.setItem(
      `${baseStoragePath}/characters`,
      JSON.stringify(newFavoritesCharacters)
    )

    setFavoritesCharacters(newFavoritesCharacters)
  }

  function toggleFavoriteCharacter(character: Character) {
    const isFavorite = isCharacterFavorite(character.id)

    if (isFavorite) {
      removeFavoriteCharacter(character.id)
    } else {
      addFavoriteCharacter(character)
    }
  }

  function getFavoriteCharacters() {
    return favoritesCharacters
  }

  // function isComicFavorite(comic: Comic) {
  //   return favoritesComics.findIndex(item => item.id === comic.id) !== -1
  // }

  return (
    <FavoriteContext.Provider
      value={{
        getFavoriteCharacters,
        toggleFavoriteCharacter,
        // toggleFavoriteComic,
        // isComicFavorite,
        isCharacterFavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavorite(): FavoriteContext {
  const context = useContext(FavoriteContext)

  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider')
  }

  return context
}
