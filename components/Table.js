import React, { useEffect } from 'react'; // React
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'; // React table

import ArrowDown from '@assets/arrow-down.svg'; // Arrow down icon
import styles from '@styles/components/Table.module.scss'; // Component styles

export default function Table({
  columns,
  data,
  filters,
  pageNumber,
  pageSize = 10,
  paginate = true,
}) {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    setAllFilters,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      filterTypes: {
        matchEnum: (rows, id, filterValues) => {
          // Match an array of enum values
          return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue !== undefined ? filterValues.includes(String(rowValue)) : true;
          });
        },
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    gotoPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    setAllFilters(filters);
  }, [filters]);

  return (
    <div className={styles.table__div}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <img className={styles.table__sortDescArrow} src={ArrowDown} />
                      ) : (
                        <img className={styles.table__sortAscArrow} src={ArrowDown} />
                      )
                    ) : null}
                    <div>{column.render('Header')}</div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {(paginate ? page : rows).map((row, i) => {
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
