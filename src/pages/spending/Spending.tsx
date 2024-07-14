import React from 'react';

const Spending = () => {
  return (
    <>
      <div className="mx-auto w-[240px] flex justify-evenly items-center mt-5 bg-gray-100 py-2 rounded-md">
        <span className="cursor-pointer py-2 px-5 bg-primary text-white rounded-md ">Tiền chi</span>
        <span className="cursor-pointer py-2 px-5 text-primary font-semibold rounded-md ">Tiền thu</span>
      </div>
    </>
  );
};

export default Spending;
