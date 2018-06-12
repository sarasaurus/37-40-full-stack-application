import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    // check errors
    if (!file) {
      return reject(new Error('you must send a file'));
    }
    const fileReader = new FileReader();
    
    fileReader.addEventListener('load', () => resolve(fileReader.result));
    fileReader.addEventListener('error', reject);
  });
};
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
  handleChange(event) {
    const { type, value, files } = event.target; // this is from a standard js event
    if (type === 'file') {
      // this is async
      fileToBase64String(files[0])
        .then(result => this.setState({ preview: result })); // if just return preview, could do { preview } ie preview: preview
      this.setState({
        picture: files[0],
      }, () => {
        console.log('i will fire only after the state changes');
      });
    } else {
      // basically if this is not a file (From the form feild type.. so only other option is description)
      this.setState({
        description: value,
      });
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(this.emptyState);

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
PictureForm.propTypes = {
  onComplete: PropTypes.func,
};
export default PictureForm;
