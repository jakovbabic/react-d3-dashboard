import React, { Component } from 'react';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { GRAPH_TYPE_INDICATOR, INDICATOR_IMAGES } from '../../../constants/dashboard';
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

class AddModalContent extends Component {
  state = {
    dashboard: '',
    type: '',
    images: [],
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

  render() {
    const p = this.props;
    const state = this.state;
    const img = state.type === GRAPH_TYPE_INDICATOR ? 'DashboardView__AddModal--ImageContainer' : 'DashboardView__AddModal--ImageContainer hidden';
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
          <FormControl>
            <FormLabel>Pick</FormLabel>
            <FormGroup>
              { p.selectedTable.eeff && p.selectedTable.eeff.map((item, i) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox value='gilad' />
                    }
                    label={item.name}
                    key={i}
                  />
                );
              })
              }
            </FormGroup>
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
