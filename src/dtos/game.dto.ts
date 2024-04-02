import { IBookmarkedUser } from '@/dtos/bookmark.dto'

export interface IGame { 
  id: string,
  title: string,
  slug: string,
  imageUrl: string,
  createdAt: string,
  genre: {
    name: string
  }
}

export interface IGameDetail { 
  id: string,
  title: string,
  content: string,
  slug: string,
  imageUrl: string,
  createdAt: string,
  genre: {
    name: string
  },
  _count: {
    bookmarkedBy: number
  },
  bookmarkedBy: IBookmarkedUser[]
}