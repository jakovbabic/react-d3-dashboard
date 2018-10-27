import React, { Component } from 'react';
import './styles.css';
import { Select, Input } from 'antd';
import Button from '@material-ui/core/Button';
import 'antd/dist/antd.min.css';

/**
 * @name AddModalContent Component
 *
 * @param {Object}   dashboard
 * @param {Object}   literals
 * @param {Object}   selectedTable
 * @param {Array}   typeOptions
 * @param {Array}   tableOptions
 * @param {Func}   addModalClose
 * @param {Func}   saveModal
 * @param {Func}   dashboardChange
 *
 * @returns {JSX}
 */

const Dropdown = (props) => {
  const prop = props;
  return (
    <Select
      showSearch
      placeholder={prop.placeholder}
      optionFilterProp='children'
      onChange={prop.onChange}
      value={prop.value}
      className={prop.className}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {
        prop.options && prop.options.map((p, i) => {
          return (
            <option value={p.value} key={i}>
              { p.label }
            </option>
          );
        })
      }
    </Select>
  );
};

class AddModalContent extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    const p = this.props;
    p.onRef(this);
  }

  render() {
    const p = this.props;
    const state = this.state;
    const Search = Input.Search;
    return (
      <div className='ClientsView__AddModal'>
        <form>
          <p>{ p.literals.modal.searchNameLabel }</p>
          <Search
            placeholder={p.literals.modal.searchName}
            // onSearch={value => {}}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <p>{ p.literals.modal.advancedSearch }</p>
          <Input placeholder={p.literals.modal.code} value={state.name} className='small ClientsView__AddModal--formControl' />
          <Input placeholder={p.literals.modal.codeLocal} value={state.name} className='small ClientsView__AddModal--formControl float-right' />
          <Dropdown className='small ClientsView__AddModal--formControl' placeholder={p.literals.modal.segment} />
          <Dropdown className='small ClientsView__AddModal--formControl float-right' placeholder={p.literals.modal.sector} />
          <Dropdown className='small ClientsView__AddModal--formControl' placeholder={p.literals.modal.rating} />
          <Dropdown className='small ClientsView__AddModal--formControl float-right' placeholder={p.literals.modal.type} />
          <Dropdown className='small ClientsView__AddModal--formControl' placeholder={p.literals.modal.countryGroup} />
          <Dropdown className='small ClientsView__AddModal--formControl float-right' placeholder={p.literals.modal.country} />
          <p>{ p.literals.modal.noResult }</p>
          <Input placeholder={p.literals.modal.clientName} value={state.name} className='ClientsView__AddModal--formControl' />
          <Button>
            { p.literals.modal.ok }
          </Button>
          <Button onClick={p.addModalClose}>
            { p.literals.modal.cancel }
          </Button>
        </form>
      </div>
    );
  }
}

export default AddModalContent;
