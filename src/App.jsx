import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./features/auth/pages/SignUpPage";








function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/otp" element={<OTPPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
          
    

      </Routes>
    </BrowserRouter>
  );
}

export default App;