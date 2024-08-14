import React, { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/HomePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import SpendingPage from '@/pages/spending/SpendingPage';
import NotFoundPage from '@/pages/notfound/NotFoundPage';
import StatisticPage from '@/pages/statistic/StatisticPage';
import SpendLimit from '@/pages/spendlimit/SpendLimit';
import SignUpPage from '@/pages/auth/SignUpPage';
import SignInPage from '@/pages/auth/SignInPage';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface IRouter {
  path: string;
  element: React.ElementType;
  title: string;
}

const clientRouter: IRouter[] = [
  {
    path: '/spendlimit',
    element: SpendLimit,
    title: 'Đặt hạn mức',
  },
  {
    path: '/statistic',
    element: StatisticPage,
    title: 'Báo cáo thống kê',
  },
  {
    path: '/spending',
    element: SpendingPage,
    title: 'Quản lý chi tiêu',
  },
  {
    path: '/',
    element: HomePage,
    title: 'Trang chủ',
  },
];

const authRouter: IRouter[] = [
  {
    path: '/sign-in',
    element: SignInPage,
    title: 'Đăng nhập',
  },
  {
    path: '/sign-up',
    element: SignUpPage,
    title: 'Tạo tài khoản',
  },
];

export default function AppRouter() {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth.data);

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
      {auth.accessToken ? (
        <>
          <Route element={<MainLayout />}>
            {clientRouter.map(route => (
              <Route key={route.path} path={route.path} element={<route.element />} />
            ))}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </>
      ) : (
        <>
          {authRouter.map(route => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}
          <Route path="*" element={<SignInPage />} />
        </>
      )}
    </Routes>
  );
}
