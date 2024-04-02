'use client'

import Head from 'next/head';
import NextLink from 'next/link'
import getGameDetailBySlug from '@/services/getGameDetailBySlug';
import api from '@/api/api';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useQuery } from '@tanstack/react-query';

import useBookmarkGame from '@/hooks/useBookmarkGame';

import { HiBookmark } from "react-icons/hi2";
import {
  Heading,
  Text,
  Box,
  Flex,
  Badge,
  Link,
  Img,
  Button,
  Divider,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import Layout from '@/components/layouts';
import Breadcrumb from '@/components/breadcrumb'
import ModalBookmarkedUserComponent from '@/components/game/modal-bookmarkedby';
import ContentGameComponent from '@/components/game/content-game';

import { IGameDetail } from '@/dtos/game.dto'

interface IGameDetailPageProps {
  initialData: {
    statusCode: number,
    data : IGameDetail,
    nextCursor: string
  }
}

const GameDetailPage = (props: IGameDetailPageProps ) => {
  const router = useRouter();
  const { slug } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['gameDetail', slug],
    queryFn: () => getGameDetailBySlug(slug),
    initialData: props.initialData,
  });

  const bookmark = useBookmarkGame();
  const handleBookmark = async (e: { preventDefault: () => void; }) => {
    bookmark(data.data.id)
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Layout >
      {data && data.data ? (
        <>
          <Head>
            <title>{data.data.title}</title>
          </Head>
          <Breadcrumb />
          <Flex direction="column" p={8}>
            <Flex gap='2'>
              <Box
                borderWidth="1px"
                borderColor="gray.900"
                mr={5}
              >
                <Img
                  src={data.data.imageUrl}
                  w={300}
                  h={400}
                  objectFit={'cover'}
                  padding={2}
                  bg={'gray.700'}
                  boxShadow="md"
                  borderWidth="1px"
                  borderColor="gray.900"
                />
              </Box>
              <VStack 
                flexDirection="column" 
                align='left' 
                justifyContent="center"
                spacing={2}
                >
                <Heading as="h3" size='lg'>{data.data.title}</Heading>
                <Text fontSize="md">
                  Release Date: {dayjs(data.data.releaseDate).format('DD MMMM YYYY')}
                </Text>

                <Text fontSize="sm">
                  Genre:
                  <Link as={NextLink} href={`/genre/${data.data.genre.slug}`}>
                    <Badge ml={2} variant="solid">
                      {data.data.genre.name}
                    </Badge>
                  </Link>
                </Text>

                <Text 
                  fontSize={'sm'} 
                  onClick={onOpen} 
                  _hover={{ opacity: 0.7, cursor: "pointer" }}>Bookmarked by <b>{data.data._count.bookmarkedBy} users</b>
                </Text>

                <Button
                  size='sm'
                  colorScheme='messenger'
                  onClick={handleBookmark}
                  mt={7}
                  w={120}
                  leftIcon={<HiBookmark />}>
                  Bookmark
                </Button>

              </VStack>
            </Flex>
            <Box
              p={8}
              mt={10}
              alignItems='center'
              bg={'gray.700'}
              boxShadow="md"
              borderWidth="1px"
              borderColor="gray.900"
            >
              <ContentGameComponent content={data.data.content} />

              <Divider mt={4} />
            </Box>
          </Flex>

          <ModalBookmarkedUserComponent 
            countBookmarkeduser={data.data._count.bookmarkedBy}
            dataBookmarkedUser={data.data.bookmarkedBy} 
            isOpen={isOpen} 
            onClose={onClose}
          />
        </>
      ) : null}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;
  const response = await api.get(`/public/game/${slug}`);

  return {
    props: {
      initialData: response.data
    },
  };
};

export default GameDetailPage;
