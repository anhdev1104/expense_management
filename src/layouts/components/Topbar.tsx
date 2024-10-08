import { ChevronRightIcon, KeyboardArrowDownIcon, NotificationsNoneOutlinedIcon } from '@/components/icon/Icon';
import Search from '@/components/search';
import useClickOutSide from '@/hooks/useClickOutSide';
import useDarkMode from '@/hooks/useDarkMode';
import { logoutAuth } from '@/redux/auth/authSlice';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Topbar = ({ displaySidebar }: { displaySidebar: boolean }) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const auth = useSelector((state: RootState) => state.auth.data);
  const dispatch = useDispatch();

  return (
    <header
      className={`${
        displaySidebar ? 'pl-[350px]' : 'pl-16'
      } pr-10 py-5 border-b border-borderColor flex justify-between items-center fixed top-0 left-0 right-0 bg-white z-[2] dark:bg-slate-800 dark:text-slate-400`}
    >
      <Search />
      <div className="flex items-center gap-5">
        <div>
          <input type="checkbox" id="switch" className="switch-input" defaultChecked={isDarkMode} />
          <label htmlFor="switch" className="switch" onClick={() => toggleDarkMode()}></label>
        </div>
        <div className="w-10 h-10 rounded-full border-borderColor border flex justify-center items-center cursor-pointer">
          <NotificationsNoneOutlinedIcon className="text-gray-500 dark:text-white" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer relative" onClick={() => setShow(!show)} ref={nodeRef}>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={auth?.data?.avatar} alt="avatar" />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{auth?.data?.username}</span>
            {show ? (
              <KeyboardArrowDownIcon className="text-gray-500" />
            ) : (
              <ChevronRightIcon className="text-gray-500" />
            )}
          </div>
          {show && (
            <div className="absolute top-full right-0 w-[200px] rounded translate-y-2 shadow-lg z-50 bg-gray-100">
              <ul className="flex flex-col">
                <li className="cursor-pointer  hover:bg-white hover:shadow-sm hover:font-medium transition ease-in-out group">
                  <Link to="/profile" className="py-2 block px-5 text-sm dark:text-black">
                    Thông tin cá nhân
                  </Link>
                </li>
                <li className="cursor-pointer hover:bg-white hover:shadow-sm hover:font-medium transition ease-in-out group">
                  <div className="py-2 block px-5 text-sm dark:text-black" onClick={() => dispatch(logoutAuth())}>
                    Đăng xuất
                  </div>
                </li>
              </ul>
              <div className="dropdown-triangle"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
