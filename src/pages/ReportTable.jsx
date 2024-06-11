import React, { useRef, useState, useEffect } from 'react';
import '../styles/Record.css';
import '../styles/Login.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ReportTable = () => {
    const pdfRef = useRef();
    const imgInputRef = useRef(null);
    const imgInputRef1 = useRef(null);
    const imgInputRef2 = useRef(null);


    const [nationalTotal, setNationalTotal] = useState(0);
    const [nhq, setNhq] = useState({});
    const [ncr, setNcr] = useState({});
    const [r1, setR1] = useState({});
    const [r2, setR2] = useState({});
    const [r3, setR3] = useState({});
    const [r4a, setR4a] = useState({});
    const [r4b, setR4b] = useState({});
    const [r5, setR5] = useState({});
    const [r6, setR6] = useState({});
    const [r7, setR7] = useState({});
    const [r8, setR8] = useState({});
    const [r9, setR9] = useState({});
    const [r10, setR10] = useState({});
    const [r11, setR11] = useState({});
    const [r12, setR12] = useState({});
    const [car, setCar] = useState({});
    const [caraga, setCaraga] = useState({});
    const [barmm, setBarmm] = useState({});

    const [regionName, setRegionName] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [staff, setStaff] = useState(null);
    const [health, setHealth] = useState(null);
    const [chief, setChief] = useState(null);

    const handlePlaceholderClick = () => {
        if (imgInputRef.current) {
            imgInputRef.current.click();
        }
    };
    const handlePlaceholder1Click = () => {
        if (imgInputRef1.current) {
            imgInputRef1.current.click();
        }
    };

    const handlePlaceholder2Click = () => {
        if (imgInputRef2.current) {
            imgInputRef2.current.click();
        }
    };


    const handleStaffChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setStaff(file);
            const reader = new FileReader();
            reader.onload = () => {
                setStaff(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChiefChange = (event) => {
        const file2 = event.target.files[0];

        if (file2) {
            setChief(file2);
            const reader = new FileReader();
            reader.onload = () => {
                setChief(reader.result);
            };
            reader.readAsDataURL(file2);
        }
    };

    const handleHealthChange = (event) => {
        const file1 = event.target.files[0];

        if (file1) {
            setHealth(file1);
            const reader = new FileReader();
            reader.onload = () => {
                setHealth(reader.result);
            };
            reader.readAsDataURL(file1);
        }
    };

    const calculateNationalTotal = () => {
        const regions = [nhq, ncr, r1, r2, r3, r4a, r4b, r5, r6, r7, r8, r9, r10, r11, r12, car, caraga, barmm];
        const total = regions.reduce((acc, region) => {
            const grandTotal = parseInt(region.grandTotal, 10);
            return acc + (isNaN(grandTotal) ? 0 : grandTotal);
        }, 0);
        setNationalTotal(total);
    };
    useEffect(() => {
        fetchRegionals("nhq");
        fetchRegionals("ncr");
        fetchRegionals("r1");
        fetchRegionals("r2");
        fetchRegionals("r3");
        fetchRegionals("r4a");
        fetchRegionals("r4b");
        fetchRegionals("r5");
        fetchRegionals("r6");
        fetchRegionals("r7");
        fetchRegionals("r8");
        fetchRegionals("r9");
        fetchRegionals("r10");
        fetchRegionals("r11");
        fetchRegionals("r12");
        fetchRegionals("car");
        fetchRegionals("caraga");
        fetchRegionals("barmm");

    }, [regionName, selectedMonth, selectedYear]);

    useEffect(() => {
        calculateNationalTotal();
    }, [nhq, ncr, r1, r2, r3, r4a, r4b, r5, r6, r7, r8, r9, r10, r11, r12, car, caraga, barmm]);


    const fetchRegionals = async (regionName) => {
        try {
            if (!selectedMonth || !selectedYear) {
                console.error('Please select month, year, and region');
                return;
            }
            // Construct the setter function name

            const response = await fetch(`http://localhost:8080/regional/${regionName}/${selectedMonth}/${selectedYear}`);
            if (!response.ok) {
                throw new Error('Failed to fetch regionals');
            }
            const data = await response.json();
            console.log(data);
            switch (regionName) {
                case 'nhq':
                    setNhq(data);
                    break;
                case 'ncr':
                    setNcr(data);
                    break;
                case 'r1':
                    setR1(data);
                    break;
                case 'r2':
                    setR2(data);
                    break;
                case 'r3':
                    setR3(data);
                    break;
                case 'r4a':
                    setR4a(data);
                    break;
                case 'r4b':
                    setR4b(data);
                    break;
                case 'r5':
                    setR5(data);
                    break;
                case 'r6':
                    setR6(data);
                    break;
                case 'r7':
                    setR7(data);
                    break;
                case 'r8':
                    setR8(data);
                    break;
                case 'r9':
                    setR9(data);
                    break;
                case 'r10':
                    setR10(data);
                    break;
                case 'r11':
                    setR11(data);
                    break;
                case 'r12':
                    setR12(data);
                    break;
                case 'car':
                    setCar(data);
                    break;
                case 'caraga':
                    setCaraga(data);
                    break;
                case 'barmm':
                    setBarmm(data);
                    break;
                default:
                    console.error('Unknown region:', regionName);
            }


        } catch (error) {
            console.error('Error fetching regionals:', error);
        }
    };



    const downloadPDF = async () => {
        const input = pdfRef.current;
        const currentScrollTop = input.scrollTop;
        const currentScrollLeft = input.scrollLeft;
        const originalHeight = input.style.height;
        const originalWidth = input.style.width;

        input.style.height = 'auto';
        input.style.width = `${input.scrollWidth}px`;

        const pageWidth = 1440; // A4 width in pixels at 72 DPI
        const pageHeight = 1300; // A4 height in pixels at 72 DPI
        const contentWidth = input.scrollWidth;
        const contentHeight = input.scrollHeight;

        const totalPages = Math.ceil(contentWidth / pageWidth);

        const pdf = new jsPDF('landscape', 'px', [pageWidth, pageHeight]);

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

        pdf.save('Table.pdf');

        input.style.height = originalHeight;
        input.style.width = originalWidth;
        input.scrollTop = currentScrollTop;
        input.scrollLeft = currentScrollLeft;
    };

    return (
        <div className="report-wrapper">
            <div className="report-container" ref={pdfRef}>
                <h1 className="title" style={{ textAlign: "center" }}>DENTAL SERVICE</h1>
                <h1 className="subtitle" style={{ textAlign: "center", marginTop: "-10px" }}>MONTHLY ACCOMPLISHMENT REPORT</h1>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-15px" }}>
                    <p className="month">For the Month of</p>
                    <select name="month" id="month" value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)} style={{ width: "5vw", marginLeft: "1%", border: "none", borderBottom: "1px solid black", fontSize: "15px" }}>
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
                    <input type="text" name='reportYear' id='reportYear' placeholder='Year' value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)} style={{ border: "none", borderBottom: "1px solid black", fontSize: "15px", width: "80px" }} />

                </div>

                <div>
                    <table className='summary-table'>
                        <thead>
                            <tr>
                                <th colSpan={1} style={{ border: "none" }}></th>
                                <th colSpan={10} style={{ border: "2px solid black" }}>Uniformed Personnel</th>
                                <th colSpan={9} style={{ border: "2px solid black" }}>Non-Uniformed Personnel</th>
                                <th colSpan={8} style={{ border: "2px solid black" }}>Dependents</th>
                                <th colSpan={8} style={{ border: "2px solid black" }}>Civilian</th>
                                <th colSpan={8} style={{ border: "2px solid black" }}>Retirees</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: "none", display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>Office</td>
                                <td style={{ borderLeft: "2px solid black" }}>Consultation<br /> or Mouth<br /> Examination</td>
                                <td>Oral<br /> Prophylaxis</td>
                                <td>Dental<br /> Sealant</td>
                                <td>Flouride<br /> Application</td>
                                <td>Surgery or Extraction</td>
                                <td>Restoration</td>
                                <td>Prosthodontics</td>
                                <td>Other<br />Surgical<br />Procedures</td>
                                <td style={{ borderLeft: "2px solid black" }}>Trainings</td>
                                <td style={{ borderRight: "2px solid black" }}>Promotion</td>
                                {/*non-uniformed  */}
                                <td style={{ borderLeft: "2px solid black" }}>Consultation<br /> or Mouth<br /> Examination</td>
                                <td>Oral<br /> Prophylaxis</td>
                                <td>Dental<br /> Sealant</td>
                                <td>Flouride<br /> Application</td>
                                <td>Surgery or<br /> Extraction</td>
                                <td>Restoration</td>
                                <td>Prosthodontics</td>
                                <td>Other<br />Surgical<br />Procedures</td>
                                <td style={{ borderLeft: "2px solid black", borderRight: "2px solid black" }}>Promotion</td>
                                {/*dependents  */}
                                <td style={{ borderLeft: "2px solid black" }}>Consultation<br /> or Mouth<br /> Examination</td>
                                <td>Oral<br /> Prophylaxis</td>
                                <td>Dental<br /> Sealant</td>
                                <td>Flouride<br /> Application</td>
                                <td>Surgery or<br /> Extraction</td>
                                <td>Restoration</td>
                                <td>Prosthodontics</td>
                                <td style={{ borderRight: "2px solid black" }}>Other<br />Surgical<br />Procedures</td>
                                {/*civilians  */}
                                <td style={{ borderLeft: "2px solid black" }}>Consultation<br /> or Mouth<br /> Examination</td>
                                <td>Oral<br /> Prophylaxis</td>
                                <td>Dental<br /> Sealant</td>
                                <td>Flouride<br /> Application</td>
                                <td>Surgery or<br /> Extraction</td>
                                <td>Restoration</td>
                                <td>Prosthodontics</td>
                                <td style={{ borderRight: "2px solid black" }}>Other<br />Surgical<br />Procedures</td>
                                {/*retirees  */}
                                <td style={{ borderLeft: "2px solid black" }}>Consultation<br /> or Mouth<br /> Examination</td>
                                <td>Oral<br /> Prophylaxis</td>
                                <td>Dental<br /> Sealant</td>
                                <td>Flouride<br /> Application</td>
                                <td>Surgery or<br /> Extraction</td>
                                <td>Restoration</td>
                                <td>Prosthodontics</td>
                                <td style={{ borderRight: "2px solid black" }}>Other<br />Surgical<br />Procedures</td>
                            </tr>
                            <tr className='nationalhq'>
                                <td>NHQ</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{nhq.unifConsultation}</td>
                                <td>{nhq.unifOralProphylaxis}</td>
                                <td>{nhq.unifDentalSealant}</td>
                                <td>{nhq.unifFluorideApplication}</td>
                                <td>{nhq.unifExtraction}</td>
                                <td>{nhq.unifRestoration}</td>
                                <td>{nhq.unifProsthodontics}</td>
                                <td>{nhq.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{nhq.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{nhq.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{nhq.nonunifConsultation}</td>
                                <td>{nhq.nonunifOralProphylaxis}</td>
                                <td>{nhq.nonunifDentalSealant}</td>
                                <td>{nhq.nonunifFluorideApplication}</td>
                                <td>{nhq.nonunifExtraction}</td>
                                <td>{nhq.nonunifRestoration}</td>
                                <td>{nhq.nonunifProsthodontics}</td>
                                <td>{nhq.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{nhq.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{nhq.dpdConsultation}</td>
                                <td>{nhq.dpdOralProphylaxis}</td>
                                <td>{nhq.dpdDentalSealant}</td>
                                <td>{nhq.dpdFluorideApplication}</td>
                                <td>{nhq.dpdExtraction}</td>
                                <td>{nhq.dpdRestoration}</td>
                                <td>{nhq.nonunifProsthodontics}</td>
                                <td>{nhq.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{nhq.cvlConsultation}</td>
                                <td>{nhq.cvlOralProphylaxis}</td>
                                <td>{nhq.cvlDentalSealant}</td>
                                <td>{nhq.cvlFluorideApplication}</td>
                                <td>{nhq.cvlExtraction}</td>
                                <td>{nhq.cvlRestoration}</td>
                                <td>{nhq.cvlProsthodontics}</td>
                                <td>{nhq.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{nhq.rtrConsultation}</td>
                                <td>{nhq.rtrOralProphylaxis}</td>
                                <td>{nhq.rtrDentalSealant}</td>
                                <td>{nhq.rtrFluorideApplication}</td>
                                <td>{nhq.rtrExtraction}</td>
                                <td>{nhq.rtrRestoration}</td>
                                <td>{nhq.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{nhq.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='nationalcr'>
                                <td>NCR</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{ncr.unifConsultation}</td>
                                <td>{ncr.unifOralProphylaxis}</td>
                                <td>{ncr.unifDentalSealant}</td>
                                <td>{ncr.unifFluorideApplication}</td>
                                <td>{ncr.unifExtraction}</td>
                                <td>{ncr.unifRestoration}</td>
                                <td>{ncr.unifProsthodontics}</td>
                                <td>{ncr.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{ncr.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{ncr.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{ncr.nonunifConsultation}</td>
                                <td>{ncr.nonunifOralProphylaxis}</td>
                                <td>{ncr.nonunifDentalSealant}</td>
                                <td>{ncr.nonunifFluorideApplication}</td>
                                <td>{ncr.nonunifExtraction}</td>
                                <td>{ncr.nonunifRestoration}</td>
                                <td>{ncr.nonunifProsthodontics}</td>
                                <td>{ncr.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{ncr.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{ncr.dpdConsultation}</td>
                                <td>{ncr.dpdOralProphylaxis}</td>
                                <td>{ncr.dpdDentalSealant}</td>
                                <td>{ncr.dpdFluorideApplication}</td>
                                <td>{ncr.dpdExtraction}</td>
                                <td>{ncr.dpdRestoration}</td>
                                <td>{ncr.nonunifProsthodontics}</td>
                                <td>{ncr.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{ncr.cvlConsultation}</td>
                                <td>{ncr.cvlOralProphylaxis}</td>
                                <td>{ncr.cvlDentalSealant}</td>
                                <td>{ncr.cvlFluorideApplication}</td>
                                <td>{ncr.cvlExtraction}</td>
                                <td>{ncr.cvlRestoration}</td>
                                <td>{ncr.cvlProsthodontics}</td>
                                <td>{ncr.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{ncr.rtrConsultation}</td>
                                <td>{ncr.rtrOralProphylaxis}</td>
                                <td>{ncr.rtrDentalSealant}</td>
                                <td>{ncr.rtrFluorideApplication}</td>
                                <td>{ncr.rtrExtraction}</td>
                                <td>{ncr.rtrRestoration}</td>
                                <td>{ncr.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{ncr.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg1'>
                                <td>R1</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r1.unifConsultation}</td>
                                <td>{r1.unifOralProphylaxis}</td>
                                <td>{r1.unifDentalSealant}</td>
                                <td>{r1.unifFluorideApplication}</td>
                                <td>{r1.unifExtraction}</td>
                                <td>{r1.unifRestoration}</td>
                                <td>{r1.unifProsthodontics}</td>
                                <td>{r1.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r1.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r1.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r1.nonunifConsultation}</td>
                                <td>{r1.nonunifOralProphylaxis}</td>
                                <td>{r1.nonunifDentalSealant}</td>
                                <td>{r1.nonunifFluorideApplication}</td>
                                <td>{r1.nonunifExtraction}</td>
                                <td>{r1.nonunifRestoration}</td>
                                <td>{r1.nonunifProsthodontics}</td>
                                <td>{r1.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r1.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r1.dpdConsultation}</td>
                                <td>{r1.dpdOralProphylaxis}</td>
                                <td>{r1.dpdDentalSealant}</td>
                                <td>{r1.dpdFluorideApplication}</td>
                                <td>{r1.dpdExtraction}</td>
                                <td>{r1.dpdRestoration}</td>
                                <td>{r1.nonunifProsthodontics}</td>
                                <td>{r1.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r1.cvlConsultation}</td>
                                <td>{r1.cvlOralProphylaxis}</td>
                                <td>{r1.cvlDentalSealant}</td>
                                <td>{r1.cvlFluorideApplication}</td>
                                <td>{r1.cvlExtraction}</td>
                                <td>{r1.cvlRestoration}</td>
                                <td>{r1.cvlProsthodontics}</td>
                                <td>{r1.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r1.rtrConsultation}</td>
                                <td>{r1.rtrOralProphylaxis}</td>
                                <td>{r1.rtrDentalSealant}</td>
                                <td>{r1.rtrFluorideApplication}</td>
                                <td>{r1.rtrExtraction}</td>
                                <td>{r1.rtrRestoration}</td>
                                <td>{r1.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r1.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg2'>
                                <td>R2</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r2.unifConsultation}</td>
                                <td>{r2.unifOralProphylaxis}</td>
                                <td>{r2.unifDentalSealant}</td>
                                <td>{r2.unifFluorideApplication}</td>
                                <td>{r2.unifExtraction}</td>
                                <td>{r2.unifRestoration}</td>
                                <td>{r2.unifProsthodontics}</td>
                                <td>{r2.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r2.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r2.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r2.nonunifConsultation}</td>
                                <td>{r2.nonunifOralProphylaxis}</td>
                                <td>{r2.nonunifDentalSealant}</td>
                                <td>{r2.nonunifFluorideApplication}</td>
                                <td>{r2.nonunifExtraction}</td>
                                <td>{r2.nonunifRestoration}</td>
                                <td>{r2.nonunifProsthodontics}</td>
                                <td>{r2.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r2.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r2.dpdConsultation}</td>
                                <td>{r2.dpdOralProphylaxis}</td>
                                <td>{r2.dpdDentalSealant}</td>
                                <td>{r2.dpdFluorideApplication}</td>
                                <td>{r2.dpdExtraction}</td>
                                <td>{r2.dpdRestoration}</td>
                                <td>{r2.nonunifProsthodontics}</td>
                                <td>{r2.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r2.cvlConsultation}</td>
                                <td>{r2.cvlOralProphylaxis}</td>
                                <td>{r2.cvlDentalSealant}</td>
                                <td>{r2.cvlFluorideApplication}</td>
                                <td>{r2.cvlExtraction}</td>
                                <td>{r2.cvlRestoration}</td>
                                <td>{r2.cvlProsthodontics}</td>
                                <td>{r2.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r2.rtrConsultation}</td>
                                <td>{r2.rtrOralProphylaxis}</td>
                                <td>{r2.rtrDentalSealant}</td>
                                <td>{r2.rtrFluorideApplication}</td>
                                <td>{r2.rtrExtraction}</td>
                                <td>{r2.rtrRestoration}</td>
                                <td>{r2.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r2.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg3'>
                                <td>R3</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r3.unifConsultation}</td>
                                <td>{r3.unifOralProphylaxis}</td>
                                <td>{r3.unifDentalSealant}</td>
                                <td>{r3.unifFluorideApplication}</td>
                                <td>{r3.unifExtraction}</td>
                                <td>{r3.unifRestoration}</td>
                                <td>{r3.unifProsthodontics}</td>
                                <td>{r3.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r3.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r3.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r3.nonunifConsultation}</td>
                                <td>{r3.nonunifOralProphylaxis}</td>
                                <td>{r3.nonunifDentalSealant}</td>
                                <td>{r3.nonunifFluorideApplication}</td>
                                <td>{r3.nonunifExtraction}</td>
                                <td>{r3.nonunifRestoration}</td>
                                <td>{r3.nonunifProsthodontics}</td>
                                <td>{r3.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r3.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r3.dpdConsultation}</td>
                                <td>{r3.dpdOralProphylaxis}</td>
                                <td>{r3.dpdDentalSealant}</td>
                                <td>{r3.dpdFluorideApplication}</td>
                                <td>{r3.dpdExtraction}</td>
                                <td>{r3.dpdRestoration}</td>
                                <td>{r3.nonunifProsthodontics}</td>
                                <td>{r3.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r3.cvlConsultation}</td>
                                <td>{r3.cvlOralProphylaxis}</td>
                                <td>{r3.cvlDentalSealant}</td>
                                <td>{r3.cvlFluorideApplication}</td>
                                <td>{r3.cvlExtraction}</td>
                                <td>{r3.cvlRestoration}</td>
                                <td>{r3.cvlProsthodontics}</td>
                                <td>{r3.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r3.rtrConsultation}</td>
                                <td>{r3.rtrOralProphylaxis}</td>
                                <td>{r3.rtrDentalSealant}</td>
                                <td>{r3.rtrFluorideApplication}</td>
                                <td>{r3.rtrExtraction}</td>
                                <td>{r3.rtrRestoration}</td>
                                <td>{r3.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r3.rtrOtherProcedures}</td>
                            </tr>
                            <tr className='reg4a'>
                                <td>R4A</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4a.unifConsultation}</td>
                                <td>{r4a.unifOralProphylaxis}</td>
                                <td>{r4a.unifDentalSealant}</td>
                                <td>{r4a.unifFluorideApplication}</td>
                                <td>{r4a.unifExtraction}</td>
                                <td>{r4a.unifRestoration}</td>
                                <td>{r4a.unifProsthodontics}</td>
                                <td>{r4a.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r4a.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r4a.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r4a.nonunifConsultation}</td>
                                <td>{r4a.nonunifOralProphylaxis}</td>
                                <td>{r4a.nonunifDentalSealant}</td>
                                <td>{r4a.nonunifFluorideApplication}</td>
                                <td>{r4a.nonunifExtraction}</td>
                                <td>{r4a.nonunifRestoration}</td>
                                <td>{r4a.nonunifProsthodontics}</td>
                                <td>{r4a.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r4a.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4a.dpdConsultation}</td>
                                <td>{r4a.dpdOralProphylaxis}</td>
                                <td>{r4a.dpdDentalSealant}</td>
                                <td>{r4a.dpdFluorideApplication}</td>
                                <td>{r4a.dpdExtraction}</td>
                                <td>{r4a.dpdRestoration}</td>
                                <td>{r4a.nonunifProsthodontics}</td>
                                <td>{r4a.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4a.cvlConsultation}</td>
                                <td>{r4a.cvlOralProphylaxis}</td>
                                <td>{r4a.cvlDentalSealant}</td>
                                <td>{r4a.cvlFluorideApplication}</td>
                                <td>{r4a.cvlExtraction}</td>
                                <td>{r4a.cvlRestoration}</td>
                                <td>{r4a.cvlProsthodontics}</td>
                                <td>{r4a.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4a.rtrConsultation}</td>
                                <td>{r4a.rtrOralProphylaxis}</td>
                                <td>{r4a.rtrDentalSealant}</td>
                                <td>{r4a.rtrFluorideApplication}</td>
                                <td>{r4a.rtrExtraction}</td>
                                <td>{r4a.rtrRestoration}</td>
                                <td>{r4a.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r4a.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg4b'>
                                <td>R4B</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4b.unifConsultation}</td>
                                <td>{r4b.unifOralProphylaxis}</td>
                                <td>{r4b.unifDentalSealant}</td>
                                <td>{r4b.unifFluorideApplication}</td>
                                <td>{r4b.unifExtraction}</td>
                                <td>{r4b.unifRestoration}</td>
                                <td>{r4b.unifProsthodontics}</td>
                                <td>{r4b.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r4b.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r4b.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r4b.nonunifConsultation}</td>
                                <td>{r4b.nonunifOralProphylaxis}</td>
                                <td>{r4b.nonunifDentalSealant}</td>
                                <td>{r4b.nonunifFluorideApplication}</td>
                                <td>{r4b.nonunifExtraction}</td>
                                <td>{r4b.nonunifRestoration}</td>
                                <td>{r4b.nonunifProsthodontics}</td>
                                <td>{r4b.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r4b.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4b.dpdConsultation}</td>
                                <td>{r4b.dpdOralProphylaxis}</td>
                                <td>{r4b.dpdDentalSealant}</td>
                                <td>{r4b.dpdFluorideApplication}</td>
                                <td>{r4b.dpdExtraction}</td>
                                <td>{r4b.dpdRestoration}</td>
                                <td>{r4b.nonunifProsthodontics}</td>
                                <td>{r4b.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4b.cvlConsultation}</td>
                                <td>{r4b.cvlOralProphylaxis}</td>
                                <td>{r4b.cvlDentalSealant}</td>
                                <td>{r4b.cvlFluorideApplication}</td>
                                <td>{r4b.cvlExtraction}</td>
                                <td>{r4b.cvlRestoration}</td>
                                <td>{r4b.cvlProsthodontics}</td>
                                <td>{r4b.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r4b.rtrConsultation}</td>
                                <td>{r4b.rtrOralProphylaxis}</td>
                                <td>{r4b.rtrDentalSealant}</td>
                                <td>{r4b.rtrFluorideApplication}</td>
                                <td>{r4b.rtrExtraction}</td>
                                <td>{r4b.rtrRestoration}</td>
                                <td>{r4b.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r4b.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg5'>
                                <td>R5</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r5.unifConsultation}</td>
                                <td>{r5.unifOralProphylaxis}</td>
                                <td>{r5.unifDentalSealant}</td>
                                <td>{r5.unifFluorideApplication}</td>
                                <td>{r5.unifExtraction}</td>
                                <td>{r5.unifRestoration}</td>
                                <td>{r5.unifProsthodontics}</td>
                                <td>{r5.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r5.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r5.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r5.nonunifConsultation}</td>
                                <td>{r5.nonunifOralProphylaxis}</td>
                                <td>{r5.nonunifDentalSealant}</td>
                                <td>{r5.nonunifFluorideApplication}</td>
                                <td>{r5.nonunifExtraction}</td>
                                <td>{r5.nonunifRestoration}</td>
                                <td>{r5.nonunifProsthodontics}</td>
                                <td>{r5.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r5.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r5.dpdConsultation}</td>
                                <td>{r5.dpdOralProphylaxis}</td>
                                <td>{r5.dpdDentalSealant}</td>
                                <td>{r5.dpdFluorideApplication}</td>
                                <td>{r5.dpdExtraction}</td>
                                <td>{r5.dpdRestoration}</td>
                                <td>{r5.nonunifProsthodontics}</td>
                                <td>{r5.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r5.cvlConsultation}</td>
                                <td>{r5.cvlOralProphylaxis}</td>
                                <td>{r5.cvlDentalSealant}</td>
                                <td>{r5.cvlFluorideApplication}</td>
                                <td>{r5.cvlExtraction}</td>
                                <td>{r5.cvlRestoration}</td>
                                <td>{r5.cvlProsthodontics}</td>
                                <td>{r5.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r5.rtrConsultation}</td>
                                <td>{r5.rtrOralProphylaxis}</td>
                                <td>{r5.rtrDentalSealant}</td>
                                <td>{r5.rtrFluorideApplication}</td>
                                <td>{r5.rtrExtraction}</td>
                                <td>{r5.rtrRestoration}</td>
                                <td>{r5.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r5.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg6'>
                                <td>R6</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r6.unifConsultation}</td>
                                <td>{r6.unifOralProphylaxis}</td>
                                <td>{r6.unifDentalSealant}</td>
                                <td>{r6.unifFluorideApplication}</td>
                                <td>{r6.unifExtraction}</td>
                                <td>{r6.unifRestoration}</td>
                                <td>{r6.unifProsthodontics}</td>
                                <td>{r6.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r6.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r6.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r6.nonunifConsultation}</td>
                                <td>{r6.nonunifOralProphylaxis}</td>
                                <td>{r6.nonunifDentalSealant}</td>
                                <td>{r6.nonunifFluorideApplication}</td>
                                <td>{r6.nonunifExtraction}</td>
                                <td>{r6.nonunifRestoration}</td>
                                <td>{r6.nonunifProsthodontics}</td>
                                <td>{r6.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r6.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r6.dpdConsultation}</td>
                                <td>{r6.dpdOralProphylaxis}</td>
                                <td>{r6.dpdDentalSealant}</td>
                                <td>{r6.dpdFluorideApplication}</td>
                                <td>{r6.dpdExtraction}</td>
                                <td>{r6.dpdRestoration}</td>
                                <td>{r6.nonunifProsthodontics}</td>
                                <td>{r6.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r6.cvlConsultation}</td>
                                <td>{r6.cvlOralProphylaxis}</td>
                                <td>{r6.cvlDentalSealant}</td>
                                <td>{r6.cvlFluorideApplication}</td>
                                <td>{r6.cvlExtraction}</td>
                                <td>{r6.cvlRestoration}</td>
                                <td>{r6.cvlProsthodontics}</td>
                                <td>{r6.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r6.rtrConsultation}</td>
                                <td>{r6.rtrOralProphylaxis}</td>
                                <td>{r6.rtrDentalSealant}</td>
                                <td>{r6.rtrFluorideApplication}</td>
                                <td>{r6.rtrExtraction}</td>
                                <td>{r6.rtrRestoration}</td>
                                <td>{r6.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r6.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg7'>
                                <td>R7</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r7.unifConsultation}</td>
                                <td>{r7.unifOralProphylaxis}</td>
                                <td>{r7.unifDentalSealant}</td>
                                <td>{r7.unifFluorideApplication}</td>
                                <td>{r7.unifExtraction}</td>
                                <td>{r7.unifRestoration}</td>
                                <td>{r7.unifProsthodontics}</td>
                                <td>{r7.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r7.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r7.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r7.nonunifConsultation}</td>
                                <td>{r7.nonunifOralProphylaxis}</td>
                                <td>{r7.nonunifDentalSealant}</td>
                                <td>{r7.nonunifFluorideApplication}</td>
                                <td>{r7.nonunifExtraction}</td>
                                <td>{r7.nonunifRestoration}</td>
                                <td>{r7.nonunifProsthodontics}</td>
                                <td>{r7.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r7.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r7.dpdConsultation}</td>
                                <td>{r7.dpdOralProphylaxis}</td>
                                <td>{r7.dpdDentalSealant}</td>
                                <td>{r7.dpdFluorideApplication}</td>
                                <td>{r7.dpdExtraction}</td>
                                <td>{r7.dpdRestoration}</td>
                                <td>{r7.nonunifProsthodontics}</td>
                                <td>{r7.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r7.cvlConsultation}</td>
                                <td>{r7.cvlOralProphylaxis}</td>
                                <td>{r7.cvlDentalSealant}</td>
                                <td>{r7.cvlFluorideApplication}</td>
                                <td>{r7.cvlExtraction}</td>
                                <td>{r7.cvlRestoration}</td>
                                <td>{r7.cvlProsthodontics}</td>
                                <td>{r7.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r7.rtrConsultation}</td>
                                <td>{r7.rtrOralProphylaxis}</td>
                                <td>{r7.rtrDentalSealant}</td>
                                <td>{r7.rtrFluorideApplication}</td>
                                <td>{r7.rtrExtraction}</td>
                                <td>{r7.rtrRestoration}</td>
                                <td>{r7.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r7.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg8'>
                                <td>R8</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r8.unifConsultation}</td>
                                <td>{r8.unifOralProphylaxis}</td>
                                <td>{r8.unifDentalSealant}</td>
                                <td>{r8.unifFluorideApplication}</td>
                                <td>{r8.unifExtraction}</td>
                                <td>{r8.unifRestoration}</td>
                                <td>{r8.unifProsthodontics}</td>
                                <td>{r8.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r8.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r8.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r8.nonunifConsultation}</td>
                                <td>{r8.nonunifOralProphylaxis}</td>
                                <td>{r8.nonunifDentalSealant}</td>
                                <td>{r8.nonunifFluorideApplication}</td>
                                <td>{r8.nonunifExtraction}</td>
                                <td>{r8.nonunifRestoration}</td>
                                <td>{r8.nonunifProsthodontics}</td>
                                <td>{r8.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r8.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r8.dpdConsultation}</td>
                                <td>{r8.dpdOralProphylaxis}</td>
                                <td>{r8.dpdDentalSealant}</td>
                                <td>{r8.dpdFluorideApplication}</td>
                                <td>{r8.dpdExtraction}</td>
                                <td>{r8.dpdRestoration}</td>
                                <td>{r8.nonunifProsthodontics}</td>
                                <td>{r8.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r8.cvlConsultation}</td>
                                <td>{r8.cvlOralProphylaxis}</td>
                                <td>{r8.cvlDentalSealant}</td>
                                <td>{r8.cvlFluorideApplication}</td>
                                <td>{r8.cvlExtraction}</td>
                                <td>{r8.cvlRestoration}</td>
                                <td>{r8.cvlProsthodontics}</td>
                                <td>{r8.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r8.rtrConsultation}</td>
                                <td>{r8.rtrOralProphylaxis}</td>
                                <td>{r8.rtrDentalSealant}</td>
                                <td>{r8.rtrFluorideApplication}</td>
                                <td>{r8.rtrExtraction}</td>
                                <td>{r8.rtrRestoration}</td>
                                <td>{r8.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r8.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg9'>
                                <td>R9</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r9.unifConsultation}</td>
                                <td>{r9.unifOralProphylaxis}</td>
                                <td>{r9.unifDentalSealant}</td>
                                <td>{r9.unifFluorideApplication}</td>
                                <td>{r9.unifExtraction}</td>
                                <td>{r9.unifRestoration}</td>
                                <td>{r9.unifProsthodontics}</td>
                                <td>{r9.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r9.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r9.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r9.nonunifConsultation}</td>
                                <td>{r9.nonunifOralProphylaxis}</td>
                                <td>{r9.nonunifDentalSealant}</td>
                                <td>{r9.nonunifFluorideApplication}</td>
                                <td>{r9.nonunifExtraction}</td>
                                <td>{r9.nonunifRestoration}</td>
                                <td>{r9.nonunifProsthodontics}</td>
                                <td>{r9.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r9.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r9.dpdConsultation}</td>
                                <td>{r9.dpdOralProphylaxis}</td>
                                <td>{r9.dpdDentalSealant}</td>
                                <td>{r9.dpdFluorideApplication}</td>
                                <td>{r9.dpdExtraction}</td>
                                <td>{r9.dpdRestoration}</td>
                                <td>{r9.nonunifProsthodontics}</td>
                                <td>{r9.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r9.cvlConsultation}</td>
                                <td>{r9.cvlOralProphylaxis}</td>
                                <td>{r9.cvlDentalSealant}</td>
                                <td>{r9.cvlFluorideApplication}</td>
                                <td>{r9.cvlExtraction}</td>
                                <td>{r9.cvlRestoration}</td>
                                <td>{r9.cvlProsthodontics}</td>
                                <td>{r9.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r9.rtrConsultation}</td>
                                <td>{r9.rtrOralProphylaxis}</td>
                                <td>{r9.rtrDentalSealant}</td>
                                <td>{r9.rtrFluorideApplication}</td>
                                <td>{r9.rtrExtraction}</td>
                                <td>{r9.rtrRestoration}</td>
                                <td>{r9.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r9.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg10'>
                                <td>R10</td>
                                {/* uniformed */}
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r10.unifConsultation}</td>
                                <td>{r10.unifOralProphylaxis}</td>
                                <td>{r10.unifDentalSealant}</td>
                                <td>{r10.unifFluorideApplication}</td>
                                <td>{r10.unifExtraction}</td>
                                <td>{r10.unifRestoration}</td>
                                <td>{r10.unifProsthodontics}</td>
                                <td>{r10.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r10.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r10.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r10.nonunifConsultation}</td>
                                <td>{r10.nonunifOralProphylaxis}</td>
                                <td>{r10.nonunifDentalSealant}</td>
                                <td>{r10.nonunifFluorideApplication}</td>
                                <td>{r10.nonunifExtraction}</td>
                                <td>{r10.nonunifRestoration}</td>
                                <td>{r10.nonunifProsthodontics}</td>
                                <td>{r10.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r10.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r10.dpdConsultation}</td>
                                <td>{r10.dpdOralProphylaxis}</td>
                                <td>{r10.dpdDentalSealant}</td>
                                <td>{r10.dpdFluorideApplication}</td>
                                <td>{r10.dpdExtraction}</td>
                                <td>{r10.dpdRestoration}</td>
                                <td>{r10.nonunifProsthodontics}</td>
                                <td>{r10.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r10.cvlConsultation}</td>
                                <td>{r10.cvlOralProphylaxis}</td>
                                <td>{r10.cvlDentalSealant}</td>
                                <td>{r10.cvlFluorideApplication}</td>
                                <td>{r10.cvlExtraction}</td>
                                <td>{r10.cvlRestoration}</td>
                                <td>{r10.cvlProsthodontics}</td>
                                <td>{r10.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r10.rtrConsultation}</td>
                                <td>{r10.rtrOralProphylaxis}</td>
                                <td>{r10.rtrDentalSealant}</td>
                                <td>{r10.rtrFluorideApplication}</td>
                                <td>{r10.rtrExtraction}</td>
                                <td>{r10.rtrRestoration}</td>
                                <td>{r10.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r10.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg11'>
                                <td>R11</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r11.unifConsultation}</td>
                                <td>{r11.unifOralProphylaxis}</td>
                                <td>{r11.unifDentalSealant}</td>
                                <td>{r11.unifFluorideApplication}</td>
                                <td>{r11.unifExtraction}</td>
                                <td>{r11.unifRestoration}</td>
                                <td>{r11.unifProsthodontics}</td>
                                <td>{r11.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r11.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r11.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r11.nonunifConsultation}</td>
                                <td>{r11.nonunifOralProphylaxis}</td>
                                <td>{r11.nonunifDentalSealant}</td>
                                <td>{r11.nonunifFluorideApplication}</td>
                                <td>{r11.nonunifExtraction}</td>
                                <td>{r11.nonunifRestoration}</td>
                                <td>{r11.nonunifProsthodontics}</td>
                                <td>{r11.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r11.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r11.dpdConsultation}</td>
                                <td>{r11.dpdOralProphylaxis}</td>
                                <td>{r11.dpdDentalSealant}</td>
                                <td>{r11.dpdFluorideApplication}</td>
                                <td>{r11.dpdExtraction}</td>
                                <td>{r11.dpdRestoration}</td>
                                <td>{r11.nonunifProsthodontics}</td>
                                <td>{r11.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r11.cvlConsultation}</td>
                                <td>{r11.cvlOralProphylaxis}</td>
                                <td>{r11.cvlDentalSealant}</td>
                                <td>{r11.cvlFluorideApplication}</td>
                                <td>{r11.cvlExtraction}</td>
                                <td>{r11.cvlRestoration}</td>
                                <td>{r11.cvlProsthodontics}</td>
                                <td>{r11.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r11.rtrConsultation}</td>
                                <td>{r11.rtrOralProphylaxis}</td>
                                <td>{r11.rtrDentalSealant}</td>
                                <td>{r11.rtrFluorideApplication}</td>
                                <td>{r11.rtrExtraction}</td>
                                <td>{r11.rtrRestoration}</td>
                                <td>{r11.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r11.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='reg12'>
                                <td>R12</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{r12.unifConsultation}</td>
                                <td>{r12.unifOralProphylaxis}</td>
                                <td>{r12.unifDentalSealant}</td>
                                <td>{r12.unifFluorideApplication}</td>
                                <td>{r12.unifExtraction}</td>
                                <td>{r12.unifRestoration}</td>
                                <td>{r12.unifProsthodontics}</td>
                                <td>{r12.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r12.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r12.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{r12.nonunifConsultation}</td>
                                <td>{r12.nonunifOralProphylaxis}</td>
                                <td>{r12.nonunifDentalSealant}</td>
                                <td>{r12.nonunifFluorideApplication}</td>
                                <td>{r12.nonunifExtraction}</td>
                                <td>{r12.nonunifRestoration}</td>
                                <td>{r12.nonunifProsthodontics}</td>
                                <td>{r12.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{r12.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{r12.dpdConsultation}</td>
                                <td>{r12.dpdOralProphylaxis}</td>
                                <td>{r12.dpdDentalSealant}</td>
                                <td>{r12.dpdFluorideApplication}</td>
                                <td>{r12.dpdExtraction}</td>
                                <td>{r12.dpdRestoration}</td>
                                <td>{r12.nonunifProsthodontics}</td>
                                <td>{r12.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{r12.cvlConsultation}</td>
                                <td>{r12.cvlOralProphylaxis}</td>
                                <td>{r12.cvlDentalSealant}</td>
                                <td>{r12.cvlFluorideApplication}</td>
                                <td>{r12.cvlExtraction}</td>
                                <td>{r12.cvlRestoration}</td>
                                <td>{r12.cvlProsthodontics}</td>
                                <td>{r12.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{r12.rtrConsultation}</td>
                                <td>{r12.rtrOralProphylaxis}</td>
                                <td>{r12.rtrDentalSealant}</td>
                                <td>{r12.rtrFluorideApplication}</td>
                                <td>{r12.rtrExtraction}</td>
                                <td>{r12.rtrRestoration}</td>
                                <td>{r12.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{r12.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='car'>
                                <td>CAR</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{car.unifConsultation}</td>
                                <td>{car.unifOralProphylaxis}</td>
                                <td>{car.unifDentalSealant}</td>
                                <td>{car.unifFluorideApplication}</td>
                                <td>{car.unifExtraction}</td>
                                <td>{car.unifRestoration}</td>
                                <td>{car.unifProsthodontics}</td>
                                <td>{car.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{car.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{car.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{car.nonunifConsultation}</td>
                                <td>{car.nonunifOralProphylaxis}</td>
                                <td>{car.nonunifDentalSealant}</td>
                                <td>{car.nonunifFluorideApplication}</td>
                                <td>{car.nonunifExtraction}</td>
                                <td>{car.nonunifRestoration}</td>
                                <td>{car.nonunifProsthodontics}</td>
                                <td>{car.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{car.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{car.dpdConsultation}</td>
                                <td>{car.dpdOralProphylaxis}</td>
                                <td>{car.dpdDentalSealant}</td>
                                <td>{car.dpdFluorideApplication}</td>
                                <td>{car.dpdExtraction}</td>
                                <td>{car.dpdRestoration}</td>
                                <td>{car.nonunifProsthodontics}</td>
                                <td>{car.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{car.cvlConsultation}</td>
                                <td>{car.cvlOralProphylaxis}</td>
                                <td>{car.cvlDentalSealant}</td>
                                <td>{car.cvlFluorideApplication}</td>
                                <td>{car.cvlExtraction}</td>
                                <td>{car.cvlRestoration}</td>
                                <td>{car.cvlProsthodontics}</td>
                                <td>{car.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{car.rtrConsultation}</td>
                                <td>{car.rtrOralProphylaxis}</td>
                                <td>{car.rtrDentalSealant}</td>
                                <td>{car.rtrFluorideApplication}</td>
                                <td>{car.rtrExtraction}</td>
                                <td>{car.rtrRestoration}</td>
                                <td>{car.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{car.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='caraga'>
                                <td>CARAGA</td>
                                {/* uniformed */}
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{caraga.unifConsultation}</td>
                                <td>{caraga.unifOralProphylaxis}</td>
                                <td>{caraga.unifDentalSealant}</td>
                                <td>{caraga.unifFluorideApplication}</td>
                                <td>{caraga.unifExtraction}</td>
                                <td>{caraga.unifRestoration}</td>
                                <td>{caraga.unifProsthodontics}</td>
                                <td>{caraga.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{caraga.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{caraga.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{caraga.nonunifConsultation}</td>
                                <td>{caraga.nonunifOralProphylaxis}</td>
                                <td>{caraga.nonunifDentalSealant}</td>
                                <td>{caraga.nonunifFluorideApplication}</td>
                                <td>{caraga.nonunifExtraction}</td>
                                <td>{caraga.nonunifRestoration}</td>
                                <td>{caraga.nonunifProsthodontics}</td>
                                <td>{caraga.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{caraga.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{caraga.dpdConsultation}</td>
                                <td>{caraga.dpdOralProphylaxis}</td>
                                <td>{caraga.dpdDentalSealant}</td>
                                <td>{caraga.dpdFluorideApplication}</td>
                                <td>{caraga.dpdExtraction}</td>
                                <td>{caraga.dpdRestoration}</td>
                                <td>{caraga.nonunifProsthodontics}</td>
                                <td>{caraga.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{caraga.cvlConsultation}</td>
                                <td>{caraga.cvlOralProphylaxis}</td>
                                <td>{caraga.cvlDentalSealant}</td>
                                <td>{caraga.cvlFluorideApplication}</td>
                                <td>{caraga.cvlExtraction}</td>
                                <td>{caraga.cvlRestoration}</td>
                                <td>{caraga.cvlProsthodontics}</td>
                                <td>{caraga.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{caraga.rtrConsultation}</td>
                                <td>{caraga.rtrOralProphylaxis}</td>
                                <td>{caraga.rtrDentalSealant}</td>
                                <td>{caraga.rtrFluorideApplication}</td>
                                <td>{caraga.rtrExtraction}</td>
                                <td>{caraga.rtrRestoration}</td>
                                <td>{caraga.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{caraga.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='barmm'>
                                <td>BARMM</td>
                                {/* uniformed */}
                                <td style={{ borderLeft: "2px solid black" }}>{barmm.unifConsultation}</td>
                                <td>{barmm.unifOralProphylaxis}</td>
                                <td>{barmm.unifDentalSealant}</td>
                                <td>{barmm.unifFluorideApplication}</td>
                                <td>{barmm.unifExtraction}</td>
                                <td>{barmm.unifRestoration}</td>
                                <td>{barmm.unifProsthodontics}</td>
                                <td>{barmm.unifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{barmm.upTraining}</td>
                                <td style={{ borderRight: "2px solid black" }}>{barmm.upPromotion}</td>
                                {/* non-uniformed */}
                                <td>{barmm.nonunifConsultation}</td>
                                <td>{barmm.nonunifOralProphylaxis}</td>
                                <td>{barmm.nonunifDentalSealant}</td>
                                <td>{barmm.nonunifFluorideApplication}</td>
                                <td>{barmm.nonunifExtraction}</td>
                                <td>{barmm.nonunifRestoration}</td>
                                <td>{barmm.nonunifProsthodontics}</td>
                                <td>{barmm.nonunifOtherProcedures}</td>
                                <td style={{ borderLeft: "2px solid black" }}>{barmm.nupPromotion}</td>
                                {/* dependents */}
                                <td style={{ borderLeft: "2px solid black" }}>{barmm.dpdConsultation}</td>
                                <td>{barmm.dpdOralProphylaxis}</td>
                                <td>{barmm.dpdDentalSealant}</td>
                                <td>{barmm.dpdFluorideApplication}</td>
                                <td>{barmm.dpdExtraction}</td>
                                <td>{barmm.dpdRestoration}</td>
                                <td>{barmm.nonunifProsthodontics}</td>
                                <td>{barmm.dpdOtherProcedures}</td>
                                {/* civilians */}
                                <td style={{ borderLeft: "2px solid black" }}>{barmm.cvlConsultation}</td>
                                <td>{barmm.cvlOralProphylaxis}</td>
                                <td>{barmm.cvlDentalSealant}</td>
                                <td>{barmm.cvlFluorideApplication}</td>
                                <td>{barmm.cvlExtraction}</td>
                                <td>{barmm.cvlRestoration}</td>
                                <td>{barmm.cvlProsthodontics}</td>
                                <td>{barmm.cvlOtherProcedures}</td>
                                {/* retirees */}
                                <td style={{ borderLeft: "2px solid black" }}>{barmm.rtrConsultation}</td>
                                <td>{barmm.rtrOralProphylaxis}</td>
                                <td>{barmm.rtrDentalSealant}</td>
                                <td>{barmm.rtrFluorideApplication}</td>
                                <td>{barmm.rtrExtraction}</td>
                                <td>{barmm.rtrRestoration}</td>
                                <td>{barmm.rtrProsthodontics}</td>
                                <td style={{ borderRight: "2px solid black" }}>{barmm.rtrOtherProcedures}</td>
                            </tr>

                            <tr className='summary'>
                                <td>Summary</td>
                                <td style={{ borderLeft: "2px solid black", borderRight: "2px solid black" }} colSpan={43}>{nationalTotal}</td>
                            </tr>
                        </tbody>


                    </table>

                    <div className='middlelast' name='middlelast' style={{ paddingBottom: "5%", paddingTop: "2%" }}>
                        <div className="report-field" style={{ paddingRight: "20%" }}>
                            <label htmlFor="dental-staff">Prepared by: </label>
                            <div className="signature-placeholder" style={{ cursor: "pointer" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={imgInputRef}
                                    onChange={handleStaffChange}
                                />
                                <div className="signature-rect" onClick={handlePlaceholderClick}>
                                    {staff ? (
                                        <img src={staff} alt="Profile" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    ) : (
                                        <span>Upload E-Signature</span>
                                    )}
                                </div>
                            </div>
                            <input type='text' name='dental-staff' id='dental-staff' style={{ textAlign: 'center' }} placeholder='Dental Staff Name' />
                            <label htmlFor="dental-staff">Dental Staff</label>
                        </div>
                        <div className="report-field" style={{ paddingRight: "20%" }} >
                            <label htmlFor="dental">Verified by: </label>
                            <div className="signature-placeholder" style={{ cursor: "pointer" }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={imgInputRef1}
                                onChange={handleChiefChange}
                            />
                            <div className="signature-rect" onClick={handlePlaceholder1Click}>
                                {chief ? (
                                    <img src={chief} alt="dental" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                ) : (
                                    <span>Upload E-Signature</span>
                                )}
                            </div>
                            </div>
                            <input type='text' name='dental' id='dental' style={{ textAlign: 'center' }} placeholder='Chief Dental Name' />
                            <label htmlFor="dental">C, Dental</label>
                        </div>
                        <div className="report-field" >
                            
                            <label htmlFor="dental-service">Noted by: </label>
                            <div className="signature-placeholder" style={{ cursor: "pointer" }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={imgInputRef2}
                                name="me"
                                onChange={handleHealthChange}
                            />
                            <div className="signature-rect" onClick={handlePlaceholder2Click}>
                                {health ? (
                                    <img src={health} alt="health" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                ) : (
                                    <span>Upload E-Signature</span>
                                )}
                            </div>
                            </div>
                            <input type='text' name='dental-service' id='dental-service' style={{ textAlign: 'center' }} placeholder='Chief Health Service Name' />
                            <label htmlFor="dental-service">C, Health Service</label>
                        </div>
                    </div>
                </div>
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
                Download PDF
            </button>
        </div>
    )
}

export default ReportTable