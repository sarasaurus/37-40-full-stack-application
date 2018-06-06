import React from 'react';

export default class Dashboard extends React.Component {
  render() {
    console.log('dashboard rendered');
    return (
      <div className='dashboard'>
      <h1>What you see if you're logged in!</h1>
      </div>
      
    );
  }
}
