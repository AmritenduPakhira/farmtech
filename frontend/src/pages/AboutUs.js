// AboutPage.js
import React from 'react';
import './About.css'; 
import farmer2 from '../images/farmer2.jpeg';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <div className="circle-photo">
          <img src={farmer2} alt="Farmer 2" className=" img-fluid" />
        </div>
      </div>

      <div className="about-content">
        <h2 className="about-heading">About Farmtech Fusion</h2>
        <p>
          Welcome to Farmtech Fusion, a leading agricultural firm committed to modernizing and revolutionizing farming practices. Our mission is to empower farmers in rural areas, addressing the challenges they face and promoting sustainable agriculture.
        </p>
        <p>
          At Farmtech Fusion, we understand the difficulties farmers encounter, from unpredictable weather patterns to market uncertainties. Our goal is to provide innovative solutions that enhance productivity, reduce costs, and ensure a steady income for farmers.
        </p>
        <p>
          We leverage modern technology and social media to connect farmers, share knowledge, and facilitate collaboration. Through our online platform, farmers can access valuable resources, stay informed about market trends, and connect with a supportive community.
        </p>
        <p>
          Sustainability is at the core of our values. We believe in responsible farming practices that preserve the environment and promote long-term viability. Our team is dedicated to researching and implementing eco-friendly solutions that benefit both farmers and the planet.
        </p>
        <p>
          Join us on this journey towards a brighter future for agriculture. Whether you're a farmer looking for guidance or an enthusiast passionate about sustainable farming, Farmtech Fusion is your ally in cultivating success.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
