import axios from "axios";
import { useEffect, useState } from "react";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper.jsx";

import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const Attendance = () => {
    const [attendace, setAttendace] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [loadoding, setLoading] = useState(false)
    const [fliteredAttendance,setFliterAttendace]=useState([])
    
    const statusChange = () => {
        fetchAttendance()
    }

            const fetchAttendance = async () => {
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/attendance', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.attendance.map((att) => ({
                        employeeId: att.employeeId.employeeId,
                        sno: sno++,
                        department: att.employeeId.department?.dep_name || "Unknown",
                        name: att.employeeId.userId?.name || "Unknown",
                        action: (<AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={ statusChange} />),
                        
                    }));
                    setAttendace(data);
                    setFliterAttendace(data)
                    
                    
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error)
                }
            } finally {
                setLoading(false)
            }
        };

    useEffect(() => {

        fetchAttendance();
    }, []);

const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const records = attendace.filter((emp) =>
        emp.name.toLowerCase().includes(value)
    );
    setFliterAttendace(records);
}

    if (!fliteredAttendance) {
        return <div>Loading...</div>
    }


    return (
        <div className="p-5 ">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Mange Attendance</h3>
            </div>
            <div className="flex justify-between items-center mb-5">
                <input
                type="text"
                placeholder="Search By Emp Name"
                className="px-4 py-0.5 border"
                onChange={handleFilter}
                />
                <p className="text-2xl">
                    Mark Employees For  <span className="font-bold underline">{new Date().toISOString().split("T")[0]}{" "}</span>
                </p>
                <Link 
                to="/admin-dashboard/attendance-report"
                className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                Attendance Report 
                </Link>
            </div>
            <div>
                <DataTable columns={columns} data={fliteredAttendance} pagination/>
            </div>
        </div>
    );
};

export default Attendance;
