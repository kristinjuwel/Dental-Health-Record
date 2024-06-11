import React from 'react'

const Admin = () => {
  return (
    <div className="container">
      <div className="image-container"></div>
      <div className="forms-container">
        <div className="signin-signup" style={{textAlign: "center", display: "block"}}>
            <h1 style={{textAlign: "center"}}>Admin</h1>
            <button className='regional' style={{backgroundColor: "#0f9fb7", color: "#fff", marginLeft: "10px"}}>Make Regional Report</button>
            <button className='national' style={{backgroundColor: "gray", color: "#fff", marginLeft: "10px"}}>Generate National Report</button>
        </div>
      </div>
    </div>
  )
}

export default Admin
