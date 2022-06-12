import {selector} from 'recoil';
import {productRowSelector} from './productRowSelector';
import genres from '../../data/genres.json';

export const subGenreSelector = selector({
  key: 'subGenreSelector',
  get: ({get}) => {
    const products = get(productRowSelector);

    return genres.subGenre.map((subGenre) => {
      const productIds = subGenre.products.filter(
          (productId) => products[productId].display,
      );
      const display = productIds.length > 0;
      return {
        name: subGenre.name,
        id: subGenre.id,
        productIds,
        display,
      };
    });
  },
});
