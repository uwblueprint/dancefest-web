import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import ReactPaginate from 'react-paginate'; // React pagination

import ChevronLeft from '@assets/chevron-left.svg'; // Chevron left icon
import ChevronRight from '@assets/chevron-right.svg'; // Chevron right icon
import styles from '@styles/components/Pagination.module.scss';

export default function Pagination({ rowsCount, pageNumber, pageSize = 10, onPageChange }) {
  const pageCount = Math.ceil(rowsCount / pageSize);

  return (
    <ReactPaginate
      containerClassName={styles.pagination} // Pagination container
      pageClassName={styles.pagination__pageButton} // Page button
      activeClassName={styles.pagination__selectedPageButton} // Selected page button
      breakClassName={styles.pagination__breakButton} // Break (ellipsis) button
      previousClassName={styles.pagination__previousButton} // Previous button
      previousLabel={<img className={styles.pagination__previousButton} src={ChevronLeft} />} // Previous button icon
      nextClassName={styles.pagination__nextButton} // Next button
      nextLabel={<img className={styles.pagination__nextButton} src={ChevronRight} />} // Next button icon
      onPageChange={onPageChange}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={pageNumber !== undefined ? pageNumber : undefined}
    />
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  rowsCount: PropTypes.number.isRequired,
};
