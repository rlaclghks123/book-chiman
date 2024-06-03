import { useQuery } from '@tanstack/react-query';
import { moviesFetcher } from '../../api/moviesFetcher';

interface Props {
  keyword: string;
  curPage: number;
  searchSort: string;
}

export const useMovies = ({ keyword, searchSort, curPage }: Props) => {
  console.log(keyword);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', keyword, searchSort, curPage],
    queryFn: () => moviesFetcher({ keyword, searchSort, curPage }),
  });
  return {
    data: data?.data,
    totalCount: data?.totalCount,
    isLoading,
    isError,
  };
};
