import React, { Component } from 'react';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Radio, TreeSelect, Checkbox } from 'antd';
import 'antd/dist/antd.min.css';
import {
  GRAPH_TYPE_BAR,
  GRAPH_TYPE_LINE,
  GRAPH_TYPE_INDICATOR,
  INDICATOR_IMAGES,
  GRAPH_TYPE_PIE,
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
    selectedImg: '',
    eeff: [],
    width: 0,
    height: 0,
    name: '',
  };

  componentDidMount() {
    this.setState({ images: INDICATOR_IMAGES });
  }

  typeChange = (event) => {
    const val = event.target.value;
    this.setState({ [event.target.name]: val });
    if (val === GRAPH_TYPE_INDICATOR) {
      this.setState({ width: 3, height: 3 });
    } else {
      this.setState({ width: 4, height: 4, selectedImg: '' });
    }
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
    let src = '';
    state.images.forEach((item, i) => {
      const p = item;
      if (i === key) {
        p.active = 1;
        src = p.src;
      } else {
        p.active = 0;
      }
      rlt.push(p);
    });
    this.setState({ images: rlt, selectedImg: src });
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

  changeName = (e) => {
    this.setState({ name: e.target.value });
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
          value: p.alias,
          children: this.makeTree(p.items),
        });
      } else {
        rlt.push({
          title: p.name,
          value: p.alias,
        });
      }
    });
    return rlt;
  };

  graphSave = () => {
    const state = this.state;
    let eeff = [];
    if (typeof state.eeff === 'string') {
      eeff = [{
        alias: state.eeff,
      }];
    } else {
      eeff = state.eeff.map((e) => {
        return {
          alias: e,
        };
      });
    }
    let epigraph = [];
    if (typeof state.tree === 'string') {
      epigraph = [{
        alias: state.tree,
      }];
    } else {
      epigraph = state.tree.map((e) => {
        return {
          alias: e,
        };
      });
    }
    const data = {
      type: state.type,
      sourceView: parseInt(state.dashboard, 10),
      viewId: parseInt(state.dashboard, 10),
      epigraph,
      image: state.selectedImg,
      eeff,
      width: state.width,
      height: state.height,
      name: state.name,
      position_x: '',
      position_y: '',
    };
    const p = this.props;
    p.saveModal(data);
  }

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
      multiple: state.type !== GRAPH_TYPE_INDICATOR && state.type !== GRAPH_TYPE_PIE,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
    };
    const RadioGroup = Radio.Group;
    const CheckboxGroup = Checkbox.Group;
    const eeff = p.selectedTable.eeff && p.selectedTable.eeff.map((item) => {
      return {
        label: item.name,
        value: item.alias,
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
            <Input onChange={this.changeName} />
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
            <p>{ p.literals.modal.epigraph }</p>
            <TreeSelect {...tProps} />
          </FormControl>
          <FormControl className='DashboardView__AddModal--formControl'>
            <p>{ p.literals.modal.eeff }</p>
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
          <Button onClick={this.graphSave}>
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
