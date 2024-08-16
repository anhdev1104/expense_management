import { useState } from 'react';
// import ReactModal from 'react-modal';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';
import { KeyboardDoubleArrowRightIcon } from '@/components/icon/Icon';
// import { RootState } from '@/redux/store';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { toggleModal } from '@/redux/slices/spendlimitSlice';
// import formatMoneyUtils from '@/helpers/formatMoneyUtils';
// import formatDateLimit from '@/helpers/formatDateLimit';

const MainLayout = () => {
  const [displaySidebar, setDisplaySidebar] = useState<boolean>(true);

  // const dispatch = useDispatch();

  // const spendlimitData = useSelector((state: RootState) => state.spendlimit.data);
  // const isShowModal = useSelector((state: RootState) => state.spendlimit.isModal);

  return (
    <main className="flex">
      <Sidebar displaySidebar={displaySidebar} onClick={setDisplaySidebar} />
      <div className={`flex-1 transition-all ease-linear ${displaySidebar && 'pl-[320px]'}`}>
        <div
          className="w-7 h-7 bg-white rounded-full shadow-md flex justify-center items-center cursor-pointer fixed top-5 left-3 z-[3]"
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
