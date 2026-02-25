
/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from '../context/authContext';
import Navbar from '../components/dashboard/Navbar.jsx';
import SummaryOfDepHead from '../components/DepartmentHeadDasbord/SummaryOfDepHead.jsx'
import { Outlet } from 'react-router-dom';
import SidebarOfDepHead from '../components/DepartmentHeadDasbord/SidebarOfDepHead.jsx';

const DepartmentHeadDashboard = () => {
    const { user  } = useAuth()


    return(
        <div className='felx'>
            <SidebarOfDepHead />
            <div className=' flex-1 ml-64 bg-gray-100 h-screen'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default DepartmentHeadDashboard

