import * as React from 'react';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import ProductSubGenre from './ProductSubGenre';
import {useRecoilValue} from 'recoil';
import {genreSelector} from '../../recoil/selector/genreSelector';
import {expandIdSelector} from '../../recoil/selector/expandIdSelector';

const ProductList = () => {
  const genres = useRecoilValue(genreSelector);
  const expandIds = useRecoilValue(expandIdSelector);

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
      defaultExpanded={expandIds}
      sx={{flexGrow: 1, overflowY: 'auto'}}
    >
      {genres.filter((genre) => genre.display).map((genre) => (
        <TreeItem
          nodeId={`g-${genre.id}`}
          key={genre.id}
          label={genre.name}
          sx={{marginBottom: '10px', fontSize: '200%'}}
        >
          <ProductSubGenre subGenreIds={genre.subGenreIds}/>
        </TreeItem>
      ))}
    </TreeView>

  );
};

export default ProductList;
