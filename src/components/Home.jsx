import React from 'react';
import PropTypes from 'prop-types';

import AdjudicationsSection from './adjudications/AdjudicationsSection';
import EventsSection from './events/EventsSection';
import PerformancesSection from './performances/PerformancesSection';
import SectionTitle from './interface/SectionTitle';
import SettingsSection from './Settings';

class Home extends React.Component {
  state = {};

  render() {
    const { match: { params }} = this.props;
    // section consists of either adjudications, performances, or events
    const sectionType = params[0];

    let section;
    switch (sectionType) {
      // TODO: Create settings section
      case 'settings':
        section = (<SettingsSection />);
        break;
      case 'adjudications':
        section = (<AdjudicationsSection />);
        break;
      case 'performances':
        section = (<PerformancesSection />);
        break;
      case 'events':
      default:
        section = (<EventsSection />);
        break;
    }

    return (
      <div>
        <SectionTitle title={sectionType} />
        {section}
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape().isRequired
};

export default Home;
