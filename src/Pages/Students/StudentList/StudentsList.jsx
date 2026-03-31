


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
        <div className="max-w-6xl mx-auto p-2 md:p-0 space-y-8 animate-in fade-in duration-700 pb-10" dir="rtl">
            
            {/* --- HEADER & SEARCH --- */}
            <div className="flex flex-col gap-6 bg-themeSurface p-6 md:p-10 rounded-[3rem] shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] border border-white/5">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl md:text-3xl font-black text-themeText flex items-center gap-3">
                            <div className="p-3 bg-[#00d094]/10 rounded-2xl text-[#00d094]">
                                <GraduationCap size={28} />
                            </div>
                            طلباء کی فہرست
                        </h2>
                        <p className="text-themeMuted text-xs font-bold mt-2 mr-14">کل رجسٹرڈ طلباء: {filteredStudents.length}</p>
                    </div>
                    <button className="bg-[#00d094] text-white p-4 rounded-[1.5rem] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#00d094]/20 group">
                        <UserPlus size={24} className="group-hover:rotate-12 transition-transform" />
                    </button>
                </div>

                <div className="relative group">
                    <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-themeMuted group-focus-within:text-[#00d094] transition-colors" size={20} />
                    <input 
                        type="text"
                        placeholder="نام، آئی ڈی یا فیملی نمبر سے تلاش کریں..."
                        className="w-full pr-14 pl-6 py-4 bg-themeBg border shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] border-white/5 focus:border-[#00d094]/30 rounded-2xl outline-none font-bold text-sm transition-all text-themeText placeholder:text-themeMuted "
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* --- MOBILE VIEW (Cards) --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredStudents.map((student) => (
                    <div key={student.idNo} className="bg-themeSurface p-6 rounded-[2.5rem] border border-white/5 shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] space-y-5">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-14 h-14 bg-[#00d094]/10 rounded-2xl flex items-center justify-center text-[#00d094] font-black text-xs border border-[#00d094]/20">
                                    {student.idNo.split('-')[1]}
                                </div>
                                <div>
                                    <h4 className="font-black text-themeText text-lg">{student.name}</h4>
                                    <p className="text-[11px] text-themeMuted font-bold mt-0.5">ولدیت: {student.fatherName}</p>
                                </div>
                            </div>
                            <span className="bg-themeBg text-themeMuted px-3 py-1 rounded-xl font-black text-[10px] border border-white/5">{student.idNo}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
                            <div className="flex items-center gap-2">
                                <School size={16} className="text-[#00d094]" />
                                <span className="text-[12px] font-bold text-themeText/80">{student.campus}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Users size={16} className="text-[#00d094]" />
                                <span className="text-[12px] font-bold text-themeText/80">{student.class} ({student.section})</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Phone size={15} className="text-themeMuted" />
                                <span className="text-xs font-black text-themeMuted">{student.familyNo}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={18} /></button>
                                <button onClick={() => handleDelete(student.idNo)} className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- DESKTOP VIEW (Table) --- */}
            <div className="hidden md:block bg-themeSurface rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-themeBg/50 border-b border-white/5">
                        <tr>
                            <th className="p-6 text-themeMuted font-black text-[11px] uppercase tracking-widest">آئی ڈی</th>
                            <th className="p-6 text-themeMuted font-black text-[11px] uppercase tracking-widest">طالب علم کی تفصیلات</th>
                            <th className="p-6 text-themeMuted font-black text-[11px] uppercase tracking-widest">کیمپس و کلاس</th>
                            <th className="p-6 text-themeMuted font-black text-[11px] uppercase tracking-widest text-center">انتظامی ایکشن</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredStudents.map((student) => (
                            <tr key={student.idNo} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-6">
                                    <span className="bg-themeBg text-themeText/70 px-4 py-2 rounded-2xl font-black text-[12px] border border-white/5">
                                        {student.idNo}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="font-black text-themeText text-base">{student.name}</div>
                                    <div className="text-[11px] text-themeMuted font-bold mt-1">ولدیت: {student.fatherName} | فیملی: {student.familyNo}</div>
                                </td>
                                <td className="p-6">
                                    <span className="text-[#00d094] font-bold text-xs bg-[#00d094]/10 px-4 py-1.5 rounded-full border border-[#00d094]/20 inline-block">
                                        {student.campus}
                                    </span>
                                    <div className="text-[11px] text-themeMuted font-bold mt-2 pr-1">{student.class} ({student.section})</div>
                                </td>
                                <td className="p-6 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <button className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/5">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(student.idNo)} className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- EMPTY STATE --- */}
            {filteredStudents.length === 0 && (
                <div className="p-24 text-center bg-themeSurface rounded-[3rem] shadow-xl border border-white/5">
                    <div className="w-24 h-24 bg-themeBg rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-themeMuted opacity-20">
                        <Search size={48} />
                    </div>
                    <h3 className="text-themeText text-xl font-black">کوئی طالب علم نہیں ملا</h3>
                    <p className="text-themeMuted font-bold mt-2">براہ کرم تلاش کے الفاظ چیک کریں</p>
                </div>
            )}
        </div>
    );
};