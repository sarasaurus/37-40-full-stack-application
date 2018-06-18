import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as clientPictureActions from '../../redux/action/client-pictures';
import { WELCOME } from '../../text';
import PictureForm from '../picture-form/picture-form';

class Dashboard extends React.Component {

  render() {
    return (
      <div className='dashboard'>
      <h1>{ WELCOME }</h1>
      <PictureForm onComplete={this.props.doCreatePicture}/>
      </div>
      
    );
  }
}


Dashboard.propTypes = {
  doCreatePicture: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  doCreatePicture: picture => dispatch(clientPictureActions.createRequest(picture)),
});
export default connect(null, mapDispatchToProps)(Dashboard);
