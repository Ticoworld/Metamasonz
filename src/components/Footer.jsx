import React from 'react'

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
            <li><a href="#" className="hover:text-cyan-400">Protocol Design</a></li>
            <li><a href="#" className="hover:text-cyan-400">Team Building</a></li>
            <li><a href="#" className="hover:text-cyan-400">Security Audits</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400">About</a></li>
            <li><a href="#" className="hover:text-cyan-400">Careers</a></li>
            <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400">Privacy</a></li>
            <li><a href="#" className="hover:text-cyan-400">Terms</a></li>
            <li><a href="#" className="hover:text-cyan-400">Security</a></li>
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
