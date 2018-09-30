import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// TODO: Table component will go here
// import Table from './table/Table';

class Home extends React.Component {
  state = {};

  render() {
    const { match: { params }, classes } = this.props;
    // section consists of either critiques, performances, or events
    const section = params[0];

    return (
      <div>
        <div className={classes.titleWrapper}>
          <Typography className={classes.title} variant="headline">
            {section}
          </Typography>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.objectOf({ sectionTitle: PropTypes.string }).isRequired,
  match: PropTypes.shape().isRequired
};

const styles = () => ({
  titleWrapper: {
    textAlign: 'center',
    marginTop: '25px',
    marginBottom: '25px'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 36,
    color: '#9b9b9b'
  }
});

export default withStyles(styles)(Home);
