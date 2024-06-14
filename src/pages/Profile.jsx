import { useParams } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const { userId } = useParams();

  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isUnsignedOpen, setIsUnsignedOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const [isJuanOpen, setIsJuanOpen] = useState(false);
  const [isGenerateFormsOpen, setIsGenerateFormsOpen] = useState(false);
  const [isDentalRecordOpen, setIsDentalRecordOpen] = useState(false);

  const toggleConsent = () => setIsConsentOpen(!isConsentOpen);
  const toggleReferral = () => setIsReferralOpen(!isReferralOpen);
  const toggleUnsigned = () => setIsUnsignedOpen(!isUnsignedOpen);
  const toggleCompleted = () => setIsCompletedOpen(!isCompletedOpen);
  const toggleJuan = () => setIsJuanOpen(!isJuanOpen);
  const toggleGenerateForms = () => setIsGenerateFormsOpen(!isGenerateFormsOpen);
  const toggleDentalRecord = () => setIsDentalRecordOpen(!isDentalRecordOpen);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/dentistview/${userId}`
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
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-info">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-details" style={{overflow: "auto"}}>
          <h2 className="profile-name">{userData.user.firstName} {userData.user.middleName} {userData.user.lastName}</h2>
          <h5>Registered Dentist</h5>

          <h4>Account Information</h4>
          <p className="profile-item">Email address: {userData.user.email}</p>
          <h4>Personal Information</h4>
          <p className="profile-item">Date of Birth: {userData.user.birthday}</p>
          <p className="profile-item">Age: {userData.user.age}</p>
          <p className="profile-item">Home Address: {userData.user.address}</p>
          <p className="profile-item">Contact Number: {userData.user.contactNumber}</p>
          <h4>Dental Information</h4>
          <p className="profile-item">License Number: {userData.licenseNo}</p>
          <p className="profile-item">Clinic: {userData.clinic}</p>
          <p className="profile-item">Clinic Location: {userData.clinicLoc}</p>
        </div>
      </div>
      <div className="forms-section">
        <h1 className="forms-title">Forms</h1>
        <div className="forms-container">
          <h3 className="form-category" onClick={toggleGenerateForms}>
            <span className={`arrow ${isGenerateFormsOpen ? 'open' : ''}`}>v</span> Generate New Forms
          </h3>
          {isGenerateFormsOpen && (
            <>
              <h4 className="form-item" onClick={toggleDentalRecord}>
                <span className={`arrow ${isDentalRecordOpen ? 'open' : ''}`}>v</span> Dental Health Record
              </h4>
              {isDentalRecordOpen && (
                <>
                  <p className="form-item"><a href={`/dentalhealthrecord/patient/${userId}`} target="_blank" rel="noopener noreferrer">For Personnel</a></p>
                  <p className="form-item" style={{ marginBottom: '10px' }}><a href={`/dentalhealthrecord/dependent/${userId}`}  target="_blank" rel="noopener noreferrer">For Dependent</a></p>
                </>
              )}


              {/* <h4 className="form-item" onClick={toggleConsent}>
                <span className={`arrow ${isConsentOpen ? 'open' : ''}`}>v</span> Consent Form
              </h4> */}
              {/* {isConsentOpen && (
                <p className="form-detail">Juan Dela Cruz</p>
              )} */}
              {/* <h4 className="form-item" onClick={toggleReferral}>
                <span className={`arrow ${isReferralOpen ? 'open' : ''}`}>v</span> Referral Form
              </h4>
              {isReferralOpen && (
                <p className="form-detail">Juana Dela Cruz</p>
              )} */}
            </>
          )}
          {/* <h3 className="form-category" onClick={toggleUnsigned}>
            <span className={`arrow ${isUnsignedOpen ? 'open' : ''}`}>v</span> Unsigned Forms
          </h3>
          {isUnsignedOpen && (
            <>
              <p className="form-detail">Juan Dela Cruz</p>
              <p className="form-detail">John Doe</p>
            </>
          )}
          <h3 className="form-category" onClick={toggleCompleted}>
            <span className={`arrow ${isCompletedOpen ? 'open' : ''}`}>v</span> Completed Forms
          </h3>
          {isCompletedOpen && (
            <p className="form-detail">Dental Health Record</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
