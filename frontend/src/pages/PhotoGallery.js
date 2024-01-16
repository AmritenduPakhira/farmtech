import React from 'react';
import farmPhoto1 from '../images/farmPhoto1.jpg';
import farmPhoto2 from '../images/farmPhoto2.jpg';
import farmPhoto3 from '../images/farmPhoto3.jpg';
import farmPhoto4 from '../images/farmPhoto4.jpg';
import farmPhoto5 from '../images/farmPhoto5.jpg';
import farmPhoto6 from '../images/farmPhoto6.jpg';
import farmPhoto7 from '../images/farmPhoto7.jpg';
import farmPhoto8 from '../images/farmPhoto8.jpg';
import farmPhoto9 from '../images/farmPhoto9.jpg';
import farmPhoto10 from '../images/farmPhoto10.jpg';
import farmPhoto11 from '../images/farmPhoto11.jpg';
import farmPhoto12 from '../images/farmPhoto12.jpg';
import farmPhoto13 from '../images/farmPhoto13.jpg';
import farmPhoto14 from '../images/farmPhoto14.jpg';
import farmPhoto15 from '../images/farmPhoto15.jpg';
import farmPhoto16 from '../images/farmPhoto16.jpg';
import farmPhoto17 from '../images/farmPhoto17.jpg';
import farmPhoto18 from '../images/farmPhoto18.jpg';
import farmPhoto19 from '../images/farmPhoto19.jpg';
import farmPhoto20 from '../images/farmPhoto20.jpg';
import farmPhoto21 from '../images/farmPhoto21.jpg';
import farmPhoto22 from '../images/farmPhoto22.jpg';
import farmPhoto23 from '../images/farmPhoto23.jpg';
import farmPhoto24 from '../images/farmPhoto24.jpg';
import './PhotoGallery.css';  

const farmPhotos = [
  { src: farmPhoto1, name: 'Photo 1' },
  { src: farmPhoto2, name: 'Photo 2' },
  { src: farmPhoto3, name: 'Photo 3' },
  { src: farmPhoto4, name: 'Photo 4' },
  { src: farmPhoto5, name: 'Photo 5' },
  { src: farmPhoto6, name: 'Photo 6' },
  { src: farmPhoto7, name: 'Photo 7' },
  { src: farmPhoto8, name: 'Photo 8' },
  { src: farmPhoto9, name: 'Photo 9' },
  { src: farmPhoto10, name: 'Photo 10' },
  { src: farmPhoto11, name: 'Photo 11' },
  { src: farmPhoto12, name: 'Photo 12' },
  { src: farmPhoto13, name: 'Photo 13' },
  { src: farmPhoto14, name: 'Photo 14' },
  { src: farmPhoto15, name: 'Photo 15' },
  { src: farmPhoto16, name: 'Photo 16' },
  { src: farmPhoto17, name: 'Photo 17' },
  { src: farmPhoto18, name: 'Photo 18' },
  { src: farmPhoto19, name: 'Photo 19' },
  { src: farmPhoto20, name: 'Photo 20' },
  { src: farmPhoto21, name: 'Photo 21' },
  { src: farmPhoto22, name: 'Photo 22' },
  { src: farmPhoto23, name: 'Photo 23' },
  { src: farmPhoto24, name: 'Photo 24' },


];

const PhotoGallery = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {farmPhotos.map((photo, index) => (
          <div key={index} className="col-md-2 col-6 mb-4">
            <div className="photo-container">
              <img
                src={photo.src}
                alt={`Farm Photo ${index + 1}`}
                className="img-fluid gallery-img grow-on-hover"
              />
              <div className="caption">{photo.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
