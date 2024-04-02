import NextLink from 'next/link'
import {
  Link,
  Box,
  Img,
  Flex,
  Tooltip,
  Icon,
  Button,
  Skeleton
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { HiBookmark } from "react-icons/hi2";
import useBookmarkGame from '@/hooks/useBookmarkGame';

import { IGame } from '@/dtos/game.dto'

interface IGameCardComponentProps {
  game: IGame; 
}

const GameCardComponent = (props: IGameCardComponentProps) => {
  const { game } = props;

  const bookmark = useBookmarkGame();
  const handleBookmark = async (e: { preventDefault: () => void; }) => {
    bookmark(game.id)
  };

  return (
    <Box
      bg={'gray.700'}
      overflow='hidden'
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.900"
      height={290}
    >
      <Link as={NextLink} href={`/game/${game.slug}`} >
        <Box position="relative" display="inline-block">
          <Skeleton
            width="full"
            maxW="sm"
            height={230}
            objectFit="cover"
            isLoaded={!!game.imageUrl}
          >
            <Img
              width="full"
              maxW="sm"
              height={'230'}
              objectFit="cover"
              src={game.imageUrl}
              alt={game.title}
              p={2}
            />
          </Skeleton>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0}
            transition="opacity 0.7s"
            _hover={{ opacity: 1 }}
          >
            <Icon as={ViewIcon} boxSize={16} color="white" />
          </Box>
        </Box>
      </Link>
      <Box py="1" px={2}>
        <Flex justifyContent="space-between" alignContent="center" alignItems="center">
          <Link as={NextLink} href={`/game/${game.slug}`} >
            <Box
              fontSize="xs"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              _hover={{ opacity: 0.7, cursor: "pointer" }}
              noOfLines={[1, 2]}
            >
              {game.title}
            </Box>
          </Link>

          <Tooltip label='Bookmark' placement='top'>
            <Button colorScheme='messenger' size='xs' onClick={handleBookmark}>
              <Icon as={HiBookmark} />
            </Button>
          </Tooltip>

        </Flex>
      </Box>
    </Box>

  )

};

export default GameCardComponent;