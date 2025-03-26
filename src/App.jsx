// App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingCTA from './components/FloatingCTA';
import LoadingSpinner from './components/LoadingSpinner';
import LandingPage from './pages/LandingPage';
import WhoWeAre from './pages/WhoWeAre';
import Solutions from './pages/Solutions';
import ProofOfBuild from './pages/ProofOfBuild';
import LaunchProject from './pages/LaunchProject';
import BookConsultation from './pages/BookConsultation';
import Methodology from './pages/Methodology';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  useSmoothScroll();

  return (
    <Router>
      <Header />
      <ScrollProgress />
      <FloatingCTA />
      
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/proof" element={<ProofOfBuild />} />
            <Route path="/launch-project" element={<LaunchProject />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/process" element={<Methodology />} />
            <Route path="*" element={<NotFoundPage/>} /> {/* Catch-all for 404 */}
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </Router>
  );
}

export default App;