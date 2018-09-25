import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import FileCopy from '@material-ui/icons/FileCopy';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './styles.css';

class Navbar extends React.Component {
  state = {
    anchorEl: null,
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
    return (
      <div>
        <AppBar position="static" className='Navbar' color='white'>
          <Toolbar>
            <Typography variant="title" className='grow text-align-left'>
              Logotipo
            </Typography>
            <Button color="inherit">
              <Home className='mlr15' />
              Inicio
            </Button>
            <Button color="inherit">
              <FileCopy className='mlr15' />
              Estados Financieros
            </Button>
            <Button color="inherit">
              <Home className='mlr15' />
              Epigrafes
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
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default Navbar;
