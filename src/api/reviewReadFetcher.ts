import { api } from '.';

interface Props {
  id: string | undefined;
}

export async function reviewReadFetcher({ id }: Props) {
  const { data } = await api.get(`/reviews?movieId=${id}`);

  return data;
}
