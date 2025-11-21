import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./features/auth/pages/SignUpPage";
import OtpPage from "./features/auth/pages/OtpPage";
import LoginPage from "./features/auth/pages/LoginPage";







function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/login" element={<LoginPage />} />
       

          
    

      </Routes>
    </BrowserRouter>
  );
}

export default App;