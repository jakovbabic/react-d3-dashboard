import React, { Component } from 'react';

import './styles.css';

import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import PieChart from '@material-ui/icons/PieChart';
import Visibility from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Navbar from '../../../components/Navbar';

/**
 * @name MainPage
 *
 *
 * @param {Object}   user
 * @param {Object}   literals
 *
 * @returns {JSX}
 */
class DashboardPage extends Component {
  componentDidUpdate() {
  }

  /**
   * @name setLoadedState
   * Sets loaded state
   *
   * @param {Boolean} loaded
   */

  render() {
    return (
      <div>
        <Navbar />
        <div className='Dashboard'>
          <div className='Dashboard--top'>
            <h4 className='Dashboard--top--title text-align-left'>
              Todas tus vistas
            </h4>
            <div className='Dashboard--top--btns text-align-right'>
              <Button variant="contained" className='Dashboard--top--btns--btn'>
                Create Dashboard
                <Add className='mlr15' />
              </Button>
              <Button variant="contained" aria-label="Add" className='Dashboard--top--btns--btn'>
                <SearchIcon />
              </Button>
            </div>
          </div>
          <List className='Dashboard--list'>
            <ListItem className='Dashboard--list__list-item'>
              <ListItemIcon>
                <PieChart />
              </ListItemIcon>
              <ListItemText
                primary="Single-line item"
              />
              <ListItemSecondaryAction>
                <Button aria-label="Add">
                  Public &nbsp;
                  <Visibility />
                </Button>
                <Button aria-label="Add">
                  Aplicer
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className='Dashboard--list__list-item'>
              <ListItemIcon>
                <PieChart />
              </ListItemIcon>
              <ListItemText
                primary="Single-line item"
              />
              <ListItemSecondaryAction>
                <Button aria-label="Add">
                  Public &nbsp;
                  <Visibility />
                </Button>
                <Button aria-label="Add">
                  Aplicer
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
