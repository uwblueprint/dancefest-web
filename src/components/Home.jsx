import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from './SectionTitle';
import Table from './table/Table';

class Home extends React.Component {
  state = {};

  render() {
    const { match: { params }} = this.props;
    // section consists of either critiques, performances, or events
    const section = params[0];

    return (
      <div>
        <SectionTitle title={section} />
        <Table />
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape().isRequired
};

export default Home;
