import React, { useState, useRef, useEffect } from 'react';
import '../styles/Record.css';
import '../styles/Login.css';

const DentalHealthRecord = ({ label, identifier }) => {
  const type = "patient";
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [image1, setImage1] = useState(null);
  const fileInputRef1 = useRef(null);
  const [prof, setProf] = useState(null);
  const imgInputRef = useRef(null);

  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black'); // Default: red
  const [thickness, setThickness] = useState(5); // Default: 5
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [undos, setUndos] = useState([]);
  const [penShape, setPenShape] = useState('circle'); // Default: circle


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
    }
  }, [ctx, color, thickness]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleThicknessChange = (event) => {
    setThickness(parseInt(event.target.value));
  };

  const handleClearAll = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleEraser = (e) => {
    ctx.globalCompositeOperation = 'destination-out';
  };



  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
    setUndos([...undos, { color, thickness, points: [{ x: lastX, y: lastY }] }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    if (penShape === 'circle') {
      ctx.lineCap = 'round';
    } else if (penShape === 'square') {
      ctx.lineCap = 'butt';
    }
  
    drawLine(lastX, lastY, x, y);
    setLastX(x);
    setLastY(y);
    const newStroke = undos.pop();
    newStroke.points.push({ x, y });
    setUndos([...undos, newStroke]);
  };
  
  
  const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctx.globalCompositeOperation = 'source-over'; // Reset to default
  };


  const saveDrawing = () => {
    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'drawing.png';
      a.click();
    });
  };
  
  const handlePlaceholderClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProf(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
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
        <h1 className="title" style={{ textAlign: "center" }}>BFP Dental Health Record</h1>
        <h3 className="subtitle">SECTION I: PATIENT DATA</h3>
        <form className="dental-record">
          <div className="middlelast" name='middlelast'>
            {type === 'patient' && (
              <div className="input-field" style={{ paddingRight: "20px" }}>
                <label htmlFor="rank">Rank*</label>
                <input type="text" name="rank" id="rank" />
              </div>
            )}
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="lastname">Last Name*</label>
              <input type="text" name="lastname" id="lastname" />
            </div>
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="firstname">First Name*</label>
              <input type="text" name="firstname" id="firstname" />
            </div>
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="middlename">Middle Name</label>
              <input type="text" name="middlename" id="middlename" />
            </div>
            <div className="input-field">
              <label htmlFor="birthdate">Date of Birth*</label>
              <input type="text" name="birthdate" id="birthdate" />
            </div>
            <div className="picture-placeholder" style={{ cursor: "pointer" }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={imgInputRef}
                onChange={handleImgChange}
              />
              <div className="placeholder-rect" onClick={handlePlaceholderClick}>
                {prof ? (
                  <img src={prof} alt="Profile" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ) : (
                  <span>Upload Profile Image</span>
                )}
              </div>
            </div>
          </div>


          <div style={{ display: "flex", width: "100%", paddingRight: "11.5vw", marginTop: "-60px" }}>
            {type === 'patient' && (
              <div className="input-field" style={{ paddingRight: "20px" }}>
                <label htmlFor="unit">Unit Assignment*</label>
                <input type="text" name="unit" id="unit" />
              </div>
            )}
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="address">Home Address*</label>
              <input type="text" name="address" id="address" />
            </div>
            <div className="input-field">
              <label htmlFor="phonenumber">Phone Number*</label>
              <input type="text" name="phonenumber" id="phonenumber" />
            </div>
          </div>

          <h3 className="subtitle">SECTION II: DENTAL EXAMINATION</h3>
          {type === 'patient' && (
            <React.Fragment>
              <p style={{ marginTop: "-10px" }}>Purpose of Examination*</p>
              <div className="middlelast" name='middlelast'>
                <div className="input-field" style={{ paddingRight: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <input type='checkbox' id='initial' name='initial' />
                    <label htmlFor='initial' style={{ paddingRight: "6vw" }}>Initial/Consultation</label>
                  </div>
                  <input type="date" name="initialdate" id="initialdate" />
                </div>
                <div className="input-field" style={{ paddingRight: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <input type='checkbox' id='training' name='training' />
                    <label htmlFor='training' style={{ paddingRight: "12vw" }}>Training</label>
                  </div>
                  <input type="date" name="trainingdate" id="trainingdate" />
                </div>
                <div className="input-field">
                  <div style={{ display: "flex" }}>
                    <input type='checkbox' id='promotion' name='promotion' />
                    <label htmlFor='promotion' style={{ paddingRight: "10vw" }}>Promotion</label>
                  </div>
                  <input type="date" name="promotiondate" id="promotiondate" />
                </div>
              </div>
            </React.Fragment>
          )}
          <p style={{ marginTop: "-5px" }}>MISSING TEETH AND EXISTING RESTORATIONS, DISEASES AND ABONORMALITIES</p>
          <div className='teeth-chart' style={{ width: "52vw", height: "65vh", alignItems: "center" }}>
            <div className='teeth-chart' style={{ width: "52vw", height: "65vh", position: 'relative' }}>
              <img src={require('../images/teeth.jpg')} alt="Teeth Chart" style={{ width: "100%", height: "100%" }} />
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                width={canvasRef.current?.clientWidth}
                height={canvasRef.current?.clientHeight}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onContextMenu={handleEraser} 
              />
            </div>
            {/* Options for drawing */}

            <div className="input-field" style={{ paddingLeft: "20px", textAlign: "left", marginRight: "-105px" }}>
              <label htmlFor="calculus" style={{ width: "120px" }}>A. CALCULUS</label>
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <input type='checkbox' id='mild' name='mild' />
                <label htmlFor='mild' style={{ marginLeft: "5px" }}>Mild</label>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <input type='checkbox' id='moderate' name='moderate' />
                <label htmlFor='moderate' style={{ marginLeft: "5px" }}>Moderate</label>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <input type='checkbox' id='heavy' name='heavy' />
                <label htmlFor='heavy' style={{ marginLeft: "5px" }}>Heavy</label>
              </div>
            </div>

          </div>
          <div style={{ paddingLeft: "20px", textAlign: "left", marginLeft: "20px" }}>
            
            <label htmlFor="brushThickness">Pen Thickness:</label>
            <input
              type="range"
              id="brushThickness"
              name="brushThickness"
              min="1"
              max="20"
              value={thickness}
              onChange={handleThicknessChange}
            />
              <button type="button" onClick={() => setPenShape('circle')}>Circular</button>
              <button type="button" onClick={() => setPenShape('square')}>Square</button>
              <button type="button" style={{ color: 'black'}} onClick={() => handleColorChange('black')}>Conditions</button>
              <button type="button" style={{ color: "#ff0000"}} onClick={() => handleColorChange('#ff0000')}>Treatment Plan</button>
              <button type="button" style={{ color: '#0000ff'}} onClick={() => handleColorChange('#0000ff')}>Completed</button>
              <button type="button" style={{ marginRight: "20px" }} onClick={handleEraser}></button>
              <button type="button" onClick={handleClearAll}>Clear All</button>
              <button type="button" onClick={saveDrawing}>Save Drawing</button>
          </div>

          <div className="input-field" >
            <label htmlFor="abnormalities">B. ABNORMALITIES/OCCLUSION/REMARKS</label>
            <input type="text" name="abnormalities" id="abnormalities" />
          </div>

          <h3 className="subtitle">SECTION III: CASE HISTORY</h3>
          <div className="input-field" >
            <label htmlFor="oral">Present Oral Complaint:</label>
            <input type="text" name="oral" id="oral" />
          </div>

          <div className="middlelast" name='middlelast'>
            <div className="input-field">
              <table>
                <tbody style={{ width: "600px" }}>
                  <tr>
                    <td colSpan={1} style={{ width: "180px" }}>Medical History: </td>
                    <td colSpan={2} style={{ width: "180px" }}>Check the box</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td style={{ width: "180px" }}></td>
                    <td>YES</td>
                    <td>NONE</td>
                    <td style={{ width: "180px" }}></td>
                    <td style={{ width: "100px" }}>YES</td>
                    <td>NONE</td>
                  </tr>
                  <tr>
                    <td >Diabetes</td>
                    <td><input type="checkbox" name='yesDiabetes' id='yesDiabetes' /></td>
                    <td><input type="checkbox" name='noDiabetes' id='noDiabetes' /></td>
                    <td colSpan={1} style={{ width: "200px" }}>History of Hypertension</td>
                    <td><input type="checkbox" name='yesHT' id='yesHT' /></td>
                    <td><input type="checkbox" name='noHT' id='noHT' /></td>
                    <td style={{ width: "120px", paddingLeft: "5%" }}>BP</td>
                  </tr>
                  <tr>
                    <td>Bleeding Tendency</td>
                    <td><input type="checkbox" name='yesBT' id='yesBT' /></td>
                    <td><input type="checkbox" name='noBT' id='noBT' /></td>
                    <td>Asthma</td>
                    <td><input type="checkbox" name='yesAsthma' id='yesAsthma' /></td>
                    <td><input type="checkbox" name='noAsthma' id='noAsthma' /></td>
                    <td style={{ width: "120px", paddingLeft: "5%" }}>Systolic</td>
                    <td><input type='text' name='std' id='std'></input></td>
                  </tr>
                  <tr>
                    <td>Drug Sensitivity</td>
                    <td><input type="checkbox" name='yesDS' id='yesDS' /></td>
                    <td><input type="checkbox" name='noDS' id='noDS' /></td>
                    <td>Food Allergy</td>
                    <td><input type="checkbox" name='yesFA' id='yesFA' /></td>
                    <td><input type="checkbox" name='noFA' id='noFA' /></td>
                    <td style={{ width: "120px", paddingLeft: "5%" }}>Diastolic</td>
                    <td><input type='text' name='bpd' id='bpd'></input></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='middlelast' name='middlelast'>
            <div className="input-field" style={{ paddingRight: '40px', textAlign: 'center' }}>
              {image ? (
                <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                  <img src={image} alt="Signature" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '50px' }} />
                  <label htmlFor="sign" style={{ textAlign: 'center', borderTop: "1px solid darkgray" }}>Signature of Personnel</label>
                </div>
              ) : (
                <React.Fragment>
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="sign"
                    accept="image/*"
                    style={{ border: 'none', borderBottom: '1px solid darkgray', minHeight: "65px" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="sign" style={{ textAlign: 'center' }}>Signature of Personnel</label>
                </React.Fragment>
              )}
            </div>

            <div className="input-field" style={{ paddingRight: "40px" }}>
              <input type="date" id='date' style={{ border: "none", borderBottom: "1px solid darkgray", minHeight: "65px", paddingBottom: "0" }} />
              <label htmlFor="date" style={{ textAlign: "center" }}>Date</label>
            </div>
            <div className="input-field" >
              <input type="text" name='dentist' id='dentist' style={{ border: "none", borderBottom: "1px solid darkgray", minHeight: "65px", paddingBottom: "0" }} />
              <label htmlFor="dentist" style={{ textAlign: "center" }}>Examining Dentist</label>
            </div>
          </div>

          <div>
            <div className="input-field" style={{ paddingRight: '40px', textAlign: 'center' }}>
              <label htmlFor="noted">Noted by:</label>
              {image1 ? (
                <div onClick={handleImageClick1} style={{ cursor: 'pointer' }}>
                  <img src={image1} alt="Signature" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '50px' }} />
                  <label htmlFor="sign" style={{ textAlign: 'center', borderTop: "1px solid darkgray" }}>Chief, Dental Service BFP National Headquarters</label>
                </div>
              ) : (
                <React.Fragment>
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="sign"
                    accept="image/*"
                    style={{ border: 'none', borderBottom: '1px solid darkgray', minHeight: "65px" }}
                    onChange={handleFileChange1}
                  />
                  <label htmlFor="sign" style={{ textAlign: 'center' }}>Signature of Personnel</label>
                </React.Fragment>
              )}
            </div>
          </div>

          <h3 className="subtitle">SECTION IV: SERVICES RENDERED</h3>
          <div className="middlelast" name='middlelast'>
            <table style={{ width: '100%' }}>
              <thead >
                <tr>
                  <td style={{ width: '10%' }}>DATE</td>
                  <td style={{ width: '30%' }}>DIAGNOSIS</td>
                  <td style={{ width: '30%' }}>TREATMENT</td>
                  <td style={{ width: '30%' }}>REMARKS</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="text" name="tdate" id="tdate" /></td>
                  <td><input type="text" name="tdiag" id="tdiag" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="treatment" id="treatment" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="remarks" id="remarks" style={{ width: "100%" }} /></td>
                </tr>
                <tr>
                  <td><input type="text" name="tdate" id="tdate" /></td>
                  <td><input type="text" name="tdiag" id="tdiag" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="treatment" id="treatment" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="remarks" id="remarks" style={{ width: "100%" }} /></td>
                </tr>
                <tr>
                  <td><input type="text" name="tdate" id="tdate" /></td>
                  <td><input type="text" name="tdiag" id="tdiag" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="treatment" id="treatment" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="remarks" id="remarks" style={{ width: "100%" }} /></td>
                </tr>
                <tr>
                  <td><input type="text" name="tdate" id="tdate" /></td>
                  <td><input type="text" name="tdiag" id="tdiag" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="treatment" id="treatment" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="remarks" id="remarks" style={{ width: "100%" }} /></td>
                </tr>
                <tr>
                  <td><input type="text" name="tdate" id="tdate" /></td>
                  <td><input type="text" name="tdiag" id="tdiag" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="treatment" id="treatment" style={{ width: "100%" }} /></td>
                  <td ><input type="text" name="remarks" id="remarks" style={{ width: "100%" }} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <input type="submit" value="Submit Dental Health Record" />
        </form>
      </div>
    </div>
  )
}

export default DentalHealthRecord
