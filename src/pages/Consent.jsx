import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Consent = () => {
    const { dentId, examId } = useParams();
    const [patientName, setPatientName] = useState("");
    const [patientAge, setPatientAge] = useState("");
    const [consents, setConsents] = useState([]);
    const [signatures, setSignatures] = useState({});
    const [patSigns, setPatSigns] = useState({});
    const [dentSigns, setDentSigns] = useState({});
    const [hideSubmit, setHideSubmit] = useState(false);

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handlePopupClose = () => {
        setIsPopupVisible(false);
        window.location.href = `/profile/${dentId}`;
    };

    const handlePopupYes = async () => {
        setIsPopupVisible(false);
        try {
            await fetch(`http://localhost:8080/referral/create?examId=${examId}&dentistId=${dentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Referral created successfully');
            window.location.href = `/referral/${dentId}/${examId}`;
        } catch (error) {
            console.error('Error creating referral:', error);
        }
        console.log('Referral form generation confirmed');
    };

    const pdfRef = useRef();

    const downloadPDF = async () => {
        const input = pdfRef.current;
        const currentScrollTop = input.scrollTop;
        const currentScrollLeft = input.scrollLeft;
        const originalHeight = input.style.height;
        const originalWidth = input.style.width;

        setHideSubmit(true);

        input.style.height = 'auto';
        input.style.width = `${input.scrollWidth}px`;

        const pageWidth = 1400; // A4 width in pixels at 72 DPI
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

        pdf.save('Consent.pdf');
        setHideSubmit(false);

        input.style.height = originalHeight;
        input.style.width = originalWidth;
        input.scrollTop = currentScrollTop;
        input.scrollLeft = currentScrollLeft;
    };

    useEffect(() => {
        const fetchConsents = async () => {
            try {
                const response = await fetch(`http://localhost:8080/consent/byExamId/${examId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatientName(data[0]?.patientName || '');
                setPatientAge(data[0]?.patientAge || '');
                setConsents(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching consents:', error);
            }
        };

        fetchConsents();
    }, [examId]);

    const handleFileChange = (consentId, type, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSignatures((prevSignatures) => ({
                    ...prevSignatures,
                    [`${consentId}-${type}`]: { // Use a unique key combining consentId and type
                        file,
                        preview: reader.result
                    }
                }));

                // Save the file separately based on the type
                if (type === 'patSign') {
                    setPatSigns((prevPatSigns) => ({
                        ...prevPatSigns,
                        [consentId]: file
                    }));
                } else if (type === 'dentSign') {
                    setDentSigns((prevDentSigns) => ({
                        ...prevDentSigns,
                        [consentId]: file
                    }));
                }
            };
            console.log(patSigns);
            console.log(dentSigns);

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const consent of consents) {
            const consentId = consent.consentId;
            const formData = new FormData();
            const patSign = patSigns[consentId];
            const dentSign = dentSigns[consentId];

            console.log('Consent ID:', consentId);
            console.log('Patient Sign File:', patSign);
            console.log('Dentist Sign File:', dentSign);

            if (patSign) {
                formData.append("patSign", patSign);
            }
            if (dentSign) {
                formData.append("dentSign", dentSign);

            }

            try {
                const response = await fetch(`http://localhost:8080/consent/addSignatories/${consentId}`, {
                    method: 'PUT',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.text();
                console.log(result);
                await downloadPDF();
                setIsPopupVisible(true);
            } catch (error) {
                console.error('Error submitting signatures:', error);
            }
        }
    };

    return (
        <div className="center-wrapper"  >
            <div className="records-container" ref={pdfRef}>
                <h1 className="title" style={{ textAlign: "center" }}>INFORMED CONSENT FORM</h1>
                <p style={{ marginTop: "-20px", textAlign: "justify" }}>
                    I {patientName}, {patientAge} hereby authorize the Dentist and or anyone he/she may designate to perform the dental treatment/procedures that are deemed therapeutically necessary based on the findings during said procedures.
                </p>
                <p style={{ marginTop: "-10px", textAlign: "justify", paddingLeft: "4.5%" }}>
                    I hereby certify that I have read and fully understand that my consent is required for the dental treatment/procedures. Its benefits and potential complications, if any, as well as alternative treatment options were explained to me. I also certify that no guarantees have been made regarding the treatment outcome.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="middlelast" name="middlelast">
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <td style={{ width: '10%' }}>DATE</td>
                                    <td style={{ width: '30%' }}>TREATMENT/PROCEDURE</td>
                                    <td style={{ width: '30%' }}>PATIENT'S SIGNATURE</td>
                                    <td style={{ width: '30%' }}>DENTIST NAME/SIGNATURE</td>
                                </tr>
                            </thead>
                            <tbody>
                                {consents.map((item, index) => (
                                    <tr key={index}>
                                        <td><input type="text" name="tdate" style={{ padding: "10px" }} value={item.treatDate} readOnly /></td>
                                        <td><input type="text" name="treatment" style={{ width: "100%", padding: "10px" }} value={item.treatment} readOnly /></td>
                                        <td style={{border: "1px solid black"}}>
                                            <label htmlFor={`psig-${item.consentId}`} style={{ width: "100%", display: "block", cursor: "pointer" }}>
                                                {signatures[`${item.consentId}-patSign`]?.preview ? (
                                                    <img
                                                        src={signatures[`${item.consentId}-patSign`].preview}
                                                        alt="Patient's Signature"
                                                        style={{ width: '100px', height: 'auto', display: 'block', border: "none", textAlign: "center", justifyContent: "center" }}
                                                    />
                                                ) : (
                                                    <div style={{ width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px", textAlign: "center" }}>
                                                        Choose File
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    id={`psig-${item.consentId}`}
                                                    name={`psig-${item.consentId}`}
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleFileChange(item.consentId, 'patSign', e)}
                                                />
                                            </label>

                                        </td>

                                        <td style={{border: "1px solid black"}}>
                                            <label htmlFor={`dsig-${item.consentId}`} style={{ width: "100%", display: "block", cursor: "pointer" }}>
                                                {signatures[`${item.consentId}-dentSign`]?.preview ? (
                                                    <img
                                                        src={signatures[`${item.consentId}-dentSign`].preview}
                                                        alt="Dentist's Signature"
                                                        style={{ width: '100px', height: 'auto', display: 'block', border: "none", textAlign: "center", justifyContent: "center" , marginRight:"10px"}}
                                                    />
                                                ) : (
                                                    <div style={{ width: "100%", border: "1px solid black", borderRadius: "2px", padding: "8px", textAlign: "center" }}>
                                                        Choose File
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    id={`dsig-${item.consentId}`}
                                                    name={`dsig-${item.consentId}`}
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleFileChange(item.consentId, 'dentSign', e)}
                                                />
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <input type="submit" value="Submit Informed Consent Form" style={{ marginTop: "20px", display: hideSubmit ? 'none' : 'block' }} />
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
            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Generate Referral Form</h2>
                        <div className="popup-buttons">
                            <button onClick={handlePopupYes} style={{ marginRight: 10 }}>Yes</button>
                            <button onClick={handlePopupClose} style={{ backgroundColor: "#800000", color: "#fff" }}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Consent;
