import { Route } from 'react-router-dom';
import { CreateCities } from '../Pages/ProfileSetting/Cities/CreateCities'
import { Profile } from '../Pages/ProfileSetting/Profile/Profile'


export const ProfileRoutes = (
    <Route path="Profile">
        <Route path="setting" element={<Profile />} />
        <Route path="cities" element={<CreateCities />} />
    </Route>
);