import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ()=> {
    const token = localStorage.getItem('jwttoken');
    

    const isAuthenticated = (() => {
        if (!token) return false;
        try {
            const { exp } = jwtDecode(token); 
            if (!exp) return false;
            const currentTime = Math.floor(Date.now() / 1000); 
            return exp > currentTime; 
        } catch (error) {
            console.error("Invalid token", error);
            return false;
        }
    })();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
