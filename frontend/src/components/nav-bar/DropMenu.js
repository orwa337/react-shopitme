import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Fade from 'material-ui/transitions/Fade';
import Avatars from './Avatars'

const styles = {
padding: "0"
}


class FadeMenu extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    anchorEl: null,
  };
 }


  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

   handleDeleteChip =() => {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
  }

   handleClickChip =() => {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
  }


  render(props) {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Button style={styles}
          aria-owns={anchorEl ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        <Avatars/>
    
        </Button>
        <Menu style={{position:"absolute" ,top:"2.3rem"}}
          id="fade-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          transition={Fade}
        >
          <MenuItem onClick={this.handleClose}>History</MenuItem>
          <MenuItem onClick={this.handleClose}>Your Profile</MenuItem>
          <MenuItem onClick={this.props.logOut}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default FadeMenu;