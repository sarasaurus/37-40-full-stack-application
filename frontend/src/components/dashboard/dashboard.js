import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ParkForm from '../park-form/park-form';
import ParkItem from '../park-item/park-item';
import * as parkActions from '../../redux/action/park-action';
import AuthLanding from '../auth-landing/auth-landing'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.parkFetch();
  }
  render() {
    const { parks, parkCreate, parkDelete, parkUpdate } = this.props;
    return (
      <div className= "dashboard">
      <div className="create-park">
      <h1>Create a Park</h1>
      <ParkForm
      onComplete={ parkCreate }
      />
      </div>
      <h1>Parks:</h1>
      { parks.map((park) => {
       return (
        <div className='park-item' key={park._id }>
        <p>{park.name}</p>
        <p>{park.city}</p>
        <button onClick={() => parkDelete(park)}>X</button>
        <ParkForm 
        park={park}
        onComplete={ parkUpdate }
        />
        </div>
       );
      }) 
      }
      </div>
    );
  }
}

Dashboard.propTypes = {
  parkFetch: PropTypes.func,
  parkCreate: PropTypes.func,
  parkDelete: PropTypes.func,
  parkUpdate: PropTypes.func,
  parks: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    parks: state.parks,
  }
}
const mapDispatchToProps = (dispatch) => ({
    parkFetch: ()=> dispatch(parkActions.parkFetchRequest()),
    parkCreate: park => dispatch(parkActions.parkCreateRequest(park)),
    parkDelete: park => dispatch(parkActions.parkDeleteRequest(park)),
    parkUpdate: park => dispatch(parkActions.parkUpdateRequest(park)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// parkFetchRequest, parkCreateRequest, parkDeleteRequest, parkUpdateRequest
/*<ParkItem 
parks = {parks}
key={park._id}
park={park}
parkCreate={parkCreate}
parkDestroy={ parkDelete }
onComplete={ parkUpdate }
/>*/