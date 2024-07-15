import React, { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/HomePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import SpendingPage from '@/pages/spending/SpendingPage';
import NotFoundPage from '@/pages/notfound/NotFoundPage';

interface IRouter {
  path: string;
  element: React.ElementType;
  title: string;
}

const clientRouter: IRouter[] = [
  {
    path: 'spending',
    element: SpendingPage,
    title: 'Quản lý chi tiêu',
  },
  {
    path: '',
    element: HomePage,
    title: 'Trang chủ',
  },
];

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    const route = clientRouter.find(route => {
      const routePath = route.path.replace(/:\w+/g, ''); // loại bỏ các phần có :id
      return location.pathname.startsWith(routePath);
    });
    if (route && route.title) {
      document.title = route.title;
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {clientRouter.map(route => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
