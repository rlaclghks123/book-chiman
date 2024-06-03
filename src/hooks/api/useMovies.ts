import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { moviesFetcher } from '../../api/moviesFetcher';

interface Props {
  keyword: string;
  curPage: number;
  searchFilter: number;
  searchSort: string;
}

export const useMovies = ({ keyword, searchSort, searchFilter, curPage }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movies', keyword, searchSort, curPage, searchFilter],
    queryFn: () => moviesFetcher({ keyword, searchSort, curPage, searchFilter }),
    placeholderData: keepPreviousData,
  });

  return {
    data: data?.data,
    totalCount: data?.totalCount,
    isLoading,
    isError,
  };
};
