import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import FileCopy from '@material-ui/icons/FileCopy';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../styles.css';

class Navbar extends React.Component {
  state = {
    anchorEl: null,
  };

  static propTypes = {
    literals: PropTypes.object.isRequired,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { literals } = this.props;
    return (
      <div>
        <AppBar position="static" className='Navbar' color='default'>
          <Toolbar>
            <Typography variant="title" className='grow text-align-left'>
              { literals.logo }
            </Typography>
            <Button color="inherit">
              <Home className='mlr15' />
              { literals.first }
            </Button>
            <Button color="inherit">
              <FileCopy className='mlr15' />
              { literals.second }
            </Button>
            <Button color="inherit">
              <Home className='mlr15' />
              { literals.third }
            </Button>
            <div>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem>{ literals.profile }</MenuItem>
                <MenuItem>{ literals.logout }</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default Navbar;
