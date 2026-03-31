import { Route } from 'react-router-dom';
import { StudentList } from '../Pages/Students/StudentList/StudentsList';
import { AdmissionForm } from '../Pages/Students/AdmissionForm/AdmissionForm';

export const StudentRoutes = (
    <Route path="students">
        <Route path="list" element={<StudentList />} />
        <Route path="admission" element={<AdmissionForm />} />
    </Route>
);