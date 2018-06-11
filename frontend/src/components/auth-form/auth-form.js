import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import autoBind from '../../utils/utils';

// UI state-- app state is the store

const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username required',

  email: '',
  emailDirty: false,
  emailError: 'Email required',

  password: '',
  passwordDirty: false,
  passwordError: 'Password required',
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, AuthForm);
  }
 
  handleValidation(name, value) {
    const MIN_NAME_SIZE = 5;
    const MIN_PASSWORD_SIZE = 5;
    // cause if not, youd be helping people hack accounts!
    if (this.props.type === 'login') {
      return null;
    }
    switch (name) { // remember name is from the JSX ele-- so name/password/email
      case 'username':
        // here you can define your own logic-- like what should this validation look like
        if (value.length < MIN_NAME_SIZE) {
          return `your name must be ${MIN_NAME_SIZE} characters long`;
        } return null; // switch cases must return values at each point!!
      case 'email':
        if (!validator.isEmail(value)) {
          return 'you must provide a valid email!';
        } return null;
      case 'password':
        if (value.length < MIN_PASSWORD_SIZE) {
          return `your password must be ${MIN_PASSWORD_SIZE} characters long`;
        } return null; 
      default:
        return null;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { usernameError, emailError, passwordError } = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    } else {
      // now all our error messaging will persist
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
      });
    }
  }

  // life cycle hooks

  render() {
    let { type } = this.props;
    type = type === 'login' ? type : 'signup';

    const signupJSX = 
    <div>
      {this.state.emailDirty ? <p>{this.state.emailError}</p> : undefined}
      <input
        formNoValidate
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />
    </div>;

    const signupRenderJSX = (type !== 'login') ? signupJSX : undefined;
    return (
    <form className='auth-form' onSubmit={this.handleSubmit} >
          
      {this.state.usernameDirty ? <p>{this.state.usernameError}</p> : undefined}
    <input
      formNoValidate
      name='username'
      placeholder='username'
      type='text'
      value={this.state.username}
      onChange={this.handleChange}
    />
    {signupRenderJSX}
    {this.state.passwordDirty ? <p>{this.state.passwordError}</p> : undefined}
    <input
      formNoValidate
      name='password'
      placeholder='password'
      type='password'
      value={this.state.password}
      onChange={this.handleChange}
    />

    <button type='submit'> { type } </button>
    </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
