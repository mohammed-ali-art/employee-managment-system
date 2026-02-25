import mongoose from 'mongoose';

const departmentHeadSchema = new mongoose.Schema({
    employee: {type: mongoose.Schema.Types.ObjectId,ref: 'Employee',required: true},
    department: {type: mongoose.Schema.Types.ObjectId,ref: 'Department',required: true},
    creatAt: { type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now}
    
});
const DepartmentHead =mongoose.model('DepartmentHead', departmentHeadSchema);
export default DepartmentHead
