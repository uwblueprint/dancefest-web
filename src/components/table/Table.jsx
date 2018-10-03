import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Data from './TestData';
import styles from './styles';
import TableHeader from './TableHeader';
import Button from '../buttons/EditButton';

const SimpleTable = () => (
  <Paper>
    <Table>
      <TableHeader />
      <TableBody>
        {Data.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.eventName}
            </TableCell>
            <TableCell>
              {' '}
              {row.eventDate}
              {' '}
            </TableCell>
            <TableCell>
              {' '}
              {row.numberOfPerformances}
              {' '}
            </TableCell>
            <TableCell>
              {' '}
              {row.numberOfScoreSheets}
              {' '}
            </TableCell>
            <TableCell>
              {' '}
              {row.judges}
              {' '}
            </TableCell>
            <TableCell>
              {' '}
              <Button />
              {' '}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default withStyles(styles)(SimpleTable);
