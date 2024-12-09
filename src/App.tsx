import React from 'react';
import Landing from '@/pages/Landing';
import CubeElements from '@/pages/Devtool';
import './App.css';

function App() {
  return (
    <>
      <CubeElements />
      <footer className="w-full bg-gradient-to-b from-black to-zinc-900 text-white py-12 relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
                <li><a href="/api" className="text-gray-400 hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-purple-400 transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-purple-400 transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-purple-400 font-semibold uppercase tracking-wider mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="https://github.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-zinc-800 pt-8">
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
