/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { columns, DepartmentHeadButtons } from "../../utils/DepartmentHeadsHelper.jsx";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const DepartmentHeads = () => {
    const [departmentHeads, setDepartmentHeads] = useState([]);
    const [filteredHeads, setFilteredHeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate =useNavigate() 
    useEffect(() => {
        const fetchHeads = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/department-heads", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.departmentHeads.filter((head) => head.employee && head.employee.userId) // تجاهل العناصر الفارغة
                        .map((head) => ({
                        _id: head._id,
                        sno: sno++,
                        dep_name: head.department?.dep_name || "Unknown",
                        name: head.employee?.userId.name || "Unknown",
                        dob: new Date(head.employee?.dob || head.employee?.userId?.dob).toLocaleDateString(),
                        profileImage: <img width={40} className="rounded-full" src={`http://localhost:5000/${head.employee?.userId?.profileImage || 'default.png'}`}/>,
                        action: head.employee ? (<DepartmentHeadButtons Id={head.employee._id} />) : "N/A",
                        
                        
                    }));

                    setDepartmentHeads(data);
                    setFilteredHeads(data)
                    
                    
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        fetchHeads();
    }, []);

    const handleFilter = (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = departmentHeads.filter((head) =>
            head.name.toLowerCase().includes(search)
        );
        setFilteredHeads(filtered);
    };

    return (
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Manage Department Heads</h3>
            </div>
            <div className="mb-5 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search By Name"
                    className="px-4 py-0.5 border"
                    onChange={handleFilter}
                />
                <button
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                    onClick={() => navigate("/admin-dashboard/promote-employee")}
                >
                    Promote Employee
                </button>
            </div>
            <DataTable
                columns={columns}
                data={filteredHeads}
                pagination

            />
        </div>
    );
};

export default DepartmentHeads;
