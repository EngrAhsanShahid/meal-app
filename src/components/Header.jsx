import React from 'react';

const Header = ({ heading, subHeading }) => {
  return (
    <div className="relative h-64 md:h-80 lg:h-60 bg-cover bg-center text-white flex items-center justify-center p-8">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 bg-[url('/headerImage.jpg')] bg-cover bg-center opacity-30"></div>

      {/* Content */}
      <div className="relative text-center">
        <div className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-black opacity-70">{heading}</div>
        <span className="text-black">{subHeading}</span>
      </div>
    </div>
  );
};

export default Header;
