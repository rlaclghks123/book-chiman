import { useQuery } from '@tanstack/react-query';
import { reviewReadFetcher } from '../../api/reviewReadFetcher';

interface Props {
  id: string | undefined;
}

export const useReadReview = ({ id }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => reviewReadFetcher({ id }),
  });
  return {
    data,
    isLoading,
    isError,
  };
};
