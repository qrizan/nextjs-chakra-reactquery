import { 
  Button, 
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerOverlay, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input, 
  Stack 
} from "@chakra-ui/react"

import InputFieldNoSpaceComponent from '@/components/input-field-no-space';

import { IUser } from '@/dtos/user.dto';

interface IEditProfileComponentProps { 
  dataUser: IUser; 
  handleChange: (e: any) => void; 
  handleSubmit: (e: any) => void; 
  isOpen: boolean; 
  onClose: () => void; 
}

const EditProfileComponent = (props: IEditProfileComponentProps) => {
  
  const { dataUser, handleChange, handleSubmit, isOpen, onClose } = props

  return (
    <Drawer
    isOpen={isOpen}
    placement='right'
    onClose={onClose}
    size='md'
  >
    <DrawerOverlay />
    <DrawerContent bg={'gray.800'}>
      <DrawerCloseButton />
      <DrawerHeader borderBottomWidth='1px'>
        Edit Profile
      </DrawerHeader>

      <DrawerBody>
        <Stack spacing='24px'>
          <Flex direction="column">
            <FormControl id="email" mb={4}>
              <FormLabel>Username</FormLabel>
              <InputFieldNoSpaceComponent
                type="username" 
                name="username" 
                value={dataUser && dataUser.username} 
                onChange={handleChange} 
                />
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email Address</FormLabel>
              <InputFieldNoSpaceComponent 
                type="email" 
                name="email" 
                value={dataUser && dataUser.email} 
                onChange={handleChange} 
              />
             </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <InputFieldNoSpaceComponent 
                type="password" 
                name="password" 
                value={dataUser.password} 
                onChange={handleChange} 
              />
            </FormControl>
          </Flex>
        </Stack>
      </DrawerBody>

      <DrawerFooter borderTopWidth='1px'>
        <Button colorScheme='messenger' variant='outline' mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme='messenger' onClick={handleSubmit}>Submit</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}

export default EditProfileComponent;