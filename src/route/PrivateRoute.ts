import { checkAuthentication } from '@/utils/checkAuthentication';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {

    const isValidToken = checkAuthentication(token);

    setIsValidToken(!!isValidToken);

    if (!isValidToken) {
      router.push('/signin');
    }
  }, [router, token]);

  return isValidToken ? children : null;
};

export default PrivateRoute;
