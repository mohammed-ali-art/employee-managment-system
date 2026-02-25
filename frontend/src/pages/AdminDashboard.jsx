/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSideBar.jsx';
import Navbar from '../components/dashboard/Navbar.jsx';
import AdminSummary from '../components/dashboard/AdminSummary.jsx';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    const { user  } = useAuth()


    return(
        <div className='felx'>
            <AdminSidebar />
            <div className=' flex-1 ml-64 bg-gray-100 h-screen'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard