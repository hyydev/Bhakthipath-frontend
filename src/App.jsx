import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";

import SignUpPage from "./features/auth/pages/SignUpPage";
import OtpPage from "./features/auth/pages/OtpPage";
import LoginPage from "./features/auth/pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import HomePage from "./features/home/pages/HomePage";








function App() {
  return (
    
    <BrowserRouter>
      <Routes>

        {/* PublicPages --- Auth pages */}
        <Route path="/signup" element={<PageWrapper><SignUpPage /></PageWrapper>} />
        <Route path="/otp" element={<PageWrapper><OtpPage/></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage/></PageWrapper>} />

        {/* Layout pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
       

          
    

      </Routes>
    </BrowserRouter>
  );
}

export default App;