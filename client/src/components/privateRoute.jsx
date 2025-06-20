import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
export default function privateRoute() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    currentUser ? <Outlet /> : <Navigate to='/sign-in' />
    
    //if the user is not logged in, they will be redirected to the sign-in page
    //if the user is logged in, they will be able to access the profile page
    //so we are using the currentUser state to check if the user is logged in or not
    
  )
}
