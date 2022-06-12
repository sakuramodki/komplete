import React from 'react';
import ProductList from './components/ProductList/ProductList';
import VersionChooser from './components/VersionChooser';
import {Container, CssBaseline} from '@mui/material';
import Header from './components/Header';
import {RecoilRoot} from 'recoil';

export const VersionContext = React.createContext({});

const App = () => {
  return (
    <RecoilRoot>
      <CssBaseline/>
      <Header/>
      <Container maxWidth="md">
        <VersionChooser/>
        <ProductList/>
      </Container>
    </RecoilRoot>
  );
};
export default App;
