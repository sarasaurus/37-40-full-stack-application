import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';

class PictureForm extends React.Component {
  constructor(props) {
    super(props); // called super because in traditonal OOP, parent class was called the super class
    this.emptyState = {
      preview: undefined, // this will be the base-s6 represntation
      picture: '', // this will be a path, the url
      description: '',
    };
    this.state = this.emptyState; // you dont have to make an empty state, but if you ever wnat one, you'll have to type out these empty values by hand-- this can also life outside the component
    autoBind.call(this, PictureForm);
  }
  // img tag src is able to toggle between base-s4 string and localpath, with no additional input-- automatic
  // member funcs----------
  handleChange() {

  }
  handleSubmit() {

  }


  // life cycle hooks------------
  render() {
    return (
      <form 
      className='picture-form'
      onSubmit={this.handleSubmit}
      >
      <img src={this.state.preview}/>
      <label>Picture</label>
      <input 
        type='file'
        name='photo'
        onChange={this.handleChange}
      />
      <label>Description</label>
      <input
        type='text'
        name='description'
        value={this.state.description}
        onChange={this.handleChange}
      />
      <button type='submit'>Upload a Picture</button>
      </form>
    );
  }
}

export default PictureForm;
