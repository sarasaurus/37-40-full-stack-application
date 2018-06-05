import React from 'react';
import Adapter from 'enzyme-adapter-react-16'; // react has virtual dom and dom--chrome
import { Provider } from 'react-redux'; // wraps the store of app and allows us to 'store' it in the dom
import { configure as configureEnzyme, shallow as enzymeShallowMount, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Dashboard from '../components/dashboard/dashboard';

// when testing we need to create both fake virtual dom and fake real dom-- enzyme does that-- but it needs the adapter to do it, because react often changes virtual dom, so enzyme extracted those interations into this plugin in order to accomodate those changes

// first configure adaptor for enzyme:
configureEnzyme({ adapter: new Adapter() });

// second write normal describe block test
// any change to your reducers will afect these tests--- you must TOTALLY accurately mock the state

describe('#Dashboard', () => {
  // configureStore requires an initial state:--recreate the state in our app
  const testState = {
    categories: 
      [{
        name: '______popsicles________',
        budget: 5000,
        id: '0.123',
        timestamp: new Date(),
      }, 
      {  
        name: 'candy',
        budget: 900,
        id: '0.124',
        timestamp: new Date(),
      }],
    expenses: {
      0.123: [],
      0.124: [],
    },
    
  };
  test('testing Dashboard\'s interactions with the store', () => {
    const middleware = [];// if need a middleware it is passed in as middleware, see below
    const mockStoreFactory = configureStore(middleware); // does not give you a store, it give you function that can create stores!
    const mountedDashboard = mount(<Provider store={mockStoreFactory(testState)}><Dashboard/></Provider>);
    console.log(mountedDashboard.html());

    expect(mountedDashboard.find('CategoryForm')).toBeTruthy(); 
    expect(mountedDashboard.find('CategoryItem').length).toEqual(2);
  });
});
