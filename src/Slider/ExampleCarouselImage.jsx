import React from 'react';
import PropTypes from 'prop-types';

function ExampleCarouselImage({ src, alt }) {
  return (
    <div style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <img src={src} alt={alt} style={{ width: '100%',  objectFit: 'cover' }} />
    </div>
  );
}

ExampleCarouselImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;
