import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import AuthRedirect from '../auth-redirect/auth-redirect'; 
import AuthLanding from '../auth-landing/auth-landing';
import '../../../styles/main.scss';

export default class App extends React.Component {
  render() {
    return (
<div className="app">
<BrowserRouter>
<div>
  <header className='app-header'>
    <h1>Add a Park to the Database</h1>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
  </header>
  {/* <Route 
    exact
    path="/"
    component= { Dashboard }
    /> */}
    <Route exact path="*" component= { AuthRedirect }/>
    <Route exact path='/' component={AuthLanding}/>
    <Route exact path='/signup' component={AuthLanding}/>
    <Route exact path='/login' component={AuthLanding}/>
    <Route exact path='/dashboard' component={Dashboard}/>
  </div>
</BrowserRouter>
  
</div>
    );
  }
}
// Browser router always sends its location property to its children in the dom-- so the location property in suth-redirect comes from this component/method