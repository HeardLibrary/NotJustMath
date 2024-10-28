import { Carousel } from 'antd';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
    return (
        <div className="carousel-container">
            <Carousel arrows infinite={false}>
                {/* <div>
                    <img src={ } className="carousel-image">1</img>
                </div>
                <div>
                    <img src={ } className="carousel-image">2</img>
                </div>
                <div>
                    <img src={ } className="carousel-image">3</img>
                </div>
                <div>
                    <img src={ } className="carousel-image">4</img>
                </div> */}
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
