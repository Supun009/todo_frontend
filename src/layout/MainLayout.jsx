import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/home/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function MainLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <ToastContainer />
    </>
  )
}
