import { GENGRES } from '../constants/movie';

export function toStringGenresWithComma(genreIds: number[]) {
  const filteredNames = GENGRES.filter((genre) => genreIds.includes(genre.id)).map(
    (genre) => genre.name
  );
  return filteredNames.slice(0, 2).join(', ');
}
