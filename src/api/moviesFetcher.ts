import { api } from '.';

interface Props {
  keyword: string;
  curPage: number;
  searchSort: string;
}

export async function moviesFetcher({ keyword, searchSort, curPage }: Props) {
  const params = {
    title: keyword === '' ? null : keyword,
    _page: curPage,
    _limit: 9,
    _order: searchSort === 'title' ? 'asc' : 'desc',
    _sort: searchSort,
  };

  const res = await api.get(`/movies?`, { params });

  return {
    data: res.data,
    totalCount: Number(res.headers['x-total-count']),
  };
}
