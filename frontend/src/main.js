import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render as reactDomRender } from 'react-dom'; // destructuring {reactDom} 
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import session from './components/lib/redux-session';
import reporter from './components/lib/redux-reporter';
import App from '../src/components/app/app';
import rootReducer from './components/redux/reducer/main-reducer';
import thunk from './components/lib/redux-thunk';

import '../styles/main.scss';

// setting up store-------->
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk, reporter, session)), // order matters here just like express middleware
);

// rendering the app--------->
const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

reactDomRender(<Provider store = {store}><App /></Provider>, appContainer);// wrap the app in the provider, if had not destructerd in import would do reactDom.render
