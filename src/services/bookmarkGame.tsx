import api from '@/api/api';
import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const bookmarkGame = async (gameId: string) => {
  const token = Cookies.get('token');

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.get(`/bookmark/${gameId}`, config);
    return response.data
    

  } catch (error) {
    throw new Error('Error bookmark');
  }
};

export default bookmarkGame;


