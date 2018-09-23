import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "./styles";

export const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Event Title </TableCell>
        <TableCell>Event Date </TableCell>
        <TableCell> No. Performances </TableCell>
        <TableCell> No. Score Sheets</TableCell>
        <TableCell> Judges </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(TableHeader);
