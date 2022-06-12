import {FormControl, Grid, InputLabel, NativeSelect} from '@mui/material';
import React from 'react';
import versions from '../data/versions.json';
import {useRecoilState} from 'recoil';
import {modeState, versionAState, versionBState} from '../recoil/atoms/atoms';

const versionList = versions.map((version) => ({
  id: version.id,
  name: version.name,
}));

export const modeList = [
  {id: 'compare', name: 'Compare'},
  {id: 'only_a', name: 'Only in A'},
  {id: 'only_b', name: 'Only in B'},
  {id: 'diff', name: 'Diff'},
  {id: 'all', name: 'All product'},
];

const VersionChooser = () => {
  const [verAValue, updateVerAState] = useRecoilState(versionAState);
  const [verBValue, updateVerBState] = useRecoilState(versionBState);
  const [modeValue, updateModeState] = useRecoilState(modeState);

  return (
    <Grid container spacing={2} marginTop="10px" marginBottom="20px">
      <Grid item xs={12} sm={5}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="version_a">
                        Compare A
          </InputLabel>
          <NativeSelect
            value={verAValue}
            inputProps={{
              name: 'version_a',
              id: 'version_a',
            }}
            onChange={(e) => {
              updateVerAState(parseInt(e.target.value));
            }}
          >
            {versionList.map((version) => <option value={version.id}
              key={version.id}>{version.name}</option>)}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={5}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="version_b">
                        Compare B
          </InputLabel>
          <NativeSelect
            value={verBValue}
            inputProps={{
              name: 'version_b',
              id: 'version_b',
            }}
            onChange={(e) => {
              updateVerBState(parseInt(e.target.value));
            }}
          >
            {versionList.map((version) => <option value={version.id}
              key={version.id}>{version.name}</option>)}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="mode">
                        mode
          </InputLabel>
          <NativeSelect
            value={modeValue}
            inputProps={{
              name: 'mode',
              id: 'mode',
            }}
            onChange={(e) => {
              updateModeState(e.target.value);
            }}
          >
            {modeList.map(
                (mode) =>
                  <option value={mode.id} key={mode.id}>{mode.name}</option>,
            )}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default VersionChooser;
