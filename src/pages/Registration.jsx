import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [userType, setUserType] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        sex: '',
        birthday: '',
        address: '',
        contactNumber: '',
        email: '',
        password: '',
        confirmpass: '',
        licenseNo: '',
        clinic: '',
        clinicLoc: '',
        rank: '',
        unitAssign: '',
    });

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDentistSignUp = async () => {
        const dentistData = {
            user: {
                username: formData.username,
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                age: parseInt(formData.age, 10),
                sex: formData.sex,
                birthday: formData.birthday,
                address: formData.address,
                contactNumber: formData.contactNumber,
                email: formData.email,
                password: formData.password,
                userType: 'Dentist',
            },
            dentist: {
                licenseNo: formData.licenseNo,
                clinic: formData.clinic,
                clinicLoc: formData.clinicLoc,
            },
        };

        try {
            const response = await fetch('http://localhost:8080/dentists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dentistData),
            });
            const data = await response.json();
            console.log('Dentist sign-up successful:', data);
        } catch (error) {
            console.error('Error during dentist sign-up:', error);
        }
    };

    const handlePatientSignUp = async () => {
        const patientData = {
            user: {
                username: formData.username,
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                age: parseInt(formData.age, 10),
                sex: formData.sex,
                birthday: formData.birthday,
                address: formData.address,
                contactNumber: formData.contactNumber,
                email: formData.email,
                password: formData.password,
                userType: 'Patient',
            },
            patient: {
                patientType: formData.patientType,
                rank: formData.rank,
                unitAssign: formData.unitAssign,
            },
        };

        try {
            const response = await fetch('http://localhost:8080/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });
            const data = await response.json();
            console.log('Patient sign-up successful:', data);
        } catch (error) {
            console.error('Error during patient sign-up:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let signUpSuccess = false;
    
        if (userType === 'dentist') {
            await handleDentistSignUp();
            signUpSuccess = true; 
        } else if (userType === 'patient') {
            await handlePatientSignUp();
            signUpSuccess = true;
        } else {
            alert('Please select a user type');
            return;
        }
        
        if (signUpSuccess) {
            sessionStorage.setItem('userEmail', formData.email);
            
            navigate('/verification');
        }
    };
    

    return (
        <div className="container">
            <div className="general-info-container">
                <h1 className="title" style={{ textAlign: "left" }}>General Information</h1>
                <form className="registration">
                    <div className="middlelast" name='middlelast'>
                        <div className="input-field">
                            <label htmlFor="firstname">First Name*</label>
                            <input type="text" name="firstName" id="firstname" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="middlelast" name='middlelast'>
                        <div className="input-field" style={{ paddingRight: "20px" }}>
                            <label htmlFor="middlename">Middle Name</label>
                            <input type="text" name="middleName" id="middlename" onChange={handleChange} />
                        </div>
                        <div className="input-field" >
                            <label htmlFor="lastname">Last Name*</label>
                            <input type="text" name="lastName" id="lastname" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="middlelast" name='middlelast'>
                        <div className="input-field" style={{ paddingRight: "20px" }}>
                            <label htmlFor="birthdate">Date of Birth*</label>
                            <input type="date" name="birthday" id="birthdate" onChange={handleChange} />
                        </div>
                        <div className="input-field" style={{ paddingRight: "20px" }}>
                            <label htmlFor="age">Age</label>
                            <input type="text" name="age" id="age" onChange={handleChange} />
                        </div>
                        <div className="input-field" >
                            <label htmlFor="sex">Sex*</label>
                            <select name="sex" id="sex" style={{ width: "7.5vw", marginRight: "0", paddingRight: "0" }} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="na">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                    <div className="middlelast" name='middlelast'>
                        <div className="input-field">
                            <label htmlFor="address">Home Address*</label>
                            <input type="text" name="address" id="address" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="middlelast" name='middlelast'>
                        <div className="input-field">
                            <label htmlFor="phonenumber">Phone Number*</label>
                            <input type="text" name="contactNumber" id="phonenumber" onChange={handleChange} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="registration-container">
                <div className="signin-signup">
                    <h1 className="title" style={{ textAlign: "left", marginLeft: 0 }}>Registration</h1>
                    <form onSubmit={handleSubmit} className="dental-health-record">
                        <div className="middlelast" name='middlelast'>
                            <div className="input-field" style={{ paddingRight: "20px" }}>
                                <label htmlFor="username">Username*</label>
                                <input type="text" name="username" id="username" onChange={handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="email-address">Email Address*</label>
                                <input type="email" name="email" id="email-address" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="middlelast" name='middlelast'>
                            <div className="input-field" style={{ paddingRight: "20px" }}>
                                <label htmlFor="password">Password*</label>
                                <input type="password" name="password" id="password" onChange={handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="confirmpass">Confirm Password*</label>
                                <input type="password" name="confirmpass" id="confirmpass" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="middlelast" name='middlelast'>
                            <div className="input-field">
                                <label htmlFor="usertype">User Type*</label>
                                <select
                                    name="usertype"
                                    id="usertype"
                                    style={{ color: "#fff", borderColor: "#fff", backgroundColor: "transparent" }}
                                    value={userType}
                                    onChange={handleUserTypeChange}
                                >
                                    <option value="" disabled hidden>Select User Type</option>
                                    <option value="dentist" style={{ color: "black" }}>Dentist</option>
                                    <option value="patient" style={{ color: "black" }}>Patient</option>
                                </select>
                            </div>
                            {userType === 'dentist' && (
                                <div className="input-field" style={{ paddingLeft: "20px" }}>
                                    <label htmlFor="license">License Number*</label>
                                    <input type="text" name="licenseNo" id="license" onChange={handleChange} />
                                </div>
                            )}
                            {userType === 'patient' && (
                                <div className="input-field" style={{ paddingLeft: "20px" }}>
                                    <label htmlFor="patientType">Patient Type*</label>
                                    <select name="patientType" id="patientType" onChange={handleChange} style={{ color: "#fff", borderColor: "#fff", backgroundColor: "transparent" }}>
                                        <option value="" disabled>Select Patient Type</option>
                                        <option value="uniformed" style={{ color: "black" }}>Uniformed Personnel</option>
                                        <option value="nonUniformed" style={{ color: "black" }}>Non-Uniformed Personnel</option>
                                        <option value="civilian" style={{ color: "black" }}>Civilian</option>
                                        <option value="retiree" style={{ color: "black" }}>Retiree</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        {userType === 'dentist' && (
                            <div className="middlelast" name='middlelast'>
                                <div className="input-field" style={{ paddingRight: "20px" }}>
                                    <label htmlFor="clinic_name">Clinic Name</label>
                                    <input type="text" name="clinic" id="clinic_name" onChange={handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="clinic_loc">Clinic Location</label>
                                    <input type="text" name="clinicLoc" id="clinic_loc" onChange={handleChange} />
                                </div>
                            </div>
                        )}
                        {userType === 'patient' && (
                            <div className="middlelast" name='middlelast'>
                                <div className="input-field" style={{ paddingRight: "20px" }}>
                                    <label htmlFor="rank">Rank*</label>
                                    <input type="text" name="rank" id="rank" onChange={handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="unit">Unit Assignment*</label>
                                    <input type="text" name="unitAssign" id="unit" onChange={handleChange} />
                                </div>
                            </div>
                        )}



                        <div style={{ textAlign: "center" }}>
                            <input type="submit" value="Register" style={{ backgroundColor: "#fff", color: "#2aafce", marginTop: "10px", width: "10vw", alignItems: "center" }} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
