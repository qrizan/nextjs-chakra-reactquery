'use client'

import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useInfiniteQuery } from '@tanstack/react-query';

import api from '@/api/api';
import getGamesByGenre from '@/services/getGamesByGenre';

import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import { Flex, SimpleGrid, Spinner, Box } from '@chakra-ui/react';
import GameCard from '@/components/game-card';
import Layout from '@/components/layouts';
import Breadcrumb from '@/components/breadcrumb';

import { IGame } from '@/dtos/game.dto'

interface IGenrePageProps {
  initialData: {
    statusCode: number,
    data : IGame[],
    nextCursor: string
  }
}

const GenrePage = (props: IGenrePageProps) => {
  const router = useRouter();
  const { slug } = router.query;

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
    queryKey: ['gamesbygenre', slug],
    queryFn: ({ pageParam }) => getGamesByGenre(pageParam, slug),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [props.initialData], pageParams: [] },
  })
  
  const lastElementRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Layout >
      <Head>
        <title>Games By Genre</title>
      </Head>
      <Breadcrumb />
      <Flex direction="column" p={8} align="center" justify="center">
        <SimpleGrid columns={[1, 2, 4, 5]} spacing={2}>
          {data && data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data[0].game.map((game: IGame) => (
                <GameCard key={game.id} game={game} />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
        <div ref={lastElementRef}></div>
        <Box my={'8'} display="flex" justifyContent="center" alignItems="center">
          { isFetching && !isFetchingNextPage && <Spinner />}
        </Box>  
      </Flex>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const slug = params?.slug;
  const response = await api.get(`/public/genre/${slug}/?cursor=undefined`);

  return {
    props: { 
      initialData : response.data
    },
  };
};

export default GenrePage;
