export interface Review {
  id: number;
  movieId: string | undefined;
  review: string;
  like: number;
  createAt: string;
  score: number;
  writeId: string | null;
}

export interface AddLike {
  listId: string | undefined;
  like: number;
}

export interface UpdateReview {
  id: number;
  curReview: string;
  score: number;
}
