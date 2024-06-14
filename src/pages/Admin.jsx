import React from 'react'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleRegional = async (event) => {
    event.preventDefault(); 
    navigate('/regional');
  };

  const handleNational = async (event) => {
    event.preventDefault(); 
    navigate('/national');
  };
    
  return (
    <div className="container">
      <div className="image-container"></div>
      <div className="login-container">
        <div className="signin-signup" style={{textAlign: "center", display: "block"}}>
            <h1 style={{textAlign: "center"}}>Admin</h1>
            <button className='regional' onClick={handleRegional} style={{backgroundColor: "#0f9fb7", color: "#fff", marginLeft: "10px", textAlign: "center"}}>Make Regional Report</button>
            <button className='national' onClick={handleNational} style={{backgroundColor: "gray", color: "#fff", marginLeft: "10px", textAlign: "center"}}>Generate National Report</button>
        </div>
      </div>
    </div>
  )
}

export default Admin