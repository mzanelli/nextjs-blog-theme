import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className='image-gallery'>
      <div className='image-container'>
        <button className='image-button left-button' onClick={previousImage}>
          &lt;
        </button>
        <img 
        src={images[currentImageIndex].path} 
        alt={images[currentImageIndex].name} 
        width='100%' 
        height='100%' />
        <button className='image-button right-button' onClick={nextImage}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
