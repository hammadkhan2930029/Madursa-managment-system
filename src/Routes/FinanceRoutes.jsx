// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// // Setup Components
// import { ExpenseHeadsSetup } from '../Pages/Finance/Settings/ExpenceHeads/ExpenceHeads';
// import { IncomeHeadsSetup } from '../Pages/Finance/Settings/IncomeHeads/IncomeHeads';


// // Income Components
// // import FeeCollection from './pages/finance/income/FeeCollection';
// // import OtherIncome from './pages/finance/income/OtherIncome';

// // Expense Components
// // import Payroll from './pages/finance/expenses/Payroll';
// // import OperationalExpenses from './pages/finance/expenses/Operational';
// // import AdminAcademicExpenses from './pages/finance/expenses/AdminAcademic';

// // Accounts Components
// // import CashManagement from './pages/finance/accounts/CashManagement';
// // import BankManagement from './pages/finance/accounts/BankManagement';

// // Reports Components
// // import FinancialStatements from './pages/finance/reports/FinancialStatements';
// // import DefaultersList from './pages/finance/reports/Defaulters';

// export const FinanceRoutes = () => {
//     return (
//         <Routes >
//             {/* 1. مالیاتی سیٹ اپ (Setup) */}
//             <Route path="setup">
//                 <Route path="income-heads" element={<IncomeHeadsSetup />} />
//                 <Route path="expense-heads" element={<ExpenseHeadsSetup />} />
//                 <Route index element={<Navigate to="income-heads" />} />
//             </Route>

//             {/* 2. آمدنی (Income) */}
//             {/* <Route path="income">
//                 <Route path="fee-collection" element={<FeeCollection />} />
//                 <Route path="other-income" element={<OtherIncome />} />
//                 <Route index element={<Navigate to="fee-collection" />} />
//             </Route> */}

//             {/* 3. اخراجات (Expenses) */}
//             {/* <Route path="expenses">
//                 <Route path="payroll" element={<Payroll />} />
//                 <Route path="operational" element={<OperationalExpenses />} />
//                 <Route path="admin-academic" element={<AdminAcademicExpenses />} />
//                 <Route index element={<Navigate to="payroll" />} />
//             </Route> */}

//             {/* 4. بینک اور کیش (Accounts) */}
//             {/* <Route path="accounts">
//                 <Route path="cash-management" element={<CashManagement />} />
//                 <Route path="bank-management" element={<BankManagement />} />
//                 <Route index element={<Navigate to="cash-management" />} />
//             </Route> */}

//             {/* 5. رپورٹس اور آڈٹ (Reports) */}
//             {/* <Route path="reports">
//                 <Route path="financial-statements" element={<FinancialStatements />} />
//                 <Route path="defaulters" element={<DefaultersList />} />
//                 <Route index element={<Navigate to="financial-statements" />} />
//             </Route> */}

//             {/* Default Finance Route */}
//             {/* <Route index element={<Navigate to="income" />} /> */}
//         </Routes>
//     );
// };
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// // Setup Components
// import { ExpenseHeadsSetup } from '../Pages/Finance/Settings/ExpenceHeads/ExpenceHeads';
import { FinanceHeadsSetup } from '../Pages/Finance/Settings/FinanceHeadsSetup/FinanceHeadsSetup';
import { FundCollection } from '../Pages/Finance/Incomes/FundCollection/FundCollection';
import { FundList } from '../Pages/Finance/Incomes/FundList/FundList';
import { SalaryEntry } from '../Pages/Finance/Expence/Salary/salary'

export const FinanceRoutes = () => {
    return (
        <Routes>
            {/* Setup Group */}
            <Route path="setup">
                <Route path="income-expence" element={<FinanceHeadsSetup />} />
                {/* <Route path="expense-heads" element={<ExpenseHeadsSetup />} /> */}
                {/* Agar koi sirf /finance/setup par aye */}
                <Route index element={<Navigate to="income-expence" />} />
            </Route>

            {/* Income Group */}
            <Route path="income">
                <Route path="fund-collection" element={<FundCollection />} />
                <Route path="fund-list" element={<FundList />} />

                {/* <Route index element={<Navigate to="fee-collection" />} /> */}
            </Route>
            {/* Income Group */}
            <Route path="expenses">
                <Route path="payroll" element={<SalaryEntry />} />

            </Route>

            {/* Default redirect: /finance -> /finance/income/fee-collection */}
            {/* <Route index element={<Navigate to="income/fee-collection" />} /> */}
        </Routes>
    );
};