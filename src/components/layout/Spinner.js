import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div>
      <img src= {spinner} alt="Loading..." 
      //inline style
      style= {{ width: '350px',
      margin: 'auto',
      display: 'block' }}
      />
    </div>
  )
}
