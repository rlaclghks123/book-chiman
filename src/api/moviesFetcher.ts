import { api } from '.';

export async function moviesFetcher() {
  const { data } = await api.get(`/movies`);
  return data;
}
