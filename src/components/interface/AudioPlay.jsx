import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import styles from '../styles';
import Button from '../interface/Button';
import db from '../../firebase/firebase';
import * as firebase from 'firebase';


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      playing: false,
    };

    const {
      artisticMark,
      audio,
      choreoAward,
      cumulativeMark,
      judgeName,
      notes,
      specialAward,
      technicalMark
    } = props.currentValues;

    this.pathRef = firebase.storage().ref().child(audio);
    //this.audioFile = new Audio("gs://dancefest-198709.appspot.com/Audio/JaZW0vckNEzMUcfmcnOz.mp3");
    this.audioDefaultFile = new Audio("http://streaming.tdiradio.com:8000/house.mp3");
    //this.audioFile = null;

    this.audioURL = this.pathRef.getDownloadURL().then(function (url) {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      console.log("HERE0");
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      console.log("HERE1");
      xhr.onload = function (event) {
        console.log("HERE2");
        var blob = xhr.response;
        this.audioFile = new Audio(url);
        console.log(this.audioFile.src);
        this.audioFile.play();
        console.log("HERE3");
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element:
      //var img = document.getElementById('myimg');
      //img.src = url;
      
    }).catch(function (error) {
      // Handle any errors
      //this.audioFile = new Audio("http://streaming.tdiradio.com:8000/house.mp3");
    });;
    
    //*this.audioFile = new Audio(this.audioURL);
    //http://streaming.tdiradio.com:8000/house.mp3
    
  }

  // TODO: handle audio playing file

  handleClick = () => {
    //console.log('handling play button click');
    this.setState((state) => ({
      playing: !state.playing
    }));

    if (this.state.playing) {
      this.audioDefaultFile.play();
    }
    else {
      this.audioDefaultFile.pause();
    }

    /** 
    if (this.state.playing) {
      if(this.audioFile != null){
        this.audioFile.play();
      }
      else{
        this.audioDefaultFile.play();
      } 
    }
    else {
      if(this.audioFile != null){
        this.audioFile.pause();
      }
      else{
        this.audioDefaultFile.pause();
      }
    }
    **/

  }


  // TODO: create method to convert time to XX:XX format

  render() {
    //const { fileName, time } = this.props;
    //const fileName = 'place_holder.mp3';
    //const { adjudicationId, collectionName } = this.props;


    const {
      artisticMark,
      audio,
      choreoAward,
      cumulativeMark,
      judgeName,
      notes,
      specialAward,
      technicalMark
    } = this.props.currentValues;

    //const fileName = this.pathRef.name;
    const fileName = 'PLACEHOLDER';
    const time = 'X:XX';
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
          <Button type='transparent' onClick={this.handleClick}>
            <PlayCircleOutlineIcon style={{ float: 'right', marginLeft: '25px' }} color="primary" />
            <audio src={this.audioFile} />
          </Button>
        </div>
      </div>
    );
  }
}
// 

AudioPlayer.propTypes = {
  //adjudicationId: PropTypes.string.isRequired,
  //collectionName: PropTypes.string.isRequired
  //fileName: PropTypes.string.isRequired,
  //time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  currentValues: PropTypes.shape({
    artisticMark: PropTypes.number,
    audio: PropTypes.bool,
    choreoAward: PropTypes.number,
    cumulativeMark: PropTypes.number,
    notes: PropTypes.string,
    judgeName: PropTypes.string,
    specialAward: PropTypes.bool,
    technicalMark: PropTypes.number
  }).isRequired
};

export default withStyles(styles)(AudioPlayer);
