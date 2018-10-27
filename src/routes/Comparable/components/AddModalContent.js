import React, { Component } from 'react';
import './styles.css';
import { Select, Input, Checkbox } from 'antd';
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
  const Option = Select.Option;
  return (
    <Select
      showSearch
      placeholder={prop.placeholder}
      optionFilterProp='children'
      onChange={(e) => { prop.onChange(e, prop.name); }}
      value={prop.value}
      className={prop.className}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {
        prop.options && prop.options.map((p, i) => {
          return (
            <Option value={p} key={i}>
              { p }
            </Option>
          );
        })
      }
    </Select>
  );
};

class AddModalContent extends Component {
  state = {
    name: '',
    code: '',
    codeLocal: '',
    segment: undefined,
    sector: undefined,
    rating: undefined,
    country: undefined,
    countryGroup: undefined,
    type: undefined,
    clients: [],
    view: {
      empty: false,
      advanced: false,
    },
  };

  componentDidMount() {
    const p = this.props;
    p.onRef(this);
    this.setData = this.setData.bind(this);
    this.setInputData = this.setInputData.bind(this);
    this.setToggleEmpty = this.setToggleEmpty.bind(this);
    this.setToggleAdvance = this.setToggleAdvance.bind(this);
    this.search = this.search.bind(this);
    this.save = this.save.bind(this);
  }

  setData(val, key) {
    const ob = {};
    ob[key] = val;
    this.setState(ob);
  }

  setInputData(e) {
    const ob = {};
    ob[e.target.name] = e.target.value;
    this.setState(ob);
  }

  setToggleEmpty() {
    const st = this.state;
    const p = st.view.empty;
    this.setState({
      view: {
        empty: !p,
      },
    });
  }

  setToggleAdvance() {
    const st = this.state;
    const p = st.view.advanced;
    this.setState({
      view: {
        advanced: !p,
      },
    });
  }

  getSectorOptions() {
    const st = this.state;
    const prop = this.props;
    let rlt = [];
    if (st.segment) {
      for (let i = 0; i < prop.sectorOptions.length; i += 1) {
        if (prop.sectorOptions[i].segment === st.segment) {
          rlt = prop.sectorOptions[i].sectors;
          break;
        }
      }
    }
    return rlt;
  }

  getAdvancedOptions() {
    const p = this.props;
    const state = this.state;
    return (
      <div>
        <Input name='code' onChange={this.setInputData} placeholder={p.literals.modal.code} value={state.code} className='small ClientsView__AddModal--formControl' />
        <Input name='codeLocal' onChange={this.setInputData} placeholder={p.literals.modal.codeLocal} value={state.codeLocal} className='small ClientsView__AddModal--formControl float-right' />
        <Dropdown
          value={state.segment}
          className='small ClientsView__AddModal--formControl'
          placeholder={p.literals.modal.segment}
          options={p.segmentOptions}
          name='segment'
          onChange={this.setData}
        />
        <Dropdown name='sector' onChange={this.setData} value={state.sector} className='small ClientsView__AddModal--formControl float-right' placeholder={p.literals.modal.sector} options={this.getSectorOptions()} />
        <Dropdown name='rating' onChange={this.setData} value={state.rating} className='small ClientsView__AddModal--formControl' placeholder={p.literals.modal.rating} options={p.segmentOptions} />
        <Dropdown name='type' onChange={this.setData} value={state.type} className='small ClientsView__AddModal--formControl float-right' placeholder={p.literals.modal.type} options={p.typeOptions} />
        <Dropdown name='countryGroup' onChange={this.setData} value={state.countryGroup} className='small ClientsView__AddModal--formControl' placeholder={p.literals.modal.countryGroup} options={p.countryGroupOptions} />
        <Dropdown name='country' onChange={this.setData} value={state.country} className='small ClientsView__AddModal--formControl float-right' placeholder={p.literals.modal.country} options={p.countryOptions} />
      </div>
    );
  }

  getClientList() {
    const state = this.state;
    return (
      <div className='ClientsView__AddModal--clients'>
        <ul>
          {
            state.clients.map((item, i) => {
              return (
                <li key={i}>
                  <Checkbox checked={item.selected} onChange={(e) => { this.clientCheck(i, e.target.checked); }}>{item.name}</Checkbox>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  clientCheck(index, val) {
    const st = this.state;
    const clients = st.clients;
    clients.forEach((e, i) => {
      if (index === i) {
        e.selected = val;
      }
    });
    this.setState(clients);
  }

  search() {
    const state = this.state;
    const prop = this.props;
    const data = {
      name: state.name || '',
      code: state.code || '',
      localCode: state.codeLocal || '',
      segment: state.segment || '',
      sector: state.sector || '',
      type: state.type || '',
      rating: state.rating || '',
      country: state.country || '',
      countryGroup: state.countryGroup || '',
    };
    prop.search(data, (res) => {
      this.setState({
        clients: res,
      });
    });
  }

  save() {
    const st = this.state;
    const rlt = [];
    st.clients.forEach((e) => {
      if (e.selected) {
        rlt.push(e.id);
      }
    });
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
            name='name'
            placeholder={p.literals.modal.searchName}
            onChange={this.setInputData}
            onSearch={this.search}
            value={state.name}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <p onClick={this.setToggleAdvance}>{ p.literals.modal.advancedSearch }</p>
          {
            state.view.advanced && this.getAdvancedOptions()
          }
          <p onClick={this.setToggleEmpty}>{ p.literals.modal.noResult }</p>
          {
            state.view.empty && <Input placeholder={p.literals.modal.clientName} value={state.name} className='ClientsView__AddModal--formControl' />
          }
          {
            !state.view.empty && this.getClientList()
          }
          <Button onClick={this.save}>
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
