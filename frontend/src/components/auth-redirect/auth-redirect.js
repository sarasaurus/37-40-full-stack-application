import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOGIN_ROUTE, DASHBOARD_ROUTE, SIGNUP_ROUTE, ROOT_ROUTE } from '../../routes';

/* 
*This file will do 3 things:
 * send you too root -- not logged in, it will redirect you to sign up or login; root is typically the login or sign up page
 * or to dashboard -- logged in, it will redirect you from sign up or login to dashboard; dashboard is typically the signed in page
 * or do nothing
 */

class AuthRedirect extends React.Component {
/*
* WHEN BUILD NEW COMPONENT ASK SELF:
 * do I need to connect to the store?
 *  - here yes, because this component needs access to the 'token'
 * do i need props?
 * - yes but explain why later
 * do i need any member funciton aka methods or lifecycle hooks?
 *  - nothing apart from render
 * what do i need to render?
 */
  render() {
    const { location, token } = this.props;
    const { pathname } = location; 
    let destinationRoute = null;

    if (pathname === LOGIN_ROUTE || pathname === SIGNUP_ROUTE || pathname === ROOT_ROUTE) {
      if (token) {
        destinationRoute = DASHBOARD_ROUTE;
      } 
    } else if (!token) {
      destinationRoute = ROOT_ROUTE;
    }

    return (
      <div>
        { destinationRoute ? <Redirect to={ destinationRoute }/> : undefined }
      </div>
    );
  }
}
AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
