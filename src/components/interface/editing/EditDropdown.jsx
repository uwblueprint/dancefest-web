import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../../styles';
import deleteData from '../../../firebase/utils/deleteData';

class EditDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: undefined
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  handleDelete = async () => {
    const { docId } = this.props;
    deleteData('performances', docId);
    this.setState({ anchorEl: undefined });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div style={{ display: 'inline' }}>
        <MoreVertIcon
          aria-owns={anchorEl && 'simple-menu'}
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
