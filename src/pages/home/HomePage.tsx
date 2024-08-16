import { logoutAuth } from '@/redux/auth/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const refreshToken = cookies.get('refreshToken');
    if (!refreshToken) {
      dispatch(logoutAuth());
    }
  }, [dispatch]);
  return <div>Home Page</div>;
};

export default HomePage;
