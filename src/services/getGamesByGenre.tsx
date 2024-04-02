import api from '@/api/api';

const getGamesByGenre = async (pageParam: string | undefined, slug: string | string[] | undefined) => {
  const cursor = pageParam !== undefined ? `?cursor=${pageParam}` : '';

  try {
    const response = await api.get(`/public/genre/${slug}/${cursor}`);

    return response.data;
  } catch (error) {
    throw new Error('Error get games by genre');  
  }
};

export default getGamesByGenre;
