import React from 'react'

const Consent = () => {
    return (
        <div className="center-wrapper">
          <div className="records-container">
            <h1 className="title" style={{textAlign: "center"}}>INFORMED CONSENT FORM</h1>
            <form className="dental-referral">
            <div className="middlelast" name='middlelast'>
                <div className="input-field" style={{ display: "flex", alignItems: "center" }}>
                    <p>I,</p> 
                    <input type="text" name="name" id="name" placeholder="Patient's Name" style={{marginLeft:"10px", marginRight:"10px"}}/>
                    <p>, </p> 
                    <input type="text" name="age" id="age" placeholder="Age" style={{marginLeft:"10px", marginRight:"10px"}}/>
                    <p>, </p>
                </div>
            </div>
            <p style={{marginTop:"-20px", textAlign: "justify"}}>hereby authorize the Dentist and or anyone he/she may designate to perform the dental treatment/ procedures that are
                        deemed therapeutically necessary based on the findings during said procedures</p>
            <p style={{ marginTop: "-10px", textAlign: "justify", paddingLeft: "4.5%" }}>
            I hereby certify that I have read and fully understand that my consent is required for the dental treatment/</p>
            <p style={{marginTop:"-15px", textAlign: "justify"}}>procedures. Its benefits and potential complications, if any, as well as alternative treatment options were explained to me. I also certify
                that no guarantees have been made regarding the treatment outcome.</p>

                <div className="middlelast" name='middlelast'>
            <table style={{ width: '100%' }}>
                <thead >
                    <tr>
                        <td style={{ width: '10%' }}>DATE</td>
                        <td style={{ width: '30%' }}>TREATMENT/PROCEDURE</td>
                        <td style={{ width: '30%' }}>PATIENT'S SIGNATURE</td>
                        <td style={{ width: '30%' }}>DENTIST NAME/SIGNATURE</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="tdate" id="tdate" style={{padding: "10px"}}/></td>
                        <td><input type="text" name="treatment" id="treatment" style={{width: "100%", padding: "10px"}}/></td>
                        <td ><input type="file" name="psig" id="psig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                        <td ><input type="file" name="dsig" id="dsig" style={{width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px"}}/></td>
                    </tr>
                </tbody>
            </table>
        </div>

            <input type="submit" value="Submit Informed Consent Form" style={{marginTop: "20px"}}/>
            </form>
            </div>
        </div>
      )
    }

export default Consent
