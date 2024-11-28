import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/home/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDarkModePreference, setDarkModePreference } from "../utils/homeutills/ThemMode";



export default function MainLayout() {
  const [isDarkMode, setIsDarkMode] = useState(getDarkModePreference());

  // Update dark mode preference when state changes
  useEffect(() => {
    setDarkModePreference(isDarkMode);
  }, [isDarkMode]);
  

  return (
    <>
    <Navbar theme={isDarkMode}/>
    <Outlet context={{isDarkMode, setIsDarkMode}}/>
    <ToastContainer />
    </>
  )
}
