import { Key } from "react"

import { 
  Avatar,
  Box, 
  Button, 
  Flex, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Text 
} from "@chakra-ui/react"
import dayjs from "dayjs"

import { IBookmarkedUser } from '@/dtos/bookmark.dto'

interface IModalBookmarkedUserComponentProps { 
  onClose: () => void,
  isOpen: boolean,
  dataBookmarkedUser : IBookmarkedUser[],
  countBookmarkeduser: number
}

const ModalBookmarkedUserComponent = (props: IModalBookmarkedUserComponentProps ) => {

  const { onClose, isOpen, dataBookmarkedUser, countBookmarkeduser } = props

  return (
    <Modal
    size={'sm'}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
  >
    <ModalOverlay />
    <ModalContent bg={'gray.700'} borderRadius={0}>
      <ModalHeader>Bookmarked By</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box maxH="30vh" overflowY="auto">
          {
            dataBookmarkedUser && dataBookmarkedUser.map((item: IBookmarkedUser, index: Key) => (
              <Flex key={index} my={3} alignItems={'center'}>
                <Avatar src={`${process.env.NEXT_PUBLIC_API_BACKEND}${item.user.avatar}`} />
                <Box ml='3'>
                  <Text fontWeight='bold'>
                    {item.user.username}
                  </Text>
                  <Text fontSize='sm'>Joined: {dayjs(item.user.createdAt).format('DD MMMM YYYY')}</Text>
                </Box>
              </Flex>
            ))
          }
        </Box>
      </ModalBody>
      <ModalFooter alignItems={'center'} justifyContent={'center'}>
        <Button size={'xs'}>+ {countBookmarkeduser - dataBookmarkedUser.length} Users</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>    
  ) 
}

export default ModalBookmarkedUserComponent;