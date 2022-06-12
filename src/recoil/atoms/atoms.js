import {atom} from 'recoil';
import verseions from '../../data/versions.json';

export const versionAState = atom({
  key: 'versionA',
  default: verseions[0].id,
});
export const versionBState = atom({
  key: 'versionB',
  default: verseions[verseions.length - 1].id,
});
export const modeState = atom({
  key: 'mode',
  default: 'compare',
});
