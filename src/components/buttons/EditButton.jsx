import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Dialogue from "../table/Dialogue";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: theme.spacing.unit * 2
  }
});

class EditButton extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleOpen}>EDIT</Button>
        <Dialogue
          open={open}
          classes={classes}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

EditButton.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default Button;
export default withStyles(styles)(EditButton);
