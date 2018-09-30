import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';
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
    deleteGraph: PropTypes.func.isRequired,
    saveDashboard: PropTypes.func.isRequired,
    dashboard: PropTypes.object.isRequired,
    selectedTable: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    literals: PropTypes.object.isRequired,
    typeOptions: PropTypes.array.isRequired,
    tableOptions: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      modalTitle: '',
      modalOpen: false,
      name: '',
    };
  }

  componentDidMount() {
    const {
      loadTypeOptions,
      loadDashboards,
      match,
      loadTableOptions,
    } = this.props;
    loadDashboards(match.params.id, this.setName);
    loadTypeOptions();
    loadTableOptions();
  }

  setName = (res) => {
    this.setState({ name: res.name });
  };

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
    const { literals } = this.props;
    this.setState({ modalOpen: true, modalTitle: literals.addGraph });
  };

  editGraph = (item) => {
    const { literals } = this.props;
    this.setState({ modalOpen: true, modalTitle: literals.editGraph });
    const p = this.props;
    p.dashboardChange(item.sourceView);
    setTimeout(() => {
      this.childModal.editGraph(item);
    }, 0);
  };

  addModalClose = () => {
    this.setState({ modalOpen: false });
    const {
      cancelModal,
    } = this.props;
    cancelModal();
  };

  dashboardSave = () => {
    const state = this.state;
    const { saveDashboard, dashboard } = this.props;
    const data = dashboard;
    data.name = state.name;
    saveDashboard(data);
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
    return true;
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
      deleteGraph,
    } = this.props;
    const {
      anchorEl,
      modalOpen,
      modalTitle,
      name,
    } = this.state;
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
              { modalTitle }
            </DialogTitle>
            <DialogContent>
              <AddModalContent onRef={(ref) => { this.childModal = ref; }} dashboard={dashboard} addModalClose={this.addModalClose} saveModal={saveModal} literals={literals} selectedTable={selectedTable} typeOptions={typeOptions} tableOptions={tableOptions} dashboardChange={dashboardChange} />
            </DialogContent>
          </Dialog>
          <div className='DashboardView--top'>
            <h4 className='DashboardView--top--title text-align-left'>
              <Input onChange={this.changeName} className='DashboardView--top--title__input' value={name} />
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
            {
              (!dashboard.graph || dashboard.graph.length === 0) && <div className='DashboardView--graph--empty'>{ literals.emptyGraph }</div>
            }
            <Grid container spacing={24}>
              { dashboard.graph && dashboard.graph.map((item, i) => {
                let width = 3;
                if (item.type !== 1) {
                  width = 4;
                }
                return (
                  <Grid item xs={width} key={i}>
                    <GraphView item={item} literals={literals} editGraph={this.editGraph} deleteGraph={deleteGraph} />
                  </Grid>
                );
              })
              }
            </Grid>
          </div>
          <div className='DashboardView--bottom'>
            <Button variant='contained' onClick={this.dashboardSave}>
              { literals.saveDashboard }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
