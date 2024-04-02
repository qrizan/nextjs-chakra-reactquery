import { useEffect, useState } from 'react';
import NextLink from 'next/link'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

import { 
  Button, 
  Flex, 
  Link, 
  Stack 
} from '@chakra-ui/react';
import { IoGameController } from "react-icons/io5";

const Header: React.FC = () => {
  const [token, setToken] = useState('');
  const router = useRouter()

  const cookiesToken = Cookies.get('token');
  useEffect(() => {
    if (cookiesToken) {
      setToken(cookiesToken);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const signOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/")
  }

  return (
      <Flex
        mb={[8, 12]}
        w="full"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          m="0 auto"
          px={5}
          h="7vh"
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex="999"
          bg="gray.800"
          boxShadow="md"       
          borderWidth="1px"
          borderColor="gray.900"   
        >
          <Flex >
            <Link as={NextLink} href="/" passHref mr={2} fontWeight="bold" fontSize="xl">
            <Flex
              alignItems="center"
              justifyContent="start"
              gap='2'
            >
             <IoGameController/> Games Catalog
            </Flex>
            </Link>
          </Flex>
          {
            token ? (
              <Stack direction='row' spacing={4}>

                <Button colorScheme='messenger' as={NextLink} href="/profile" passHref mr={2}>
                  Profile
                </Button>
                <Button colorScheme='messenger' onClick={signOut}>
                  Sign Out
                </Button>
              </Stack>

            ) : (
              <Stack direction='row' spacing={4}>
                <Button colorScheme='messenger' as={NextLink} href="/signin" passHref mr={2}>
                  Sign In
                </Button>
                <Button colorScheme='messenger' as={NextLink} href="/signup">
                  Sign Up
                </Button>
              </Stack>
            )
          }

        </Flex>
      </Flex>
  );
};

export default Header;