import Employee from '../models/Employee.js';
import User from '../models/User.js';
import DepartmentHead from '../models/DepartmentHeads.js';
import Attendance from '../models/Attendance.js';


const getDepartmentHeads = async (req, res) => {
  try {
    const heads = await DepartmentHead.find()
      .populate({
        path: 'employee',
        populate: { path: 'userId', select: '-password' }
      })
      .populate('department');

    const validHeads = heads.filter(
  (head) => head.employee && head.employee.userId
);

    res.status(200).json({ success: true, departmentHeads: heads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error fetching department heads' });
  }
};

const promoteToDepartmentHead = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id).populate('department');
    if (!employee)
      return res.status(404).json({ success: false, error: 'Employee not found' });

    const user = await User.findById(employee.userId);
    if (!user)
      return res.status(404).json({ success: false, error: 'User not found' });

    const existing = await DepartmentHead.findOne({ employee: employee._id });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Already a department head' });
    }

    user.role = 'departmentHead';
    user.isDepartmentHead = true;
    await user.save();

    const newHead = new DepartmentHead({
      employee: employee._id,
      department: employee.department._id,
    });
    await newHead.save();

    employee.isDepartmentHead = true;
    await employee.save();

    res.status(200).json({ success: true, message: 'Promoted to department head' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error promoting employee' });
  }
};


const demoteFromDepartmentHead = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });

    const user = await User.findById(employee.userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    user.role = 'employee';
    user.isDepartmentHead = false

    await user.save();
    employee.isDepartmentHead = false;
    await employee.save();

    await DepartmentHead.findOneAndDelete({ employee: employee._id });

    res.status(200).json({ success: true, message: 'Demoted from department head' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error demoting department head' });
  }
};


const getEmployees = async (req, res) => {
  try {
    const userId = req.user._id;

    const departmentHead = await Employee.findOne({ userId })
      .populate('department', 'dep_name')
      .select('department isDepartmentHead');

    if (!departmentHead) {
      return res.status(404).json({ success: false, error: "User Not Found in Employee Tabel " });
    }

    if (!departmentHead.isDepartmentHead) {
      return res.status(403).json({ success: false, error: "User Isn't Department Head" });
    }

    const departmentId = departmentHead.department?._id;

    if (!departmentId) {
      return res.status(400).json({ success: false, error: "  Department is Undifine" });
    }

    const employees = await Employee.find({ department: departmentId })
      .populate('department', 'dep_name')
      .populate('userId', 'name email profileImage role') 
      .select('-__v');

    res.status(200).json({ success: true, employees });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "    get Employees Error" });
  }
};
const getAttendanceByDepartmentHead = async (req, res) => {
  try {
    const userId = req.user._id;

    const departmentHead = await Employee.findOne({ userId })
      .populate('department', 'dep_name')
      .select('department isDepartmentHead');

    if (!departmentHead) {
      return res.status(404).json({ success: false, error: "User Not Found in Employee Table" });
    }

    if (!departmentHead.isDepartmentHead) {
      return res.status(403).json({ success: false, error: "User Isn't Department Head" });
    }

    const departmentId = departmentHead.department?._id;

    if (!departmentId) {
      return res.status(400).json({ success: false, error: "Department is Undefined" });
    }

    const employees = await Employee.find({ department: departmentId }).select('_id');

    const employeeIds = employees.map(emp => emp._id);

    const date = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.find({ date, employeeId: { $in: employeeIds } })
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name email profileImage role" }
        ]
      })
      .select('-__v');

    res.status(200).json({ success: true, attendance });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Get Attendance Error" });
  }
};

const attendanceReportByDepartmentHead = async (req, res) => {
  try {
    const userId = req.user._id;

    const departmentHead = await Employee.findOne({ userId })
      .populate('department', 'dep_name')
      .select('department isDepartmentHead');

    if (!departmentHead) {
      return res.status(404).json({ success: false, error: "User Not Found in Employee Table" });
    }

    if (!departmentHead.isDepartmentHead) {
      return res.status(403).json({ success: false, error: "User Isn't Department Head" });
    }

    const departmentId = departmentHead.department?._id;
    if (!departmentId) {
      return res.status(400).json({ success: false, error: "Department is Undefined" });
    }

    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};

    const employees = await Employee.find({ department: departmentId }).select('_id');
    const employeeIds = employees.map(emp => emp._id);
    query.employeeId = { $in: employeeIds };

    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name email profileImage role" }
        ]
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      const recordDate = record.date;
      if (!result[recordDate]) {
        result[recordDate] = [];
      }
      result[recordDate].push({
        employeeId: record?.employeeId?.employeeId || "N/A",
        employeeName: record?.employeeId?.userId?.name || "N/A",
        department: record?.employeeId?.department?.dep_name || "N/A",
        status: record.status || "Not Marked"
      });
      return result;
    }, {});

    res.status(200).json({ success: true, groupData });

  } catch (error) {
    console.error("Error in attendanceReportByDepartmentHead:", error);
    res.status(500).json({ success: false, error: error.message || "Get Attendance Report Error" });
  }
};



export {
  getDepartmentHeads,
  promoteToDepartmentHead,
  demoteFromDepartmentHead, getEmployees, getAttendanceByDepartmentHead
  ,attendanceReportByDepartmentHead
};
