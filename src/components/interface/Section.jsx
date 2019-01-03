import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import EmptyState from './EmptyStates';
import Loading from './Loading';
import styles from '../styles';
import SectionHeader from './SectionHeader';
import TableFilters from './TableFilters';
import TableHeader from './TableHeader';

const Section = ({
  children,
  headings,
  loading,
  showContent,
  renderNewButton,
  type
}) => {
  const renderTableContents = showContent ? (
    <React.Fragment>
      { type === 'performance' && <TableFilters /> }
      <Table>
        <TableHeader headings={headings} />
        <TableBody>{children}</TableBody>
      </Table>
    </React.Fragment>
  ) : <EmptyState type={type} />;

  return (
    <React.Fragment>
      <SectionHeader renderNewButton={renderNewButton} title={type} />
      { loading ? <Loading /> : renderTableContents }
    </React.Fragment>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  showContent: PropTypes.bool.isRequired,
  renderNewButton: PropTypes.node,
  type: PropTypes.oneOf(['event', 'adjudication', 'performance']).isRequired
};

Section.defaultProps = {
  renderNewButton: null
};

export default withStyles(styles)(Section);
