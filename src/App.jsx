import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";

import SignUpPage from "./features/auth/pages/SignUpPage";
import OtpPage from "./features/auth/pages/OtpPage";
import LoginPage from "./features/auth/pages/LoginPage";







function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<PageWrapper><SignUpPage /></PageWrapper>} />
        <Route path="/otp" element={<PageWrapper><OtpPage/></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage/></PageWrapper>} />
       

          
    

      </Routes>
    </BrowserRouter>
  );
}

export default App;