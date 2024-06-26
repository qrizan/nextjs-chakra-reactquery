import React from "react";
import { GetServerSideProps } from "next";
import { useInfiniteQuery } from '@tanstack/react-query';

import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import api from '@/api/api';
import getGames from "@/services/getGames";

import { 
  SimpleGrid, 
  Text, 
  Heading, 
  Center, 
  Box,
  Spinner
} from "@chakra-ui/react";
import GameCard from "@/components/game-card";
import Layout from '@/components/layouts';
import SearchBarComponent from "@/components/search-bar";

import { IGame } from '@/dtos/game.dto'
import Head from "next/head";

interface IHomeProps {
  initialData: {
    statusCode: number,
    data : IGame[],
    nextCursor: string
  }
}

const Home = (props: IHomeProps ) => {

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['games'],
    queryFn: ({ pageParam }) => getGames(pageParam, undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    initialData: { pages: [props.initialData], pageParams: [] },
  })

  const lastElementRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Layout >
      <Head>
          <title>Games Catalog</title>
      </Head>
      <Center
        h="30vh"
        bgImage="url('/header/background.png')"
        bgSize="cover"
        bgPosition="center"
        mb={4}
        flexDirection="column"
        borderWidth="1px"
        borderColor="gray.900"
        boxShadow={'lg'}
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
        />
        <Heading mb={3} fontSize="2xl" color="white" zIndex="1">Welcome to Games Catalog</Heading>
        <Text color="white" zIndex="1">Search for your favourites game</Text>
        <Box p={4}>
          <SearchBarComponent />
        </Box>
      </Center>
      <SimpleGrid columns={[1, 2, 4, 5]} spacing='10px'>
        {data && data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((game: IGame) => (
              <GameCard key={game.id} game={game} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>

      <div ref={lastElementRef}></div>
      <Box my={'8'} display="flex" justifyContent="center" alignItems="center">
        { isFetching && !isFetchingNextPage && <Spinner />}
      </Box>     
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  
  const response = await api.get('/public/games/?cursor=undefined');

  return {
    props: {
      initialData: response.data
    },
  };
};

export default Home;
