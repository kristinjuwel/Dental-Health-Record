import React, { useEffect, useRef, useState } from 'react'
import '../styles/Record.css';
import '../styles/Login.css';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Referral = () => {
    const { dentId, examId } = useParams();
    const [referral, setReferral] = useState([]);
    function applyStylesOnClick(element) {
        element.style.border = '1px solid red';
        element.style.borderRadius = '25px';
      }

      useEffect(() => {
        const fetchConsents = async () => {
            try {
                const response = await fetch(`http://localhost:8080/referral/${dentId}/${examId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReferral(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching consents:', error);
            }
        };

        fetchConsents();
    }, [dentId, examId]);
    const pdfRef = useRef();

    const downloadPDF = async () => {
            const input = pdfRef.current;
            const currentScrollTop = input.scrollTop;
            const currentScrollLeft = input.scrollLeft;
            const originalHeight = input.style.height;
            const originalWidth = input.style.width;
    
            input.style.height = 'auto';
            input.style.width = `${input.scrollWidth}px`;
    
            const pageWidth = 1300; // A4 width in pixels at 72 DPI
            const pageHeight = 1100; // A4 height in pixels at 72 DPI
            const contentWidth = input.scrollWidth;
            const contentHeight = input.scrollHeight;
    
            const totalPages = Math.ceil(contentWidth / pageWidth);
    
            const pdf = new jsPDF('portrait', 'px', [pageWidth, pageHeight]);
    
            for (let i = 0; i < totalPages; i++) {
                if (i > 0) pdf.addPage();
                input.scrollLeft = i * pageWidth;
                await new Promise(resolve => setTimeout(resolve, 300)); // Wait for rendering
    
                const canvas = await html2canvas(input, {
                    dpi: 300,
                    scale: 3,
                    scrollX: -i * pageWidth,
                    scrollY: 0,
                    width: pageWidth,
                    height: contentHeight,
                    windowWidth: pageWidth,
                    windowHeight: contentHeight
                });
    
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, contentHeight);
            }
    
            pdf.save('Dental Referral.pdf');
    
            input.style.height = originalHeight;
            input.style.width = originalWidth;
            input.scrollTop = currentScrollTop;
            input.scrollLeft = currentScrollLeft;
        };

    function formatPurpose(purpose) {
        if (!purpose) return ''; // Return empty string if purpose is undefined or null
        if (purpose === 'initial,-,-') {
            return 'Initial';
        }
        else if(purpose ===",-,-"){
            return 'None';
        }
        else {
                return purpose;
            }
    
    };

    
  return (
    <div className="center-wrapper">
      <div className="records-container"  ref={pdfRef}>
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
                <input type="text" name="name" id="name" value={referral.patientName}  />
            </div>
            <div className="input-field" style={{paddingRight: "20px"}}>
                <label htmlFor="age">Age </label>
                <input type="text" name="age" id="age" value={referral.patientAge}  />
            </div>
            <div className="input-field">
                <label htmlFor="sex">Sex</label>
                <select name="sex" id="sex">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

        </div>

        <div className="middlelast" name='middlelast'>
            <div className="input-field" style={{paddingRight: "20px"}}>
                <label htmlFor="address">Home Address </label>
                <input type="text" name="address" id="address" value={referral.patientAddress}  />
            </div>
            <div className="input-field">
                <label htmlFor="date">Date </label>
                <input type="date" name="date" id="date" />
            </div>
        </div>

        <div className="middlelast" name='middlelast'>
        <div className="input-field">
    <label htmlFor="purpose">Purpose</label>
    <input
        type="text"
        name="purpose"
        id="purpose"
        value={formatPurpose(referral.purpose)}
          // Make the input field read-only
    />
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
        <p style={{ textDecoration: 'underline'}}>{ referral.dentistName }</p>
        <label htmlFor="dentist_name" style={{marginLeft: "20px"}}>DMD </label>
        </div>
        <div className="input-field" style={{marginLeft: "auto", width: "250px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <label htmlFor="license" style={{marginRight: "0px", width: "120px"}}>License No. </label>
            <p style={{ textDecoration: 'underline'}}>{ referral.dentistLicense }</p>

        </div>
        </form>
                
        <button
        onClick={downloadPDF}
        style={{
          position: "absolute",
          top: "3%",
          right: "2%",
          backgroundColor: "#2aafce",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          width: "150px"
        }}
      >
        Save PDF
      </button>
        </div>
    </div>
  )
}

export default Referral
