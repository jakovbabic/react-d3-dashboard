import React, { Component } from 'react';
import './styles.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
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
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
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
  };


  componentDidMount() {
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const p = this.props;
    const state = this.state;
    return (
      <div className='DashboardView__AddModal'>
        <form>
          <FormControl className='DashboardView__AddModal--formControl'>
            <InputLabel>{ p.literals.modal.name }</InputLabel>
            <Input />
          </FormControl>
          <FormControl className='DashboardView__AddModal--formControl'>
            <InputLabel>{ p.literals.modal.dashboard }</InputLabel>
            <Dropdown options={p.tableOptions} value={state.dashboard} onChange={this.handleChange} name='dashboard' />
          </FormControl>
          <FormControl className='DashboardView__AddModal--formControl'>
            <InputLabel>{ p.literals.modal.type }</InputLabel>
            <Dropdown options={p.typeOptions} value={state.type} onChange={this.handleChange} name='type' />
          </FormControl>
        </form>
      </div>
    );
  }
}

export default AddModalContent;
