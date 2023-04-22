import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryErrorView = ({ message }) => {
  return (
    <h2>{ message }</h2>
  );
};

ImageGalleryErrorView.propTypes = {
  message: PropTypes.string,
};

export default ImageGalleryErrorView;
