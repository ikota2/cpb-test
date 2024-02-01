import React, { memo } from 'react';
import CanvasImg from '../CanvasImg';
import { extractImageUrls } from '../../helpers/extractImageUrls';
import classes from './ProductCard.module.css';

const ProductCard = memo(({ properties }) => {
    const { id, bodyHtml } = properties;
    const images = extractImageUrls(bodyHtml);
    const width = 200;
    const height = 200;

    return (
        <div className={classes.card}>
            <h3>{id}</h3>
            {images.length > 0 && images.map((imageUrl) => (
                <CanvasImg key={Date.now()} src={imageUrl} sizes={{width, height}} />
            ) )}
        </div>
    );
});

export default ProductCard;
