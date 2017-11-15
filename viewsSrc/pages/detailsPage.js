import React from 'react';
import Details from '../components/details';

export default class DetailsPage extends React.Component {
  render(){
    return (
      <div>
        <Details name="John Doe" description="Ouloulou" />
      </div>
    );
  }
}
