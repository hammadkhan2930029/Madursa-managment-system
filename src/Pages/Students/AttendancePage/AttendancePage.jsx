import React, { useState } from 'react';
import { SelectField, DateField } from '../../../Components/HR/FormElements';
import { Search, Save, Calendar } from 'lucide-react';

export const AttendancePage = () => {
    const [searchFilters, setSearchFilters] = useState({
        session: '',
        className: '',
        section: '',
        date: new Date().toISOString().split('T')[0]
    });

    const [students, setStudents] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const demoStudents = [
        { id: 1, rollNo: '101', name: 'Hammad Khan', status: 'Hazir' },
        { id: 2, rollNo: '102', name: 'Ali Ahmed', status: 'Hazir' },
        { id: 3, rollNo: '103', name: 'Umer Farooq', status: 'Hazir' },
        { id: 4, rollNo: '104', name: 'Usman Ghani', status: 'Hazir' },
    ];

    const handleSearch = () => {
        setStudents(demoStudents);
        setIsSearched(true);
    };

    const updateStatus = (id, newStatus) => {
        setStudents(prev => prev.map(student =>
            student.id === id ? { ...student, status: newStatus } : student
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hazir': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'Ghair Hazir': return 'text-rose-600 bg-rose-50 border-rose-100';
            case 'Leave': return 'text-amber-600 bg-amber-50 border-amber-100';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    return (
        // Theme colors background aur font apply kar diya
        <div className="p-4 md:p-6 space-y-6 bg-[var(--color-bg)] min-h-screen font-urdu text-right" dir="rtl">

            {/* Header: Compact layout for both mobile & md */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[var(--color-surface)] p-6 rounded-[2rem] shadow-sm border border-[var(--color-border)]">
                <div>
                    <h2 className="text-4xl font-black text-[var(--color-text)]">روزانہ حاضری</h2>
                    <p className="text-xs text-[var(--color-text-muted)] font-bold mt-4">طالب علموں کی حاضری کا نظام</p>
                </div>

                {/* Calendar Icon ki jagah DateField yahan shift kar di */}
                <div className="w-full md:w-64 bg-[var(--color-input)] p-1 rounded-2xl border border-[var(--color-border)]">
                    <DateField
                        label="تاریخ منتخب کریں"
                        value={searchFilters.date}
                        onChange={(e) => setSearchFilters({ ...searchFilters, date: e.target.value })}
                    />
                </div>
            </div>

            {/* Filters: MD screen par bhi mobile ki tarah columns rakhe hain */}
            <div className="grid grid-cols-1 gap-4 bg-[var(--color-surface)] p-5 rounded-[2rem] shadow-sm border border-[var(--color-border)]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <SelectField label="سیشن" options={["2025-26", "2024-25"]} onChange={(e) => setSearchFilters({ ...searchFilters, session: e.target.value })} />
                    <SelectField label="کلاس" options={["اول", "دوم", "سوم", "چہارم"]} onChange={(e) => setSearchFilters({ ...searchFilters, className: e.target.value })} />
                    <SelectField label="سیکشن" options={["A", "B", "C"]} onChange={(e) => setSearchFilters({ ...searchFilters, section: e.target.value })} />
                </div>

                <button
                    onClick={handleSearch}
                    className="w-full h-[55px] bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/20 active:scale-[0.98]"
                >
                    <Search size={18} /> حاضری لسٹ دکھائیں
                </button>
            </div>

            {/* Attendance List */}
            {isSearched && (
                <div className="bg-[var(--color-surface)] rounded-[2.5rem] shadow-sm border border-[var(--color-border)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-input)]/50">
                        <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase text-center">کل طلباء: {students.length}</p>
                    </div>

                    <div className="divide-y divide-[var(--color-border)]">
                        {students.map((student) => (
                            <div key={student.id} className="p-4 flex items-center justify-between hover:bg-[var(--color-input)]/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-black text-xs border border-[var(--color-primary)]/20">
                                        {student.rollNo}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm text-[var(--color-text)]">{student.name}</h4>
                                        <p className="text-[9px] text-[var(--color-text-muted)] font-bold">رول نمبر: {student.rollNo}</p>
                                    </div>
                                </div>

                                <div className="w-32">
                                    <select
                                        value={student.status}
                                        onChange={(e) => updateStatus(student.id, e.target.value)}
                                        className={`w-full p-2 rounded-xl border-2 text-[10px] font-black outline-none transition-all cursor-pointer ${getStatusColor(student.status)}`}
                                    >
                                        <option value="Hazir">حاضر</option>
                                        <option value="Ghair Hazir">غیر حاضر</option>
                                        <option value="Leave">رخصت</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Compact Footer for all screens */}
                    <div className="p-6 bg-[var(--color-input)] border-t border-[var(--color-border)] space-y-4">
                        <div className="flex justify-around items-center">
                            <div className="text-center">
                                <p className="text-md font-bold text-[var(--color-text-muted)] mb-1">حاضر</p>
                                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-md  font-black">{students.filter(s => s.status === 'Hazir').length}</span>
                            </div>
                            <div className="text-center">
                                <p className="text-md font-bold text-[var(--color-text-muted)] mb-1">غیر حاضر</p>
                                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-md  font-black">{students.filter(s => s.status === 'Ghair Hazir').length}</span>
                            </div>
                            <div className="text-center">
                                <p className="text-md font-bold text-[var(--color-text-muted)] mb-1">رخصت</p>
                                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-md font-black">{students.filter(s => s.status === 'Leave').length}</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-4 rounded-2xl font-black text-sm hover:opacity-95 shadow-xl shadow-[var(--color-primary)]/30 transition-all">
                            <Save size={18} /> ڈیٹا محفوظ کریں
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};