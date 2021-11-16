import Head from 'next/head'
import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Image from 'next/image'
import { Character } from '../types'
import { api } from '../services/api'
import styles from '../styles/home.module.scss'
import { CharactersList } from '../components/CharactersList'
import { GetStaticProps } from 'next'

interface HomeProps {
  initialCharacters: Character[]
}

export default function Home({ initialCharacters }: HomeProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [nameContains, setNameContains] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const [orderBySort, setOrderBySort] = useState('ascending')

  function getParams() {
    const params = {
      limit: 20,
      orderBy: (orderBySort === 'descending' ? '-' : '') + orderBy
    }

    if (nameContains.trim().length > 0) {
      Object.assign(params, { name: nameContains })
    }

    return params
  }

  function fetchCharacters() {
    setIsLoading(true)

    api.get('/characters', { params: getParams() }).then(res => {
      setCharacters(res.data.data.results)
      setIsLoading(false)
    })
  }

  function changeOrderBy(newOrderBy: string) {
    setOrderBy(newOrderBy)
    fetchCharacters()
  }

  function toggleOrderSort() {
    setOrderBySort(orderBySort === 'ascending' ? 'descending' : 'ascending')
    fetchCharacters()
  }

  function Hero() {
    return (
      <main className={styles.heroContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome!</span>
          <h1>
            Explore all <span>Marvel</span> universe
          </h1>
          <p>See the characters, favorite and follow their latest releases.</p>

          <ScrollLink
            type="button"
            className={styles.heroCTAbutton}
            to="characters"
            smooth={true}
            offset={-100}
            duration={800}
          >
            Explore Now
          </ScrollLink>
        </section>

        <div className={styles.heroCover}>
          <Image
            width="336"
            height="422"
            src="/images/hero.png"
            alt="Stan Lee"
          />
        </div>
      </main>
    )
  }

  function searchBar() {
    return (
      <>
        <div className={styles.searchBarInputArea}>
          <input
            value={nameContains}
            onChange={e => setNameContains(e.target.value || '')}
            type="text"
            placeholder="Type full character name (e.g. Spider-Man, Iron Man)"
          />

          <button
            className={styles.searchBarSubmitButton}
            type="button"
            onClick={fetchCharacters}
          >
            Search
          </button>
        </div>

        <div className={styles.searchBarTools}>
          <div className={styles.searchBarOrderBy}>
            <span>Order by: </span>
            <button
              type="button"
              disabled={orderBy === 'name'}
              onClick={() => changeOrderBy('name')}
              className={
                orderBy === 'name'
                  ? styles.searchBarOrderBySelected
                  : styles.searchBarOrderByNotSelected
              }
            >
              Name
            </button>

            <button
              type="button"
              disabled={orderBy === 'modified'}
              onClick={() => changeOrderBy('modified')}
              className={
                orderBy === 'modified'
                  ? styles.searchBarOrderBySelected
                  : styles.searchBarOrderByNotSelected
              }
            >
              Modified
            </button>
          </div>

          <div
            onClick={toggleOrderSort}
            className={styles.searchBarOrderBySort}
          >
            <FaArrowUp
              size={20}
              className={
                orderBySort === 'ascending'
                  ? styles.searchBarOrderBySortActive
                  : ''
              }
            />
            <FaArrowDown
              size={20}
              className={
                orderBySort === 'descending'
                  ? styles.searchBarOrderBySortActive
                  : ''
              }
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Marvel Universe</title>
        <meta name="description" content="Marvel Universe" />
      </Head>

      <div className={styles.containerWithSpacer}>
        <Hero />
        <section id="characters" className={styles.charactersSection}>
          <h2>Marvel Characters List</h2>
          {searchBar()}

          <CharactersList isLoading={isLoading} characters={characters} />
        </section>
      </div>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const characters = await api
    .get('/characters', { params: { limit: 20 } })
    .then(res => res.data.data.results)
    .catch(() => [])

  return {
    props: { initialCharacters: characters },
    revalidate: 3600000 * 24 // 1 day
  }
}
