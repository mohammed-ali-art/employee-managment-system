import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DepartmentHeadDashboard from "./pages/DepartmentHeadDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRouter from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import ViewSalary from "./components/salary/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import EmployeeSummary from "./components/EmployeeDashboard/Summary"
import ListLeaves from "./components/leave/List"
import AddLeave from "./components/leave/AddLeave"
import Setting from "./components/EmployeeDashboard/Setting";
import Tabel from "./components/leave/Tabel";
import Detail from "./components/leave/Details";
import DepartmentHeadsList from "./components/departmentHead/DepartmentHeadsList"
import PromoteEmployee from "./components/departmentHead/PromoteEmployee"
import Attendance from "./components/attendance/Attendance";
import SummaryOfDepHead from "./components/DepartmentHeadDasbord/SummaryOfDepHead";
import ListEmployee from "./components/DepartmentHeadDasbord/ListEmpolyee";
import ListHead from "./components/DepartmentHeadDasbord/ListLeaveHead";
import AttendanceRebort from "./components/attendance/AttendanceRebort";
import AttendanceHead from "./components/DepartmentHeadDasbord/AttendanceHead";
import AttendanceRepotHead from "./components/DepartmentHeadDasbord/AttendanceReportHead";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
            <PrivateRouter>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRouter>
          }
        >
          <Route index element={<AdminSummary />}></Route>

          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>
          <Route path="/admin-dashboard/department-heads" element={<DepartmentHeadsList />} />
          <Route path="/admin-dashboard/promote-employee" element={<PromoteEmployee />} />

          
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/admin-dashboard/leaves" element={<Tabel />}></Route>
          <Route path="/admin-dashboard/leaves/:id"  element={<Detail />}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id"  element={<ListLeaves />}></Route>


          
          <Route path="/admin-dashboard/setting"  element={<Setting />}></Route>
          <Route path="/admin-dashboard/attendance"  element={<Attendance />}></Route>
          <Route path="/admin-dashboard/attendance-report"  element={<AttendanceRebort />}></Route>
  

          <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>

        </Route>
        <Route path="/employee-dashboard" element={
          <PrivateRouter>
            <RoleBaseRoutes requiredRole={["admin" , "employee" , "departmentHead"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRouter>
        }>
          <Route index element={<EmployeeSummary />}></Route>

        <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
        <Route path="/employee-dashboard/leaves/:id" element={<ListLeaves  />}></Route>
        <Route path="/employee-dashboard/add-leave" element={<AddLeave  />}></Route>
        <Route path="/employee-dashboard/salary/:id" element={<ViewSalary  />}></Route>
        <Route path="/employee-dashboard/setting" element={<Setting  />}></Route>



        </Route>
        
                <Route path="/departmentHead-dashboard" element={
          <PrivateRouter>
            <RoleBaseRoutes requiredRole={[ "departmentHead"]}>
              <DepartmentHeadDashboard />
            </RoleBaseRoutes>
          </PrivateRouter>
        }>

          <Route index element={<SummaryOfDepHead />}></Route>
          
          <Route path="/departmentHead-dashboard/employees" element={<ListEmployee />}></Route>
          <Route path="/departmentHead-dashboard/employees/:id" element={<View />}></Route>
          <Route path="/departmentHead-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/departmentHead-dashboard/employees/leaves/:id"  element={<ListLeaves />}></Route>
          <Route path="/departmentHead-dashboard/leaves/:id" element={<Detail />}></Route>
          <Route path="/departmentHead-dashboard/leaves" element={<ListHead />}></Route>
          <Route path="/departmentHead-dashboard/attendance" element={<AttendanceHead />}></Route>
          <Route path="/departmentHead-dashboard/attendanceReport" element={<AttendanceRepotHead />}></Route>


          <Route path="/departmentHead-dashboard/setting" element={<Setting  />}></Route>








        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
