import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomCell from './CustomCell';
import Data from './TestData';
import styles from './styles';

function SimpleTable() {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <CustomCell text="Event Title" />
            <CustomCell text="Event Date" />
            <CustomCell text="No. Performances" />
            <CustomCell text="No. Score Sheets" />
            <CustomCell text="Judges" />
            <CustomCell text="" />
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.eventName}
              </TableCell>
              <CustomCell text={row.eventDate} />
              <CustomCell number={row.numberOfPerformances} />
              <CustomCell number={row.numberOfScoreSheets} />
              <CustomCell text={row.judges} />
              <CustomCell button={row.jsxButton} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(SimpleTable);
