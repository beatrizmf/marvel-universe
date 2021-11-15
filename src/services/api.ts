import axios from 'axios'

const publicMarvelKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY ?? ''

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    apikey: publicMarvelKey
  }
})
