import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';

const defaultState = { name: '', city: '', error: null };

export default class ParkForm extends React.Component {
  constructor(props) {
    super(props);
    // park: if stuff is broken check here
    this.state = props.park ? props.park : defaultState;
    autoBind.call(this, ParkForm); // .call invokes this funciton but passes in 'this' context, so that now in the autobind funciton 'this' means this component (parkForm this) 'this'!
  }
  // ----------------------------------------------------------
  // lifecycle hook:
  // ----------------------------------------------------------
  // UNSAFE components whats that?


  componentDidUpdate(previousProps) {
    if (previousProps.park !== this.props.park) {
      this.setState(this.props.park);
    }
  } // this is like an event listener for react-- did I get new props? then reset the state plz

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);

    if (result instanceof Promise) {
      // which is to say, if superagent request pans out, .then.. so to speak
      result
        .then(() => {
          this.setState(defaultState); // must take in previous state
        })
        .catch((err) => {
          console.error('TREE FORM ERROR', err);
          this.setState({ err });
        });
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { park } = this.props;
    const buttonText = park ? 'Update Park' : 'Create Park';

    return (
    <form
    onSubmit={this.handleSubmit}
    className='park-form'
    >
    <input
      name='name'
      type='text'
      placeholder='name'
      value={this.state.name}
      onChange={this.handleChange}
      />
      <input
      name='city'
      type='text'
      placeholder='city'
      value={this.state.city}
      onChange={this.handleChange}
      />
      <button type='submit'>{buttonText}</button>
      </form>
    );
  }
}
ParkForm.propTypes = {
  onComplete: PropTypes.func,
  park: PropTypes.object,
};
