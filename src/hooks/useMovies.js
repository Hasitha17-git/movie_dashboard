import { useQuery } from 'react-query';
import { fetchMovies } from '../api/omdbApi';
 
export const useMovies = (query, page) => {
  return useQuery(['movies', query, page], () => fetchMovies(query, page), {
    keepPreviousData: true,
  });
};