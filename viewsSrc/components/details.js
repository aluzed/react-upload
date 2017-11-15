import React from 'react';

class Details extends React.Component {
  render() {
    return (
      <div>
        <h3>Name: {this.props.name}</h3>
        <p>Description: {this.props.description}</p>
      </div>
    )
  }
}

export default Details;
