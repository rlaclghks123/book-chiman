import { useQuery } from '@tanstack/react-query';
import { moviesFetcher } from '../../api/moviesFetcher';

interface Props {
  keyword: string;
  searchFilter: string;
  curPage: number;
  searchSort: string;
}

export const useMovies = ({ keyword, searchFilter, searchSort, curPage }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', keyword, searchFilter, searchSort, curPage],
    queryFn: () => moviesFetcher({ keyword, searchFilter, searchSort, curPage }),
  });
  return {
    data: data?.data,
    totalCount: data?.totalCount,
    isLoading,
    isError,
  };
};
