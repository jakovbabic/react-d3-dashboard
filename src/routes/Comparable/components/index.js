import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-grid-layout/css/styles.css';
import AddModalContent from './AddModalContent';
// import GraphView from './GraphView';
import Navbar from '../../../components/Navbar/container/index';


/**
 * @name DashboardViewPage
 *
 * @param {Object}   dashboard
 * @param {Object}   selectedTable
 * @param {Object}   tableOptions
 * @param {Object}   typeOptions
 * @param {Object}   literals
 *
 * @returns {JSX}
 */

class Comparable extends Component {
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

  /**
   * @name setName
   * Sets dashboard name state
   *
   * @param {Obj} Dashboard
   */
  setName = (res) => {
    this.setState({ name: res.name });
  };
  /**
   * @name addModalOpen
   * Open graph modal
   *
   */

  addModalOpen = () => {
    const { literals } = this.props;
    this.setState({ modalOpen: true, modalTitle: literals.modalTitle });
  };

  /**
   * @name editGraph
   * Open graph modal and set form data
   *
   * @param {Obj} selected graph data
   */
  editGraph = (item) => {
    const { literals } = this.props;
    this.setState({ modalOpen: true, modalTitle: literals.editGraph });
    const p = this.props;
    p.dashboardChange(item.sourceView);
    setTimeout(() => {
      this.childModal.editGraph(item);
    }, 0);
  };

  /**
   * @name addModalClose
   * Close graph modal
   *
   */
  addModalClose = () => {
    this.setState({ modalOpen: false });
    const {
      cancelModal,
    } = this.props;
    cancelModal();
  };

  /**
   * @name dashboardSave
   * Save the dashboard
   *
   */
  dashboardSave = () => {
    const state = this.state;
    const { saveDashboard, dashboard } = this.props;
    const data = dashboard;
    data.name = state.name;
    saveDashboard(data);
  };

  /**
   * @name changeName
   * Sets name state when change dashboard name
   * @param {Obj} input event
   */
  changeName = (e) => {
    this.setState({ name: e.target.value });
    return true;
  };

  deleteCallback = () => {
    this.setState({ modalOpen: false });
  };

  deleteGraph = (item) => {
    const { deleteGraph } = this.props;
    deleteGraph(item, this.deleteCallback);
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
    const {
      modalOpen,
      modalTitle,
    } = this.state;
    return (
      <div>
        <Navbar title={literals.title} />
        <div className='ClientsView'>
          <Dialog
            open={modalOpen}
            onClose={this.addModalClose}
            className='ClientsView__Dialog'
          >
            <DialogTitle>
              { modalTitle }
            </DialogTitle>
            <DialogContent>
              <AddModalContent onRef={(ref) => { this.childModal = ref; }} dashboard={dashboard} addModalClose={this.addModalClose} saveModal={saveModal} literals={literals} selectedTable={selectedTable} typeOptions={typeOptions} tableOptions={tableOptions} dashboardChange={dashboardChange} />
            </DialogContent>
          </Dialog>
          <h3>
            {literals.title}
          </h3>
          <div className='ClientsView--content'>
            <div className='ClientsView--content--empty' onClick={this.addModalOpen}>
              <h5 className='text-center'>
                {literals.clientCompare}
              </h5>
              <div className='ClientsView--content--empty--content'>
                {literals.addClient}
              </div>
            </div>
          </div>
          <div className='ClientsView--bottom'>
            <Button variant='contained' onClick={this.dashboardSave}>
              { literals.clear }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comparable;
