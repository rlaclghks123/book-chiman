import { api } from '.';

interface Props {
  id: string | undefined;
}

export async function movieDetailFetcher({ id }: Props) {
  const { data } = await api.get(`/movies/${id}`);

  return data;
}
