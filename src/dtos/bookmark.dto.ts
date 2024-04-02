export interface IBookmarkData {
  createdAt: string,
  game: {
    id: string,
    title: string,
    slug: string,
    imageUrl: string,
    createdAt: string,
    genre: {
      name: string
    }
  }
}

export interface IBookmarkedUser {
  user : {
    avatar: string,
    createdAt: string,
  ​​  username: string
  }
}