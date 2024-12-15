import React from 'react';

const TitleBar = ({ heading }) => {
  return (
    <div
      className="text-2xl md:text-3xl lg:text-3xl font-bold md:p-6 lg:pl-64"
      style={{
        background: 'linear-gradient(42deg, rgba(249,238,238,1) 1%, rgba(240,235,233,1) 100%, rgba(242,150,150,1) 100%, rgba(196,192,189,1) 100%, rgba(35,57,66,1) 100%)',
      }}
    >
      {heading}
    </div>
  );
};

export default TitleBar;
