import { BrowserRouter, Routes, Route } from "react-router-dom";
import DentalHealthRecord from "./pages/DentalHealthRecord";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import Referral from "./pages/Referral";
import Consent from "./pages/Consent";
import ReportIndiv from "./pages/ReportIndiv";
import ReportTable from "./pages/ReportTable";
import Admin from "./pages/Admin";
import SampleImage from "./pages/SampleImage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}></Route>
          <Route path="/dentalhealthrecord/:type/:dentId" element={<DentalHealthRecord/>}></Route>
          <Route path="/sample/:type/:dentId" element={<SampleImage/>}></Route>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/verification" element={<Verification/>}></Route>
          <Route path="/profile/:userId" element={<Profile/>}></Route>
          <Route path="/referral/:dentId/:examId" element={<Referral/>}></Route>
          <Route path="/consent/:dentId/:examId" element={<Consent/>}></Route>
          <Route path="/regional" element={<ReportIndiv/>}></Route>
          <Route path="/national" element={<ReportTable/>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
