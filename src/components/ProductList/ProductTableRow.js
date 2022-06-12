import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CheckIcon from '@mui/icons-material/Check';
import * as React from 'react';
import {useRecoilValue} from 'recoil';
import {productRowSelector} from '../../recoil/selector/productRowSelector';

const getColor = (includeA, includeB) => {
  if (includeA && includeB) {
    return '#FFF'; // both
  } else if (includeA && !includeB) {
    return '#FFD7D5'; // deleted
  } else if (!includeA && includeB) {
    return '#E6FFEC'; // added
  } else {
    return '#ECECEC'; // otherwise
  }
};

const ProductTableRow = (props) => {
  // eslint-disable-next-line react/prop-types
  const {productId} = props;

  const product = useRecoilValue(productRowSelector)[productId];

  if (product.display) {
    return (
      <TableRow
        key={product.name}
        sx={{'&:last-child td, &:last-child th': {border: -1}}}
        style={{backgroundColor: getColor(product.includeA, product.includeB)}}
      >
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell align="center">{product.includeA && <CheckIcon/>}</TableCell>
        <TableCell align="center">{product.includeB && <CheckIcon/>}</TableCell>
      </TableRow>
    );
  } else {
    return null;
  }
};
export default ProductTableRow;
