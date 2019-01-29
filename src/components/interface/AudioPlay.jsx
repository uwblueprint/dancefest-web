import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import styles from '../styles';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  render() {
    const { fileName, time } = this.props;
    const { disabled } = this.state;

    return (
      <div style={{
        border: '1px solid gray',
        borderRadius: '5px',
        display: 'flex',
        padding: '15px',
        margin: '10px 0 10px 0'
      }}>
        <div style={{ alignSelf: 'center', flex: 3 }}>
          {fileName}
        </div>
        <div style={{ alignSelf: 'center', flex: 2 }}>
          {time}
        </div>
        <div>
          <PlayCircleOutlineIcon style={{ float: 'right', marginLeft: '25px' }} color="primary" />
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  fileName: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default withStyles(styles)(AudioPlayer);
