'use client'

import React, { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { AxiosRequestConfig } from 'axios';
import Head from 'next/head';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';

import withAuth from '@/HOC/withAuth';
import getTokenFromCookies from '@/utils/getTokenFromCookies';
import { checkAuthentication } from '@/utils/checkAuthentication';
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import api from '@/api/api';
import getProfileUser from '@/services/getProfileUser';
import updateProfile from '@/services/updateProfile';
import uploadAvatar from '@/services/uploadAvatar';

import {
  Box,
  Flex,
  useDisclosure,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import Layout from '@/components/layouts';
import EditProfileComponent from '@/components/profile/edit-profile';
import PersonalDataComponent from '@/components/profile/personal-data';
import ListBookmarkedComponent from '@/components/profile/list-bookmarked';

import { IUserProfile } from '@/dtos/user.dto';

interface IProfilePageProps {
  initialData: {
    statusCode: number,
    data : IUserProfile,
    nextCursor: string
  }
}
const ProfilePage = (props: IProfilePageProps) => {

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
    queryKey: ['profileUser'],
    queryFn: ({ pageParam }) => getProfileUser(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [props.initialData], pageParams: [] },
  })

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [formData, setFormData] = useState({
    username: data.pages[0].data.username,
    email: data.pages[0].data.email,
    password: '',
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutationUpdateProfile = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      onClose();
      refetch();
      toast({
        title: 'Success',
        status: 'success',
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        status: 'error',
        isClosable: true,
      })
    },
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    mutationUpdateProfile.mutate(formData);
  };

  const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    mutationUploadAvatar.mutate(file);
  }

  const mutationUploadAvatar = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      refetch();
      toast({
        title: 'Success',
        status: 'success',
        isClosable: true,
      })
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

  const handleImageClick = () => {
    const avatarInput = document.getElementById("avatarInput") as HTMLInputElement;
    if (avatarInput) {
      avatarInput.click();
    }
  };

  const lastElementRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <Layout >
      <Head>
        <title>{data.pages[0].data.username}</title>
      </Head>
      <Box>
        <PersonalDataComponent 
          datauser={data.pages[0].data} 
          onOpen={onOpen}
          handleChangeAvatar={handleChangeAvatar}
          handleImageClick={handleImageClick}
        />
        <Flex direction="column" align="center" justify="center" my={8}>
          <ListBookmarkedComponent dataBookmarked={data.pages} refetch={refetch}/>

          <div ref={lastElementRef}></div>
          <Box my={'8'} display="flex" justifyContent="center" alignItems="center">
            { isFetching && !isFetchingNextPage && <Spinner />}
          </Box>
        </Flex>
      </Box>

      <EditProfileComponent 
        dataUser={formData} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        isOpen={isOpen}
        onClose={onClose}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;
  const token = await getTokenFromCookies(cookies)
  const isAuthenticated = await checkAuthentication(token)

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const profileUser = await api.get('/profile/?cursor=undefined', config);

  return {
    props: {
      initialData: profileUser.data
    },
  };
};


export default withAuth(ProfilePage)
