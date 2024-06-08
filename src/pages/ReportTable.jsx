import React from 'react'
import '../styles/Record.css';
import '../styles/Login.css';

const ReportTable = () => {
  return (
    <div className="report-wrapper">
      <div className="report-container">
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

        <div style={{overflowX: "auto"}}>
        <table className='summary-table'>
            <thead>
                <tr>
                    <th colSpan={1} style={{border: "none"}}></th>
                    <th colSpan={11} style={{border: "2px solid black"}}>Uniformed Personnel</th>
                    <th colSpan={10} style={{border: "2px solid black"}}>Non-Uniformed Personnel</th>
                    <th colSpan={9} style={{border: "2px solid black"}}>Dependents</th>
                    <th colSpan={9} style={{border: "2px solid black"}}>Civilian</th>
                    <th colSpan={9} style={{border: "2px solid black"}}>Retirees</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ border: "none", display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>Office</td>
                    <td style={{borderLeft: "2px solid black"}}>Consultation<br /> or Mouth<br /> Examination</td>
                    <td>Oral<br /> Prophylaxis</td>
                    <td>Dental<br /> Sealant</td>
                    <td>Flouride<br /> Application</td>
                    <td>Surgery or Extraction</td>
                    <td>Restoration</td>
                    <td>Prosthodontics</td>
                    <td>Endodontics</td>
                    <td>Other<br/>Surgical<br/>Procedures</td>
                    <td style={{borderLeft: "2px solid black"}}>Trainings</td>
                    <td style={{borderRight: "2px solid black"}}>Promotion</td>
                    {/*non-uniformed  */}
                    <td style={{borderLeft: "2px solid black"}}>Consultation<br /> or Mouth<br /> Examination</td>
                    <td>Oral<br /> Prophylaxis</td>
                    <td>Dental<br /> Sealant</td>
                    <td>Flouride<br /> Application</td>
                    <td>Surgery or<br /> Extraction</td>
                    <td>Restoration</td>
                    <td>Prosthodontics</td>
                    <td>Endodontics</td>
                    <td>Other<br/>Surgical<br/>Procedures</td>
                    <td style={{borderLeft: "2px solid black", borderRight: "2px solid black"}}>Promotion</td>
                    {/*dependents  */}
                    <td style={{borderLeft: "2px solid black"}}>Consultation<br /> or Mouth<br /> Examination</td>
                    <td>Oral<br /> Prophylaxis</td>
                    <td>Dental<br /> Sealant</td>
                    <td>Flouride<br /> Application</td>
                    <td>Surgery or<br /> Extraction</td>
                    <td>Restoration</td>
                    <td>Prosthodontics</td>
                    <td>Endodontics</td>
                    <td style={{borderRight: "2px solid black"}}>Other<br/>Surgical<br/>Procedures</td>
                    {/*civilians  */}
                    <td style={{borderLeft: "2px solid black"}}>Consultation<br /> or Mouth<br /> Examination</td>
                    <td>Oral<br /> Prophylaxis</td>
                    <td>Dental<br /> Sealant</td>
                    <td>Flouride<br /> Application</td>
                    <td>Surgery or<br /> Extraction</td>
                    <td>Restoration</td>
                    <td>Prosthodontics</td>
                    <td>Endodontics</td>
                    <td style={{borderRight: "2px solid black"}}>Other<br/>Surgical<br/>Procedures</td>
                    {/*retirees  */}
                    <td style={{borderLeft: "2px solid black"}}>Consultation<br /> or Mouth<br /> Examination</td>
                    <td>Oral<br /> Prophylaxis</td>
                    <td>Dental<br /> Sealant</td>
                    <td>Flouride<br /> Application</td>
                    <td>Surgery or<br /> Extraction</td>
                    <td>Restoration</td>
                    <td>Prosthodontics</td>
                    <td>Endodontics</td>
                    <td style={{borderRight: "2px solid black"}}>Other<br/>Surgical<br/>Procedures</td>
                </tr>
                <tr className='nationalhq'>
                    <td>NHQ</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='nationalcr'>
                    <td>NCR</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg1'>
                    <td>R1</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg2'>
                    <td>R2</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg3'>
                    <td>R3</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg4a'>
                    <td>R4A</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg4b'>
                    <td>R4B</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg5'>
                    <td>R5</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg6'>
                    <td>R6</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg7'>
                    <td>R7</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg8'>
                    <td>R8</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg9'>
                    <td>R9</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg10'>
                    <td>R10</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg11'>
                    <td>R11</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='reg12'>
                    <td>R12</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='car'>
                    <td>CAR</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='caraga'>
                    <td>CARAGA</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='barmm'>
                    <td>BARMM</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                    {/* non-uniformed */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderLeft: "2px solid black"}}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black"}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{borderRight: "2px solid black"}}></td>
                </tr>

                <tr className='summary'>
                    <td>Summary</td>
                    {/* uniformed */}
                    <td style={{borderLeft: "2px solid black", borderRight: "2px solid black"}} colSpan={11}></td>
                    {/* non-uniformed */}
                    <td style={{borderLeft: "2px solid black", borderRight: "2px solid black"}} colSpan={10}></td>
                    {/* dependents */}
                    <td style={{borderLeft: "2px solid black", borderRight: "2px solid black"}} colSpan={9}></td>
                    {/* civilians */}
                    <td style={{borderLeft: "2px solid black", borderRight: "2px solid black"}} colSpan={9}></td>
                    {/* retirees */}
                    <td style={{borderLeft: "2px solid black", borderRight: "2px solid black"}} colSpan={9}></td>
                </tr>
            </tbody>
        </table>

        <div className='middlelast' name='middlelast' style={{paddingBottom: "5%", paddingTop: "2%"}}>
                <div className="report-field" style={{paddingRight: "20%"}}>
                    <label htmlFor="dental-staff">Prepared by: </label>
                    <input type="file" name="dental-staff" id="dental-staff" />
                    <label htmlFor="dental-staff">Dental Staff</label>
                </div>
                <div className="report-field" style={{paddingRight: "20%"}} >
                    <label htmlFor="dental">Verified by: </label>
                    <input type="file" name="dental" id="dental" />
                    <label htmlFor="dental">C, Dental</label>
                </div>
                <div className="report-field" >
                    <label htmlFor="dental-service">Noted by: </label>
                    <input type="file" name="dental-service" id="dental-service" />
                    <label htmlFor="dental-service">C, Health Service</label>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ReportTable
