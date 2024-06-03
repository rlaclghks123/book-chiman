import { api } from '.';

interface Props {
  id: number;
}

export async function deleteReviewFetcher({ id }: Props) {
  const { data } = await api.delete(`/reviews/${id}`);

  return data;
}
