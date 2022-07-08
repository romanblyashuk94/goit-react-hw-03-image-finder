import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  setSelectedImage,
}) => {
  const onImageClick = () => {
    setSelectedImage(largeImageURL);
  };
  return (
    <li onClick={() => onImageClick()} className={s.galleryItem}>
      <img className={s.galleryItemImage} src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
