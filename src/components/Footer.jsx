import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-semibold mb-4">Metamasonz</h3>
            <p className="text-sm">Building Web3 foundations since 2022</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions" className="hover:text-cyan-400">Our Solutions</Link></li>
              <li><Link to="/proof" className="hover:text-cyan-400">Proof of Build</Link></li>
              <li><Link to="/process" className="hover:text-cyan-400">Our Methodology</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/who-we-are" className="hover:text-cyan-400">About Us</Link></li>
              <li><Link to="/launch-project" className="hover:text-cyan-400">Launch Project</Link></li>
              {/* <li><Link to="/book-consultation" className="hover:text-cyan-400">Book Consultation</Link></li> */}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-cyan-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cyan-400">Terms & Conditions</Link></li>
              <li><Link to="/login" className="hover:text-cyan-400">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Metamasonz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer