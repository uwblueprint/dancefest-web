import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import styles from '../../styles';
import deleteData from '../../../firebase/utils/deleteData';

class EditDropdown extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDelete = async () => {
    const { collectionName, docId } = this.props;
    console.log(collectionName);
    deleteData('performances', docId);
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    console.log(this.props.collectionName);
    return (
      <div>
        <MoreVertIcon
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{ cursor: 'pointer' }} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>Duplicate</MenuItem>
          <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
    );
  }
}


export default withStyles(styles)(EditDropdown);
