import { useQuery } from '@tanstack/react-query';
import { movieDetailFetcher } from '../../api/movieDetailFetcher';

interface Props {
  id: string | undefined;
}

export const useMovieDetail = ({ id }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => movieDetailFetcher({ id }),
  });
  return {
    data,
    isLoading,
    isError,
  };
};
