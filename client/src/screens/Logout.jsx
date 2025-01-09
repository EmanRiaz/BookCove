/*import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../redux/slices/authSlice';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user and token from Redux and localStorage
    dispatch(resetUser());
    // Redirect to the login page
    navigate('/login');
  }, [dispatch, navigate]);

  return null; // Optionally, you can add a loading spinner or message here
};*/
import React from 'react'

export const Logout = () => {
  return (
    <div>
      logout
    </div>
  )
}



