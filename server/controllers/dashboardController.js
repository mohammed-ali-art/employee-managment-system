import Employee from "../models/Employee.js"
import Department from "../models/Department.js"
import Leave from "../models/Leave.js"

const getSummary = async (req, res) => {
    try { 
        const totalEmployees = await Employee.countDocuments()
        const totalDepartment = await Department.countDocuments()

        const totalSalaries = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ])

        const existingEmployeeIds = await Employee.distinct('_id')

        const employeeAppliedForLeave = await Leave.distinct('employeeId', {
            employeeId: { $in: existingEmployeeIds }
        })

        const leaveStatus = await Leave.aggregate([
            { $match: { employeeId: { $in: existingEmployeeIds } } }, // فلترة الإجازات
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
        }

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartment,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })

    } catch (error) {
        return res.status(500).json({ success: false, error: "dashboard summary error" })
    }
}


const getDepartmentHeadSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const departmentHead = await Employee.findOne({ userId })
      .populate('department', 'dep_name') 
      .select('department isDepartmentHead');

    if (!departmentHead) {
      return res.status(400).json({ success: false, error: "User not found in Employees." });
    }

    if (!departmentHead.isDepartmentHead) {
      return res.status(403).json({ success: false, error: "Access denied: not a department head." });
    }

    const departmentName = departmentHead?.department?.dep_name;

    if (!departmentName) {
      return res.status(400).json({ success: false, error: "Department dep_name not found." });
    }

    const employees = await Employee.find()
      .populate({
        path: 'department',
        match: { dep_name: departmentName },
        select: 'dep_name'
      });

    const filteredEmployees = employees.filter(emp => emp.department != null);
    const employeeIds = filteredEmployees.map(emp => emp._id);

    const EmployeesCount = employeeIds.length;

    const employeeAppliedForLeave = await Leave.distinct('employeeId', {
      employeeId: { $in: employeeIds }
    });

    const leaveStatus = await Leave.aggregate([
      { $match: { employeeId: { $in: employeeIds } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      Employees: EmployeesCount,
      leaveSummary
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Department head dashboard summary error" });
  }
};



  


export{getSummary,getDepartmentHeadSummary}