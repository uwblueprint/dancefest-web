import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import Loading from '../interface/Loading';
import TableHeader from '../interface/TableHeader';
import AdjudicationTableRow from './AdjudicationTableRow';
import db from '../../firebase/firebase';
import EmptyState from '../interface/EmptyStates';
import SectionHeader from '../interface/SectionHeader';

class AdjudicationsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      adjudications: []
    };
  }

  componentDidMount() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    const collectionName = `events/${eventId}/performances/${performanceId}/adjudications`;

    db.collection(collectionName).onSnapshot((querySnapshot) => {
      const adjudications = [];
      querySnapshot.forEach((doc) => {
        const adjudication = {
          id: doc.id,
          ...doc.data()
        };
        adjudications.push(adjudication);
      });
      this.setState({ adjudications, fetching: false });
    });
  }

  render() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    const { adjudications, fetching } = this.state;
    const collectionName = `events/${eventId}/performances/${performanceId}/adjudications`;
    const headings = ['Judge', 'Audio', 'Cummulative Score', 'Awards'];
    const showAdjudications = Array.isArray(adjudications) && adjudications.length > 0;

    return (
      <React.Fragment>
        <SectionHeader title="adjudication" showNew={false} />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {!fetching && showAdjudications && adjudications.map((rowProps) => {
              const keys = ['artisticMark', 'audio', 'choreoAward', 'cumulativeMark', 'notes', 'judgeName', 'specialAward', 'technicalMark'];
              const currentValues = pick(rowProps, keys);
              return (
                <AdjudicationTableRow
                  collectionName={collectionName}
                  currentValues={currentValues}
                  key={rowProps.id}
                  id={rowProps.id} />);
            })}
          </TableBody>
        </Table>
        {fetching ? <Loading /> : (!showAdjudications && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmptyState type="adjudication" title="Empty Adjudications Page" subtitle="Adjudications will be synced following the event" />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

AdjudicationsSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default AdjudicationsSection;
