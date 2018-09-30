import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import PieChart from '@material-ui/icons/PieChart';
import Visibility from '@material-ui/icons/Visibility';
import TableChart from '@material-ui/icons/TableChart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Navbar from '../../../components/Navbar/container/index';
import { DASHBOARD_TYPE_GRAPH, DASHBOARD_TYPE_TABLE } from '../../../constants/dashboard';

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
    saveDashboard: PropTypes.func.isRequired,
    dashboards: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired,
    literals: PropTypes.object.isRequired,
  };

  state = {
    modalOpen: false,
    name: '',
  };

  componentDidMount() {
    const { loadDashboards } = this.props;
    loadDashboards();
  }

  addModalClose = () => {
    this.setState({ modalOpen: false, name: '' });
  };

  addModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  search = (e) => {
    const val = e.target.value;
    const { search } = this.props;
    search(val);
    return false;
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };

  saveSuccess = (res) => {
    const props = this.props;
    props.history.push(`dashboardview/${res.viewId}`);
  };

  dashboardSave = () => {
    const state = this.state;
    const data = {
      name: state.name,
    };
    const { saveDashboard } = this.props;
    saveDashboard(data, this.saveSuccess);
  };

  /**
   * @name setLoadedState
   * Sets loaded state
   *
   * @param {Boolean} loaded
   */

  render() {
    const { dashboards, literals } = this.props;
    const { modalOpen, name } = this.state;
    return (
      <div>
        <Navbar />
        <div className='Dashboard'>
          <div className='Dashboard--top'>
            <h4 className='Dashboard--top--title text-align-left'>
              { literals.title }
            </h4>
            <div className='Dashboard--top--btns text-align-right'>
              <Button variant='contained' className='Dashboard--top--btns--btn' onClick={this.addModalOpen}>
                { literals.createDashboard }
                <Add className='mlr15' />
              </Button>
              <Button variant='contained' aria-label='Add' className='Dashboard--top--btns--btn'>
                <input className='Dashboard--top--btns--btn--search-field' type='text' placeholder={literals.search} onKeyUp={this.search} />
                <SearchIcon className='Dashboard--top--btns--btn--search-submit' />
              </Button>
            </div>
          </div>
          <List className='Dashboard--list'>
            { dashboards && dashboards.map((item, i) => {
              let icon = '';
              let url = '';
              if (item.type === DASHBOARD_TYPE_TABLE) {
                icon = <TableChart />;
                url = 'table';
              } else if (item.type === DASHBOARD_TYPE_GRAPH) {
                icon = <PieChart />;
                url = 'dashboardview';
              }
              return (
                <ListItem className='Dashboard--list__list-item' key={i}>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <a href={`${url}/${item.viewId}`}>
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
          <Dialog
            open={modalOpen}
            onClose={this.addModalClose}
            className='Dashboard--AddModal'
          >
            <DialogTitle>
              { literals.createDashboard }
            </DialogTitle>
            <DialogContent>
              <div>
                <form>
                  <FormControl className='Dashboard--AddModal--formControl'>
                    <InputLabel>{ literals.modal.name }</InputLabel>
                    <Input onChange={this.changeName} value={name} />
                  </FormControl>
                  <Button onClick={this.dashboardSave}>
                    { literals.modal.ok }
                  </Button>
                  <Button onClick={this.addModalClose}>
                    { literals.modal.cancel }
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
