import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { PROFILE } from '../../text';
import ProfileForm from '../profile-form/profile-form';
import autoBind from '../../utils/utils';
import * as clientProfileActions from '../../redux/action/client-profile';
import * as routes from '../../routes';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

    autoBind.call(this, Profile);
  }
  // componentDidMount() {
  //   this.props.profileFetch();
  // }

  // componentDidUpdate(prevProps) {
  //   if(prevProps !== ) {
  //     this.props.profileFetch();
  //   }
  // }
  // -------------------------------------------------------------
  // member functions
  // -------------------------------------------------------------
  handleCreate(profile) {
    this.props.profileCreate(profile) 
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }
  handleUpdate(profile) {
    this.props.profileUpdate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ editing: false }); 
  }


  // -------------------------------------------------------------
  // life-cyle hooks
  // -------------------------------------------------------------
  render() {
    const { profile } = this.props;

    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (profile) {
      JSXEditing = 
      <div>
        <ProfileForm profile= {profile} onComplete={this.handleUpdate}/>
        <button onClick={() => this.setState({ editing: false })}> Cancel  
        </button>   
      </div>;
      JSXDisplay =
      <div>
         <p>{profile.firstName}</p>
         <p>{profile.lastName}</p>
        <p>{profile.bio}</p>
        <button onClick={() => this.setState({ editing: true })}> Edit </button>  
      </div>;
      JSXProfile =
      <div>
        <h2> {profile.username}</h2>
        <p>{profile.email}</p>
        {this.state.editing ? JSXEditing : JSXDisplay}
      </div>;
    }
   
    return (
      <div className='profile'>
      <h1>PROFILE</h1>
      { profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate}/> }
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileCreate: PropTypes.func,
  profileFetch: PropTypes.func,
  profileUpdate: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
});
const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(clientProfileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(clientProfileActions.updateRequest(profile)),
  profileFetch: () => dispatch(clientProfileActions.fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
