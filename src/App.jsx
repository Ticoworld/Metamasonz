import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingCTA from "./components/FloatingCTA";
import LoadingSpinner from "./components/LoadingSpinner";
import AuthRoute from "./components/AuthRoute";
import NotFoundPage from "./pages/NotFoundPage";
import CustomToaster from './components/Toaster';
import FloatingThemeToggle from "./components/FloatingThemeToggle";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const WhoWeAre = lazy(() => import("./pages/WhoWeAre"));
const Solutions = lazy(() => import("./pages/Solutions"));
const ProofOfBuild = lazy(() => import("./pages/ProofOfBuild"));
const LaunchProject = lazy(() => import("./pages/LaunchProject"));
const BookConsultation = lazy(() => import("./pages/BookConsultation"));
const Methodology = lazy(() => import("./pages/Methodology"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const InviteCodeManager = lazy(() => import("./pages/InviteCodeManager"));
const SubmissionDetail = lazy(() => import("./pages/SubmissionDetail")); // Add this line
const UsersManager = lazy(() => import("./pages/UsersManager"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));


function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <ScrollProgress />
      {!isAdminRoute && <FloatingCTA />}
      {!isAdminRoute && <FloatingThemeToggle />}

      <main className={isAdminRoute ? "bg-gray-50 min-h-screen" : ""}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/proof" element={<ProofOfBuild />} />
            <Route path="/launch-project" element={<LaunchProject />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/process" element={<Methodology />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <AuthRoute>
                  <AdminDashboard />
                </AuthRoute>
              }
            />
            <Route
  path="/admin/submissions/:id"
  element={
    <AuthRoute>
      <SubmissionDetail />
    </AuthRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AuthRoute>
      <UsersManager />
    </AuthRoute>
  }
/>
            <Route
              path="/admin/invites"
              element={
                <AuthRoute>
                  <InviteCodeManager />
                </AuthRoute>
              }
            />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  useSmoothScroll();

  return (
    <Router>
      <CustomToaster />
      <AppContent />
    </Router>
  );
}

export default App;