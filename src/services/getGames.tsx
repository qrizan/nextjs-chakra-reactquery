import api from '@/api/api';

const getGames = async (pageParam: string | undefined, q: string | undefined) => {
  const cursor = pageParam !== undefined ? pageParam : '';
  const keyword = q !== undefined ? q : '';

  try {
    const url = `/public/games?cursor=${cursor}&keyword=${keyword}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error get data games');
  }
};

export default getGames;


