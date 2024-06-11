import React, {useState, useRef, useMemo} from 'react'
import '../styles/Record.css';
import '../styles/Login.css';

const ReportIndiv = () => {
    const [image, setImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const fileInputRef = useRef(null);
    const fileInputRef1 = useRef(null);
  
    const [regionalEntry, setRegionalEntry] = useState({
      regionName: '',
      reportMonth: '',
      reportYear: '',
      unifConsultation: '',
      unifOralProphylaxis: '',
      unifDentalSealant: '',
      unifFluorideApplication: '',
      unifRestoration: '',
      unifExtraction: '',
      unifProsthodontics: '',
      unifOtherProcedures: '',
      nonunifConsultation: '',
      nonunifOralProphylaxis: '',
      nonunifDentalSealant: '',
      nonunifFluorideApplication: '',
      nonunifRestoration: '',
      nonunifExtraction: '',
      nonunifProsthodontics: '',
      nonunifOtherProcedures: '',
      dpdConsultation: '',
      dpdOralProphylaxis: '',
      dpdDentalSealant: '',
      dpdFluorideApplication: '',
      dpdRestoration: '',
      dpdExtraction: '',
      dpdProsthodontics: '',
      dpdOtherProcedures: '',
      cvlConsultation: '',
      cvlOralProphylaxis: '',
      cvlDentalSealant: '',
      cvlFluorideApplication: '',
      cvlRestoration: '',
      cvlExtraction: '',
      cvlProsthodontics: '',
      cvlOtherProcedures: '',
      rtrConsultation: '',
      rtrOralProphylaxis: '',
      rtrDentalSealant: '',
      rtrFluorideApplication: '',
      rtrRestoration: '',
      rtrExtraction: '',
      rtrProsthodontics: '',
      rtrOtherProcedures: '',
      fo1Examined: '',
      upPromotion: '',
      upTraining: '',
      nupPromotion: '',
      staffName: '',
      chiefName: '',
      unifTotal: '',
      nonunifTotal: '',
      dpdTotal: '',
      cvlTotal: '',
      rtrTotal: '',
      grandTotal: ''
    });
  
    const [staffSign, setstaffSign] = useState(null);
    const [chiefSign, setchiefSign] = useState(null);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setRegionalEntry((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const totals = useMemo(() => {
        const toNumber = (value) => Number(value) || 0;
    
        const unifTotal =
          toNumber(regionalEntry.unifConsultation) +
          toNumber(regionalEntry.unifOralProphylaxis) +
          toNumber(regionalEntry.unifDentalSealant) +
          toNumber(regionalEntry.unifFluorideApplication) +
          toNumber(regionalEntry.unifRestoration) +
          toNumber(regionalEntry.unifExtraction) +
          toNumber(regionalEntry.unifProsthodontics) +
          toNumber(regionalEntry.unifOtherProcedures);
    
        const nonunifTotal =
          toNumber(regionalEntry.nonunifConsultation) +
          toNumber(regionalEntry.nonunifOralProphylaxis) +
          toNumber(regionalEntry.nonunifDentalSealant) +
          toNumber(regionalEntry.nonunifFluorideApplication) +
          toNumber(regionalEntry.nonunifRestoration) +
          toNumber(regionalEntry.nonunifExtraction) +
          toNumber(regionalEntry.nonunifProsthodontics) +
          toNumber(regionalEntry.nonunifOtherProcedures);
    
        const dpdTotal =
          toNumber(regionalEntry.dpdConsultation) +
          toNumber(regionalEntry.dpdOralProphylaxis) +
          toNumber(regionalEntry.dpdDentalSealant) +
          toNumber(regionalEntry.dpdFluorideApplication) +
          toNumber(regionalEntry.dpdRestoration) +
          toNumber(regionalEntry.dpdExtraction) +
          toNumber(regionalEntry.dpdProsthodontics) +
          toNumber(regionalEntry.dpdOtherProcedures);
    
        const cvlTotal =
          toNumber(regionalEntry.cvlConsultation) +
          toNumber(regionalEntry.cvlOralProphylaxis) +
          toNumber(regionalEntry.cvlDentalSealant) +
          toNumber(regionalEntry.cvlFluorideApplication) +
          toNumber(regionalEntry.cvlRestoration) +
          toNumber(regionalEntry.cvlExtraction) +
          toNumber(regionalEntry.cvlProsthodontics) +
          toNumber(regionalEntry.cvlOtherProcedures);
    
        const rtrTotal =
          toNumber(regionalEntry.rtrConsultation) +
          toNumber(regionalEntry.rtrOralProphylaxis) +
          toNumber(regionalEntry.rtrDentalSealant) +
          toNumber(regionalEntry.rtrFluorideApplication) +
          toNumber(regionalEntry.rtrRestoration) +
          toNumber(regionalEntry.rtrExtraction) +
          toNumber(regionalEntry.rtrProsthodontics) +
          toNumber(regionalEntry.rtrOtherProcedures);
    
        const grandTotal = unifTotal + nonunifTotal + dpdTotal + cvlTotal + rtrTotal + toNumber(regionalEntry.fo1Examined) +toNumber(regionalEntry.upPromotion) + toNumber(regionalEntry.upTraining) + toNumber(regionalEntry.nupPromotion);
    
        return {
          unifTotal,
          nonunifTotal,
          dpdTotal,
          cvlTotal,
          rtrTotal,
          grandTotal,
        };
      }, [regionalEntry]);
    
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 
        const mappedRegionalEntry = {
            regionName: regionalEntry.regionName,
            reportMonth: regionalEntry.reportMonth,
            reportYear: regionalEntry.reportYear,
            unifConsultation: regionalEntry.unifConsultation,
            unifOralProphylaxis: regionalEntry.unifOralProphylaxis,
            unifDentalSealant: regionalEntry.unifDentalSealant,
            unifFluorideApplication: regionalEntry.unifFluorideApplication,
            unifRestoration: regionalEntry.unifRestoration,
            unifExtraction: regionalEntry.unifExtraction,
            unifProsthodontics: regionalEntry.unifProsthodontics,
            unifOtherProcedures: regionalEntry.unifOtherProcedures,
            nonunifConsultation: regionalEntry.nonunifConsultation,
            nonunifOralProphylaxis: regionalEntry.nonunifOralProphylaxis,
            nonunifDentalSealant: regionalEntry.nonunifDentalSealant,
            nonunifFluorideApplication: regionalEntry.nonunifFluorideApplication,
            nonunifRestoration: regionalEntry.nonunifRestoration,
            nonunifExtraction: regionalEntry.nonunifExtraction,
            nonunifProsthodontics: regionalEntry.nonunifProsthodontics,
            nonunifOtherProcedures: regionalEntry.nonunifOtherProcedures,
            dpdConsultation: regionalEntry.dpdConsultation,
            dpdOralProphylaxis: regionalEntry.dpdOralProphylaxis,
            dpdDentalSealant: regionalEntry.dpdDentalSealant,
            dpdFluorideApplication: regionalEntry.dpdFluorideApplication,
            dpdRestoration: regionalEntry.dpdRestoration,
            dpdExtraction: regionalEntry.dpdExtraction,
            dpdProsthodontics: regionalEntry.dpdProsthodontics,
            dpdOtherProcedures: regionalEntry.dpdOtherProcedures,
            cvlConsultation: regionalEntry.cvlConsultation,
            cvlOralProphylaxis: regionalEntry.cvlOralProphylaxis,
            cvlDentalSealant: regionalEntry.cvlDentalSealant,
            cvlFluorideApplication: regionalEntry.cvlFluorideApplication,
            cvlRestoration: regionalEntry.cvlRestoration,
            cvlExtraction: regionalEntry.cvlExtraction,
            cvlProsthodontics: regionalEntry.cvlProsthodontics,
            cvlOtherProcedures: regionalEntry.cvlOtherProcedures,
            rtrConsultation: regionalEntry.rtrConsultation,
            rtrOralProphylaxis: regionalEntry.rtrOralProphylaxis,
            rtrDentalSealant: regionalEntry.rtrDentalSealant,
            rtrFluorideApplication: regionalEntry.rtrFluorideApplication,
            rtrRestoration: regionalEntry.rtrRestoration,
            rtrExtraction: regionalEntry.rtrExtraction,
            rtrProsthodontics: regionalEntry.rtrProsthodontics,
            rtrOtherProcedures: regionalEntry.rtrOtherProcedures,
            fo1Examined: regionalEntry.fo1Examined,
            upPromotion: regionalEntry.upPromotion,
            upTraining: regionalEntry.upTraining,
            nupPromotion: regionalEntry.nupPromotion,
            staffName: regionalEntry.staffName,
            chiefName: regionalEntry.chiefName,
            unifTotal: totals.unifTotal.toString(),
            nonunifTotal: totals.nonunifTotal.toString(),
            dpdTotal: totals.dpdTotal.toString(),
            cvlTotal: totals.cvlTotal.toString(),
            rtrTotal: totals.rtrTotal.toString(),
            grandTotal: totals.grandTotal.toString(),
        };
      
        const regionData = new FormData();
        regionData.append('regional', new Blob([JSON.stringify(mappedRegionalEntry)], { type: 'application/json' }));
        regionData.append('staffSign', staffSign);
        regionData.append('chiefSign', chiefSign);
      
        try {
          const response = await fetch('http://localhost:8080/regional', {
            method: 'POST',
            body: regionData,
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const responseData = await response.json();
          console.log('Response:', responseData);
          // Handle response data as needed
        } catch (error) {
          console.error('Error:', error);
          // Handle error as needed
        }
      };

      const handleStaffSign = (event) => {
        const file = event.target.files[0];
        setstaffSign(file);
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleImageClick = () => {
        // Reset the state of the image to null, allowing user to choose a new image
        setImage(null);
        // Trigger the file input to open when the image is clicked
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

      const handleChiefSign = (event) => {
        const file = event.target.files[0];
        setchiefSign(file);
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImage1(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const handleImageClick1 = () => {
        // Reset the state of the image to null, allowing user to choose a new image
        setImage1(null);
        // Trigger the file input to open when the image is clicked
        if (fileInputRef1.current) {
          fileInputRef1.current.click();
        }
      };

  return (
    <div className="center-wrapper">
      <div className="records-container">
        <h1 className="title" style={{textAlign: "center"}}>DENTAL SERVICE</h1>
        <h1 className="subtitle" style={{textAlign: "center", marginTop: "-10px"}}>MONTHLY ACCOMPLISHMENT REPORT</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-15px" }}>
            <p className="month">For </p>
            <select name="reportMonth" id="reportMonth" style={{width: "10vw", marginLeft: "1%", border: "none", borderBottom: "1px solid black", fontSize: "15px"}}
            value={regionalEntry.reportMonth} // Set the selected value
            onChange={(e) => setRegionalEntry({ ...regionalEntry, reportMonth: e.target.value })}
            >
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
            <input type="text" name='reportYear' id='reportYear' placeholder='Year' style={{border: "none", borderBottom: "1px solid black", fontSize: "15px", width: "80px"}} onChange={handleChange}/>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-15px" }}>
            <p className="region">Office Region: </p>
            <select name="regionName" id="regionName" style={{width: "25vw", marginLeft: "1%", border: "none", borderBottom: "1px solid black", fontSize: "15px"}}
            value={regionalEntry.regionName} // Set the selected value
            onChange={(e) => {
                const selectedRegion = e.target.value;
                console.log("Selected region:", selectedRegion);
                setRegionalEntry({ ...regionalEntry, regionName: selectedRegion });
            }} >
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
                        <td><input type="text" name="unifTotal" id="unifTotal" value={totals.unifTotal} readOnly/>UNIFORMED PERSONNEL</td>
                        <td><input type="text" name="nonunifTotal" id="nonunifTotal" value={totals.nonunifTotal} readOnly/>NON-UNIFORMED PERSONNEL</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="unifConsultation" id="unifConsultation" onChange={handleChange}/>Consultation</td>
                        <td><input type="text" name="nonunifConsultation" id="nonunifConsultation" onChange={handleChange}/>Consultation</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="unifOralProphylaxis" id="unifOralProphylaxis" onChange={handleChange}/>Oral Prophylaxis</td>
                        <td><input type="text" name="nonunifOralProphylaxis" id="nonunifOralProphylaxisop" onChange={handleChange}/>Oral Prophylaxis</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="unifDentalSealant" id="unifDentalSealant" onChange={handleChange}/>Dental Sealant</td>
                        <td><input type="text" name="nonunifDentalSealant" id="nonunifDentalSealant" onChange={handleChange}/>Dental Sealant</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="unifFluorideApplication" id="unifFluorideApplication" onChange={handleChange}/>Flouride Application</td>
                        <td><input type="text" name="nonunifFluorideApplication" id="fnonunifFluorideApplicationa" onChange={handleChange}/>Flouride Application</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="unifRestoration" id="unifRestoration" onChange={handleChange}/>Restoration</td>
                        <td><input type="text" name="nonunifRestoration" id="nonunifRestoration" onChange={handleChange}/>Restoration</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="unifExtraction" id="unifExtraction" onChange={handleChange}/>Extraction</td>
                        <td><input type="text" name="nonunifExtraction" id="nonunifExtraction" onChange={handleChange}/>Extraction</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="unifProsthodontics" id="unifProsthodontics" onChange={handleChange}/>Prosthodontics</td>
                        <td><input type="text" name="nonunifProsthodontics" id="nonunifProsthodontics" onChange={handleChange}/>Prosthodontics</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="unifOtherProcedures" id="unifOtherProcedures" onChange={handleChange}/>Other surgical procedure(e.g. Odontectomy)</td>
                        <td><input type="text" name="nonunifOtherProcedures" id="nonunifOtherProcedures" onChange={handleChange}/>Other surgical procedure(e.g. Odontectomy)</td>
                    </tr>
                </tbody>
            </table>
            
            <table style={{marginTop: "2%"}}>
                <tbody>
                    <tr>
                        <td><input type="text" name="dpdTotal" id="dpdTotal" value={totals.dpdTotal} readOnly/>DEPENDENTS</td>
                        <td><input type="text" name="cvlTotal" id="cvlTotal" value={totals.cvlTotal} readOnly/>CIVILIANS</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdConsultation" id="dpdConsultation" onChange={handleChange}/>Consultation</td>
                        <td><input type="text" name="cvlConsultation" id="cvlConsultation" onChange={handleChange}/>Consultation</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdOralProphylaxis" id="dpdOralProphylaxis" onChange={handleChange}/>Oral Prophylaxis</td>
                        <td><input type="text" name="cvlOralProphylaxis" id="cvlOralProphylaxis" onChange={handleChange}/>Oral Prophylaxis</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdDentalSealant" id="dpdDentalSealant" onChange={handleChange}/>Dental Sealant</td>
                        <td><input type="text" name="cvlDentalSealant" id="cvlDentalSealant" onChange={handleChange}/>Dental Sealant</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdFluorideApplication" id="dpdFluorideApplication" onChange={handleChange}/>Flouride Application</td>
                        <td><input type="text" name="cvlFluorideApplication" id="cvlFluorideApplication" onChange={handleChange}/>Flouride Application</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdRestoration" id="dpdRestoration" onChange={handleChange}/>Restoration</td>
                        <td><input type="text" name="cvlRestoration" id="cvlRestoration" onChange={handleChange}/>Restoration</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdExtraction" id="dpdExtraction" onChange={handleChange}/>Extraction</td>
                        <td><input type="text" name="cvlExtraction" id="cvlExtraction" onChange={handleChange}/>Extraction</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdProsthodontics" id="dpdProsthodontics" onChange={handleChange}/>Prosthodontics</td>
                        <td><input type="text" name="cvlProsthodontics" id="cvlProsthodontics" onChange={handleChange}/>Prosthodontics</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="dpdOtherProcedures" id="dpdOtherProcedures" onChange={handleChange}/>Other surgical procedure(e.g. Odontectomy)</td>
                        <td><input type="text" name="cvlOtherProcedures" id="cvlOtherProcedures" onChange={handleChange}/>Other surgical procedure(e.g. Odontectomy)</td>
                    </tr>
                </tbody>
            </table>

            <table style={{marginTop: "2%"}}>
                <tbody>
                    <tr>
                        <td><input type="text" name="rtrTotal" id="rtrTotal" value={totals.rtrTotal} readOnly/>RETIREES</td>
                        <td><input type="text" name="fo1Examined" id="fo1Examined" onChange={handleChange}/>No. of FO1 applicants examined</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrConsultation" id="rtrConsultation" onChange={handleChange}/>Consultation</td>
                        <td><input type="text" name="upPromotion" id="upPromotion" onChange={handleChange}/>No. of UP examined for promotion</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrOralProphylaxis" id="rtrOralProphylaxis" onChange={handleChange}/>Oral Prophylaxis</td>
                        <td><input type="text" name="upTraining" id="upupTrainingt" onChange={handleChange}/>No. of UP examined for training</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrDentalSealant" id="rtrDentalSealant" onChange={handleChange}/>Dental Sealant</td>
                        <td><input type="text" name="nupPromotion" id="nupPromotion" onChange={handleChange}/>No. of NUP examined for promotion</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrFluorideApplication" id="rtrFluorideApplication" onChange={handleChange}/>Flouride Application</td>
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrRestoration" id="rtrRestoration" onChange={handleChange}/>Restoration</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrExtraction" id="rtrExtraction" onChange={handleChange}/>Extraction</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrProsthodontics" id="rtrProsthodontics" onChange={handleChange}/>Prosthodontics</td>
                        
                    </tr>
                    <tr>
                        <td><input type="text" name="rtrOtherProcedures" id="rtrOtherProcedures" onChange={handleChange}/>Other surgical procedure(e.g. Odontectomy)</td>
                    </tr>
                </tbody>
            </table>

            <div className='total' style={{display: "flex"}}>
                <h3>GRAND TOTAL: </h3> 
                <input type="text" name="grandTotal" id="grandTotal" value={totals.grandTotal}  readOnly/>
            </div>
            
            <div className='middlelast' name='middlelast'>
                <div className="report-field" style={{paddingRight: "20%"}}>
                    <label htmlFor="staffName">Prepared by: </label>
                    {image ? (
                        <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                        <img src={image} alt="Signature" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '50px' }} />
                        </div>
                    ) : (
                        <React.Fragment>
                        <input
                            type="file"
                            ref={fileInputRef}
                            id="sign"
                            accept="image/*"
                            style={{ border: 'none', minHeight: "65px" }}
                            onChange={handleStaffSign}
                        />
                        </React.Fragment>
                    )}
                    <input type='text' name='staffName' id='staffName' style={{textAlign: 'center'}} placeholder='Staff Name' value={regionalEntry.staffName}  onChange={handleChange}/>
                    <label htmlFor="staffName">Dental Staff</label>
                </div>
                <div className="report-field" >
                    <label htmlFor="chiefName">Noted by: </label>
                    {image1 ? (
                        <div onClick={handleImageClick1} style={{ cursor: 'pointer' }}>
                        <img src={image1} alt="Signature" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '50px' }} />
                        </div>
                    ) : (
                        <React.Fragment>
                        <input
                            type="file"
                            ref={fileInputRef}
                            id="sign"
                            accept="image/*"
                            style={{ border: 'none', minHeight: "65px" }}
                            onChange={handleChiefSign}
                        />
                        </React.Fragment>
                    )}
                    <input type='text' name='chiefName' id='chiefName' style={{textAlign: 'center'}} placeholder='Chief Name' value={regionalEntry.chiefName} onChange={handleChange}/>
                    <label htmlFor="chiefName">C, Dental Service</label>
                </div>
            </div>

            <input type="submit" onClick={handleFormSubmit} value="Submit Monthly Accomplishment Report" style={{marginTop: "10px"}}/>
        </form>

    </div>
    </div>
  )
}

export default ReportIndiv