import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-grid-layout/css/styles.css';
import { Select } from 'antd';
import AddModalContent from './AddModalContent';
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
    loadTypeOptions: PropTypes.func.isRequired,
    loadCountryOptions: PropTypes.func.isRequired,
    loadCountryGroupOptions: PropTypes.func.isRequired,
    loadSegmentOptions: PropTypes.func.isRequired,
    loadSectorOptions: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    literals: PropTypes.object.isRequired,
    typeOptions: PropTypes.array.isRequired,
    countryOptions: PropTypes.array.isRequired,
    countryGroupOptions: PropTypes.array.isRequired,
    segmentOptions: PropTypes.array.isRequired,
    clients: PropTypes.array.isRequired,
    sectorOptions: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '',
      modalOpen: false,
    };
  }

  componentDidMount() {
    const {
      loadTypeOptions,
      loadCountryOptions,
      loadCountryGroupOptions,
      loadSegmentOptions,
      loadSectorOptions,
    } = this.props;
    loadTypeOptions();
    loadCountryOptions();
    loadCountryGroupOptions();
    loadSegmentOptions();
    loadSectorOptions();
  }

  /**
   * @name setName
   * Sets dashboard name state
   *
   * @param {Obj} Dashboard
   */

  addModalOpen = () => {
    const { literals } = this.props;
    this.setState({ modalOpen: true, modalTitle: literals.modalTitle });
  };

  /**
   * @name addModalClose
   * Close graph modal
   *
   */
  addModalClose = () => {
    this.setState({ modalOpen: false });
  };

  /**
   * @name changeName
   * Sets name state when change dashboard name
   * @param {Obj} input event
   */

  render() {
    const {
      literals,
      typeOptions,
      countryOptions,
      countryGroupOptions,
      segmentOptions,
      sectorOptions,
      search,
      save,
      clients,
      clear,
    } = this.props;
    const {
      modalOpen,
      modalTitle,
    } = this.state;
    const Option = Select.Option;
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
              <AddModalContent
                onRef={(ref) => { this.childModal = ref; }}
                addModalClose={this.addModalClose}
                literals={literals}
                typeOptions={typeOptions}
                countryOptions={countryOptions}
                countryGroupOptions={countryGroupOptions}
                segmentOptions={segmentOptions}
                sectorOptions={sectorOptions}
                search={search}
                save={save}
              />
            </DialogContent>
          </Dialog>
          <h4>
            {literals.title}
          </h4>
          <div className='ClientsView--content'>
            {
              clients.map((item, i) => {
                return (
                  <div className='ClientsView--content--item' key={i}>
                    <h5 className='text-center'>
                      {literals.clientCompare}
                    </h5>
                    <div className='ClientsView--content--item--content'>
                      <p>
                        {item.name}
                      </p>
                      <p>
                        {literals.eeffList}
                      </p>
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder={literals.eeff}
                        optionFilterProp='children'
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {
                          item.eeff && item.eeff.map((p, j) => {
                            return (
                              <Option value={p.alias} key={j}>
                                { p.name }
                              </Option>
                            );
                          })
                        }
                      </Select>
                    </div>
                  </div>
                );
              })
            }
            <div className='ClientsView--content--empty' onClick={this.addModalOpen}>
              <h5 className='text-center'>
                {literals.clientCompare}
              </h5>
              <div className='ClientsView--content--empty--content'>
                {literals.addClient}
              </div>
            </div>
            <div className='clearfix' />
          </div>
          <div className='ClientsView--bottom'>
            <Button variant='contained' onClick={clear}>
              { literals.create }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comparable;
