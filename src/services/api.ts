import axios from 'axios'
import { Md5 } from 'ts-md5/dist/md5'

const publicMarvelKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY || ''
const privateMarvelKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY || ''
const ts = new Date().getTime()
const hashToEnconde = `${ts}${privateMarvelKey}${publicMarvelKey}`
const hash = Md5.hashStr(hashToEnconde)

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    apikey: publicMarvelKey,
    ts,
    hash
  }
})
