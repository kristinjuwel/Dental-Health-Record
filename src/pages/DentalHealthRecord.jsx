import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Record.css';
import '../styles/Login.css';
import DrawIcon from '@mui/icons-material/Draw';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircleIcon from '@mui/icons-material/Circle';
import Icon from '@mdi/react';
import { mdiEraser } from '@mdi/js';
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import SaveIcon from '@mui/icons-material/Save';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DentalHealthRecord = () => {
  const { dentId, type } = useParams();
  const [examId, setExamId] = useState(null);
  const [dentName, setDentName] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [image1, setImage1] = useState(null);
  const fileInputRef1 = useRef(null);
  const [prof, setProf] = useState(null);
  const imgInputRef = useRef(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [showDrawingOptions, setShowDrawingOptions] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black'); // Default: red
  const [thickness, setThickness] = useState(5); // Default: 5
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [undos, setUndos] = useState([]);
  const [penShape, setPenShape] = useState('circle'); // Default: circle

  const [showInitialDate, setShowInitialDate] = useState(false);
  const [showTrainingDate, setShowTrainingDate] = useState(false);
  const [showPromotionDate, setShowPromotionDate] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);


  const toggleButtonsVisibility = () => {
    setButtonsVisible(!buttonsVisible);
  };


  const fetchServices = async () => {
    try {
      const response = await fetch(`http://localhost:8080/services/exam/${examId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      data.forEach(service => {
        addToConsent(service.treatment, service.date, examId);
      });
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  const addToConsent = async (treatment, treatDate, examId) => {
    try {
      const response = await fetch(`http://localhost:8080/consent/${treatDate}/${examId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(treatment) // Send treatment as string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      window.location.href = `/consent/${dentId}/${examId}`;
      console.log('Add to consent response:', result);
    } catch (error) {
      console.error('Error adding to consent:', error);
    }
  };


  const handlePopupClose = () => {
    setIsPopupVisible(false);
    window.location.href = `/profile/${dentId}`;

  };

  const handlePopupYes = (examId) => {
    setIsPopupVisible(false);
    fetchServices(examId);

  };

  const [rows, setRows] = useState([{ tdate: "", tdiag: "", treatment: "", remarks: "" }]);
  const [dentalExam, setDentalExam] = useState({
    rank: '',
    firstName: '',
    middleName: '',
    birthday: '',
    unitAssign: '',
    address: '',
    contactNumber: '',
    sponsor: '',
    initial: '',
    promotion: '',
    training: '',
    trainingDate: '',
    trainingType: '',
    purposeDate: '',
    promotionType: '',
    promotionDate: '',
    calculus: '',
    remarks: '',
    complaint: '',
    medHist: '',
    bpSystolic: '',
    bpDiastolic: '',
    date: ''
  });
  const [patImage, setPatImage] = useState(null);
  const [dentImage, setDentImage] = useState(null);
  const [patSign, setPatSign] = useState(null);

  const pdfRef = useRef();

  const downloadPDF = async () => {
    
    setShowDrawingOptions(false);
    toggleButtonsVisibility();
    const input = pdfRef.current;
    const currentPosition = input.scrollTop;
    const originalHeight = input.style.height;
    input.style.height = 'auto';

    const canvas = await html2canvas(input, {
      dpi: 300,
      scale: 3
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdfWidth = canvas.width;
    const pdfHeight = canvas.height;
    const doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);

    doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    doc.save('Dental_Health_Record.pdf');

    input.style.height = originalHeight;
    input.scrollTop = currentPosition;

    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'birthday') {
      setDentalExam(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setDentalExam(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async () => {
    setShowDrawingOptions(false);
    setButtonsVisible(false);
    saveDrawing();
    if (!patImage || !dentImage || !patSign) {
      alert("Please upload all required images.");
      return;
    }

    // Validate Services Rendered section
    const hasValidServiceRow = rows.some(row =>
      Object.values(row).some(value => value.trim() !== "")
    );

    if (!hasValidServiceRow) {
      alert("At least one service rendered row must be filled.");
      return;
    }


    const mappedDentalExam = {
      rank: dentalExam.rank,
      firstName: dentalExam.firstName,
      middleName: dentalExam.middleName,
      lastName: dentalExam.lastName,
      birthday: dentalExam.birthday,
      unitAssign: dentalExam.unitAssign,
      address: dentalExam.address,
      contactNumber: dentalExam.contactNumber,
      sponsor: dentalExam.sponsor,
      purpose: `${dentalExam.initial},${dentalExam.training}-${dentalExam.trainingType},${dentalExam.promotion}-${dentalExam.promotionType}`,
      trainingDate: dentalExam.trainingDate,
      purposeDate: dentalExam.purposeDate,
      checkupDate: dentalExam.date,
      promotionDate: dentalExam.promotionDate,
      calculus: dentalExam.calculus,
      remarks: dentalExam.remarks,
      complaint: dentalExam.complaint,
      medHist: dentalExam.medHist,
      bp: `${dentalExam.bpSystolic},${dentalExam.bpDiastolic}`,
      dentistId: dentId,
      completionStatus: 'unsigned',
    };

    const formData = new FormData();
    formData.append('dentalExam', new Blob([JSON.stringify(mappedDentalExam)], { type: 'application/json' }));
    formData.append('patImage', patImage);
    formData.append('dentImage', dentImage);
    formData.append('patSign', patSign);

    try {
      const response = await fetch('http://localhost:8080/dental', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Response:', responseData);

      setExamId(responseData.examId);
      for (const row of rows) {
        await postData(row, responseData.examId);
        console.log(examId);
      }
      handleDownloadAndShowPopup();

    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  };

  const handleDownloadAndShowPopup = async () => {
    setShowDrawingOptions(false);
    setButtonsVisible(false);
    await downloadPDF(); // Wait until downloadPDF() completes
    setIsPopupVisible(true);
  };




  const handleRowChange = (e, index) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { tdate: '', tdiag: '', treatment: '', remarks: '' }]);
  };

  const deleteRow = (index) => {
    const newRows = rows.filter((row, i) => i !== index);
    setRows(newRows);
  };

  const postData = async (row, myExamId) => {
    const url = 'http://localhost:8080/services';
    const data = {
      examId: myExamId,
      date: row.tdate,
      diagnosis: row.tdiag,
      treatment: row.treatment,
      remarks: row.remarks
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log('Post successful:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMedicalHistoryChange = (event) => {
    const { name, checked } = event.target;
    const condition = name.replace('yes', '').replace('no', '');
    const isYesCheckbox = name.startsWith('yes');
    const oppositeCheckbox = isYesCheckbox ? `no${condition}` : `yes${condition}`;

    // Uncheck the opposite checkbox
    document.getElementById(oppositeCheckbox).checked = !checked;

    // Handle the change in state
    setDentalExam(prevState => {
      const currentHist = prevState.medHist.split(',').filter(item => item);
      let newHist;

      if (isYesCheckbox) {
        newHist = checked
          ? [...currentHist, condition]
          : currentHist.filter(item => item !== condition);
      } else {
        newHist = checked
          ? currentHist.filter(item => item !== condition)
          : currentHist;
      }

      return {
        ...prevState,
        medHist: newHist.join(',')

      };

    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    handleChange(event);
    switch (name) {
      case 'initial':
        setShowInitialDate(checked);
        setDentalExam(prevState => ({
          ...prevState,
          initial: checked ? 'initial' : ''
        }));
        break;
      case 'training':
        setShowTrainingDate(checked);
        setDentalExam(prevState => ({
          ...prevState,
          training: checked ? 'training' : '',
          trainingType: checked ? prevState.trainingType : '' // Reset trainingtype if unchecked
        }));
        break;
      case 'promotion':
        setShowPromotionDate(checked);
        setDentalExam(prevState => ({
          ...prevState,
          promotion: checked ? 'promotion' : '',
          promotionType: checked ? prevState.promotionType : '' // Reset promotiontype if unchecked
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchDentistProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${dentId}/fullname`);
        if (response.ok) {
          const data = await response.text();
          setDentName(data);
        } else {
          console.error('Failed to fetch dentist name:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dentist name:', error);
      }
    };

    fetchDentistProfile();
  }, [dentId]);

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
      const file = new File([blob], 'dentImage.png', { type: blob.type });
      setDentImage(file);
    }, 'image/png');
  };

  const handlePlaceholderClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPatImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProf(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPatSign(file);
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
      <div className="records-container" ref={pdfRef}>
        <h1 className="title" style={{ textAlign: "center" }}>BFP Dental Health Record</h1>
        <h3 className="subtitle">SECTION I: PATIENT DATA</h3>
        <form className="dental-record" >
          <div className="middlelast" name='middlelast'>
            {type === 'patient' && (
              <div className="input-field" style={{ paddingRight: "20px" }}>
                <label htmlFor="rank">Rank*</label>
                <input list="rankOptions" name="rank" id="rank" onChange={handleChange} />
                <datalist id="rankOptions">
                  <option value="Fire Director" />
                  <option value="Fire Chief Superintendent" />
                  <option value="Fire Senior Superintendent" />
                  <option value="Fire Superintendent" />
                  <option value="Fire Chief Inspector" />
                  <option value="Fire Senior Inspector" />
                  <option value="Fire Inspector" />
                  <option value="Senior Fire Officer 4" />
                  <option value="Senior Fire Officer 3" />
                  <option value="Senior Fire Officer 2" />
                  <option value="Senior Fire Officer 1" />
                  <option value="Fire Officer 3" />
                  <option value="Fire Officer 2" />
                  <option value="Fire Officer 1" />
                  <option value="Clerk" />
                  <option value="Civilian" />
                  <option value="Retiree" />
                  <option value="Non-Uniformed" />
                  <option value="Others" />
                </datalist>
              </div>
            )}
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="lastName">Last Name*</label>
              <input type="text" name="lastName" id="lastName" onChange={handleChange} />
            </div>
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="firstName">First Name*</label>
              <input type="text" name="firstName" id="firstName" onChange={handleChange} />
            </div>
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="middleName">Middle Name</label>
              <input type="text" name="middleName" id="middleName" onChange={handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="birthday">Date of Birth*</label>
              <input type="date" name="birthday" id="birthday" onChange={handleChange} />
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
            {(type === 'patient' | type === 'dependent') && (
              <div className="input-field" style={{ paddingRight: "20px" }}>
                <label htmlFor="unit">Unit Assignment*</label>
                <input type="text" name="unitAssign" id="unit" list="unitOptions" onChange={handleChange} />
                <datalist id="unitOptions">
                  <option value="NHQ" />
                  <option value="NFTI" />
                  <option value="NCR" />
                  <option value="CAR" />
                  <option value="1" />
                  <option value="2" />
                  <option value="3" />
                  <option value="4A" />
                  <option value="4B" />
                  <option value="5" />
                  <option value="6" />
                  <option value="7" />
                  <option value="8" />
                  <option value="9" />
                  <option value="10" />
                  <option value="11" />
                  <option value="12" />
                  <option value="13" />
                  <option value="BARMM" />
                </datalist>
              </div>
            )}
            <div className="input-field" style={{ paddingRight: "20px" }}>
              <label htmlFor="address">Home Address*</label>
              <input type="text" name="address" id="address" onChange={handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="phonenumber">Phone Number*</label>
              <input type="text" name="contactNumber" id="phonenumber" onChange={handleChange} />
            </div>
            {type === 'dependent' &&
              <div className="input-field" style={{ marginLeft: "20px" }}>
                <label htmlFor="sponsor">Sponsor</label>
                <input type="text" name="sponsor" id="sponsor" onChange={handleChange} />
              </div>
            }
          </div>

          <h3 className="subtitle">SECTION II: DENTAL EXAMINATION</h3>
          {type === 'patient' && (
            <div className='sectiontwodenex'>
              <p style={{ marginTop: "-10px" }}>Purpose of Examination*</p>
              <div className="middlelastde" name='middlelast'>
                <div className="input-field-de">
                  <div className='insideInputField'>
                    <input type='checkbox' id='initial' name='initial' onChange={handleCheckboxChange} />
                    <label htmlFor='initial'>Initial/Consultation</label>
                    {showInitialDate && <input type="date" name="purposeDate" id="initialdate" onChange={handleChange} />}
                  </div>
                </div>
                <div className="input-field-de">
                  <div className='insideInputField'>
                    <input type='checkbox' id='training' name='training' onChange={handleCheckboxChange} />
                    <label htmlFor='training'>Training</label>
                    {showTrainingDate && <input type="date" name="trainingDate" id="trainingdate" onChange={handleChange} />}
                    {showTrainingDate &&
                      <div className="insideInputFieldType">
                        <label htmlFor="">Type:</label>
                        <input type="text" name="trainingType" id="trainingType" onChange={handleChange} />
                      </div>
                    }
                  </div>
                </div>
                <div className="input-field-de">
                  <div className='insideInputField'>
                    <input type='checkbox' id='promotion' name='promotion' onChange={handleCheckboxChange} />
                    <label htmlFor='promotion'>Promotion</label>
                    {showPromotionDate && <input type="date" name="promotionDate" id="promotiondate" onChange={handleChange} />}
                    {showPromotionDate &&
                      <div className="insideInputFieldType">
                        <label htmlFor="">Type:</label>
                        <input type="text" name="promotionType" id="promotionType" onChange={handleChange} />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
          <p style={{ marginTop: "-5px" }}>MISSING TEETH AND EXISTING RESTORATIONS, DISEASES AND ABONORMALITIES</p>
          <div className='teeth-chart'>
            <div className='teeth-chart-image'>
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
            {showDrawingOptions && (
              <div className='pens-container'>

                <div className="penthickness">
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
                </div>
                <button type="button" onClick={() => setPenShape('circle')}>
                  <DrawIcon />
                  Pen
                </button>
                <button type="button" onClick={() => setPenShape('square')}>
                  <BorderColorIcon />
                  Marker
                </button>
                <button type="button" onClick={handleEraser}>
                  <Icon path={mdiEraser} size={1} />
                  Erase
                </button>
                <button type="button" onClick={() => handleColorChange('black')}>
                  <CircleIcon />
                  Conditions
                </button>
                <button type="button" onClick={() => handleColorChange('#ff0000')}>
                  <CircleIcon />
                  Treatment Plan
                </button>
                <button type="button" onClick={() => handleColorChange('#0000ff')}>
                  <CircleIcon />
                  Completed
                </button>
                <button type="button" onClick={handleClearAll}>
                  <FormatColorResetIcon />
                  Clear All
                </button>
                <button type="button" onClick={saveDrawing}>
                  <SaveIcon />
                  Save Drawing
                </button>
              </div>
            )}
          </div>

          <label htmlFor="calculus" style={{ width: "120px" }}>A. CALCULUS</label>
          <div>
            <input type="radio" id="mild" name="calculus" value="Mild" onChange={handleChange} />
            <label htmlFor="mild">Mild</label>
          </div>
          <div>
            <input type="radio" id="moderate" name="calculus" value="Moderate" onChange={handleChange} />
            <label htmlFor="moderate">Moderate</label>
          </div>
          <div>
            <input type="radio" id="heavy" name="calculus" value="Heavy" onChange={handleChange} />
            <label htmlFor="heavy">Heavy</label>
          </div>

          <div className="input-field" >
            <label htmlFor="abnormalities">B. ABNORMALITIES/OCCLUSION/REMARKS</label>
            <input type="text" name="remarks" id="abnormalities" onChange={handleChange} />
          </div>

          <h3 className="subtitle">SECTION III: CASE HISTORY</h3>
          <div className="input-field" >
            <label htmlFor="oral">Present Oral Complaint:</label>
            <input type="text" name="complaint" id="oral" onChange={handleChange} />
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
                    <td>Diabetes</td>
                    <td><input type="checkbox" name='yesDiabetes' id='yesDiabetes' onChange={handleMedicalHistoryChange} /></td>
                    <td><input type="checkbox" name='noDiabetes' id='noDiabetes' onChange={handleMedicalHistoryChange} /></td>
                    <td colSpan={1} style={{ width: "200px" }}>History of Hypertension</td>
                    <td><input type="checkbox" name='yesHT' id='yesHT' onChange={handleMedicalHistoryChange} /></td>
                    <td><input type="checkbox" name='noHT' id='noHT' onChange={handleMedicalHistoryChange} /></td>
                    <td style={{ width: "120px", paddingLeft: "5%" }}>BP</td>
                  </tr>
                  <tr>
                    <td>Bleeding Tendency</td>
                    <td><input type="checkbox" name='yesBT' id='yesBT' onChange={handleMedicalHistoryChange} /></td>
                    <td><input type="checkbox" name='noBT' id='noBT' onChange={handleMedicalHistoryChange} /></td>
                    <td>Asthma</td>
                    <td><input type="checkbox" name='yesAsthma' id='yesAsthma' onChange={handleMedicalHistoryChange} /></td>
                    <td><input type="checkbox" name='noAsthma' id='noAsthma' onChange={handleMedicalHistoryChange} /></td>
                    <td style={{ width: "120px", paddingLeft: "5%" }}>Systolic</td>
                    <td><input type='text' name='bpSystolic' id='std' onChange={handleChange}></input></td>
                  </tr>
                  <tr>
                    <td>Drug Sensitivity</td>
                    <td><input type="checkbox" name='yesDS' id='yesDS' onChange={handleMedicalHistoryChange} /></td>
                    <td><input type="checkbox" name='noDS' id='noDS' onChange={handleMedicalHistoryChange} /></td>
                    <td>Food Allergy</td>
                    <td><input type="checkbox" name='yesFA' id='yesFA' onChange={handleMedicalHistoryChange} /></td>
                    <td><input type="checkbox" name='noFA' id='noFA' onChange={handleMedicalHistoryChange} /></td>
                    <td style={{ width: "120px", paddingLeft: "5%" }}>Diastolic</td>
                    <td><input type='text' name='bpDiastolic' id='bpd' onChange={handleChange}></input></td>
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
              <input type="date" name='date' id='date' style={{ border: "none", borderBottom: "1px solid darkgray", minHeight: "65px", paddingBottom: "0" }} onChange={handleChange} />
              <label htmlFor="date" style={{ textAlign: "center" }}>Date</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                name="dentist"
                id="dentist"
                style={{ border: "none", borderBottom: "1px solid darkgray", minHeight: "65px", paddingBottom: "0", textAlign: "center" }}
                value={dentName} // Set the value to the dentistName variable
                disabled // Disable the input field to prevent user input
              />
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
                  <label htmlFor="sign" style={{ textAlign: 'center' }}>Chief, Dental Service BFP National Headquarters</label>
                </React.Fragment>
              )}
            </div>
          </div>

          <h3 className="subtitle">SECTION IV: SERVICES RENDERED</h3>
          <div>
            <table style={{ width: '100%' }}>
              <thead >
                <tr>
                  <td style={{ width: '10%' }}>DATE</td>
                  <td style={{ width: '27%' }}>DIAGNOSIS</td>
                  <td style={{ width: '27%' }}>TREATMENT</td>
                  <td style={{ width: '27%' }}>REMARKS</td>
                  {buttonsVisible && <td><button type="button" onClick={addRow} style={{ width: "95px", backgroundColor: "#2aafce", color: "#fff" }}>Add Row</button></td>}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td><input type="date" name="tdate" style={{ padding: "9px" }} id={`tdate-${index}`} value={row.tdate} onChange={(e) => handleRowChange(e, index)} /></td>
                    <td><input type="text" name="tdiag" id={`tdiag-${index}`} style={{ width: "100%", padding: "9px" }} value={row.tdiag} onChange={(e) => handleRowChange(e, index)} /></td>
                    <td><input type="text" name="treatment" id={`treatment-${index}`} style={{ width: "100%", padding: "9px" }} list="treatmentOptions" value={row.treatment} onChange={(e) => handleRowChange(e, index)} /></td>
                    <td><input type="text" name="remarks" id={`remarks-${index}`} style={{ width: "100%", padding: "9px" }} value={row.remarks} onChange={(e) => handleRowChange(e, index)} /></td>
                    <td>
                      {buttonsVisible && (
                        <td>
                          <button type="button" onClick={() => deleteRow(index)} style={{ width: "95px", backgroundColor: "#800000", color: "#fff" }}>Delete</button>
                        </td>
                      )}                    </td>
                  </tr>
                ))}
                <datalist id="treatmentOptions">
                  <option value="Oral Prophylaxis"></option>
                  <option value="Dental Sealant"></option>
                  <option value="Flouride Application"></option>
                  <option value="Restoration"></option>
                  <option value="Extraction"></option>
                  <option value="Prosthodontics"></option>
                </datalist>
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={handleFormSubmit}
            style={{
              width: "100%",
              backgroundColor: "#2aafce",
              color: "#fff",
              textAlign: "center",
              display: "block",
              lineHeight: "0px",
              padding: "0",
            }}
          >
            Submit Dental Health Record
          </button>
        </form>
      </div>
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
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Generate Consent Form</h2>
            <div className="popup-buttons">
              <button onClick={handlePopupYes} style={{ marginRight: 10 }}> Yes</button>
              <button onClick={handlePopupClose} style={{ backgroundColor: "#800000", color: "#fff" }}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DentalHealthRecord