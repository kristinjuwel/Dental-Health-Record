import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();

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


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'birthday') {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            setFormData({
                ...formData,
                [name]: value,
                age: age.toString(),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        let signUpSuccess = false;
    
        // Form validation
        if (
            !formData.username ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.birthday ||
            !formData.sex ||
            !formData.address ||
            !formData.contactNumber ||
            !formData.email ||
            !formData.password ||
            !formData.confirmpass ||
            !formData.licenseNo
        ) {
            alert('Please fill in all required fields.');
            return;
        }
    
        if (formData.password !== formData.confirmpass) {
            alert('Passwords do not match.');
            return;
        }
    
        await handleDentistSignUp();
        signUpSuccess = true;
    
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
                                <input type="text" name="age" id="age" value={formData.age} readOnly />
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
                                <label htmlFor="license">License Number*</label>
                                <input type="text" name="licenseNo" id="license" onChange={handleChange} />
                            </div>
                        </div>
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
                        <div style={{ textAlign: "center" }}>
                            <input type="submit" value="Register" style={{ backgroundColor: "#fff", color: "#2aafce", marginTop: "10px", width: "10vw", alignItems: "center" }} />
                        </div>
                        <div className="otherActions">
                          <div className="notregisteredreg">
                            <Link style={{width: '10rem'}} to="/login">Already a member?</Link>
                            <a style={{margin: '0 20px'}}>|</a>
                            <Link style={{width: '10rem'}} to="/verification">Verify your account!</Link>
                          </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
