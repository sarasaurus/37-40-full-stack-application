import React from 'react';
import Adapter from 'enzyme-adapter-react-16'; // react has virtual dom and dom--chrome
// import { Provider } from 'react-redux'; // wraps the store of app and allows us to 'store' it in the dom
import { configure as configureEnzyme, mount } from 'enzyme';
// import configureStore from 'redux-mock-store';
import ProfileForm from '../components/profile-form/profile-form';

configureEnzyme({ adapter: new Adapter() });

describe('#ProfileForm', () => {
  test('the state should be changed as the calues in the form change', () =>{
    const testEvent = {
      target: {
        name: 'title',
        value: 'gregor',
      }
    };
    const mountedForm = mount (<ProfileForm/>);
    mountedForm.find('.profile-form input').simulate('change', testEvent);
    expect(mountedForm.state().title).toEqual('gregor sanchez');
  });
  test('the onComplete function should be called', ()=>{
    const mountedForm = mount(<ProfileForm/>); // MOUNT YOUR COMPONENT IN EVERY TEST DO NOT RELY ON A PREVIOUS MOUNT
    mountedForm.setProps( { onComplete: jest.fn() }); // determine that a funciton is exists and if has been called?-- jest.fn() does just that-- lets us know if function and if has been called
    mountedForm.simulate('submit', { preventDefault: () => {} });
    expect(mountedForm.props().onComplete).toHaveBeenCalled(); // we have acces to this to havebeencalled method because of the jest.fn() in line 24
  });
});