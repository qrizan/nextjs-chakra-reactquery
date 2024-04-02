import { ChangeEvent } from "react";

import { SmallAddIcon } from "@chakra-ui/icons"
import { 
  Avatar, 
  AvatarBadge, 
  Box, 
  Flex, 
  Heading, 
  Input, 
  WrapItem, 
  Text, 
  Spacer 
} from "@chakra-ui/react"

import dayjs from "dayjs"

import { IUserProfile } from '@/dtos/user.dto';

interface IPersonalDataComponentProps {
  datauser: IUserProfile; 
  handleImageClick: () => void; 
  handleChangeAvatar: (event: ChangeEvent<HTMLInputElement>) => void; 
  onOpen: () => void
}

const PersonalDataComponent = (props: IPersonalDataComponentProps) => {

  const { datauser, handleImageClick, handleChangeAvatar, onOpen } = props

  return (
    <Box p={4} mx="auto" bg={'gray.700'} >
    <Flex align="center" mb={4}>
      <Box 
      mr={10}
      >
      <WrapItem>
        <Avatar 
          size='xl' 
          name={`${datauser.username}`} 
          src={`${process.env.NEXT_PUBLIC_API_BACKEND}${datauser.avatar}`} >{' '}
          <AvatarBadge 
            onClick={handleImageClick}
            borderColor="gray.900" 
            boxSize="1em" 
            bg='gray.300' 
            cursor="pointer">
            <SmallAddIcon w={7} h={7}/>
          </AvatarBadge>              
        </Avatar>

      </WrapItem>
        <Input
          id="avatarInput"
          onChange={handleChangeAvatar}
          type="file"
          display="none"
        />
      </Box>
      <Box>
        <Heading as="h1" size="xl" mb={1}>
          {datauser.username}
        </Heading>
        <Text fontSize="lg" mb={2}>
          {datauser.email}
        </Text>
        <Text fontSize="sm">
          Joined: {dayjs(datauser.createdAt).format('DD MMMM YYYY')}
        </Text>
      </Box>
      <Spacer />
      <Text onClick={onOpen} cursor="pointer" fontSize='sm' mr={5}>Edit</Text>
    </Flex>
  </Box>    
  )
}

export default PersonalDataComponent;