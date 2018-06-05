import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as parkActions from '../redux/action/park-action';
import ParkForm from '../park-form/park-form';
import Modal from '../modal/modal';

const defaultState = {
  editing: false,
};
class ParkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  render() {
    const { 
      parkCreate,
      key,
      park, 
      parkDestroy, 
      parkUpdate, 
    }
      = this.props;

    const showForm = () => parkUpdate({ ...park, editing: true });
    const hideForm = () => parkUpdate({ ...park, editing: false }); 
    const updateAndClose = updatedPark => parkUpdate({ ...updatedPark, editing: false });
    // parkUpdate = this.state.editing ? 
    console.log(park.editing);
    return (
      <div className='park' key={key}>
        <h1>Park Name: { park.name } Location: { park.city }</h1>
        <button className='park-edit' value='park' onClick={showForm}>Edit</button>
        <button className='park-delete' onClick={() => parkDestroy(park)}>Delete</button>
        <Modal className="editing-form" show={park.editing} handleClose={hideForm}>
        <h3>Editing {park.name}</h3>
        <ParkForm className='modal-form' park={park} onComplete={updateAndClose}/>
        </Modal>
        
        
        <ParkForm className='expense-form' park={park} onComplete={parkCreate}/>
        {/* <div className="park"> <h1>Trees:</h1>
        <div className="park-box">{parkTrees.map(expense => <TreeItem tree = {tree} key={tree._id} />) } </div>
        </div> */}
      </div>
    );
  }
}

ParkItem.propTypes = {
  parks: PropTypes.object,
  parkCreate: PropTypes.func,
  park: PropTypes.object,
  key: PropTypes.number,
  parkDestroy: PropTypes.func,
  parkUpdate: PropTypes.func,
};

const mapStateToProps = state => ({ 
  expenses: state.expenses,  
});

const mapDispatchToProps = (dispatch) => { 
  return {
    parkFetch: () => dispatch(parkActions.parkFetchRequest()),
    expenseCreate: park => dispatch(parkActions.parkCreateRequest(park)),
    parkDestroy: park => dispatch(parkActions.parkDeleteRequest(park)),
    parkUpdate: park => dispatch(parkActions.parkUpdateRequest(park)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ParkItem);
