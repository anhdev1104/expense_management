import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const MainLayout = () => {
  const [displaySidebar, setDisplaySidebar] = useState<boolean>(true);
  return (
    <main className="flex">
      <Sidebar displaySidebar={displaySidebar} onClick={setDisplaySidebar} />
      <div className={`flex-1 transition-all ease-linear ${displaySidebar && 'pl-[320px]'}`}>
        <div
          className="w-7 h-7 bg-white rounded-full shadow-md flex justify-center items-center cursor-pointer fixed top-5 left-3 z-[2]"
          onClick={() => setDisplaySidebar(!displaySidebar)}
        >
          <KeyboardDoubleArrowRightIcon className="text-gray-500 hover:text-primary" />
        </div>
        <Topbar displaySidebar={displaySidebar} />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
