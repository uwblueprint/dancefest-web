import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: theme.spacing.unit * 2
  }
});

class button extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  render() {
    const {
      open
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>
          EDIT
        </Button>
        <Modal
          open={open}
          onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text of modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Description of modal
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

button.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default Button;
export default withStyles(styles)(button);
