import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import PageWrapper from "./components/PageWrapper";

import SignUpPage from "./features/auth/pages/SignUpPage";
import OtpPage from "./features/auth/pages/OtpPage";
import LoginPage from "./features/auth/pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./features/home/pages/LandingPage";
import ExamplePage from "./features/home/pages/ExamplePage";
import EcommerceHomePage from "./features/Ecommerce/pages/EcommerceHomePage";




function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

         
          <Route path="/signup" element={<PageWrapper><SignUpPage /></PageWrapper>} />
          <Route path="/otp" element={<PageWrapper><OtpPage/></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><LoginPage/></PageWrapper>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/ecommerce" element={<EcommerceHomePage />} />

        

            
      

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;