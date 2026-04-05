import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SideBar } from '../Components/SideBar/sidebar';
import { Dashboard } from '../Pages/Dashboard/dashboard';
// Modular Routes Imports
import { StudentRoutes } from './StudentRoutes';
import { TeacherRoutes } from './TeacherRoutes';
import { DepartmentRoutes } from './DepartmentRoutes';
import { ProfileRoutes } from './ProfileRoutes';
import { CreateBranch } from '../Pages/CreateBranches/CreateBranches'
import { HRManagement } from '../Pages/HRManagement/HRManagement'
import { SettingRoutes } from './SettingRoutes';
import { FinanceRoutes } from './FinanceRoutes';


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Dashboard Layout */}
      <Route path="/" element={<SideBar />}>

        {/* Default Redirect */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Single Core Pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="branch-management/create-branch" element={<CreateBranch />} />
        <Route path="HRManagement" element={<HRManagement />} />
       <Route path="finance/*" element={<FinanceRoutes />} />





        

        {DepartmentRoutes}
        {ProfileRoutes}
        {StudentRoutes}
        {SettingRoutes}
        {TeacherRoutes}

      </Route>

      {/* 404 Page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

