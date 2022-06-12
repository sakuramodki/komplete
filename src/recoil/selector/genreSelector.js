import {selector} from 'recoil';
import genres from '../../data/genres.json';
import {subGenreSelector} from './subGenreSelector';

export const genreSelector = selector({
  key: 'genreSelector',
  get: ({get}) => {
    const subGenres = get(subGenreSelector);

    return genres.genre.map((genre) => {
      const subGenreIds = genre.subGenres.filter(
          (subGenreId) => subGenres[subGenreId].display,
      );
      const display = subGenreIds.length > 0;

      return {
        name: genre.name,
        id: genre.id,
        subGenreIds,
        display,
      };
    });
  },
});
