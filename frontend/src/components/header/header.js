import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as authActions from '../../redux/action/auth-action';
import * as routes from '../../routes';
class Header extends React.Component {

  render () {
    const JSXNotLoggedIn = 
    <ul>
      <li><Link to={routes.ROOT_ROUTE}> Home </Link></li>
      <li><Link to={routes.LOGIN_ROUTE}> Login </Link></li>
      <li><Link to={routes.SIGNUP_ROUTE}> Sign Up </Link></li>
    </ul>;
    const JSXLoggedIn = 
    <ul>
    <li><Link to={routes.DASHBOARD_ROUTE}> Dashboard </Link></li>
    <li><Link to={routes.PROFILE_ROUTE}> Profile </Link></li>
  </ul>;

    return (
      <header className ='header'>
      <nav>
          { this.props.loggedIn ? JSXLoggedIn : JSXNotLoggedIn }
      </nav>
      {
        this.props.loggedIn ?
          <button onClick={this.props.doLogout}>Logout</button>
          : undefined
      }
      </header>
    );
  }

}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  doLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token, 
});

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(authActions.logoutFunction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
