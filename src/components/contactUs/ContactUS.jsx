import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useForm, ValidationError } from '@formspree/react';

const ContactUS = () => {


  const [state, handleSubmit] = useForm("contactForm");
  
  useEffect(() => {
    if (state.succeeded) {
      alert('Message Was Send Succesfully')
    }
  }, [state]);

  
  return (
    <div style={styles.mainPage}>
      <Navbar />
      <div style={styles.mainPageWrapper}>
        <form onSubmit={handleSubmit} style={styles.formDiv}>
          <h1 style={{ color: '#bebebe', textAlign: 'center', padding: '20px' }}>Contact Us</h1>
          
          <div style={styles.formGroup}>
            <label style={styles.formLbl} htmlFor="name">name *</label>
            <input
              style={styles.formInp}
              required
              name='name'
              type="text"
              id='name'
              placeholder='Your/Company Name'
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLbl} htmlFor="email">email *</label>
            <input
              style={styles.formInp}
              required
              name='email'
              type="email"
              id='email'
              placeholder='Contact Email'
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLbl} htmlFor="number">number & code</label>
            <input
              style={styles.formInp}
              name='number'
              type="text"
              id='number'
              placeholder='Contact Number With Country Code (Optional)'
            />
            <ValidationError prefix="Number" field="number" errors={state.errors} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLbl} htmlFor="message">message *</label>
            <textarea
              style={{ ...styles.formInp, resize: 'none', height: '150px' }}
              name='message'
              required
              id='message'
              placeholder='Your Message'
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          
          <button style={styles.formBtn} type="submit" disabled={state.submitting}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
    mainPage: {
        backgroundImage: `url(https://res.cloudinary.com/dhdfussrn/image/upload/v1724601873/flexx_movie_logo_black_resize_xae1ne.png)`,
        boxSizing:' border-box',
        backgroundAttachment:" fixed",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat no-repeat',
        width:'100%',
        minHeight:'100vh',
        backgroundColor:'black',
        backgroundPosition: 'center'
    },
    mainPageWrapper:{
        width:'30%',
        position:'relative',
        left:'50%',
        transform:'translateX(-50%)',
        backgroundColor:'transparent',
        padding:'10px',
        border:'1px solid #232423',
        borderRadius:'5px',
        backdropFilter:'blur(5px)'
    },
    formDiv:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        gap:'10px'
    },
    formGroup:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        gap:'2px'
    },
    formInp:{
        width:'100%',
        padding:'7px',
        fontSize:'17px',
        outline:'none',
        border:'1px solid #232423',
        borderRadius:'5px',
        backgroundColor:'#232423'
    },
    formLbl:{
        display:'block',
        fontSize:'16px',
        color:'#bebebe',
        textTransform:'capitalize'
    },
    formBtn:{
        padding:'7px',
        backgroundColor:'#c71414',
        border:'1px solid #c71414',
        outline:'none',
        fontSize:'17px',
        color:'#bebebe',
        cursor:'pointer'
    }
}


export default ContactUS
