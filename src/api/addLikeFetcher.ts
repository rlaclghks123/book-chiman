import { api } from '.';
import { AddLike } from '../types/reviews';

export async function addLikeFetcher(payload: AddLike) {
  const { listId, like } = payload;
  const response = await api.patch(`/reviews/${listId}`, { like });
  return response;
}
