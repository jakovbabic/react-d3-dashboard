import React, { Component } from 'react';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { Radio, TreeSelect, Checkbox } from 'antd';
import 'antd/dist/antd.min.css';
import {
  GRAPH_TYPE_BAR,
  GRAPH_TYPE_LINE,
  GRAPH_TYPE_INDICATOR,
  GRAPH_TYPE_PIE,
  INDICATOR_IMAGES,
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

const Dropdown = (props) => {
  const prop = props;
  return (
    <Select
      value={prop.value}
      onChange={prop.onChange}
      inputProps={{
        name: prop.name,
      }}
    >
      {
        prop.options && prop.options.map((p, i) => {
          return (
            <MenuItem value={p.value} key={i}>
              { p.label }
            </MenuItem>
          );
        })
      }
    </Select>
  );
};

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class AddModalContent extends Component {
  state = {
    dashboard: '',
    type: '',
    images: [],
    tree: [],
    eeff: [],
  };

  componentDidMount() {
    this.setState({ images: INDICATOR_IMAGES });
  }

  typeChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  dashboardChange = (event) => {
    const id = event.target.value;
    const prop = this.props;
    this.setState({ [event.target.name]: event.target.value });
    prop.dashboardChange(id);
  };

  imgClicked = (key) => {
    const state = this.state;
    const rlt = [];
    state.images.forEach((item, i) => {
      const p = item;
      if (i === key) {
        p.active = 1;
      } else {
        p.active = 0;
      }
      rlt.push(p);
    });
    this.setState({ images: rlt });
  };

  treeChange = (value) => {
    this.setState({ tree: value });
  };

  handleChangeEeff = (e) => {
    const value = e.target.value;
    this.setState({ eeff: value });
  };

  handleChangeEeffCheckbox = (checkedVal) => {
    this.setState({ eeff: checkedVal });
  };

  makeTree = (data) => {
    if (!data) {
      return [];
    }
    const rlt = [];
    data.forEach((p) => {
      if (p.items && p.items.length > 0) {
        rlt.push({
          title: p.name,
          value: p.name,
          children: this.makeTree(p.items),
        });
      } else {
        rlt.push({
          title: p.name,
          value: p.name,
        });
      }
    });
    return rlt;
  };

  render() {
    const p = this.props;
    const state = this.state;
    const img = state.type === GRAPH_TYPE_INDICATOR ? 'DashboardView__AddModal--ImageContainer' : 'DashboardView__AddModal--ImageContainer hidden';
    const treeData = this.makeTree(p.selectedTable.epigraph);
    const tProps = {
      treeData,
      value: state.tree,
      onChange: this.treeChange,
      className: 'DashboardView__AddModal--formControl',
      treeCheckable: state.type !== GRAPH_TYPE_INDICATOR && state.type !== GRAPH_TYPE_PIE,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
    };
    const RadioGroup = Radio.Group;
    const CheckboxGroup = Checkbox.Group;
    const eeff = p.selectedTable.eeff && p.selectedTable.eeff.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
    let checkbox = <CheckboxGroup onChange={this.handleChangeEeffCheckbox} value={state.eeff} options={eeff} />;
    if (state.type === GRAPH_TYPE_INDICATOR || ((state.type === GRAPH_TYPE_BAR || state.type === GRAPH_TYPE_LINE) && state.tree.length > 1)) {
      checkbox = <RadioGroup onChange={this.handleChangeEeff} value={state.eeff} options={eeff} />;
    }
    return (
      <div className='DashboardView__AddModal'>
        <form>
          <FormControl className='DashboardView__AddModal--formControl'>
            <InputLabel>{ p.literals.modal.name }</InputLabel>
            <Input />
          </FormControl>
          <FormControl className='DashboardView__AddModal--formControl'>
            <InputLabel>{ p.literals.modal.dashboard }</InputLabel>
            <Dropdown options={p.tableOptions} value={state.dashboard} onChange={this.dashboardChange} name='dashboard' />
          </FormControl>
          <FormControl className='DashboardView__AddModal--formControl'>
            <InputLabel>{ p.literals.modal.type }</InputLabel>
            <Dropdown options={p.typeOptions} value={state.type} onChange={this.typeChange} name='type' />
          </FormControl>
          <FormControl className='DashboardView__AddModal--formControl'>
            <TreeSelect {...tProps} />
          </FormControl>
          <FormControl className='DashboardView__AddModal--formControl'>
            { checkbox }
          </FormControl>
          {
            <div className={img}>
              { state.images.map((item, i) => {
                const active = item.active === 1 ? 'active' : '';
                return (
                  <img src={require(`assets/images/indicators/img_ind_${item.src}.png`)} alt='test' onClick={this.imgClicked.bind(this, i)} className={active} width='50px' height='50px' key={i} />
                );
              })
              }
            </div>
          }
        </form>
      </div>
    );
  }
}

export default AddModalContent;
