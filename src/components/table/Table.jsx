import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import customCell from './TableCellEntry';
import data from './testData';
import styles from './styles';


function SimpleTable() {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <customCell text="Event Title" />
            <customCell text="Event Date" />
            <customCell text="No. Performances" />
            <customCell text="No. Score Sheets" />
            <customCell text="Judges" />
            <customCell text="" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.eventName}
              </TableCell>
              <customCell text={n.eventDate} />
              <customCell text={n.numberOfPerformances} />
              <customCell text={n.numberOfScoreSheets} />
              <customCell text={n.judges} />
              <customCell text={n.jsxButton} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(SimpleTable);
