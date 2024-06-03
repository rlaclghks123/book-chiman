export interface Review {
  id: number;
  movieId: string | undefined;
  review: string;
  like: number;
  createAt: string;
  writeId: string | null;
}
