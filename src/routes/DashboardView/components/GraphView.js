import React, { Component } from 'react';
import './styles.css';
import 'antd/dist/antd.min.css';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Paper from '@material-ui/core/Paper';
import {
  AreaChart,
  BarChart,
  PieChart,
} from 'react-d3-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Line } from 'react-chartjs-2';
import {
  GRAPH_TYPE_BAR,
  GRAPH_TYPE_INDICATOR,
  GRAPH_TYPE_PIE,
  GRAPH_TYPE_GROUP_BAR,
  GRAPH_TYPE_LINE,
  GRAPH_TYPE_AREA,
} from '../../../constants/dashboard';
import { white, darkGray } from '../../../constants/colors';

/**
 * @name MainPage
 *
 *
 * @param {Object}   user
 * @param {Object}   literals
 *
 * @returns {JSX}
 */

class GraphView extends Component {
  state = {
    anchorEl: null,
  };

  componentDidMount() {
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
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
          <h3>{title}</h3>
          <span>{subtitle}</span>
          {img}
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
          <h5 className='text-align-left'>{title}</h5>
          <PieChart
            data={data}
            width={400}
            height={400}
            colorScale={scale}
            outerRadius={100}
            innerRadius={50}
            margin={
              {
                top: 10,
                bottom: 10,
                left: 100,
                right: 100,
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
          <h5 className='text-align-left'>{title}</h5>
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
                top: 10,
                bottom: 30,
                left: 100,
                right: 0,
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
          <h5 className='text-align-left'>{title}</h5>
          <BarChart
            groupedBars
            data={grdata}
            colorScale={scale}
            width={400}
            height={400}
            margin={
              {
                top: 10,
                bottom: 30,
                left: 100,
                right: 0,
              }
            }
            tooltipHtml={this.tooltip}
          />
        </div>
      );
    }
    if (item.type === GRAPH_TYPE_LINE) {
      const title = item.name;
      const data = {
        charData: {
          labels: [],
          datasets: [
            {
              fill: false,
              lineTension: 0.1,
              borderColor: darkGray,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: darkGray,
              pointBackgroundColor: white,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointRadius: 2,
              pointHoverBackgroundColor: darkGray,
              pointHoverBorderColor: darkGray,
              pointHoverBorderWidth: 2,
              pointHitRadius: 10,
              data: [],
            },
          ],
        },
        chartOptions: {
          scales: {
            yAxes: [
              {
                type: 'linear',
                scaleLabel: {
                  display: true,
                  labelString: item.epigraph[0].name,
                },
                gridLines: {
                  borderDashOffset: 2,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
                type: 'category',
                padding: 10,
              },
            ],
          },
          tooltips: {
            displayColors: false,
            callbacks: {
              title: () => {
                return '';
              },
              label: (tooltipItem) => {
                let label = tooltipItem.xLabel;
                label += ',';
                label += tooltipItem.yLabel;
                return label;
              },
            },
          },
        },
        legendOpts: {
          display: false,
        },
      };
      item.eeff.forEach((p) => {
        data.charData.labels.push(p.name);
        data.charData.datasets[0].data.push(p.values[0].calcValue);
      });
      return (
        <div className='text-align-center'>
          <h5 className='text-align-left'>{title}</h5>
          <Line data={data.charData} options={data.chartOptions} legend={data.legendOpts} />
        </div>
      );
    }
    if (item.type === GRAPH_TYPE_AREA) {
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
          <h5 className='text-align-left'>{title}</h5>
          <AreaChart
            data={grdata}
            colorScale={scale}
            width={400}
            height={400}
            yAxis={
              {
                label: item.epigraph[0].name,
              }
            }
            margin={
              {
                top: 10,
                bottom: 30,
                left: 20,
                right: 0,
              }
            }
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
    const p = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const template = this.makeTemplate(p.item);
    return (
      <Paper className='DashboardView--graph__item'>
        <IconButton
          aria-haspopup='true'
          onClick={this.handleClick}
          color='inherit'
          className='DashboardView--graph__item--setting'
        >
          <Settings />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem>{p.literals.editGraph}</MenuItem>
          <MenuItem>{p.literals.deleteGraph}</MenuItem>
        </Menu>
        {template}
      </Paper>
    );
  }
}

export default GraphView;
