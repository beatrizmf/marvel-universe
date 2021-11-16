interface Thumbnail {
  path: string
  extension: string
}
export interface Character {
  id: number
  name: string
  description: string
  thumbnail: Thumbnail
  comics: {
    available: number
  }
  series: {
    available: number
  }
}

export interface Comic {
  id: number
  title: string
  thumbnail: Thumbnail
  description: string
}
