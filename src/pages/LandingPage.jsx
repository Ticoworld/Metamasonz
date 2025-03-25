// components/LandingPage.jsx
import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy-loaded components
const Hero = lazy(() => import('../components/Hero'));
const ProblemStatement = lazy(() => import('../components/ProblemStatement'));
const Web3Framework = lazy(() => import('../components/Web3Framework'));
const ProofOfBuild = lazy(() => import('../components/ProofOfBuild'));
const Methodology = lazy(() => import('../components/Methodology'));
const Solutions = lazy(() => import('../components/Solutions'));
const AboutUs = lazy(() => import('../components/AboutUs'));
const CTASection = lazy(() => import('../components/CTASection'));

function LandingPage() {
  const location = useLocation();

  // Handle scrolling to sections based on URL hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0); // Scroll to top if no hash
    }
  }, [location]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <section id="hero"><Hero /></section>
      <section id="problem-statement"><ProblemStatement /></section>
      <section id="web3-framework"><Web3Framework /></section>
      <section id="proof-of-build"><ProofOfBuild /></section>
      <section id="methodology"><Methodology /></section>
      <section id="solutions"><Solutions /></section>
      <section id="about-us"><AboutUs /></section>
      <section id="cta"><CTASection /></section>
    </Suspense>
  );
}

export default LandingPage;