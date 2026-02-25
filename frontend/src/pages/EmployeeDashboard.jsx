import Navbar from '../components/dashboard/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/EmployeeDashboard/Sidebar.jsx';



const EmployeeDashboard = () => {
    return(
        <div className='felx'>
            <Sidebar />
            
            <div className=' flex-1 ml-64 bg-gray-100 h-screen'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default EmployeeDashboard