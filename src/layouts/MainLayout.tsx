import { useState } from 'react';
import ReactModal from 'react-modal';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';
import { CloseIcon, KeyboardDoubleArrowRightIcon } from '@/components/icon/Icon';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/slices/spendlimitSlice';
import formatMoneyUtils from '@/helpers/formatMoneyUtils';
import formatDateLimit from '@/helpers/formatDateLimit';

const MainLayout = () => {
  const [displaySidebar, setDisplaySidebar] = useState<boolean>(true);

  const dispatch = useDispatch();

  const spendlimitData = useSelector((state: RootState) => state.spendlimit.data);
  const isShowModal = useSelector((state: RootState) => state.spendlimit.isModal);

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
      <ReactModal
        isOpen={isShowModal}
        overlayClassName="modal-overlay fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        className="modal-content w-full max-w-[700px] bg-white rounded-xl outline-none p-10 relative dark:text-slate-800"
      >
        <button className="absolute z-10 right-5 top-5 text-gray-500" onClick={() => dispatch(toggleModal())}>
          <CloseIcon />
        </button>
        <h2 className="text-center text-xl font-semibold">Chi tiết hạn mức danh mục</h2>
        <table className="min-w-full mt-10">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Thời gian</th>
              <th>Hạn mức</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {spendlimitData?.length > 0 &&
              spendlimitData?.map(item => (
                <tr className="text-center h-16" key={item._id}>
                  <td>
                    <div className="flex items-center justify-center gap-5">
                      <img src={`/icon/${item.category.icon}`} alt={`icon ${item.category.name}`} className="w-10" />
                      <span className="font-medium">{item.category.name}</span>
                    </div>
                  </td>
                  <td>{formatDateLimit(item.date)}</td>
                  <td>{formatMoneyUtils(item.moneylimit)}</td>
                  <td>
                    <button className="bg-yellow-400 text-white px-4 py-2 rounded-md transition-all duration-300 ease-linear hover:bg-yellow-500">
                      Chỉnh sửa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </ReactModal>
    </main>
  );
};

export default MainLayout;
