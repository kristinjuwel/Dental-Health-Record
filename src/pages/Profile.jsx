import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { userId, userType } = useParams();
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/${userType === 'Dentist' ? 'dentistview' : 'patientview'}/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, userType]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`http://localhost:8080/upload/${userId}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          // If upload is successful, update user data to reflect the new picture
          const newData = { ...userData };
          newData.user.picture = await response.json(); // Assuming the server returns the new picture data
          setUserData(newData);
          setError(null); // Clear any previous error
        } else {
          throw new Error('Failed to upload picsture');
        }
      } catch (error) {
        console.error('Error uploading picture:', error);
        setError('Failed to upload psicture');
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-picture">
        <label htmlFor="profile-picture-input" className="placeholder-rect" style={{ cursor: 'pointer' }}>
          {image ? (
            <img src={image} alt="Profile" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          ) : (
            userData.user.picture ? (
              <img src={`data:image/jpeg;base64,${userData.user.picture}`} alt="Profile" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            ) : (
              <span>Upload New Profile Picture</span>
            )
          )}
        </label>
        <input type="file" id="profile-picture-input" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
      </div>
      <div className="profile-details">
        {/* <h1>User Profile</h1>
        <h2>
          {userData.user.firstName} {userData.user.lastName}
        </h2>
        <p>Email: {userData.user.email}</p>
        <p>Age: {userData.user.age}</p>
        <p>Address: {userData.user.address}</p>
        <p>Contact Number: {userData.user.contactNumber}</p>
        {userData.user.userType === 'Dentist' && (
          <div className="dentist-details">
            <p>License No: {userData.licenseNo}</p>
            <p>Clinic: {userData.clinic}</p>
            <p>Clinic Location: {userData.clinicLoc}</p>
          </div>
        )}
        {userData.user.userType === 'Patient' && (
          <div className="patient-details">
            <p>Patient Type: {userData.patientType}</p>
            <p>Rank: {userData.rank}</p>
            <p>Unit Assignment: {userData.unitAssign}</p>
          </div>
        )} */}
        <button onClick={() => window.location.href = '/dentalhealthrecord'}>Go to Dental Health Record</button>
      </div>
    </div>
  );
};

export default Profile;
