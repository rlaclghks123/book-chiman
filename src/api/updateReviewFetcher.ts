import { api } from '.';
import { UpdateReview } from '../types/reviews';

export async function updateReviewFetcher(payload: UpdateReview) {
  const { id, curReview } = payload;
  const response = await api.patch(`/reviews/${id}`, { review: curReview });
  return response;
}
