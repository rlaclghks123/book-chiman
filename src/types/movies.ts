export interface Movie {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
  popularity: number;
  poster_path: string;
  release_date: string;
}
