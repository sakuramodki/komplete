import {selector} from 'recoil';
import {versionAState, versionBState} from '../atoms/atoms';
import versions from '../../data/versions.json';

export const bundleNameSelector = selector({
  key: 'bundleNameSelector',
  get: ({get}) => {
    const versionA = get(versionAState);
    const versionB = get(versionBState);

    const kompleteA = versions.filter((v) => v.id === parseInt(versionA))[0];
    const kompleteB = versions.filter((v) => v.id === parseInt(versionB))[0];

    return {
      kompleteA,
      kompleteB,
    };
  },
});
