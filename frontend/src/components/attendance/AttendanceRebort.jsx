import axios from "axios";
import { useEffect, useState } from "react";

const AttendanceReport = () => {
    const [report, setReport] = useState({});
    const [dateFilter, setDateFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [skip , setSkip] = useState(0)
    const [limit, setLimit] = useState(7)

    const fetchReport = async () => {
        setLoading(true)
        try {
            const query = new URLSearchParams({ limit, skip })
            if (dateFilter) {
                query.append("date" ,dateFilter)
            }
            const response = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
        if (response.data.success) {
        if (skip === 0) {
            setReport(response.data.groupData)
        } else {
            setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
            }))
            }
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
    fetchReport()
    }, [dateFilter, skip])
        const handleLoadmore = () => {
        setSkip((prevSkip)=> prevSkip + limit)
    }

    return (
    <div className="p-10 min-h-screen bg-white">
        <h2 className="text-center text-2xl font-bold mb-6">Attendance Report</h2>

        <div className="mb-6">
            <label className="text-xl font-semibold mr-2">Filter by Date:</label>
            <input
                type="date"
                className="border bg-gray-100 px-3 py-1 rounded"
                value={dateFilter || ''}
                    onChange={(e) => {setDateFilter(e.target.value)
                    setSkip(0)}
                }
            />
        </div>

        {loading ? (
        <div>Loading...</div>
        ) : (
        Object.entries(report).map(([date, record]) => (
        <div key={date} className="mb-10 ">
            <h3 className="text-lg font-semibold mb-4">{date}</h3>
            <table className="w-full border border-gray-300 text-center">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border px-4 py-2">S No</th>
                    <th className="border px-4 py-2">Employee ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {record.map((data, i) => (
                    <tr key={data.employeeId} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{i + 1}</td>
                        <td className="border px-4 py-2">{data.employeeId}</td>
                        <td className="border px-4 py-2">{data.employeeName}</td>
                        <td className="border px-4 py-2">{data.department}</td>
                        <td className="border px-4 py-2">{data.status}</td>
                    </tr>
                ))}
                </tbody>
                </table>
                <hr className="my-6 border-t border-gray-300" />
            </div>
            ))
        )}
        <button className="px-4 py-2 border bg-gray-200 text-lg font-semibold" onClick={handleLoadmore}>Load More</button>
    </div>
  )
}

export default AttendanceReport;