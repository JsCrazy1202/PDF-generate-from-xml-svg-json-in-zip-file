import React, { useState, useEffect, useRef, useMemo } from 'react';
import "./styles/Downloads.css";

const CardDetail = ({ cardDetail }) => {

    let inputValue = cardDetail?.children[0]?.children[0]?.inputValue;
    let height = cardDetail?.dimension?.height;
    let width = cardDetail?.dimension?.width;
    let posX = cardDetail?.position?.x;
    let posY = cardDetail?.position?.y;

    // Create a ref to access the DOM element for measurements
    const cardRef = useRef(null);

    const resolution = 0.8

    useEffect(() => {
        if (cardRef.current) {
            adjustFontSizeToFit();
        }
    }, [inputValue, width, height]); // Re-run when inputValue, width or height changes
    
    const adjustFontSizeToFit = () => {
        const container = cardRef.current;
        let fontSize = 100; // Starting font size (in pixels)
        const minFontSize = 5; // Minimum font size we are willing to accept

        while (fontSize > minFontSize) {
            container.style.fontSize = `${fontSize}px`;

            if ((container.scrollWidth <= container.offsetWidth ) && (container.scrollHeight <= container.offsetHeight)) {
                break; // The text fits within the container at the current font size
            }

            fontSize--; // Decrease font size
        }

        if (fontSize === minFontSize) {
            console.warn(`Text does not fit in the container even at the smallest acceptable font size (${minFontSize}px).`);
        }
    };

    const cardDetailStyle = {
        width: Number(width) * resolution + "px",
        height: Number(height) * resolution + "px",
        textAlign: 'center'
    };

    if (inputValue.length > 1) {
        return (
            <pre className="card-detail" ref={cardRef} style={cardDetailStyle}>
                {inputValue}
            </pre>
        );
    } else {
        return false;
    }
}

export default CardDetail;