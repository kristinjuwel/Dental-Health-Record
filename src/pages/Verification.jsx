import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [storedEmail, setStoredEmail] = useState(sessionStorage.getItem('userEmail') || '');
    const [verificationCode, setVerificationCode] = useState('');

    // Clear sessionStorage item on component mount
    useEffect(() => {
        sessionStorage.removeItem('userEmail');
    }, []);

    const handleEmailChange = (event) => {
        setStoredEmail(event.target.value);
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      
      try {
          const response = await fetch(`http://localhost:8080/patientverify?email=${storedEmail}&otp=${verificationCode}`, {
              method: 'POST'
          });
  
          if (response.ok) {
              // Successful verification
              console.log('Successful verification.');
              navigate('/login'); // Navigate to the login page
          } else {
              // Unsuccessful verification
              console.log('Unsuccessful verification.');
          }
      } catch (error) {
          console.error('Error verifying user:', error);
      }
  };
  

    return (
        <div>
            <form className="verification" onSubmit={handleSubmit} style={{ width: "25vw" }}>
                <h1 className="title">Verification</h1>
                <div className="input-field">
                    <label htmlFor="email-address">Email Address</label>
                    <input type="email" name="email-address" id="email-address" value={storedEmail} onChange={handleEmailChange} readOnly />
                </div>
                <div className="input-field">
                    <label htmlFor="code">Verification Code</label>
                    <input type="text" name="code" id="code" value={verificationCode} onChange={handleVerificationCodeChange} />
                </div>
                <input type="submit" value="Verify Account" />
            </form>
        </div>
    );
};

export default Verification;
