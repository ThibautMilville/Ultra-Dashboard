import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Ultra ($UOS)</h3>
            <p className="text-gray-600">
              Ultra is building a first-class PC game publishing platform and marketplace that puts an end to the current distribution monopoly.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://ultra.io" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  Official Website
                </a>
              </li>
              <li>
                <a href="https://docs.ultra.io" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://ultra.io/whitepaper" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  Whitepaper
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Community</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/ultra-alliance" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/ultra_io" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} UOS Analytics Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;