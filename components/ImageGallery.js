import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const showButtons = images.length > 1; 

  return (
    <div className="image-gallery">
      <div className="image-container">
        {showButtons && (
          <button className="image-button left-button" onClick={previousImage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        <div className="image-wrapper">            
        {images[currentImageIndex].url ? (  <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].name}
              width="320px"
              className='rounded-image'
            />):(  <img
              src={images[currentImageIndex].map.url}
              alt={images[currentImageIndex].map.name}
              width="320px"
              className='rounded-image'
            />)}
      


        </div>
        {showButtons && (
          <button className="image-button right-button" onClick={nextImage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
