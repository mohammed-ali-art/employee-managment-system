import axios from "axios";
import { useEffect, useState } from "react";
import { columns, DepHeadEmployeeButtons } from "../../utils/DepHeadEmpHelper";

import DataTable from "react-data-table-component";

const ListEmployee = () => {
    const [employees, setEmployees] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [empLoadoding, setEmpLoading] = useState(false)
    const [fliteredEmployee, setFliterEmployees] = useState([])
    // const {}
    
    

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/department-heads/departmentHead', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department?.dep_name || "Unknown",
                        name: emp.userId?.name || "Unknown",
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: <img width={40} className="rounded-full" src={ `http://localhost:5000/${emp.userId.profileImage}`} />,
                        action: (<DepHeadEmployeeButtons Id={emp._id} />),
                        
                    }));
                    setEmployees(data);
                    setFliterEmployees(data)
                    
                    
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFliterEmployees(records)
    }   



    return (
        <div className="p-5 ">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Mange Employee</h3>
            </div>
            <div className="flex justify-between items-center mb-5">
                <input
                type="text"
                placeholder="Search By Emp Name"
                className="px-4 py-0.5 border"
                onChange={handleFilter}
                />

            </div>
            <div>
                <DataTable columns={columns} data={fliteredEmployee} pagination/>
            </div>
        </div>
    );
};

export default ListEmployee;
