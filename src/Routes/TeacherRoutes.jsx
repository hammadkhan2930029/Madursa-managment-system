import { Route } from 'react-router-dom';
import { TeachersList } from '../Pages/Teachers/TeacherList/TeachersList';


export const TeacherRoutes = (
    <Route path="teachers">
        <Route path="list" element={<TeachersList />} />
        {/* <Route path="attendance" element={<TeacherAttendance />} /> */}
    </Route>
);