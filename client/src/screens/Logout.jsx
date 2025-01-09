import { useDispatch } from 'react-redux';
import { authActions } from '../redux/slices/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');

    // Dispatch logout action
    dispatch(authActions.logout());

    // Redirect to login page
    navigate('/login');
  }, [dispatch, navigate]);

  return null; // No UI component to render for logout
};
