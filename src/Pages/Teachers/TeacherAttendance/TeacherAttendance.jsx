


import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, Clock, Phone, Building2, Save, Search, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemedDatePicker } from '../../../Components/DatePicker/ThemedDatePicker';

export const TeacherAttendance = () => {
    const navigate = useNavigate()
    // 1. Date State (Default aaj ki date)
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const [employees, setEmployees] = useState([
        { id: "EMP-001", name: "محمد حماد خان", mobile: "0300-1234567", department: "تعلیمی", status: "Hazir" },
        { id: "EMP-002", name: "احمد علی", mobile: "0311-7654321", department: "انتظامی", status: "Hazir" },
        { id: "EMP-003", name: "سعید احمد", mobile: "0322-9876543", department: "تعلیمی", status: "Ghair Hazir" },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setEmployees(employees.map(emp => emp.id === id ? { ...emp, status: newStatus } : emp));
    };

    const stats = {
        total: employees.length,
        hazir: employees.filter(e => e.status === "Hazir").length,
        ghairHazir: employees.filter(e => e.status === "Ghair Hazir").length,
        leave: employees.filter(e => e.status === "Leave").length,
    };

    return (
        <div className="p-6 space-y-6 bg-[var(--color-bg)] min-h-screen" dir="rtl">

            {/* --- Attendance Summary Cards --- */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard title="کل اساتذہ" count={stats.total} icon={Users} color="border-blue-500" textColor="text-blue-500" />
                <SummaryCard title="حاضر" count={stats.hazir} icon={CheckCircle} color="border-emerald-500" textColor="text-emerald-500" />
                <SummaryCard title="غیر حاضر" count={stats.ghairHazir} icon={XCircle} color="border-red-500" textColor="text-red-500" />
                <SummaryCard title="رخصت " count={stats.leave} icon={Clock} color="border-amber-500" textColor="text-amber-500" />
            </div>

            {/* --- Main Content Section --- */}
            <div className="bg-[var(--color-surface)] rounded-[2rem] shadow-xl border border-[var(--color-border)]/5 overflow-hidden">

                {/* Header Section with Date Picker */}
                <div className="p-6 border-b border-[var(--color-border)]/10 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <h2 className="text-xl font-bold text-[var(--text-color)]">روزانہ حاضری شیٹ</h2>
                        <div className="w-full lg:w-[260px]">
                            <ThemedDatePicker
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                placeholder="تاریخ منتخب کریں"
                            />
                        </div>
                    </div>

                    <div className='bg-[var(--color-bg)] flex flex-row justify-center items-center rounded-xl w-full lg:w-[35%] overflow-hidden border border-[var(--color-border)]/10'>
                        <button className='bg-[var(--color-primary)] text-white p-3'>
                            <Search size={20} />
                        </button>
                        <input placeholder='تلاش کریں (نام یا آئی ڈی)...' className='bg-transparent outline-none p-2 w-full text-sm' />
                    </div>

                    <button className="w-full lg:w-[15%] flex justify-center items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
                        <Save size={18} /> محفوظ کریں
                    </button>
                </div>

                {/* Table & Mobile View (Wahi code jo aapne diya tha) */}
                <div className="overflow-x-auto hidden lg:block">
                    <table className="w-full text-right border-collapse">
                        {/* ... table headers and rows ... */}
                        <thead>
                            <tr className="bg-black/5 text-[var(--text-color)] opacity-70 uppercase text-xs font-bold">
                                <th className="p-4">Emp No</th>
                                <th className="p-4">نام</th>
                                <th className="p-4">ڈیپارٹمنٹ</th>
                                <th className="p-4">موبائل نمبر</th>
                                <th className="p-4 text-center">حاضری</th>
                                <th className="p-4 text-center">ایکشن</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]/5">
                            {employees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-black/5 transition-colors" >
                                    <td className="p-4 font-mono text-sm">{emp.id}</td>
                                    <td className="p-4 font-bold text-[var(--text-color)]">{emp.name}</td>
                                    <td className="p-4 text-sm text-[var(--text-color)] opacity-80">{emp.department}</td>
                                    <td className="p-4 text-sm font-sans text-[var(--text-color)] opacity-80" dir="ltr">{emp.mobile}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <StatusDropdown status={emp.status} onChange={(val) => handleStatusChange(emp.id, val)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                               onClick={() => navigate(`/teachers/attendance-history/${emp.id}`)}
                                                className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"><Eye size={16} /></button>
                                           
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className='lg:hidden p-4 space-y-4'>
                    {employees.map((emp) => (
                        <div
                            onClick={() => navigate(`/teachers/attendance-history/${emp.id}`)}
                            key={emp.id} className="bg-[var(--color-bg)] p-5 rounded-3xl border border-[var(--color-border)]/10 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{emp.id}</span>
                                    <h3 className="text-lg font-black text-[var(--text-color)]">{emp.name}</h3>
                                </div>
                                <div className={`w-3 h-3 rounded-full ${emp.status === 'Hazir' ? 'bg-emerald-500' : emp.status === 'Leave' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-[var(--text-color)] opacity-70">
                                    <Building2 size={16} className="text-[var(--color-primary)]" />
                                    <span>{emp.department}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--text-color)] opacity-70" dir="ltr">
                                    <Phone size={16} className="text-[var(--color-primary)]" />
                                    <span>{emp.mobile}</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="text-[10px] font-bold opacity-40 block mb-2 mr-1 uppercase">حاضری منتخب کریں:</label>
                                <StatusDropdown status={emp.status} onChange={(val) => handleStatusChange(emp.id, val)} isFullWidth />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const SummaryCard = ({ title, count, icon, color, textColor }) => (
    <div className={`bg-[var(--color-surface)] p-6 rounded-3xl border-r-5 ${color} shadow-lg flex items-center justify-between`}>
        <div>
            <p className="text-sm font-bold opacity-60">{title}</p>
            <h3 className={`text-3xl font-black ${textColor}`}>{count}</h3>
        </div>
        <div className={`p-4 rounded-2xl bg-slate-100 ${textColor}`}>
            {React.createElement(icon, { size: 28 })}
        </div>
    </div>
);

// Reusable Dropdown Component
const StatusDropdown = ({ status, onChange, isFullWidth }) => (
    <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={`px-4 py-2.5 rounded-2xl text-sm font-bold border-2 outline-none transition-all
            ${isFullWidth ? 'w-full' : 'w-48'}
            ${status === "Hazir" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600" : ""}
            ${status === "Ghair Hazir" ? "border-red-500/20 bg-red-500/5 text-red-600" : ""}
            ${status === "Leave" ? "border-amber-500/20 bg-amber-500/5 text-amber-600" : ""}
        `}
    >
        <option value="Hazir">حاضر (Present)</option>
        <option value="Ghair Hazir">غیر حاضر (Absent)</option>
        <option value="Leave">رخصت (Leave)</option>
    </select>
);
