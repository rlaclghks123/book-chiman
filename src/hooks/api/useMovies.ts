import { useQuery } from '@tanstack/react-query';
import { moviesFetcher } from '../../api/moviesFetcher';

export const useMovies = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies'],
    queryFn: moviesFetcher,
  });

  return { data, isLoading, isError };
};
