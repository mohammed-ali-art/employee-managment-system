import mongoose from 'mongoose'



const AtrendanceScheama = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Sick" , "Leave"],
        default: null
    }
})

const Attendance = mongoose.model("Attendance", AtrendanceScheama)
export default Attendance;