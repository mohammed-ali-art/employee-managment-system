import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import connectToDatabase from "./db/db.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import departmentHeadRoutes from "./routes/departmentHeads.js";
import headdashboardRoutes from "./routes/head-dashboard.js";
import leaveHeadRoutes from "./routes/leaveHead.js";
import attendanceRoutes from "./routes/attendance.js";

import dotenv from "dotenv";
dotenv.config();

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public/uploads"));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/department-heads", departmentHeadRoutes);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/head-dashboard", headdashboardRoutes);
app.use("/api/leaveHead", leaveHeadRoutes);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/attendance", attendanceRoutes);

app.listen(process.env.PORT, () => {
  console.log(` Server is Runnig on port ${process.env.PORT}`);
});
