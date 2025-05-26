
import React from 'react';

const ChatWithUsSection: React.FC = () => {
  return (
    <div className="bg-[#F7F7F7] py-12 border-t border-gray-200">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Still have questions?</h2>
            <p className="text-gray-600">Our travel experts are here to help you plan your perfect trip.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#CCFF00] text-black px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors font-semibold">
              Chat with Us
            </button>
            <button className="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-semibold">
              Call Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithUsSection;
