import { BrowserRouter, Routes, Route } from "react-router-dom";
import DentalHealthRecord from "./pages/DentalHealthRecord";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import Referral from "./pages/Referral";
import Consent from "./pages/Consent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}></Route>
          <Route path="/dentalhealthrecord" element={<DentalHealthRecord/>}></Route>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/verification" element={<Verification/>}></Route>
          <Route path="/profile/:userType/:userId" element={<Profile/>}></Route>
          <Route path="/referral" element={<Referral/>}></Route>
          <Route path="/consent" element={<Consent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
