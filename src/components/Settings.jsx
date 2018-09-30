import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from './SectionTitle';

// TODO: Table component will go here
// import Table from './table/Table';

class Settings extends React.Component {
  state = {};

  render() {
    const { match: { params }} = this.props;

    return (
      <div>
        <SectionTitle title={params[0]} />
      </div>
    );
  }
}

Settings.propTypes = {
  match: PropTypes.shape().isRequired
};

export default Settings;
