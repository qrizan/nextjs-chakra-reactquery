import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const checkAuthentication = async (token: string | undefined | null) => {
  if (!token) {
    return false;
  }
  
  try {
    const decodedToken = jwtDecode(token);
    const isValidExpiration = decodedToken && 
      typeof decodedToken.exp === 'number' && 
      decodedToken.exp * 1000 > Date.now();
    
    if (!isValidExpiration) {
      Cookies.remove('token');
      Cookies.remove('user');
    }
    
    return isValidExpiration;
  } catch (error) {
    Cookies.remove('token');
    Cookies.remove('user');
    return false;
  }


};
