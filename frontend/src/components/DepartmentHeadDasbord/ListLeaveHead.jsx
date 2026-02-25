import axios from "axios";
import { useEffect, useState } from "react";
import { LeaveButtons } from "../../utils/LeaveHelper";

const ListHead = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let sno = 1;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/leave/departmentHead', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.data.success) {
          setLeaves(res.data.leaves);
          setFilteredLeaves(res.data.leaves);
        } else {
          console.error(res.data.error);
        }
      } catch (err) {
        console.error('Error fetching leaves:', err);
      }
    };

    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = leaves.filter(leave =>
      leave.employeeId?.userId?.name.toLowerCase().includes(value)
    );
    setFilteredLeaves(filtered);
  };

  const filterByButton = (status) => {
    const statusFormatted = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    const filtered = leaves.filter(leave => leave.status === statusFormatted);
    setFilteredLeaves(filtered);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-4 py-1 border rounded"
          value={searchTerm}
          onChange={filterByInput}
        />
        <div className="space-x-3">
          <button
            className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded"
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded"
            onClick={() => filterByButton("Approved")}
          >
            Approved
          </button>
          <button
            className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded"
            onClick={() => filterByButton("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 border border-gray-200">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3">Sno</th>
            <th className="px-6 py-3">Employee Name</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Department</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">No leaves found.</td>
            </tr>
          ) : (
            filteredLeaves.map((leave) => (
              <tr
                key={leave._id}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.employeeId?.userId?.name || 'N/A'}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{leave.employeeId?.department?.dep_name || 'N/A'}</td>
                <td className="px-6 py-3">{leave.status}</td>
                <td className="px-6 py-3">
                  <LeaveButtons Id={leave._id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListHead;
