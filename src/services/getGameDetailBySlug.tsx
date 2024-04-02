import api from '@/api/api';

const getGameDetailBySlug = async (slug: string | string[] | undefined) => {
  try {
    const response = await api.get(`/public/game/${slug}`);

    return response.data;
  } catch (error) {
    throw new Error('Error get data game'); 
  }
};

export default getGameDetailBySlug;


