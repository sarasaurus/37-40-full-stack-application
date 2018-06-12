import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';

const emptyState = {
  bio: '',
};

class ProfileForm extends React.Component {
  // we cloning REact.component, and giving it the name ProfileForm, super(props) is to connect with react component backend-- not our own component hiearchy we can see
  constructor(props) {
    super(props);// ES6 not a react thing, this is sending props to the parent class (ie the react component /react library) incase it needs the props, regardless of how you feel, es6 requires you call this funciton anyway! --- we sending props to React here, not the component in our structure

    this.state = props.profile ? props.profile : emptyState;
    autoBind.call(this, ProfileForm);
    console.log('PROPS IN FORM', this.props.profile);
  }

  // TODO: handleChange, handleSubmit

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      bio: value,
    });
  }
  handleSubmit(e) {
    // TODO: check into propagation prvention
    e.preventDefault();
    this.props.onComplete(this.state);
  }
  //-----------------------------------------------------
  // HOOKS
  //-----------------------------------------------------
  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>
        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />
        <button type='submit'>{this.props.profile ? 'update' : 'create' } profile </button>
        </form>
    );
  }
}
ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

export default ProfileForm;
