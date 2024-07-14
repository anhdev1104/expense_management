import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
