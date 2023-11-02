import React from 'react';

const ContactForm = () => {
  return (
    <div className="contact-form">
      <h2 className='contact-heading'>LET'S CONNECT</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        <button type="submit" className='contact-submit'>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
