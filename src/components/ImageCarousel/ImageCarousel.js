import { Carousel } from 'antd';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
    return (
        <div className="carousel-container">
            <Carousel arrows infinite={false}>
                {images.map((src, index) => (
                    <div key={index}>
                        <img src={src} alt={`Slide ${index + 1}`} className="carousel-image" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
