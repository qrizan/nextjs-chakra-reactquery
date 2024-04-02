'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import React from 'react';

interface IUserCookies {
  avatar?: string,
  email?: string,
  username?: string,
  role?:string,
}

const checkAuth = () => {
  const token = Cookies.get('token');
  const userCookies = Cookies.get("user")
  const user: IUserCookies = (userCookies) ? JSON.parse(userCookies) : null;    

  if (token && user.role == 'USER') {
    return true;
  }else{
    return false;
  }
};

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!checkAuth()) {
        Cookies.remove('token');
        Cookies.remove('user');
        router.push('/signin');
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;