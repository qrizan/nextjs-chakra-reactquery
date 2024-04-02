import api from '@/api/api';
import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const updateProfile = async (data: any) => {
  const token = Cookies.get('token');

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.patch('/profile/update', data, config);

    return response.data;
  } catch (error) {
    throw new Error('Error update data profile');
  }
};

export default updateProfile;
