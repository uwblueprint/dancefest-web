import React, { useImperativeHandle } from 'react'; // React
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'; // React table

import styles from '@styles/components/Table.module.scss'; // Component styles

// const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
//   const count = preFilteredRows.length;

//   return (
//     <input
//       value={filterValue || ''}
//       onChange={e => {
//         setFilter(e.target.value || undefined);
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   );
// };

const Table = React.forwardRef(({ columns, data, emptyComponent }, ref) => {
  // const filterTypes = React.useMemo(
  //   () => ({
  //     text: (rows, id, filterValue) => {
  //       return rows.filter(row => {
  //         const rowValue = row.values[id];
  //         return rowValue !== undefined
  //           ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
  //           : true;
  //       });
  //     },
  //   }),
  //   []
  // );

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: DefaultColumnFilter,
  //   }),
  //   []
  // );

  const instance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } = instance;

  // return table instance
  useImperativeHandle(ref, () => instance);

  return (
    <div className={styles.table__div}>
      {!data.length ? (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
                    {column.render('Header')}
                    {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
          )
        </table>
      )}
    </div>
  );
});

export default Table;
