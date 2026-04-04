import { Route } from 'react-router-dom';
import { StudentList } from '../Pages/Students/StudentList/StudentsList';
import { AdmissionForm } from '../Pages/Students/AdmissionForm/AdmissionForm';
import { CreateIdCard } from '../Pages/Students/CreateIDCard/CreateIDCard';
import { AttendancePage } from '../Pages/Students/AttendancePage/AttendancePage';
import { StudentAddToClass } from '../Pages/Students/StudentAddToClass/StudentAddToClass';
import { StudentScheduleManager } from '../Pages/Students/Schedule/Schedule'
export const StudentRoutes = (
    <Route path="students">
        <Route path="list" element={<StudentList />} />
        <Route path="admission" element={<AdmissionForm />} />
        <Route path="create-id-card" element={<CreateIdCard />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="class_asign" element={<StudentAddToClass />} />
        <Route path="schedule" element={<StudentScheduleManager />} />



    </Route>
);