/**
* React-Upload
*
* Standalone component to upload a file
*
* Author: Alexandre PENOMBRE <aluzed@gmail.com>
* Copyright (c) 2017
*/
import React from 'react';
import ReactDOM from 'react-dom';
import DropZone from './components/dropZone';
// import A from './components/a';

window.$ReactUpload = (el, destPath) => {
  const injElement = document.getElementById(el);

  if(!destPath) {
    throw new Error('Error, React Upload destPath parameter cannot be null.');
  }

  ReactDOM.render(<DropZone url={destPath} />, injElement);
}
