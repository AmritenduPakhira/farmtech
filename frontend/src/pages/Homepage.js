import React from 'react'
import { Link } from 'react-router-dom';



const jumbotronStyles = {
  backgroundColor: '#f8f9fa',
};

export default function Home() {
  return (
    <div>
      <div className="jum" style={jumbotronStyles}>
        <div style={{ marginTop: '56px' }}>
        <h1 className="display-4 text-center" style={{Color: '#91EAE4'}}>Welcome to Farmtech Fusion</h1>

        <p className="lead" style={{ padding: '0.7cm', backgroundColor: '#FFDD3C' }}>
          Welcome to Farmtech Fusion, where nature thrives and diversity blooms. Explore our sustainable farm, a sanctuary for cultivating a rich variety of crops. Immerse yourself in the lush fields adorned with a symphony of colors and fragrances. Our farm boasts a plethora of agricultural treasures, including <strong>paddy</strong>, <strong>cauliflower</strong>, <strong>rose</strong>, <strong>tulip</strong>, <strong>marigold</strong>, <strong>sunflower</strong>, <strong>jasmine</strong>, <strong>lily</strong>, <strong>broccoli</strong>, <strong>spinach</strong>, <strong>tomatoes</strong>, <strong>onions</strong>, <strong>peas</strong>, and <strong>carrots</strong>.

          Experience the freshness of our produce, carefully nurtured to bring you the finest quality. From the vibrant hues of blooming flowers to the crisp textures of vegetables, each visit to Farmtech Fusion is a sensory delight. Join us in celebrating the beauty of sustainable farming and the bountiful harvest it yields.
        </p>

       
        <p className="lead" style={{  padding: '0.7cm', backgroundColor: '#86A8E7', borderRadius: '7px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          Dive into our world of sustainable agriculture, where every product tells a story of care and commitment. Join our community to immerse yourself in the vibrant journey of cultivating goodness. Connect with us to explore the beauty of fresh harvests and be part of a community that values health and well-being. At Farmtech Fusion, we're more than a farm; we're a lifestyle dedicated to quality, sustainability, and the joy of wholesome living.</p >

        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/about" role="button">
            Learn More
          </Link>
        </p>
      </div>
      </div>


      <div className="mt-5" style={{ backgroundColor: '#91EAE4' }}>
        <h2 className="text-center">Our Commitment to Sustainability</h2>
        <p className="lead" style={{  padding: '0.7cm',  borderRadius: '7px' }}>
          At Farmtech Fusion, we are dedicated to sustainable and eco-friendly farming practices. Our commitment extends beyond cultivation to environmental stewardship. From minimizing waste to optimizing resource usage, we prioritize practices that nurture both the land and our community.
          Explore how we integrate sustainable solutions into every aspect of our farm, fostering a harmonious balance between nature and agriculture.
        </p>
      </div>


      <div className="mt-5"  style={{ backgroundColor: '#C7E6C7' }} >
        <h2 className="text-center">Ready to Experience Farm Life?</h2>
        <p className="lead"  style={{  padding: '0.7cm',  borderRadius: '7px' }}>
          Whether you're seeking a farm visit or looking to shop online for our farm-fresh products, Farmtech Fusion welcomes you to our vibrant community. Immerse yourself in the essence of farm life and choose from a selection of quality produce nurtured with care.
        </p>
        <p className="lead"  style={{  padding: '0.7cm',  borderRadius: '7px' }}>
          Contact us to plan your visit or explore our online store to bring the freshness of our farm directly to your doorstep. Join us in celebrating the goodness of sustainable living!
        </p>
        <div className="text-center">
          <Link className="btn btn-success" to="/contact" role="button"  style={{ marginBottom: '20px' }}>
            Contact Us
          </Link>
        </div>
      </div>

    </div>

    


  )
}
