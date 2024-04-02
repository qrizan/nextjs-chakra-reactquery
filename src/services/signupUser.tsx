import api from '@/api/api';

const registerUser = async (data: any) => {
  try {
    const response = await api.post('/auth/register', data);

    return response.data;
  } catch (error) {
    throw new Error('Error register user');
  }
};

export default registerUser;
