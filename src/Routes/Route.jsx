import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SideBar } from '../Components/SideBar/sidebar';

// Pages
import { Dashboard } from '../Pages/Dashboard/dashboard';
// import { Exams } from '../pages/Exams';
// import { Scholarship } from '../pages/Scholarship';
// import { Finance } from '../pages/Finance';
// import { Reports } from '../pages/Reports';
// import { Books } from '../pages/Books';
// import { Store } from '../pages/Store';
// import { Settings } from '../pages/Settings';
// import { NotFound } from '../pages/NotFound';

// Modular Routes Imports
import { StudentRoutes } from './StudentRoutes';
import { TeacherRoutes } from './TeacherRoutes';
import { DepartmentRoutes } from './DepartmentRoutes';
import { ProfileRoutes } from './ProfileRoutes';
import { CreateBranch } from '../Pages/CreateBranches/CreateBranches'
import { HRManagement } from '../Pages/HRManagement/HRManagement'
import { SettingRoutes } from './SettingRoutes';
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



        {/* <Route path="exams" element={<Exams />} />
          <Route path="scholarship" element={<Scholarship />} />
          <Route path="finance" element={<Finance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="books" element={<Books />} />
          <Route path="store" element={<Store />} />
          <Route path="settings" element={<Settings />} /> */}

        {/* Injected Modular Routes */}
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

