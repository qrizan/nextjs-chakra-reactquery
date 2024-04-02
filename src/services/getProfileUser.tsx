import api from '@/api/api';
import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const getProfile = async (pageParam: string | undefined) => {
  const cursor = pageParam !== undefined ? `?cursor=${pageParam}` : '';

  const token = Cookies.get('token');

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.get(`/profile/${cursor}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Error get data profile');
  }
};

export default getProfile;
