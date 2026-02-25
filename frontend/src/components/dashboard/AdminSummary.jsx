import { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaFileAlt, FaHourglassHalf,FaCheckCircle , FaMoneyBillWave, FaTimesCircle, FaUser, FaDesktop }  from 'react-icons/fa'
import axios from 'axios'
const AdminSummary = () => {
    const [summary , setSummary] = useState([])
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await axios.get("http://localhost:5000/api/dashboard/summary", {
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                })
                setSummary(summary.data)
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchSummary ()
    }, [])
    if (!summary) {
        return <div>Loding...</div>
    }
    return (
        <div className='p-6'>
            <h3 className='text-2xl font-bold'>Dasnboard Overview</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <SummaryCard icon={<FaUser /> } text="Total Employees" number={ summary.totalEmployees} color="bg-teal-600"/>
                <SummaryCard icon={<FaBuilding   /> } text="Total Department" number={ summary.totalDepartment} color="bg-yellow-600" />
                <SummaryCard icon={<FaMoneyBillWave   /> } text="Monthly Salary " number={summary.totalSalary  } color="bg-red-600" />
                <SummaryCard icon={<FaDesktop  /> } text="Member Of Mangment " number={summary.totalDepartment} color="bg-blue-600" />
            </div>

            <div className='mt-12'>
                <h4 className='text-center text-2xl font-bold '>Leave Details </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary?.appliedFor || 0} color="bg-teal-600" />
                <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary?.approved || 0} color="bg-green-600" />
                <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary?.pending || 0} color="bg-yellow-600" />
                <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary?.rejected || 0} color="bg-red-600" />

                </div>
            </div>

        </div>
    )
}

export default AdminSummary