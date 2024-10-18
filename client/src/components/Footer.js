import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-sky-100 py-8 ">
      <div className=" mx-auto container px-28">
        <div className="flex  justify-between gap-8">
          <div className="flex flex-col items-center justify-center">
          <h2 className='text-2xl'> LOGO </h2>
            <p className="text-gray-700">Shillong Teer Result | Best VIP Numbers</p>
          </div>
          <div className="flex flex-col">
            <h4 className="text-gray-900 font-bold mb-4">Link</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Club Chart</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Common Number</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Result History</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Result Calculator</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-gray-900 font-bold mb-4">Link</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Club Chart</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Common Number</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Result History</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Result Calculator</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-gray-900 font-bold mb-4">Privacy</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Teer and Conditions</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">Contact Us</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-500">About Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-4">
        <p>Copyright © 2024 Shillong Teer Results. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;