import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomCell from './TableCellEntry';
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
          {Data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.eventName}
              </TableCell>
              <CustomCell text={n.eventDate} />
              <CustomCell number={n.numberOfPerformances} />
              <CustomCell number={n.numberOfScoreSheets} />
              <CustomCell text={n.judges} />
              <CustomCell button={n.jsxButton} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(SimpleTable);
