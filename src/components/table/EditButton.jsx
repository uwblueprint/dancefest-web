import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


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
    // const { state } = this.state;
    return (
      <div>
        <Button onClick={this.handleOpen}>
          EDIT
        </Button>
        {/* <Modal
          open={state.open}
          onClose={this.handleClose}>
          <div>
            Text in modal
          </div>
        </Modal> */}
      </div>
    );
  }
}

export default button;
