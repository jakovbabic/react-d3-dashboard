import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import Navbar from '../../../components/Navbar/container/index';

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
  static propTypes = {
    loadDashboards: PropTypes.func.isRequired,
    dashboards: PropTypes.array.isRequired,
    literals: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { loadDashboards } = this.props;
    loadDashboards();
  }

  /**
   * @name setLoadedState
   * Sets loaded state
   *
   * @param {Boolean} loaded
   */

  render() {
    const { dashboards, literals } = this.props;
    return (
      <div>
        <Navbar />
        <div className='Dashboard'>
          <div className='Dashboard--top'>
            <h4 className='Dashboard--top--title text-align-left'>
              { literals.title }
            </h4>
            <div className='Dashboard--top--btns text-align-right'>
              <Button variant='contained' className='Dashboard--top--btns--btn'>
                { literals.createDashboard }
                <Add className='mlr15' />
              </Button>
              <Button variant='contained' aria-label='Add' className='Dashboard--top--btns--btn'>
                <SearchIcon />
              </Button>
            </div>
          </div>
          <List className='Dashboard--list'>
            { dashboards && dashboards.map((item, i) => {
              return (
                <ListItem className='Dashboard--list__list-item' key={i}>
                  <ListItemIcon>
                    <PieChart />
                  </ListItemIcon>
                  <a href={`dashboardview/${item.viewId}`}>
                    <ListItemText
                      primary={item.name}
                    />
                  </a>
                  <ListItemSecondaryAction>
                    <Button aria-label='Add'>
                      { literals.public } &nbsp;
                      <Visibility />
                    </Button>
                    <Button aria-label='Add'>
                      { literals.applicant }
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
            }
          </List>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
