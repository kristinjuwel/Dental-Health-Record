import React from 'react'
import '../styles/Record.css';
import '../styles/Login.css';

const ReportIndiv = () => {
  return (
    <div className="center-wrapper">
      <div className="records-container">
        <h1 className="title" style={{textAlign: "center"}}>DENTAL SERVICE</h1>
        <h1 className="subtitle" style={{textAlign: "center", marginTop: "-10px"}}>MONTHLY ACCOMPLISHMENT REPORT</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-15px" }}>
            <p className="month">For the Month of</p>
            <select name="month" id="month" style={{width: "10vw", marginLeft: "1%", border: "none", borderBottom: "1px solid black", fontSize: "15px"}}>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="aug">August</option>
                <option value="sept">September</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December</option>
            </select>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-15px" }}>
            <p className="region">Office Region: </p>
            <select name="region" id="region" style={{width: "25vw", marginLeft: "1%", border: "none", borderBottom: "1px solid black", fontSize: "15px"}}>
                <option value="nhq">National Headquarters (NHQ)</option>
                <option value="ncr">National Capital Region (NCR)</option>
                <option value="r1">Region 1</option>
                <option value="r2">Region 2</option>
                <option value="r3">Region 3</option>
                <option value="r4a">Region 4A</option>
                <option value="r4b">Region 4B</option>
                <option value="r5">Region 5</option>
                <option value="r6">Region 6</option>
                <option value="r7">Region 7</option>
                <option value="r8">Region 8</option>
                <option value="r9">Region 9</option>
                <option value="r10">Region 10</option>
                <option value="r11">Region 11</option>
                <option value="r12">Region 12</option>
                <option value="car">Cordillera Administrative Region (CAR)</option>
                <option value="caraga">Caraga Administrative Region (CARAGA)</option>
                <option value="barmm">Bangsamoro Autonomous Region (BARMM)</option>
            </select>
        </div>

        <div>
            <p> Hereunder are the Dental Services rendered in this month: </p>
        </div>

        <form className='report-form'>
            <table>
                <tbody>
                    <tr>
                        <td>UNIFORMED PERSONNEL</td>
                        <td>NON-UNIFORMED PERSONNEL</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="consultation" id="consultation" />Consultation</td>
                        <td><input type="text" name="consultation" id="consultation" />Consultation</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="op" id="op" />Oral Prophylaxis</td>
                        <td><input type="text" name="op" id="op" />Oral Prophylaxis</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="ds" id="ds" />Dental Sealant</td>
                        <td><input type="text" name="ds" id="ds" />Dental Sealant</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="fa" id="fa" />Flouride Application</td>
                        <td><input type="text" name="fa" id="fa" />Flouride Application</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="restoration" id="restoration" />Restoration</td>
                        <td><input type="text" name="restoration" id="restoration" />Restoration</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="extraction" id="extraction" />Extraction</td>
                        <td><input type="text" name="extraction" id="extraction" />Extraction</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="denture" id="denture" />Prosthodontics</td>
                        <td><input type="text" name="denture" id="denture" />Prosthodontics</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="others" id="others" />Other surgical procedure(e.g. Odontectomy)</td>
                        <td><input type="text" name="others" id="others" />Other surgical procedure(e.g. Odontectomy)</td>
                    </tr>
                </tbody>
            </table>
            
            <table style={{marginTop: "2%"}}>
                <tbody>
                    <tr>
                        <td><input type="text" name="dependents" id="dependents" />DEPENDENTS</td>
                        <td><input type="text" name="civilians" id="civilians" />CIVILIANS</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="consultation" id="consultation" />Consultation</td>
                        <td><input type="text" name="consultation" id="consultation" />Consultation</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="op" id="op" />Oral Prophylaxis</td>
                        <td><input type="text" name="op" id="op" />Oral Prophylaxis</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="ds" id="ds" />Dental Sealant</td>
                        <td><input type="text" name="ds" id="ds" />Dental Sealant</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="fa" id="fa" />Flouride Application</td>
                        <td><input type="text" name="fa" id="fa" />Flouride Application</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="restoration" id="restoration" />Restoration</td>
                        <td><input type="text" name="restoration" id="restoration" />Restoration</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="extraction" id="extraction" />Extraction</td>
                        <td><input type="text" name="extraction" id="extraction" />Extraction</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="denture" id="denture" />Prosthodontics</td>
                        <td><input type="text" name="denture" id="denture" />Prosthodontics</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="others" id="others" />Other surgical procedure(e.g. Odontectomy)</td>
                        <td><input type="text" name="others" id="others" />Other surgical procedure(e.g. Odontectomy)</td>
                    </tr>
                </tbody>
            </table>

            <table style={{marginTop: "2%"}}>
                <tbody>
                    <tr>
                        <td><input type="text" name="retirees" id="retirees" />RETIREES</td>
                        <td><input type="text" name="fo1" id="fo1" />No. of FO1 applicants examined</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="consultation" id="consultation" />Consultation</td>
                        <td><input type="text" name="upp" id="upp" />No. of UP examined for promotion</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="op" id="op" />Oral Prophylaxis</td>
                        <td><input type="text" name="upt" id="upt" />No. of UP examined for training</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="ds" id="ds" />Dental Sealant</td>
                        <td><input type="text" name="nup" id="nup" />No. of NUP examined for promotion</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="fa" id="fa" />Flouride Application</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="restoration" id="restoration" />Restoration</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="extraction" id="extraction" />Extraction</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="denture" id="denture" />Prosthodontics</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="others" id="others" />Other surgical procedure(e.g. Odontectomy)</td>
                    </tr>
                </tbody>
            </table>

            <div className='total' style={{display: "flex"}}>
                <h3>GRAND TOTAL: </h3> 
                <input type="text" name="gt" id="gt"/>
            </div>
            
            <div className='middlelast' name='middlelast'>
                <div className="report-field" style={{paddingRight: "20%"}}>
                    <label htmlFor="dental-staff">Prepared by: </label>
                    <input type="file" name="dental-staff" id="dental-staff" />
                    <label htmlFor="dental-staff">Dental Staff</label>
                </div>
                <div className="report-field" >
                    <label htmlFor="dental-service">Noted by: </label>
                    <input type="file" name="dental-service" id="dental-service" />
                    <label htmlFor="dental-service">C, Dental Service</label>
                </div>
            </div>

            <input type="submit" value="Submit Monthly Accomplishment Report" style={{marginTop: "10px"}}/>
        </form>

    </div>
    </div>
  )
}

export default ReportIndiv
