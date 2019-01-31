import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import styles from '../styles';
import Button from '../interface/Button';
import * as firebase from 'firebase';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFile: undefined,
      metadataLoaded: false
    };
  }

  loadAudio = () => {
    this.pathRef.getDownloadURL().then((url) => {
      fetch(url).then(() => {
        this.setState({ audioFile: new Audio(url) });
        this.state.audioFile.addEventListener('loadeddata', () => {
          this.setState({ metadataLoaded: true });
        })
      })
    }).catch(function () {
      console.log("ERROR. Firebase audio file failed to load.");
    });;
  }

  componentDidMount() {
    const { audioURL } = this.props;
    const { audioFile } = this.state;

    this.pathRef = firebase.storage().ref().child(audioURL);
    if (!audioFile) {
      this.loadAudio();
    }
  }

  componentWillUnmount() {
    const { audioFile } = this.state;

    if (audioFile) {
      audioFile.pause();
    }
  }

  handleClick = () => {
    const { audioFile } = this.state;

    if (audioFile.paused) {
      audioFile.play();
    } else {
      audioFile.pause();
    }
  }

  formattedAudioDuration = () => {
    const { audioFile } = this.state;

    const secs = audioFile.duration;
    const formattedTime = Math.floor(secs / 60) + ":" + Math.floor(secs % 60);

    return formattedTime;
  }

  render() {
    const { audioURL } = this.props;
    const { audioFile, metadataLoaded } = this.state;
    const fileName = firebase.storage().ref().child(audioURL).name;
    const time = (audioFile && metadataLoaded) ? this.formattedAudioDuration() : 'X:XX';

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
        <div style={{ alignSelf: 'center', flex: 0 }}>
          {time}
        </div>
        <div style={{ flex: 0 }}>
          {
            <Button disabled={audioFile === undefined} onClick={this.handleClick} type='transparent' >
              <PlayCircleOutlineIcon color="primary" style={{ float: 'right', marginLeft: '25px' }} />
            </Button>
          }
        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  audioURL: PropTypes.string.isRequired
};

export default withStyles(styles)(AudioPlayer);
