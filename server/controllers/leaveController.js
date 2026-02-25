import Employee from '../models/Employee.js'
import Leave from '../models/Leave.js'

const addLeave =async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body
        const employee =await Employee.findOne({userId})
        const newLeave = new Leave({
            employeeId : employee._id,
            leaveType,
            startDate,   
            endDate,
            reason,
            
        })

        await newLeave.save()
        return res.status (200).json({success : true})

    } catch (error) {
        return res.status (500).json({success : false , error :'Leave add server error '})

    }
}


const getLeave =async (req,res) => {
    try {
        const { id , role} = req.params;
        let leaves

        if (role === "admin"  || role === "departmentHead") {
            leaves  = await Leave.find({ employeeId: id })
        }else {
            const employee =await Employee.findOne({userId : id})
            leaves = await Leave.find({ employeeId: employee._id })
        }
        
        return res.status (200).json({success : true ,leaves})

    }catch (error) {
        return res.status (500).json({success : false , error :'leave get server error '})

    }
}

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name"
                },  
                {
                    path: "userId",
                    select: "name"
                }
            ]
        })
        return res.status (200).json({success : true ,leaves})

    }catch (error) {
        return res.status (500).json({success : false , error :'leaves get server error '})

    }
}

const getLeaveDetail = async (req, res) => {
    try {
        const {id} = req.params
        const leave = await Leave.findById({ _id: id }).populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name"
                },  
                {
                    path: "userId",
                    select: "name profileImage"
                }
            ]
        })
        return res.status (200).json({success : true ,leave})

    }catch (error) {
        return res.status (500).json({success : false , error :'leave detail server error '})

    }
}

const updateLeave = async (req, res) => {
    try {
        const { id } = req.params
        const leave = await Leave.findByIdAndUpdate({ _id: id }, { status: req.body.status })
        if (!leave) {
            return res.status (404).json({success : false , error :'leave not founded '})
        }
        return res.status (200).json({success : true })
    }catch (error) {
        return res.status (500).json({success : false , error :'leave get server error '})

    }
}

const getLeavesForDepartment = async (req, res) => {
  try {
    const userId = req.user._id;

    const departmentHead = await Employee.findOne({ userId })
      .populate('department', 'dep_name')
      .select('department isDepartmentHead');

    if (!departmentHead) {
      return res.status(404).json({ success: false, error: "User not Found in Employee Tabel" });
    }

    if (!departmentHead.isDepartmentHead) {
      return res.status(403).json({ success: false, error: "User is not Department Head" });
    }

    const departmentId = departmentHead.department?._id;

    if (!departmentId) {
      return res.status(400).json({ success: false, error: "Department is Undefine" });
    }

    const employees = await Employee.find({ department: departmentId }).select('_id');
    const employeeIds = employees.map(emp => emp._id);

    const leaves = await Leave.find({ employeeId: { $in: employeeIds } })
      .populate({
        path: 'employeeId',
        select: 'userId department',
        populate: [
          { path: 'userId', select: 'name email profileImage' },
          { path: 'department', select: 'dep_name' }
        ]
      });

    res.status(200).json({ success: true, leaves });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Get leaves for Employees Error" });
  }
};




export {addLeave ,getLeaves ,getLeave,getLeaveDetail,updateLeave,getLeavesForDepartment}