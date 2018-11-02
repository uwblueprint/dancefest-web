import React from 'react';
import PropTypes from 'prop-types';

import DFDialog from '../interface/dialog/DFDialog';
import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';

export default class EventDialog extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValues } = props;

    this.state = {
      eventTitle: defaultValues.eventTitle || '',
      eventDate: defaultValues.eventDate || '',
      numJudges: defaultValues.numJudges || ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => { }

  render() {
    const { type } = this.props;
    const { eventTitle, eventDate, numJudges } = this.state;
    const buttonTitle = type === 'edit' ? 'EDIT' : 'NEW EVENT';
    const footer = [
      <Button type="default" onClick={this.handleClose}>
        Cancel
      </Button>,
      <Button type="primary" onClick={this.handleClose}>
        Save
      </Button>,
      <Button type="secondary" onClick={this.handleClose}>
        Save
      </Button>,
      <Button type="outline" onClick={this.handleClose}>
        Save
      </Button>
    ];

    return (
      <DFDialog buttonTitle={buttonTitle} title="Edit Event" onSubmit={this.handleSubmit} footer={footer}>
        <DialogInput fullWidth name="eventTitle" label="Event Title" onChange={this.handleChange} value={eventTitle} />
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', width: '60%' }}>
            <DialogInput fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} value={eventDate} />
          </div>
          <div style={{ display: 'flex', marginLeft: '5%' }}>
            <DialogInput fullWidth name="numJudges" label="No. Judges" onChange={this.handleChange} value={numJudges} />
          </div>
        </div>
      </DFDialog>
    );
  }
}

EventDialog.propTypes = {
  defaultValues: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};
