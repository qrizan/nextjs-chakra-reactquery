import api from '@/api/api';
import Cookies from 'js-cookie';

const loginUser = async (data: any) => {
  try {
    const response = await api.post('/auth/login', data);

    Cookies.set('token', response.data.accessToken, { secure: true, sameSite: "strict" });
    Cookies.set('user', JSON.stringify(response.data.user), { secure: true, sameSite: "strict" });

    return response.data;
  } catch (error) {
    throw new Error('Error login user');
  }
};

export default loginUser;
