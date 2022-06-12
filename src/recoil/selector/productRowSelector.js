// eslint-disable-next-line no-unused-vars
import {selector} from 'recoil';
import {modeState, versionAState, versionBState} from '../atoms/atoms';
import products from '../../data/products.json';
import includes from '../../data/includes.json';

const displayMode = (mode, includeA, includeB) => {
  switch (mode) {
    case 'compare':
      return includeA || includeB;
    case 'diff':
      return includeA !== includeB;
    case 'only_a':
      return includeA && !includeB;
    case 'only_b':
      return !includeA && includeB;
    default:
      return true;
  }
};
export const productRowSelector = selector(({
  key: 'productRowSelector',
  get: ({get}) => {
    const versionA = get(versionAState);
    const versionB = get(versionBState);
    const mode = get(modeState);


    return products.map((product, index) => {
      const include = includes[index];
      const includeA = include.includes(parseInt(versionA));
      const includeB = include.includes(parseInt(versionB));
      const display = displayMode(mode, includeA, includeB);

      return {
        name: product.name,
        includeA,
        includeB,
        display,
      };
    });
  },
}));
