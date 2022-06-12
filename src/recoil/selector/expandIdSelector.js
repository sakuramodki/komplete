import {selector} from 'recoil';
import {genreSelector} from './genreSelector';
import {subGenreSelector} from './subGenreSelector';

export const expandIdSelector = selector({
  key: 'expandIdSelector',
  get: ({get}) => {
    const genres = get(genreSelector);
    const subGenres = get(subGenreSelector);

    const genreIds = genres
        // .filter((genre) => genre.display)
        .map((genre) => `g-${genre.id}`);

    const subGenreIds = subGenres
        // .filter((subGenre) => subGenre.display)
        .map((subGenre) => `s-${subGenre.id}`);

    return genreIds.concat(subGenreIds);
  },
});
