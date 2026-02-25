import axios from "axios";
import { useEffect, useState } from "react";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper.jsx";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const AttendanceHead = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredAttendance, setFilteredAttendance] = useState([]);

        const statusChange = () => {
        fetchAttendance()
    }

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/department-heads/attendance-head', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                let sno = 1;
                const data = response.data.attendance.map(att => ({
                    employeeId: att.employeeId.employeeId,
                    sno: sno++,
                    department: att.employeeId.department?.dep_name || "Unknown",
                    name: att.employeeId.userId?.name || "Unknown",
                    action: <AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={ statusChange} />,
                }));
                setAttendance(data);
                setFilteredAttendance(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        const records = attendance.filter(emp =>
            emp.name.toLowerCase().includes(value)
        );
        setFilteredAttendance(records);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Attendance</h3>
            </div>
            <div className="flex justify-between items-center mb-5">
                <input
                    type="text"
                    placeholder="Search By Emp Name"
                    className="px-4 py-0.5 border"
                    onChange={handleFilter}
                />
                <p className="font-bold text-2xl">
                    Mark Employees For {new Date().toISOString().split("T")[0]}{" "}
                </p>
                <Link
                    to="/departmentHead-dashboard/attendanceReport"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Attendance Report
                </Link>
            </div>
            <DataTable columns={columns} data={filteredAttendance} pagination />
        </div>
    );
};

export default AttendanceHead;
