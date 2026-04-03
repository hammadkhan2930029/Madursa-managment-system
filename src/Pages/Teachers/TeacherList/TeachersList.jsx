import React, { useState } from 'react';
import { Edit2, Eye, Search, UserPlus, Filter } from 'lucide-react';
import { InputField } from '../../../Components/HR/FormElements';

export const TeachersList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Sample Data
    const teachers = [
        { id: 1, empId: "EMP-2024-001", name: "حافظ محمد بلال", subject: "تجوید و حفظ", phone: "0300-1234567", status: "Active" },
        { id: 2, empId: "EMP-2024-002", name: "مولانا عبداللہ", subject: "عربی ادب", phone: "0312-7654321", status: "On Leave" },
        { id: 3, empId: "EMP-2024-003", name: "قاری عثمان غنی", subject: "قرآت", phone: "0345-9876543", status: "Active" },
    ];

    // Search Logic
    const filteredTeachers = teachers.filter(t =>
        t.name.includes(searchTerm) || t.empId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6" dir="rtl">

            {/* --- Enhanced Header & Search Section --- */}
            <div className="bg-[var(--color-surface)] rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-white/5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Title & Stats */}
                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-[var(--text-color)]">اساتذہ کی فہرست</h2>
                        <div className="flex items-center gap-3 mt-5">
                            <span className="bg-[var(--color-bg)]/20 text-[var(--color-primary)] text-[10px] font-bold px-3 py-1 rounded-full border border-[#00d094]/30 uppercase tracking-wider">
                                کل تعداد: {teachers.length}
                            </span>
                            <p className="text-white/60 text-xs font-medium">نئے سیشن کے لیے اساتذہ کا ڈیٹا اپڈیٹ کریں۔</p>
                        </div>
                    </div>

                    {/* Action Buttons & Search */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-64 group">
                            {/* <div > <Search size={18} /></div> */}
                            <InputField
                                type="text"
                                placeholder="نام یا آئی ڈی تلاش کریں..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Add Button */}
                        <button className="flex items-center justify-center gap-2 bg-[#00d094] text-[#002a33] px-6 py-3 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 w-full sm:w-auto">
                            <UserPlus size={18} />
                            <span>نیا اندراج</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Table Container --- */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-300">
                <div className="overflow-x-auto vip-scrollbar">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] bg-[var(--color-input)]/50">
                                <th className="p-5 text-[11px] font-black uppercase text-[var(--color-text-muted)]">آئی ڈی</th>
                                <th className="p-5 text-[11px] font-black uppercase text-[var(--color-text-muted)]">استاد کا نام</th>
                                <th className="p-5 text-[11px] font-black uppercase text-[var(--color-text-muted)]">مضمون</th>
                                <th className="p-5 text-[11px] font-black uppercase text-[var(--color-text-muted)]">رابطہ</th>
                                <th className="p-5 text-[11px] font-black uppercase text-[var(--color-text-muted)] text-center">سٹیٹس</th>
                                <th className="p-5 text-[11px] font-black uppercase text-[var(--color-text-muted)] text-center">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-[var(--color-bg)]/50 transition-colors group">
                                        <td className="p-5">
                                            <span className="text-[12px] font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-lg">
                                                {teacher.empId}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d094] to-[#008a63] flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                    {teacher.name.charAt(0)}
                                                </div>
                                                <span className="text-[14px] font-black text-[var(--color-text-main)]">{teacher.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-[13px] font-medium text-[var(--color-text-main)]">{teacher.subject}</td>
                                        <td className="p-5 text-[13px] font-medium text-[var(--color-text-main)]" dir="ltr">{teacher.phone}</td>
                                        <td className="p-5 text-center">
                                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${teacher.status === 'Active'
                                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                }`}>
                                                {teacher.status === 'Active' ? 'فعال' : 'رخصت'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2.5 rounded-xl bg-[#00d094]/10 text-[#00d094] hover:bg-[#00d094] hover:text-white transition-all shadow-sm">
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-10 text-center text-[var(--color-text-muted)] font-bold">
                                        کوئی ڈیٹا نہیں ملا...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};