import React from 'react';
import { WELCOME } from '../../text';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
      <h1>{ WELCOME }</h1>
      </div>
      
    );
  }
}
