import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="bg-gray-100 py-2 border-b border-red-500">
      <div className="container mx-auto px-4 flex justify-end items-center border-b border-blue-500">
        {/* This div would potentially hold left-aligned content, like a logo */}
        {/* <div className="topbar__left-side"></div> */}

        {/* Right side for the links, pushed to the right */}
        <div className="topbar__right-side flex items-center space-x-6 border border-green-500">
          <Link 
            to="/en-gb/contact" 
            className="topbar__link text-link-s text-gray-600 hover:text-gray-900"
            title="Contact us"
          >
            Contact us
          </Link>
          <Link 
            to="/en-gb/resources/ftc" 
            className="topbar__link text-link-s text-gray-600 hover:text-gray-900"
            title="Future Travel Credit"
          >
            Future Travel Credit
          </Link>
          <Link 
            to="/en-gb/newsletter" 
            className="topbar__link text-link-s text-gray-600 hover:text-gray-900"
            title="Subscribe to emails"
          >
            Subscribe to emails
          </Link>
          <a 
            href="https://my.contiki.com/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="topbar__link text-link-s text-gray-600 hover:text-gray-900"
            title="Traveller log in"
          >
            Traveller log in
          </a>
          <a 
            href="https://agents.ttc.com/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="topbar__link text-link-s text-gray-600 hover:text-gray-900"
            title="Agent log in"
          >
            Agent log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 