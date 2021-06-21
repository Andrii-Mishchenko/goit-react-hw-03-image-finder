import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles.module.css'
import ImageGalleryItem from '../ImageGalleryItem'


const ImageGallery = ({pictures, onPictureClick}) =>(
    <ul className={styles.ImageGallery}>
        {pictures.map(({id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem key={id} webformatURL={webformatURL} onClick={() => onPictureClick(largeImageURL)}/>
        ))}
    </ul>
)

 
ImageGallery.propTypes = {
    pictures: PropTypes.array.isRequired,    
    onPictureClick: PropTypes.func.isRequired,    
}

export default ImageGallery