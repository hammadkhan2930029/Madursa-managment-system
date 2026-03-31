import React, { useState } from 'react';
import { 
    Search, Edit3, Trash2, UserPlus, 
    GraduationCap, School, Users, Hash, Phone 
} from 'lucide-react';

export const StudentList = () => {
    const [students, setStudents] = useState([
        { idNo: "STU-001", name: "محمد احمد", fatherName: "عبدالرحمن", campus: "مین کیمپس", class: "ہشتم", section: "A", familyNo: "F-501" },
        { idNo: "STU-002", name: "علی خان", fatherName: "عمران خان", campus: "گلشن کیمپس", class: "ہفتم", section: "B", familyNo: "F-702" },
        { idNo: "STU-003", name: "حمزہ یوسف", fatherName: "یوسف علی", campus: "مین کیمپس", class: "دہم", section: "C", familyNo: "F-305" },
        { idNo: "STU-003", name: "حمزہ یوسف", fatherName: "یوسف علی", campus: "مین کیمپس", class: "دہم", section: "C", familyNo: "F-305" },
        { idNo: "STU-003", name: "حمزہ یوسف", fatherName: "یوسف علی", campus: "مین کیمپس", class: "دہم", section: "C", familyNo: "F-305" },

    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = students.filter(student => 
        student.name.includes(searchTerm) || 
        student.idNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.familyNo.includes(searchTerm)
    );

    const handleDelete = (id) => {
        if(window.confirm("کیا آپ واقعی یہ ریکارڈ ختم کرنا چاہتے ہیں؟")) {
            setStudents(students.filter(s => s.idNo !== id));
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-0 space-y-6 animate-in fade-in duration-700" dir="rtl">
            
            {/* --- HEADER & SEARCH --- */}
            <div className="flex flex-col gap-4 bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2 md:gap-3">
                            <GraduationCap className="text-[#00d094]" size={24} />
                            طلباء کی فہرست
                        </h2>
                        <p className="text-slate-400 text-[10px] md:text-xs font-bold mt-1">کل طلباء: {filteredStudents.length}</p>
                    </div>
                    <button className="bg-[#00d094] text-white p-3 md:p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-100">
                        <UserPlus size={20} />
                    </button>
                </div>

                <div className="relative group">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00d094]" size={18} />
                    <input 
                        type="text"
                        placeholder="نام، آئی ڈی یا فیملی نمبر..."
                        className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-emerald-100 rounded-2xl outline-none font-bold text-sm transition-all text-slate-700"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* --- MOBILE VIEW (Cards) --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredStudents.map((student) => (
                    <div key={student.idNo} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#00d094] font-black text-xs">
                                    {student.idNo.split('-')[1]}
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800">{student.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold">ولدیت: {student.fatherName}</p>
                                </div>
                            </div>
                            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg font-black text-[9px]">{student.idNo}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-50">
                            <div className="flex items-center gap-2">
                                <School size={14} className="text-emerald-400" />
                                <span className="text-[11px] font-bold text-slate-600">{student.campus}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Users size={14} className="text-emerald-400" />
                                <span className="text-[11px] font-bold text-slate-600">{student.class} ({student.section})</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-slate-300" />
                                <span className="text-xs font-black text-slate-500">{student.familyNo}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2.5 bg-blue-50 text-blue-500 rounded-xl"><Edit3 size={16} /></button>
                                <button onClick={() => handleDelete(student.idNo)} className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- DESKTOP VIEW (Table) --- */}
            <div className="hidden md:block bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="p-5 text-slate-400 font-black text-xs uppercase tracking-wider">آئی ڈی</th>
                            <th className="p-5 text-slate-400 font-black text-xs uppercase tracking-wider">طالب علم</th>
                            <th className="p-5 text-slate-400 font-black text-xs uppercase tracking-wider">کیمپس</th>
                            <th className="p-5 text-slate-400 font-black text-xs uppercase tracking-wider text-center">ایکشن</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredStudents.map((student) => (
                            <tr key={student.idNo} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="p-5"><span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl font-black text-[11px]">{student.idNo}</span></td>
                                <td className="p-5">
                                    <div className="font-black text-slate-700 text-sm">{student.name}</div>
                                    <div className="text-[10px] text-slate-400 font-bold">{student.fatherName} | {student.familyNo}</div>
                                </td>
                                <td className="p-5">
                                    <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full">{student.campus}</span>
                                    <div className="text-[10px] text-slate-400 font-bold mt-1">{student.class} ({student.section})</div>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Edit3 size={14} /></button>
                                        <button onClick={() => handleDelete(student.idNo)} className="p-2 bg-rose-50 text-rose-500 rounded-lg"><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- EMPTY STATE --- */}
            {filteredStudents.length === 0 && (
                <div className="p-20 text-center bg-white rounded-[2rem]">
                    <Search className="text-slate-200 mx-auto mb-4" size={48} />
                    <h3 className="text-slate-800 font-black">کوئی طالب علم نہیں ملا</h3>
                </div>
            )}
        </div>
    );
};