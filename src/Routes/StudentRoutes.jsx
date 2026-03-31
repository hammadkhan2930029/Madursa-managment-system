import { Route } from 'react-router-dom';
import { StudentList } from '../Pages/Students/StudentList/StudentsList';
import { AdmissionForm } from '../Pages/Students/AdmissionForm/AdmissionForm';
import { CreateIdCard } from '../Pages/Students/CreateIDCard/CreateIDCard'
export const StudentRoutes = (
    <Route path="students">
        <Route path="list" element={<StudentList />} />
        <Route path="admission" element={<AdmissionForm />} />
        <Route path="create-id-card" element={<CreateIdCard />} />

    </Route>
);