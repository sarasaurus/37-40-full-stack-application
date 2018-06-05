import React from 'react';
import * as authActions from '../../redux/action/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autoBind from '../../utils/utils';
import * as routes from '../../utils/routes';
class AuthLanding extends React.Component {
  constructor(props){
    super(props);
    autoBind.call(this, AuthLanding);
  }
  // ---------------------------------------------------
  // member functions
  // ---------------------------------------------------
handleLogin(user) {
  return this.props.pDoLogin(user)
    .then(() => {
      // need to redirect to dashboard
      this.props.history.push(routes.DASHBOARD_ROUTE)
    })
    .catch(console.error)

}
handleSignup(user) {
  return this.props.pDoSignup(user)
    .then(() => {
      // need to redirect to dashboard
      // history is a property of the routes object
      this.props.history.push(routes.DASHBOARD_ROUTE)
    })
    .catch(console.error)
}
  // ---------------------------------------------------
  // life cycle hooks
  // ---------------------------------------------------
render () {
  const rootJSX = <div>
    <h2>Welcome!</h2>
    <Link to='/signup'>sign up</Link>
    <Link to='/login'>log in</Link>
  </div>;

  const signUptJSX = <div>
    <h2>welcome sign up!</h2>
    <AuthForm onComplete={this.handleSignup}/>
    <p>already have an account?</p>
    <Link to='/login'> login </Link>
  </div>;

  const loginJSX = <div>
    <h2>login!</h2>
    <AuthForm type='login' onComplete={this.handleLogin}/>
    <p>no account?</p>
    <Link to='/signup'> signup</Link>
  </div>;


const { location } = this.props; // move declaration as close as possible to where you are using them
// but another school of though says declare in one spot so can see in one glance everything the app will use--- biggest thing is consistency
  return (
    <div className='landing'>
      { location.pathname === routes.ROOT_ROUTE ? rootJSX : undefined }
      { location.pathname === routes.SIGNUP_ROUTE ? signupJSX : undefined }
      { location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined }
    </div>
  )

}
}

AuthLanding.propTypes = {
    pDoLogin: PropTypes.func,
    pDoSignup: PropTypes.func,
}
const mapStateToProps = state => ({
  token: state.token,
});

// do is to imply we connect to store, but is not action, is not async action is something eles
const mapDispatchToProps = dispatch => ({
  pDoSignup: user => dispatch(authActions.signupRequest(user))
  pDoLogin: user => dispatch(authActions.loginRequest(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);