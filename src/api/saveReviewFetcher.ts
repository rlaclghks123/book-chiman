import { api } from '.';
import { Review } from '../types/reviews';

export async function saveReviewFetcher(payload: Omit<Review, 'id'>) {
  const response = await api.post('/reviews', payload);
  return response;
}
