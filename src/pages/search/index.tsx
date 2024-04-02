import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useInfiniteQuery } from '@tanstack/react-query';

import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import api from '@/api/api';
import getGames from "@/services/getGames";

import { 
  Flex, 
  SimpleGrid, 
  Text, 
  Box,
  Spinner
} from "@chakra-ui/react";
import GameCard from "@/components/game-card";
import Layout from '@/components/layouts';
import Breadcrumb from "@/components/breadcrumb";

import { IGame } from '@/dtos/game.dto'

interface ISearchPageProps {
  keyword: string,
  initialData: {
    statusCode: number,
    data : IGame[],
    nextCursor: string
  }
}


const SearchPage = (props: ISearchPageProps) => {

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
    queryFn: ({ pageParam }) => getGames(pageParam, props.keyword),
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
        <title>Search: {props.keyword}</title>
      </Head>
      <Breadcrumb />
      <Flex direction="column" p={8} align="center" justify="center">
      <Text mb={5}>Search Results for: {props.keyword} </Text>
      <SimpleGrid columns={[1, 2, 4, 5]} spacing='10px'>
        {data && data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((game: IGame) => (
              <GameCard key={game.id} game={game} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
      </Flex>
      <div ref={lastElementRef}></div>
      <Box my={'8'} display="flex" justifyContent="center" alignItems="center">
        { isFetching && !isFetchingNextPage && <Spinner />}
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query;
  const response = await api.get(`/public/games/?cursor=undefined&keyword=${q}`);

  return {
    props: {
      keyword: q || '', 
      initialData: response.data
    },
  };
};

export default SearchPage;
