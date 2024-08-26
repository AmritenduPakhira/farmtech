import React, { useState, useEffect, useRef } from 'react';
import farmPhoto10 from '../images/farmPhoto7.jpg';
import { FiMail, FiHome } from 'react-icons/fi';
import { gsap } from 'gsap';
import {useGSAP} from "@gsap/react"

gsap.registerPlugin(useGSAP);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://farmtech-nine.vercel.app/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
        // Optionally, reset the form after successful submission
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const contactRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(() => {
    const contactSection = contactRef.current;
    const formSection = formRef.current;

    gsap.from(contactSection, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactSection,
        start: 'top 80%',
        end: 'bottom 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(formSection, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formSection,
        start: 'top 80%',
        end: 'bottom 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <div className="bg-yellow-300 px-28 py-10 w-screen">
      <div className="flex justify-around items-start" ref={contactRef}>
        <div className="contact-info w-full">
          <h3 className="text-green-700 text-3xl font-bold mb-3">Welcome to Crop Life HelpDesk :)</h3>
          <img src={farmPhoto10} alt="Crop Life Images" className="w-5/6 h-96" />
          <p className="text-red-800 mt-2 flex items-center">
            <FiMail className="mr-3" /> Email: info@croplife.com
          </p>
          <p className="text-red-800 flex items-center">
            <FiHome className="mr-3" /> Address: 123 Farm Lane, Crop City, AG 56789
          </p>
        </div>

        <div className="form-container w-full px-14" ref={formRef}>
          <h2 className="text-green-600 font-bold text-3xl ">Contact Us</h2>
          <p className="text-green-900 mt-3">Welcome to Crop Life, where your feedback matters!</p>
          <p className="text-green-900 mt-3">Please fill out the form below to get in touch with us.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex mt-3 flex-col">
              <label htmlFor="name" className="text-green-600">
                Name:
              </label>
              <input
                type="text"
                className="form-input rounded-lg px-4 py-2"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex mt-3 flex-col">
              <label htmlFor="email" className="text-green-600">
                Email:
              </label>
              <input
                type="email"
                className="form-input rounded-lg px-4 py-2"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex mt-3 flex-col">
              <label htmlFor="message" className="text-green-600">
                Message:
              </label>
              <textarea
                className="form-textarea px-4 py-2 rounded-lg resize-none"
                id="message"
                rows="4"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn bg-green-500 text-white py-2 px-4 rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10">
        <iframe
          title="Google Maps"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.175135209832!2d76.65720287442231!3d30.51608647468942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1705318178782!5m2!1sen!2sin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
