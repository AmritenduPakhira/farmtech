import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
export default function Home() {
  const containerRef = useRef();

  useGSAP(() => {
    const elements = containerRef.current.querySelectorAll(".home-section");

    elements.forEach((element) => {
      gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 80%", 
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", 
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800" ref={containerRef}>
      <section className="container mx-auto flex flex-col items-center px-4 py-20 md:py-32 md:px-10 lg:px-32 xl:max-w-3xl home-section">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl mb-6">Welcome to Farmtech Fusion</h1>
        <p className="text-lg mb-12">Welcome to Farmtech Fusion, where nature thrives and diversity blooms. Explore our sustainable farm, a sanctuary for cultivating a rich variety of crops. Immerse yourself in the lush fields adorned with a symphony of colors and fragrances.</p>
        <div className="flex flex-wrap justify-center">
          <Link to="/about" className="px-8 py-3 m-2 text-lg font-semibold rounded bg-yellow-600 text-gray-50">Learn More</Link>
        </div>
      </section>

      <div className="bg-yellow-600 py-24 px-4 home-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-50">Our Farm Diversity</h2>
          <p className="text-gray-50 py-6 px-8 rounded-md mb-8">Welcome to Farmtech Fusion, where nature thrives and diversity blooms. Explore our sustainable farm, a sanctuary for cultivating a rich variety of crops. Immerse yourself in the lush fields adorned with a symphony of colors and fragrances. Our farm boasts a plethora of agricultural treasures, including <strong>paddy</strong>, <strong>cauliflower</strong>, <strong>rose</strong>, <strong>tulip</strong>, <strong>marigold</strong>, <strong>sunflower</strong>, <strong>jasmine</strong>, <strong>lily</strong>, <strong>broccoli</strong>, <strong>spinach</strong>, <strong>tomatoes</strong>, <strong>onions</strong>, <strong>peas</strong>, and <strong>carrots</strong>. Experience the freshness of our produce, carefully nurtured to bring you the finest quality. From the vibrant hues of blooming flowers to the crisp textures of vegetables, each visit to Farmtech Fusion is a sensory delight. Join us in celebrating the beauty of sustainable farming and the bountiful harvest it yields.</p>

          <p className="text-center mb-8">
            <Link className="btn btn-primary btn-lg" to="/about" role="button">Learn More</Link>
          </p>
        </div>
      </div>


      <div className="bg-blue-600 py-24 px-4 home-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-50">Join Our Community</h2>
          <p className="text-gray-50 py-6 px-8 rounded-md mb-8">Dive into our world of sustainable agriculture, where every product tells a story of care and commitment. Join our community to immerse yourself in the vibrant journey of cultivating goodness. Connect with us to explore the beauty of fresh harvests and be part of a community that values health and well-being. At Farmtech Fusion, we're more than a farm; we're a lifestyle dedicated to quality, sustainability, and the joy of wholesome living.</p>
          <p className="text-center mb-8">
            <Link className="btn btn-primary btn-lg" to="/about" role="button">Learn More</Link>
          </p>
        </div>
      </div>


      <div className="bg-teal-200 py-24 px-4 home-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Commitment to Sustainability</h2>
          <p className="text-lg mb-8">At Farmtech Fusion, we are dedicated to sustainable and eco-friendly farming practices. Our commitment extends beyond cultivation to environmental stewardship. From minimizing waste to optimizing resource usage, we prioritize practices that nurture both the land and our community. Explore how we integrate sustainable solutions into every aspect of our farm, fostering a harmonious balance between nature and agriculture.</p>
        </div>
      </div>


      <div className="bg-green-200 py-24 px-4 home-section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Ready to Experience Farm Life?</h2>
          <p className="text-lg mb-8">Whether you're seeking a farm visit or looking to shop online for our farm-fresh products, Farmtech Fusion welcomes you to our vibrant community. Immerse yourself in the essence of farm life and choose from a selection of quality produce nurtured with care.</p>
          <p className="text-lg mb-8">Contact us to plan your visit or explore our online store to bring the freshness of our farm directly to your doorstep. Join us in celebrating the goodness of sustainable living!</p>
          <div className="text-center">
            <Link className="btn btn-success" to="/contact" role="button">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
