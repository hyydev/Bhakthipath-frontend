import MainLayout from "./layout/MainLayout";
import BackgroundWrapper from "./layout/BackgroundWrapper";
import Providers from "./app/Providers";
import ScrollToTop from "./components/ScrollToTop";
import PageWrapper from "./components/PageWrapper";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SmoothScrollProvider } from "./app/SmoothScrollProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { PrivateRoute } from "./components/PrivateRoute";
import * as Sentry from '@sentry/react'

// Auth pages — user sirf ek baar dekhta hai
const SignUpPage = lazy(() => import("./features/auth/pages/SignUpPage"));
const OtpPage = lazy(() => import("./features/auth/pages/OtpPage"));
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const ProfilePage = lazy(() => import("./features/auth/pages/ProfilePage"));

// Home
const LandingPage = lazy(() => import("./features/home/pages/LandingPage"));
const ExamplePage = lazy(() => import("./features/home/pages/ExamplePage"));

// Ecommerce — heavy pages
const EcommerceHomePage = lazy(() =>
  import("./features/Ecommerce/pages/EcommerceHomePage")
);
const CategoryPage = lazy(() =>
  import("./features/Ecommerce/pages/CategoryPage")
);
const ProductDetailPage = lazy(() =>
  import("./features/Ecommerce/pages/ProductDetailPage")
);

// Cart + Checkout logged-in users
const ShoppingCart = lazy(() =>
  import("./features/EcommerceCart/pages/ShoppingCart")
);
const CheckoutPage = lazy(() =>
  import("./features/EcommerceCheckout/pages/CheckoutPage")
);
const OrderSuccessPage = lazy(() =>
  import("./features/EcommerceCheckout/pages/OrderSuccessPage")
);

const PageSkeleton = () => (
  <div className="w-full min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-saffron-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">Our team has been notified.</p>
            <button
              onClick={resetError}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    >

    
    <Providers>
      <ThemeProvider>
        <SmoothScrollProvider>
          <BackgroundWrapper>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageSkeleton />}>
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

                  <Route path="/example" element={<ExamplePage />} />

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

                    <Route
                      path="/product/:id"
                      element={
                        <PageWrapper>
                          <ProductDetailPage />
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
              </Suspense>
            </BrowserRouter>
          </BackgroundWrapper>
        </SmoothScrollProvider>
      </ThemeProvider>
    </Providers>
    </Sentry.ErrorBoundary>
  );
}

export default App;
