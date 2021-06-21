import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles.module.css'

const ImageGalleryItem = ({ webformatURL, onClick }) => (
    <li className={styles.ImageGalleryItem} onClick={onClick}>
        <img src={webformatURL} alt="" className={styles.ImageGalleryItemImage} />
    </li>   
)

 
ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,    
    onClick: PropTypes.func.isRequired,    
}

export default ImageGalleryItem