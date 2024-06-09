import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isPersonnelOpen, setIsPersonnelOpen] = useState(false);
  const [isDependentOpen, setIsDependentOpen] = useState(false);
  const [isUnsignedOpen, setIsUnsignedOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const [isJuanOpen, setIsJuanOpen] = useState(false);

  const togglePersonnel = () => setIsPersonnelOpen(!isPersonnelOpen);
  const toggleDependent = () => setIsDependentOpen(!isDependentOpen);
  const toggleUnsigned = () => setIsUnsignedOpen(!isUnsignedOpen);
  const toggleCompleted = () => setIsCompletedOpen(!isCompletedOpen);
  const toggleJuan = () => setIsJuanOpen(!isJuanOpen);

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
    <div className="container">
    <div className="general-info-container" style={{width: "70vw", flex: "0.7"}}>
    <h1 className="title" style={{textAlign: "left"}}>Dentist Profile</h1>
      <form className="registration">
          <div className="middlelast" name='middlelast'> 
            <div className="profile-details">
            </div>
            <div className="input-field" style={{paddingLeft: "20px", marginTop: "-20px"}}>
                  <h2 className='fullname'>{userData.user.firstName} {userData.user.middleName} {userData.lastName} </h2>
                  <p className='email'>Email address: {userData.user.email}</p>
                  <p className='birthdate'>Date of Birth: {userData.user.birthday}</p >
                  <p className='age'>Age: {userData.user.age}</p>
                  <p className='address'>Home Address: {userData.user.address} </p>
                  <p className='phonenumber'>Contact Number: {userData.user.contactNumber}</p>
                  <p className='license'>License Number: {userData.licenseNo}</p>
                  <p className='clinic_name'>Clinic: {userData.clinic}</p>
                  <p className='clinic_loc'>Clinic Location: {userData.clinicLocation}</p>
              </div>
          </div>
      </form>
    </div>
    <div className="registration-container" style={{width: "30vw", flex: "0.3", overflow: "auto"}}>
      <div className="signin-signup">
      <h1 className="title" style={{textAlign: "left", marginLeft: "-20px"}}>Forms</h1>
      <div className="input-field">
        <h3 style={{marginLeft: "-20px"}}>Generate New Forms</h3>
        <h4>
          Dental Health Record
        </h4>
        <h4 onClick={togglePersonnel} style={{ cursor: 'pointer', paddingLeft: "20px" }}>
          For Personnel
        </h4>
        {isPersonnelOpen && (
          <>
            <p style={{paddingLeft:"40px"}}>Juan Dela Cruz</p>
          </>
        )}
        <h4 onClick={toggleDependent} style={{ cursor: 'pointer', paddingLeft: "20px" }}>
          For Dependent
        </h4>
        {isDependentOpen && (
          <>
            <p style={{paddingLeft:"40px"}}>Juana Dela Cruz</p>
          </>
        )}
        <h4>Consent Form</h4>
        <h4>Referral Form</h4>
        <h3 onClick={toggleUnsigned} style={{ cursor: 'pointer', marginLeft: "-20px" }}>
          Unsigned Forms
        </h3>
        {isUnsignedOpen && (
          <>
            <p>Juan Dela Cruz</p>
            <p>John Doe</p>
          </>
        )}
        <h3 onClick={toggleCompleted} style={{ cursor: 'pointer', marginLeft: "-20px" }}>
          Completed Forms
        </h3>
        {isCompletedOpen && (
          <>
            <p onClick={toggleJuan} style={{ cursor: 'pointer' }}>Juan Dela Cruz</p>
            {isJuanOpen && <p style={{marginLeft: "40px"}}>Dental Health Record</p>}
          </>
        )}
      </div>
      </div>
    </div>
  </div>
  )
}

export default Profile
