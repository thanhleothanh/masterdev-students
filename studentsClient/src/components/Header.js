import React from 'react';

const Header = () => {
  return (
    <nav className='fixed inset-0 z-10 flex items-end justify-between w-full shadow-sm select-none fixedHeader customGradient rounded-b-2xl'>
      <div className='p-3 text-2xl font-black text-white md:text-3xl md:p-4'>
        <h1>MasterDev Students</h1>
      </div>
    </nav>
  );
};

export default Header;
