import { KeyboardArrowDownIcon, NotificationsNoneOutlinedIcon } from '@/components/icon/Icon';
import Search from '@/components/search';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Topbar = ({ displaySidebar }: { displaySidebar: boolean }) => {
  return (
    <header
      className={`${
        displaySidebar ? 'pl-[350px]' : 'pl-16'
      } pr-10 py-5 border-b border-borderColor flex justify-between items-center fixed top-0 left-0 right-0 bg-white transition-all duration-300 ease-linear z-[2]`}
    >
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
