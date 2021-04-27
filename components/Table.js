import React, { useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'; // React table

import ArrowDown from '@assets/arrow-down.svg'; // Arrow down icon
import styles from '@styles/components/Table.module.scss'; // Component styles

export default function Table({
  className,
  columns,
  data,
  filters,
  pageNumber = 0,
  setPageCount = null,
  pageSize = 10,
  paginate = true,
  initialSort = [],
  emptyComponent,
  hiddenColumns = [],
  onRowClick = () => {},
  clickable,
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
        matchCategory: (rows, id, filterValues) => {
          // Match an array to another array
          return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? filterValues.some(v => rowValue.indexOf(parseInt(v)) >= 0)
              : true;
          });
        },
      },
      initialState: {
        sortBy: initialSort,
        hiddenColumns,
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
    if (paginate && setPageCount) {
      setPageCount(Math.ceil(rows.length / pageSize));
    }
  }, [rows, pageSize]);

  useEffect(() => {
    gotoPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    setAllFilters(filters);
  }, [filters]);

  return (
    <div className={`${styles.table__div} ${className || ''}`}>
      {data && data.length === 0 ? (
        // If there's no data just show the table header along with an optional 'emptyComponent'
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          </table>
          {emptyComponent}
        </>
      ) : (
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
              return clickable ? (
                <tr key={i} {...row.getRowProps()} onClick={() => onRowClick(row)}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td key={i} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              ) : (
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
      )}
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  emptyComponent: PropTypes.any,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.any,
    })
  ),
  initialSort: PropTypes.shape({
    id: PropTypes.string.isRequired,
    desc: PropTypes.bool,
  }),
  onRowClick: PropTypes.func,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  paginate: PropTypes.bool,
  setPageCount: PropTypes.func,
};
