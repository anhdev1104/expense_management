import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const Sidebar = ({
  displaySidebar,
  onClick,
}: {
  displaySidebar: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <aside
      className={`bg-gray-100 p-5 w-[320px] fixed left-0 top-0 bottom-0 transition-all duration-300 ease-in z-10 ${
        !displaySidebar && '-translate-x-full'
      }`}
    >
      <div
        className="absolute w-7 h-7 bg-white rounded-full shadow flex justify-center items-center cursor-pointer top-3 right-3"
        onClick={() => onClick(!displaySidebar)}
      >
        <KeyboardDoubleArrowLeftIcon className="text-gray-500 hover:text-primary" />
      </div>
      <div className="flex items-center justify-between flex-col gap-1">
        <img src="/images/logo.png" alt="logo" className="w-14 h-14" />
        <h1 className="font-bold text-xl">Quản lý chi tiêu</h1>
      </div>
      <ul className="mt-5 pt-5 border-t border-[#dbdbdb]">
        <li className="cursor-pointer hover:bg-white hover:shadow-sm hover:font-medium transition ease-in-out mb-2 rounded-md group">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-5 py-2 bg-white font-medium rounded-md shadow-sm'
                : 'flex items-center gap-3 px-5 py-2'
            }
          >
            {({ isActive }) => (
              <>
                <HomeIcon className={isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} />
                <span className="">Trang chủ</span>
              </>
            )}
          </NavLink>
        </li>
        <li className="cursor-pointer hover:bg-white hover:shadow-sm hover:font-medium transition ease-in-out mb-2 rounded-md group">
          <NavLink
            to={'/spending'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-5 py-2 bg-white font-medium rounded-md shadow-sm'
                : 'flex items-center gap-3 px-5 py-2'
            }
          >
            {({ isActive }) => (
              <>
                <EditNoteIcon className={isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} />
                <span className="">Thu chi</span>
              </>
            )}
          </NavLink>
        </li>
        <li className="cursor-pointer hover:bg-white hover:shadow-sm hover:font-medium transition ease-in-out mb-2 rounded-md group">
          <NavLink
            to={'/statistic'}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-5 py-2 bg-white font-medium rounded-md shadow-sm'
                : 'flex items-center gap-3 px-5 py-2'
            }
          >
            {({ isActive }) => (
              <>
                <AnalyticsIcon className={isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} />
                <span className="">Báo cáo</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
