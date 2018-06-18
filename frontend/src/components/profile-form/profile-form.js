import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';

const emptyState = {
  firstName: '',
  lastName: '',
  bio: '',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : emptyState;
    autoBind.call(this, ProfileForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
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
        <input
          name='firstName'
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <input
          name='lastName'
          value={this.state.lastName}
          onChange={this.handleChange}
        />
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
