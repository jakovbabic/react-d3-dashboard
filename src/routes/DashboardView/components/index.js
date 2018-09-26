import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import Settings from '@material-ui/icons/Settings';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
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
class DashboardView extends Component {
  static propTypes = {
    loadDashboards: PropTypes.func.isRequired,
    dashboard: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    literals: PropTypes.object.isRequired,
  };

  state = {
    anchorEl: null,
  };

  componentDidMount() {
    const { loadDashboards, match } = this.props;
    loadDashboards(match.params.id);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  /**
   * @name setLoadedState
   * Sets loaded state
   *
   * @param {Boolean} loaded
   */

  render() {
    const { dashboard, literals } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Navbar />
        <div className='DashboardView'>
          <div className='DashboardView--top'>
            <h4 className='DashboardView--top--title text-align-left'>
              { dashboard.name }
            </h4>
            <div className='DashboardView--top--option text-align-right'>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleClick}
                color="inherit"
              >
                <MoreHoriz />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem><a href='/dashboard'>{ literals.dashboardLink }</a></MenuItem>
              </Menu>
            </div>
          </div>
          <div className='DashboardView--graph'>
            { dashboard.graph && dashboard.graph.map((item, i) => {
              let title = '';
              let subtitle = '';
              let img = '';
              if (item.type === 1) {
                title = item.eeff[0].values[0].calcValue;
                subtitle = item.name;
                img = <CardMedia image={item.image} title="Live from space album cover" />;
              }
              return (
                <Card key={i}>
                  <CardHeader
                    action={<IconButton><Settings /></IconButton>}
                    title={title}
                    subheader={subtitle}
                  />
                  <CardContent>
                    { img }
                  </CardContent>
                </Card>
              );
            })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
