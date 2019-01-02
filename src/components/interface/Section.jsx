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
  type
}) => {
  const isAdjudication = type === 'adjudication';
  const renderTableContents = showContent ? (
    <Table>
      <TableHeader headings={headings} />
      <TableBody>{children}</TableBody>
    </Table>
  ) : <EmptyState type={type} />;

  return (
    <React.Fragment>
      <SectionHeader title={type} showNew={!isAdjudication} />
      {type === 'performance' && (<TableFilters />)}
      {loading ? <Loading /> : renderTableContents}
    </React.Fragment>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  showContent: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['event', 'adjudication', 'performance']).isRequired
};

export default withStyles(styles)(Section);
