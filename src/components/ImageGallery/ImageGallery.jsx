import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ setSelectedImage, images }) => {
  return (
    <ul className={s.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          setSelectedImage={setSelectedImage}
          {...image}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
