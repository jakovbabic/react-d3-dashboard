import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { BarChart, PieChart } from 'react-d3-components';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Navbar from '../../../components/Navbar/container/index';
import {
  GRAPH_TYPE_BAR, GRAPH_TYPE_INDICATOR, GRAPH_TYPE_PIE, GRAPH_TYPE_GROUP_BAR,
} from '../../../constants/dashboard';

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

  makeTemplate = () => {
    this.setState({ anchorEl: null });
  };

  tooltip = (x, y, z) => {
    if (z) {
      return `x: ${x}, y: ${z}`;
    }
    return `x: ${x}, y: ${y}`;
  };

  makeTemplate = (item) => {
    if (item.type === GRAPH_TYPE_INDICATOR) {
      const title = item.eeff[0].values[0].calcValue;
      const subtitle = item.name;
      const img = <img src={require(`assets/images/indicators/${item.image}`)} alt='test' width='50px' height='50px' />;
      return (
        <div>
          <h3>{ title }</h3>
          <span>{ subtitle }</span>
          { img }
        </div>
      );
    }
    if (item.type === GRAPH_TYPE_PIE) {
      const title = item.name;
      const gdata = item.epigraph.map((p, i) => {
        return {
          x: p.name,
          y: item.eeff[0].values[i].calcValue,
        };
      });
      const scale = () => {
        return '#555555';
      };
      const data = {
        label: 'somethingA',
        values: gdata,
      };
      return (
        <div className='text-align-center'>
          <h5 className='text-align-left'>{ title }</h5>
          <PieChart
            data={data}
            width={400}
            height={400}
            colorScale={scale}
            outerRadius={100}
            innerRadius={50}
            margin={
              {
                top: 10, bottom: 10, left: 100, right: 100,
              }
            }
            tooltipHtml={this.tooltip}
          />
        </div>
      );
    }
    if (item.type === GRAPH_TYPE_BAR) {
      const title = item.name;
      const grdata = item.eeff.map((p) => {
        return {
          x: p.name,
          y: p.values[0].calcValue,
        };
      });
      const data = [{
        values: grdata,
      }];
      const scale = () => {
        return '#555555';
      };
      return (
        <div className='text-align-center'>
          <h5 className='text-align-left'>{ title }</h5>
          <BarChart
            data={data}
            width={400}
            height={400}
            opacity={70}
            colorScale={scale}
            yAxis={
              {
                label: item.epigraph[0].name,
              }
            }
            margin={
              {
                top: 10, bottom: 30, left: 100, right: 0,
              }
            }
            tooltipHtml={this.tooltip}
          />
        </div>
      );
    }
    if (item.type === GRAPH_TYPE_GROUP_BAR) {
      const title = item.name;
      const grdata = item.eeff.map((p) => {
        const pi = {
          label: p.name,
          values: [],
        };
        item.epigraph.forEach((val, key) => {
          pi.values.push({
            x: val.name,
            y: p.values[key].calcValue,
          });
        });
        return pi;
      });
      const scale = () => {
        return '#555555';
      };
      return (
        <div className='text-align-center'>
          <h5 className='text-align-left'>{ title }</h5>
          <BarChart
            groupedBars
            data={grdata}
            colorScale={scale}
            width={400}
            height={400}
            margin={
              {
                top: 10, bottom: 30, left: 100, right: 0,
              }
            }
            tooltipHtml={this.tooltip}
          />
        </div>
      );
    }
    return (
      <div>
        sdf
      </div>
    );
  };

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
                aria-haspopup='true'
                onClick={this.handleClick}
                color='inherit'
              >
                <MoreHoriz />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem><a href='/dashboard'>{ literals.dashboardLink }</a></MenuItem>
              </Menu>
            </div>
          </div>
          <div className='DashboardView--graph'>
            <Grid container spacing={24}>
              { dashboard.graph && dashboard.graph.map((item, i) => {
                let width = 3;
                if (item.type !== 1) {
                  width = 4;
                }
                const template = this.makeTemplate(item);
                return (
                  <Grid item xs={width} key={i}>
                    <Paper className='DashboardView--graph__item'>
                      <IconButton className='DashboardView--graph__item--setting'><Settings /></IconButton>
                      {template}
                    </Paper>
                  </Grid>
                );
              })
              }
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
