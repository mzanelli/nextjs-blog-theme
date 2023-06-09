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

  const showButtons = images.length > 1; // Check if there is more than one image

  return (
    <div className="image-gallery">
      <div className="image-container">
        {showButtons && (
          <button className="image-button left-button" onClick={previousImage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        <img
          src={images[currentImageIndex].path}
          alt={images[currentImageIndex].name}
          width="100%"
          height="100%"
        />
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
