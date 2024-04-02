import React, { Key } from "react"
import { SimpleGrid } from "@chakra-ui/react"
import GameCardProfile from "../game-card-profile"

import { IBookmarkData } from '@/dtos/bookmark.dto'

interface IGroupDate { 
  data: { 
    bookmarks: IBookmarkData[]; 
  }; 
}

interface IListBookmarkedComponentProps { 
  dataBookmarked: any; 
  refetch: any 
}

const ListBookmarkedComponent = (props: IListBookmarkedComponentProps ) => {
  const { dataBookmarked, refetch } = props
  
  return (
    <SimpleGrid columns={2} spacing={2} width={'100%'} >
    {dataBookmarked && dataBookmarked.map((group: IGroupDate , i: Key ) => (
      <React.Fragment key={i}>
        {group.data.bookmarks.map((bookmark: IBookmarkData) => (
          <GameCardProfile key={bookmark.game.id} game={bookmark.game} refetchData={refetch} />
        ))}
      </React.Fragment>
    ))}

  </SimpleGrid>    
  )
}

export default ListBookmarkedComponent