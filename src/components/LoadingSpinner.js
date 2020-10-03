import React from 'react';
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';


  
const LoadingSpinner = props => {

  const {promiseInProgress } = usePromiseTracker();

  return ( 
    promiseInProgress &&
    <div className="loader">
      <span className="sr-only">Loading...</span>
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
    
  );
  
}
 
export default LoadingSpinner;