import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div className="shadow-sm py-2 min-w-[400px] pl-3 rounded-md bg-gray-100 flex items-center">
      <SearchIcon className="text-gray-400" />
      <input type="text" placeholder="Tìm kiếm giao dịch" className="w-full outline-none bg-transparent pl-2 pr-5" />
    </div>
  );
};

export default Search;
