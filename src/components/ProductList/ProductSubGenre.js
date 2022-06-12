import * as React from 'react';
import {TreeItem} from '@mui/lab';
import ProductTable from './ProductTable';
import {useRecoilValue} from 'recoil';
import {subGenreSelector} from '../../recoil/selector/subGenreSelector';

const ProductSubGenre = (props) => {
  // eslint-disable-next-line react/prop-types
  const {subGenreIds} = props;

  const subGenreList = useRecoilValue(subGenreSelector);

  // eslint-disable-next-line react/prop-types
  const subGenres = subGenreIds.map((id) => subGenreList[id]);
  return (
    <React.Fragment>
      {
        subGenres.map((subGenre) => {
          if (subGenre.display) {
            if (subGenre.name === '') {
              return (
                <ProductTable
                  productIds={subGenre.productIds}
                  key={subGenre.id}
                />
              );
            } else {
              return (
                <TreeItem
                  nodeId={`s-${subGenre.id}`}
                  label={subGenre.name}
                  key={subGenre.id}
                >
                  <ProductTable productIds={subGenre.productIds}/>
                </TreeItem>
              );
            }
          } else {
            return null;
          }
        })
      }
    </React.Fragment>
  );
};

export default ProductSubGenre;
