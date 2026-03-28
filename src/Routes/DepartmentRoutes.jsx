import { Route } from 'react-router-dom';
import { CreateClasses } from '../Pages/ClassManagment/CreateClass/CreateClass';
import { CreateSections } from '../Pages/ClassManagment/Sections/Section';
import { CreateSessions } from '../Pages/ClassManagment/Sessions/Session';
import { CreateSubjects } from '../Pages/ClassManagment/Subjects/Subjects'

export const DepartmentRoutes = (
    <>
        <Route path="class-management">
            <Route path="Classes" element={<CreateClasses />} />
            <Route path="sections" element={<CreateSections />} />
            <Route path="session" element={<CreateSessions />} />
            <Route path="subjects" element={<CreateSubjects />} />


        </Route>
        {/* 
    <Route path="hifz">
      <Route path="daily-report" element={<HifzDaily />} />
      <Route path="exams" element={<HifzExams />} />
    </Route> */}
    </>
);