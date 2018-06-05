import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../utils/routes';

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
    const { pathname } = location; // location has a property called pathname, here we destructure, it has actual path string
    let destinationRoute = null;

    if (pathname === routes.LOGIN_ROUTE || pathname === routes.SIGNUP_ROUTE || pathname === routes.ROOT_ROUTE) {
      // i only want someone who is loggin in to see dashboard
      if (token) {
        destinationRoute = routes.DASHBOARD_ROUTE;
      } // if user is logged in we redirect hem to the dashboard
    } else if (!token) {
      // happens with everyother route && if user not logged in
      destinationRoute = routes.ROOT_ROUTE;
    }
    // here we have 3 cases, dashboard, root or null -- ie we're logged in, so no need to redirect


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

// location will be the /api/route/string--- the entire location of the 'fake' routes/ front-end routes

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
