import { Navigate, Route } from 'react-router-dom';
import { StoreApprovals } from '../Pages/StoreManagement/Approvals/StoreApprovals';
import { StoreCategories } from '../Pages/StoreManagement/Categories/StoreCategories';
import { StoreDashboard } from '../Pages/StoreManagement/Dashboard/StoreDashboard';
import { StoreDamagedStock } from '../Pages/StoreManagement/DamagedStock/StoreDamagedStock';
import { StoreItems } from '../Pages/StoreManagement/Items/StoreItems';
import { StorePurchases } from '../Pages/StoreManagement/Purchases/StorePurchases';
import { StoreReports } from '../Pages/StoreManagement/Reports/StoreReports';
import { StoreReturns } from '../Pages/StoreManagement/Returns/StoreReturns';
import { StoreSupplierDetail } from '../Pages/StoreManagement/Suppliers/StoreSupplierDetail';
import { StoreSuppliers } from '../Pages/StoreManagement/Suppliers/StoreSuppliers';
import { StoreStockIssues } from '../Pages/StoreManagement/StockIssues/StoreStockIssues';
import { StoreUnits } from '../Pages/StoreManagement/Units/Units';

export const StoreRoutes = (
    <Route path="store">
        <Route index element={<Navigate to="/store/dashboard" replace />} />
        <Route path="approvals" element={<StoreApprovals />} />
        <Route path="categories" element={<StoreCategories />} />
        <Route path="dashboard" element={<StoreDashboard />} />
        <Route path="damaged-stock" element={<StoreDamagedStock />} />
        <Route path="items" element={<StoreItems />} />
        <Route path="purchases" element={<StorePurchases />} />
        <Route path="reports" element={<StoreReports />} />
        <Route path="stock-issues" element={<StoreStockIssues />} />
        <Route path="returns" element={<StoreReturns />} />
        <Route path="suppliers" element={<StoreSuppliers />} />
        <Route path="suppliers/:supplierId" element={<StoreSupplierDetail />} />
        <Route path="units" element={<StoreUnits />} />
    </Route>
);
