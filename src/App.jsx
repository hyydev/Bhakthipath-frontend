import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import PageWrapper from "./components/PageWrapper";
import { PrivateRoute } from "./components/PrivateRoute";

import SignUpPage from "./features/auth/pages/SignUpPage";
import OtpPage from "./features/auth/pages/OtpPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ProfilePage from "./features/auth/pages/ProfilePage";

import MainLayout from "./layout/MainLayout";
import BackgroundWrapper from "./layout/BackgroundWrapper";

import LandingPage from "./features/home/pages/LandingPage";
import ExamplePage from "./features/home/pages/ExamplePage";

import EcommerceHomePage from "./features/Ecommerce/pages/EcommerceHomePage";
import CategoryPage from "./features/Ecommerce/pages/CategoryPage";
import ShoppingCart from "./features/EcommerceCart/pages/ShoppingCart";
import CheckoutPage from "./features/EcommerceCart/pages/CheckoutPage";
import OrderSuccessPage from "./features/EcommerceCart/pages/OrderSuccessPage";


import Providers from "./app/Providers";

function App() {
  return (
    <Providers>
      <ThemeProvider>
        <BackgroundWrapper>
          <BrowserRouter>
            <Routes>

              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <LandingPage />
                  </PageWrapper>
                }
              />

              <Route
                path="/signup"
                element={
                  <PageWrapper>
                    <SignUpPage />
                  </PageWrapper>
                }
              />

              <Route
                path="/otp"
                element={
                  <PageWrapper>
                    <OtpPage />
                  </PageWrapper>
                }
              />

              <Route
                path="/login"
                element={
                  <PageWrapper>
                    <LoginPage />
                  </PageWrapper>
                }
              />

              <Route
                path="/example"
                element={<ExamplePage />}
              />

              {/* Main Layout */}
              <Route element={<MainLayout />}>

                {/* Public Route */}
                <Route
                  path="/ecommerce"
                  element={
                    <PageWrapper>
                      <EcommerceHomePage />
                    </PageWrapper>
                  }
                />

                <Route
                  path="/category/:slug"
                  element={
                    <PageWrapper>
                      <CategoryPage />
                    </PageWrapper>
                  }
                />


                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route
                    path="/profile"
                    element={
                      <PageWrapper>
                        <ProfilePage />
                      </PageWrapper>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <PageWrapper>
                        <ShoppingCart />
                      </PageWrapper>
                    }
                  />

                  <Route
                    path="/checkout"
                    element={
                      <PageWrapper>
                        <CheckoutPage />
                      </PageWrapper>
                    }
                  />

                  <Route
                    path="/order-success"
                    element={
                      <PageWrapper>
                        <OrderSuccessPage />
                      </PageWrapper>
                    }
                  />
                </Route>

              </Route>

            </Routes>
          </BrowserRouter>
        </BackgroundWrapper>
      </ThemeProvider>
    </Providers>
  );
}

export default App;