import React from 'react'
import '../styles/Record.css';
import '../styles/Login.css';

const Referral = () => {
    function applyStylesOnClick(element) {
        element.style.border = '1px solid red';
        element.style.borderRadius = '25px';
      }
      
  return (
    <div className="center-wrapper">
      <div className="records-container">
        <h1 className="title" style={{textAlign: "center"}}>DENTAL SERVICE REFERRAL FORM</h1>
        <form className="dental-referral">
        <div className="middlelast" name='middlelast'>
            <div className="input-field" style={{paddingRight: "20px"}}>
                <label htmlFor="from">From </label>
                <input type="text" name="from" id="from" />
            </div>
            <div className="input-field" >
                <label htmlFor="to">To </label>
                <input type="text" name="to" id="to" />
            </div>
        </div>

        <div className="middlelast" name='middlelast'>
            <div className="input-field" style={{paddingRight: "20px"}}>
                <label htmlFor="name">Patient's Name </label>
                <input type="text" name="name" id="name" />
            </div>
            <div className="input-field" style={{paddingRight: "20px"}}>
                <label htmlFor="age">Age </label>
                <input type="text" name="age" id="age" />
            </div>
            <div className="input-field" >
                <label htmlFor="sex">Sex </label>
                <input type="text" name="sex" id="sex" />
            </div>
        </div>

        <div className="middlelast" name='middlelast'>
            <div className="input-field" style={{paddingRight: "20px"}}>
                <label htmlFor="address">Home Address </label>
                <input type="text" name="address" id="address" />
            </div>
            <div className="input-field">
                <label htmlFor="date">Date </label>
                <input type="date" name="date" id="date" />
            </div>
        </div>

        <div className="middlelast" name='middlelast'>
            <div className="input-field" >
                <label htmlFor="purpose">Purpose </label>
                <input type="text" name="purpose" id="purpose" />
            </div>
        </div>

        <table style={{width: "100%", borderTop: "2px solid black", paddingTop: "20px"}}>
        <tbody>
            <tr>
            <td style={{ width: "5vw" }}><input type="checkbox" id="op" name="op" /></td>
            <td><label htmlFor="op" style={{ width: "300px", marginLeft: "-30px" }}>Oral Prophylaxis</label></td>
            <td style={{ width: "5vw" }}><input type="checkbox" id="restoration" name="restoration" /></td>
            <td><label htmlFor="restoration" style={{ width: "300px", marginLeft: "-30px" }}>Restoration</label></td>
            <td style={{ width: "5vw" }}><input type="checkbox" id="denture" name="denture" /></td>
            <td><label htmlFor="denture" style={{ width: "300px", marginLeft: "-30px" }}>Prosthodontics/Denture</label></td>
            <td style={{ width: "5vw" }}><input type="checkbox" id="surgery" name="surgery" /></td>
            <td><label htmlFor="surgery" style={{ width: "300px", marginLeft: "-30px" }}>Surgery</label></td>
            </tr>
        </tbody>
        </table>

        <div className="middlelast" name='middlelast' style={{marginTop: "20px"}}>
        <table style={{paddingRight: "10%", marginLeft: "20%"}}>
            <tbody style={{cursor: "pointer"}}>
                <tr>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                </tr>
                <tr>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td style={{ borderRight: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tbody>
                <tr>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td style={{ borderBottom: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                </tr>
                <tr>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td style={{ borderRight: '1px solid black' }} onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>1</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>2</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>3</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>4</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>5</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>6</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>7</td>
                    <td onClick={(event) => {applyStylesOnClick(event.target);}}>8</td>
                </tr>
            </tbody>
        </table>
        </div>

        <table style={{width: "100%", paddingTop: "20px"}}>
        <tbody>
            <tr>
                <td style={{ width: "5vw" }}><input type="checkbox" id="panoxray" name="panoxray" /></td>
                <td><label htmlFor="panoxray" style={{ width: "300px", marginLeft: "-30px" }}>Panoramic X-ray</label></td>
                <td style={{ width: "5vw" }}><input type="checkbox" id="perixray" name="perixray" /></td>
                <td><label htmlFor="perixray" style={{ width: "300px", marginLeft: "-30px" }}>Periapical X-ray</label></td>
                <td style={{ width: "5vw" }}><input type="checkbox" id="others" name="others" /></td>
                <td><label htmlFor="others_field" style={{ width: "300px", marginLeft: "-30px" }}>Others</label></td>
                <td><input type="text" name="others_field" id="others_field" style={{width: "25vw"}}/></td>
            </tr>
            <tr>
                <td style={{ width: "5vw" }}><input type="checkbox" id="dc" name="dc" /></td>
                <td><label htmlFor="dc" style={{ width: "300px", marginLeft: "-30px" }}>Dental Certificate</label></td>
            </tr>
        </tbody>
        </table>

        <div className="input-field" style={{paddingRight: "20px", marginTop: "20px"}}>
            <label htmlFor="others_field2">Others: </label>
            <input type="text" name="others_field2" id="others_field2" />
        </div>

        <div className="input-field" style={{paddingRight: "20px", marginLeft: "auto", width: "300px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <input type="text" name="dentist_name" id="dentist_name" />
            <label htmlFor="dentist_name" style={{marginLeft: "20px"}}>DMD </label>
        </div>
        <div className="input-field" style={{paddingRight: "20px", marginLeft: "auto", width: "300px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <label htmlFor="license" style={{marginRight: "20px", width: "180px"}}>License No. </label>
            <input type="text" name="license" id="license" />
        </div>

        
        <input type="submit" value="Submit Dental Service Referral Form" style={{marginTop: "20px"}}/>
        </form>
        </div>
    </div>
  )
}

export default Referral
