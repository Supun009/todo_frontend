import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout() {
  return (
    <>
    <Outlet/>
    <ToastContainer />
    </>
  )
}
