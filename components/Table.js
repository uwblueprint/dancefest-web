import React, { useEffect } from 'react'; // React
import { useTable, useFilters } from 'react-table'; // React table

import styles from '@styles/components/Table.module.scss'; // Component styles

export default function Table({ columns, data, query, filters = [] }) {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    setAllFilters,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  useEffect(() => {
    setAllFilters(filters);
    setFilter('title', query);
  }, [query]);

  return (
    <div className={styles.table__div}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td key={i} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
