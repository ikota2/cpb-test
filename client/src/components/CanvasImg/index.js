import React, {useEffect, useRef} from 'react';

const CanvasImg = ({src, sizes}) => {
    const { width, height } = sizes;
    const myCanvas = useRef();

    useEffect(() => {
        const context = myCanvas.current.getContext('2d');
        const image = new Image();
        image.src = src;
        image.onload = () => {
            context.drawImage(image, 0, 0, width, height);
        };
    }, [src, width, height]);

    return <canvas ref={myCanvas} width={width} height={height} />;
};

export default CanvasImg;
