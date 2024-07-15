import React from 'react';

const Tab = ({
  tabActive,
  onClick,
}: {
  tabActive: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="mx-auto w-[240px] flex justify-evenly items-center mt-5 bg-gray-100 py-2 rounded-md">
      <button
        type="button"
        data-id={1}
        className={`cursor-pointer py-2 px-5 rounded-md transition-all duration-300 ease-in-out font-semibold ${
          tabActive === 1 ? 'bg-primary text-white' : 'text-primary'
        }`}
        onClick={onClick}
      >
        Tiền chi
      </button>
      <button
        type="button"
        data-id={2}
        className={`cursor-pointer py-2 px-5 rounded-md transition-all duration-300 ease-in-out font-semibold ${
          tabActive === 2 ? 'bg-primary text-white' : 'text-primary'
        }`}
        onClick={onClick}
      >
        Tiền thu
      </button>
    </div>
  );
};

export default Tab;
