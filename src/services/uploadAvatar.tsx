import api from '@/api/api';
import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const uploadAvatar = async (data: string | Blob) => {
  const token = Cookies.get('token');
  const formData = new FormData();
  formData.append('avatar', data);

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.post('/profile/avatar', formData, config);
    return response.data;
  } catch (error: any) {
    throw new Error('Upload failed'); 
  }
};

export default uploadAvatar;
