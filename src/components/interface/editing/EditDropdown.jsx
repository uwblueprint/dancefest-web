import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../../styles';

class EditDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      deleteElement: false,
      editElement: false
    };
  }

  onMoreClick = () => {
    this.setState({
      menuOpen: !this.menuOpen
    });
  }

  handleDelete = () => {
    this.setState({
      deleteElement: true
    });
  }

  handleEdit = () => {
    this.setState({
      editElement: true
    });
  }

  render() {
    const { classes } = this.props;
    const { deleteElement, editElement, menuOpen } = this.state;

    return (
      <React.Fragment>

        <MoreVertIcon style={{ cursor: 'pointer' }} clases={{ root: classes.dfdialog_moreIcon }} onClick={this.onMoreClick} />
        {menuOpen && (
          <div style={{ cursor: 'pointer' }}>
            <MenuItem onClick={this.handleDelete}>
              <text>Delete</text>
            </MenuItem>
            <MenuItem onClick={this.handleEdit}>
              <text>Edit</text>
            </MenuItem>
          </div>
        )
        }


      </React.Fragment>
    );
  }
}


export default withStyles(styles)(EditDropdown);
