import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import ProductTableRow from './ProductTableRow';
import {TableBody} from '@mui/material';
import {useRecoilValue} from 'recoil';
import {bundleNameSelector} from '../../recoil/selector/bundleNameSelector';

const ProductTable = (props) => {
  // eslint-disable-next-line react/prop-types
  const {productIds} = props;

  const {kompleteA, kompleteB} = useRecoilValue(bundleNameSelector);

  return (
    <TableContainer component={Paper} style={{marginBottom: '10px'}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="center">{kompleteA.name}</TableCell>
            <TableCell align="center">{kompleteB.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* eslint-disable-next-line react/prop-types */}
          {productIds.map((id) => <ProductTableRow productId={id} key={id}/>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
