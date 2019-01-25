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
      audioFile: undefined
    };
  }

  loadAudio = () => {
    this.pathRef.getDownloadURL().then(function (url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = async function (event) {
        var blob = xhr.response;
        this.setState({ audioFile: new Audio(url) });
      }.bind(this);
      xhr.open('GET', url);
      xhr.send();
    }.bind(this)).catch(function (error) {
      console.log("ERROR. Firebase audio file failed to load.");
    });;
  }


  componentDidMount() {
    const {audio} = this.props;
    const {audioFile} = this.state;

    this.pathRef = firebase.storage().ref().child(audio);
    if (audioFile == undefined) {
      this.loadAudio();
    }
  }

  componentWillUnmount(){
    const {audioFile} = this.state;
    if (audioFile != undefined){
      audioFile.pause();
    }
  }

  handleClick = () => {
    const {audioFile} = this.state;
    if (audioFile.paused) {
      audioFile.play();
    }
    else {
      audioFile.pause();
    }
  }

  formattedAudioDuration = () => {
    const {audioFile} = this.state;
    //console.log(audioFile.src);
    //console.log(audioFile.readyState);
    //audioFile.play();
    //console.log(audioFile.readyState);
    let secs = audioFile.duration;
    console.log(secs);
    return secs/60 + ":" + secs%60;
  }
  
  render() {
    const {audio} = this.props;
    const{audioFile} = this.state;

    const fileName = firebase.storage().ref().child(audio).name;
    //const fileName = 'PLACEHOLDER';
    let time = 'X:XX';
    if (audioFile != undefined){
      audioFile.preload = "auto";
      audioFile.load().then(function(){console.log(audioFile.duration)});
      //this.reloadAudio();
      

      console.log(this.state.audioFile.readyState);
      time = this.formattedAudioDuration();
      console.log(time);
    }

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

          {
            audioFile == undefined ?
              <Button>Audio not loaded</Button>
              : <Button type='transparent' onClick={this.handleClick}>
                <PlayCircleOutlineIcon style={{ float: 'right', marginLeft: '25px' }} color="primary" />
              </Button>
          }

        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  audio: PropTypes.bool.isRequired
};

export default withStyles(styles)(AudioPlayer);
