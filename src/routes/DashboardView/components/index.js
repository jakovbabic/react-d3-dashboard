import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddModalContent from './AddModalContent';
import GraphView from './GraphView';
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
    loadTypeOptions: PropTypes.func.isRequired,
    loadTableOptions: PropTypes.func.isRequired,
    saveModal: PropTypes.func.isRequired,
    cancelModal: PropTypes.func.isRequired,
    dashboardChange: PropTypes.func.isRequired,
    dashboard: PropTypes.object.isRequired,
    selectedTable: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    literals: PropTypes.object.isRequired,
    typeOptions: PropTypes.array.isRequired,
    tableOptions: PropTypes.array.isRequired,
  };

  state = {
    anchorEl: null,
    modalOpen: false,
  };

  componentDidMount() {
    const {
      loadTypeOptions, loadDashboards, match, loadTableOptions,
    } = this.props;
    loadDashboards(match.params.id);
    loadTypeOptions();
    loadTableOptions();
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

  addModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  addModalClose = () => {
    this.setState({ modalOpen: false });
    const {
      cancelModal,
    } = this.props;
    cancelModal();
  };

  render() {
    const {
      dashboard,
      literals,
      typeOptions,
      tableOptions,
      selectedTable,
      dashboardChange,
      saveModal,
    } = this.props;
    const { anchorEl, modalOpen } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Navbar />
        <div className='DashboardView'>
          <Dialog
            open={modalOpen}
            onClose={this.addModalClose}
            className='DashboardView__Dialog'
          >
            <DialogTitle>
              { literals.addGraph }
            </DialogTitle>
            <DialogContent>
              <AddModalContent addModalClose={this.addModalClose} saveModal={saveModal} literals={literals} selectedTable={selectedTable} typeOptions={typeOptions} tableOptions={tableOptions} dashboardChange={dashboardChange} />
            </DialogContent>
          </Dialog>
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
                <MenuItem><a onClick={this.addModalOpen}>{ literals.addGraph }</a></MenuItem>
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
                return (
                  <Grid item xs={width} key={i}>
                    <GraphView item={item} literals={literals} />
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
