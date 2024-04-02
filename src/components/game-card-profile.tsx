import NextLink from 'next/link'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { checkAuthentication } from '@/utils/checkAuthentication';

import bookmarkGame from '@/services/bookmarkGame';

import { HiBookmarkSlash } from "react-icons/hi2";
import {
  Card,
  CardBody,
  Heading,
  Link,
  Box,
  Img,
  Text,
  Button,
  useToast,
  Icon,
  Tooltip,
  Flex
} from '@chakra-ui/react';

import { IGame } from '@/dtos/game.dto'

interface IGameCardProfileComponentProps {
  game: IGame; 
  refetchData: () => void;
}

const GameCardProfileComponent = (props: IGameCardProfileComponentProps) => {
  const { game, refetchData } = props;
  const token = Cookies.get('token');
  const router = useRouter();
  const toast = useToast();
  
  const mutation = useMutation({
    mutationFn: bookmarkGame,
    onSuccess: (data) => {
      refetchData(),
        toast({
          title: 'Success',
          status: 'success',
          description: data.message,
          isClosable: true,
        });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        status: 'error',
        description: error.message,
        isClosable: true,
      })
    },
  });

  const handleBookmark = async (e: { preventDefault: () => void; }) => {
    const isAuthenticated = await checkAuthentication(token)

    if (isAuthenticated) {
      e.preventDefault();
      mutation.mutate(game.id);
    } else {
      router.push('/signin');
    }

  };

  return (
    <Card
      borderRadius={0}
      direction={'row'}
      overflow='hidden'
      bg={'gray.700'} 
      color={'gray.300'}
      height={'120'}
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.900"
      >
     <Box position="absolute" top={0} right={0}>
       <Tooltip label='UnBookmark' placement='top'>
            <Button colorScheme='messenger' size='xs' onClick={handleBookmark}>
              <Icon as={HiBookmarkSlash} />
            </Button>
          </Tooltip>      
      </Box>

      <Img
        objectFit='cover'
        maxW={'120'}
        maxH={'120'}
        p={2}
        src={game.imageUrl}
        alt={game.title}
      />
      <Flex alignItems="center">
        <CardBody>
        <Link as={NextLink} href={`/game/${game.slug}`} >
          <Heading size='xs'>{game.title}</Heading>
          </Link>
          <Text fontSize='xs' mt={2}>Genre: {game.genre.name}</Text>
        </CardBody>
      </Flex>
    </Card>
  )
};

export default GameCardProfileComponent;