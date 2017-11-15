import React from 'react';
import User from '../components/user';

export default class IndexPage extends React.Component {
  render(){
    return (
      <div>
        <User name="John Doe" description="Ouloulou" />
      </div>
    );
  }
}
