import { Route } from 'react-router-dom';
import { ShiftManagement } from '../Pages/Settings/CreateShift/CreateShift';
import { DepartmentManagement } from '../Pages/Settings/CreateDepartments/CreateDepartments';
import { QualificationManagement } from '../Pages/Settings/DegreeName/DegreeName'

export const SettingRoutes = (
    <Route path="setting">
        <Route path="shift" element={<ShiftManagement />} />
        <Route path="department" element={<DepartmentManagement />} />
        <Route path="degree-name" element={<QualificationManagement />} />


    </Route>
);