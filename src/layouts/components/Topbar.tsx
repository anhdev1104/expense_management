import Search from '@/components/search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

const Topbar = () => {
  return (
    <header className="px-10 py-5 border-b border-borderColor flex justify-between items-center">
      <Search />
      <div className="flex items-center gap-5">
        <div className="w-10 h-10 rounded-full border-borderColor border flex justify-center items-center cursor-pointer">
          <NotificationsNoneOutlinedIcon className="text-gray-500" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="https://avatars.githubusercontent.com/u/121429011?v=4" alt="avatar" />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Anhdev</span>
            <KeyboardArrowDownIcon className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
