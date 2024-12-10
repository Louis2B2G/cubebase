import React from 'react';
import Landing from '@/pages/Landing';
import CubeElements from '@/pages/Devtool';
import './App.css';

function App() {
  return (
    <>
      <CubeElements />
      <footer className="w-full bg-gradient-to-b from-black to-zinc-900 text-white py-8 lg:py-12 relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Horizontal Bar */}
          <div className="flex justify-center mb-12">
            <div className="w-12 h-0.5 bg-purple-400"></div>
          </div>

          {/* Grid container - stack on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-10 lg:mb-8">
            {/* Company */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4 text-center md:text-left">
                Company
              </h3>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                <li><a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4 text-center md:text-left">
                Resources
              </h3>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                <li><a href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
                <li><a href="/api" className="text-gray-400 hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-purple-400 transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4 text-center md:text-left">
                Legal
              </h3>
              <ul className="space-y-3 flex flex-col items-center md:items-start">
                <li><a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-purple-400 transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4 text-center md:text-left">
                Connect
              </h3>
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="https://twitter.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="https://github.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-github text-2xl"></i>
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-linkedin text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Address and Copyright */}
          <div className="border-t border-zinc-800 pt-8 mt-8">
            <div className="flex flex-col items-center text-center">
              <address className="text-gray-400 not-italic mb-8 leading-relaxed">
                1111B South Governors Avenue 3183<br />
                Dover DE 19904<br />
                United States
              </address>
            </div>
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Cube AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
