
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";
const DepartmentList = () => {
    const [departments, setDepartments] = useState([])
    const [depLoadoding, setDepLoading] = useState(false)
    const [fliteredDepartments,setFliterDepartments]=useState([])

    const onDepartmenDelete =async (id) => {
        const data = departments.filter(dep => dep._id !== id)
        setDepartments(data)

        console.log(departments.filter((dep) => dep._id !== id));
    }
    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.departments.map((dep) => ({
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: (
                            <DepartmentButtons
                            Id={dep._id}
                            onDepartmenDelete={onDepartmenDelete}
                            />
                            ),
                        }));
                    setDepartments(data);
                    setFliterDepartments(data)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDepLoading(false)
            }
        };
        fetchDepartment();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
            setFliterDepartments(records)
    }


    return (
        <>{depLoadoding ? <div>Loading ...</div> : 
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Mange Department</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                type="text"
                placeholder="Search By Dep Name"
                        className="px-4 py-0.5 border"
                        onChange={filterDepartments}
                />
                <Link
                to="/admin-dashboard/add-department"
                className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                Add New Department
                </Link>
                </div>
                <div className="mt-5">
            <DataTable
                columns={columns} data={fliteredDepartments} pagination
            />
                </div>
            </div>
            }</>
    );
};

export default DepartmentList;
