import  { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PromoteEmployee = () => {
  const [employees, setEmployees] = useState([])
  const [selectedEmp, setSelectedEmp] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (res.data.success) {
        const nonHeads = res.data.employees.filter(
          (emp) => emp.userId.role !== "departmentHead"
        )
        setEmployees(nonHeads)
      }
    } catch (error) {
      console.log( error )
    }
  }

  const handlePromote = async () => {
    if (!selectedEmp) {
      alert("Please select an employee to promote")
      return
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/api/department-heads/promote/${selectedEmp}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      if (res.data.success) {
        navigate("/admin-dashboard/department-heads")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Promote Employee to Department Head</h2>
      <select
        className="border p-2 rounded w-full mb-4"
        value={selectedEmp}
        onChange={(e) => setSelectedEmp(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.userId.name} - {emp.department?.dep_name}
          </option>
        ))}
      </select>
      <button
        onClick={handlePromote}
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full"
      >
        Promote
      </button>
    </div>
  )
}

export default PromoteEmployee
