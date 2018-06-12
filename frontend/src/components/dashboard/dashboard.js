import React from 'react';
import { WELCOME } from '../../text';
import PictureForm from '../picture-form/picture-form'

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
      <h1>{ WELCOME }</h1>
      <PictureForm/>
      </div>
      
    );
  }
}
