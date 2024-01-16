import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome CSS
import farmPhoto10 from '../images/farmPhoto7.jpg';

// ContactUs Component
const ContactUs = (e) => {
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
      const response = await fetch('http://localhost:5000/submit', {
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


  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="vh">
        <div className="container mt-5" style={{ backgroundColor: '#FFDD3C', padding: '20px' }}>
          <div className="row">
            {/* Left Part: Contact Information with Picture */}
            <div className="col-md-6 contact-info">
              <h3 style={{ color: '#4caf50' }}>Welcome to Crop Life HelpDesk :)</h3>
              <img src={farmPhoto10} alt="Crop Life Image" className="img-fluid" />
              <p><i className="fas fa-envelope" style={{ color: '#4caf50' }}></i> Email: info@croplife.com</p>
              <p><i className="fas fa-map-marker-alt" style={{ color: '#4caf50' }}></i> Address: 123 Farm Lane, Crop City, AG 56789</p>
            </div>

            {/* Right Part: Contact Form */}
            <div className="col-md-6 form-container">
              <h2 style={{ color: '#4caf50' }}>Contact Us</h2>
              <p >Welcome to Crop Life, where your feedback matters!</p>
              <p >Please fill out the form below to get in touch with us.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" style={{ color: '#4caf50' }}>Name:</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your name" value={formData.name}
                    onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="email" style={{ color: '#4caf50' }}>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" style={{ color: '#4caf50' }}>Message:</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>

                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', backgroundColor: '#4caf50', borderColor: '#4caf50' }}>Submit</button>
              </form>
            </div>
          </div>


          {/* Google Maps Embed without protocol */}
          <div className="mt-5">
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
      </div>
    </div>
  );
};

export default ContactUs;
