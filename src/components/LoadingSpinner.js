import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

class LoadingSpinner extends Component {
  
  render() { 
    return ( 
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> 
    );
  }
}
 
export default LoadingSpinner;