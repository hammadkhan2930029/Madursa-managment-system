import React, { useState,useEffect } from 'react';
import { SelectField, InputField } from '../../../Components/HR/FormElements';
import { Search, PlusCircle, UserPlus, Trash2, CheckCircle2 } from 'lucide-react';

export const StudentAddToClass = () => {
      useEffect(() => {
            window.scrollTo(0, 0)
        }, [])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filters, setFilters] = useState({ session: '', className: '', section: '' });
    const [assignedList, setAssignedList] = useState([
        { id: 1, name: 'Ali Ahmed', rollNo: '101', session: '2025-26', class: 'اول', section: 'A' }
    ]);

    // Demo Search Results
    const studentsData = [
        { id: 101, name: 'Hammad Khan', father: 'Abdul Khan', regNo: 'REG-001' },
        { id: 102, name: 'Zain Ali', father: 'Muhammad Ali', regNo: 'REG-002' },
    ];

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setSearchTerm(''); // Search clear kar dein
    };

    const handleAddToList = () => {
        if (selectedStudent && filters.session && filters.className && filters.section) {
            const newData = {
                id: Date.now(),
                name: selectedStudent.name,
                rollNo: selectedStudent.regNo,
                session: filters.session,
                class: filters.className,
                section: filters.section
            };
            setAssignedList([newData, ...assignedList]);
            setSelectedStudent(null); // Reset selection
            alert("طالب علم کو کامیابی سے کلاس میں شامل کر دیا گیا ہے۔");
        } else {
            alert("براہ کرم طالب علم اور تمام فیلڈز منتخب کریں۔");
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6 bg-[var(--color-bg)] min-h-screen font-urdu text-right" dir="rtl">
            
            {/* Header */}
            <div className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm">
                <h2 className="text-3xl font-black text-[var(--color-text)]">کلاس میں طالب علم کا اندراج</h2>
                <p className="text-xs text-[var(--color-text-muted)] font-bold mt-7">طالب علم کو تلاش کریں اور سیشن/کلاس الاٹ کریں</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Step 1: Search & Select Student */}
                <div className="lg:col-span-1 space-y-4 bg-[var(--color-surface)] p-5 rounded-[2rem] border border-[var(--color-border)] h-fit">
                    <h3 className="text-sm font-black text-[var(--color-primary)] mb-4 flex items-center gap-2">
                        <Search size={18} /> مرحلہ 1: طالب علم تلاش کریں
                    </h3>
                    
                    <div className="relative">
                        <InputField 
                            placeholder="نام یا رجسٹریشن نمبر لکھیں..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <div className="absolute top-full right-0 left-0 bg-white border border-[var(--color-border)] rounded-2xl mt-2 shadow-xl z-50 overflow-hidden">
                                {studentsData.map(s => (
                                    <div 
                                        key={s.id} 
                                        onClick={() => handleSelectStudent(s)}
                                        className="p-3 hover:bg-[var(--color-primary)]/10 cursor-pointer border-b border-slate-50 last:border-0 transition-colors"
                                    >
                                        <p className="font-black text-sm text-[var(--color-text)]">{s.name}</p>
                                        <p className="text-[10px] text-[var(--color-text-muted)]">{s.regNo} - {s.father}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedStudent && (
                        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between animate-in zoom-in-95">
                            <div>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase">منتخب شدہ:</p>
                                <p className="font-black text-sm text-emerald-900">{selectedStudent.name}</p>
                            </div>
                            <CheckCircle2 className="text-emerald-500" size={20} />
                        </div>
                    )}
                </div>

                {/* Step 2: Assign Class & Section */}
                <div className="lg:col-span-2 space-y-6 bg-[var(--color-surface)] p-5 rounded-[2rem] border border-[var(--color-border)]">
                    <h3 className="text-sm font-black text-[var(--color-primary)] mb-4 flex items-center gap-2">
                        <UserPlus size={18} /> مرحلہ 2: کلاس اور سیشن منتخب کریں
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <SelectField label="سیشن" options={["2025-26", "2024-25"]} onChange={(e) => setFilters({...filters, session: e.target.value})} />
                        <SelectField label="کلاس" options={["اول", "دوم", "سوم", "چہارم"]} onChange={(e) => setFilters({...filters, className: e.target.value})} />
                        <SelectField label="سیکشن" options={["A", "B", "C"]} onChange={(e) => setFilters({...filters, section: e.target.value})} />
                    </div>

                    <button 
                        onClick={handleAddToList}
                        className="w-full h-[55px] bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/20 active:scale-95"
                    >
                        <PlusCircle size={20} /> کلاس میں شامل کریں
                    </button>
                </div>
            </div>

            {/* Step 3: Assignment List */}
            <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] overflow-hidden shadow-sm">
                <div className="p-5 border-b border-[var(--color-border)] bg-[var(--color-input)]/30">
                    <h3 className="text-sm font-black text-[var(--color-text)]">حالیہ داخلے </h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-[var(--color-input)]/50">
                            <tr>
                                <th className="p-4 text-[10px] font-black text-[var(--color-text-muted)]">نام طالب علم</th>
                                <th className="p-4 text-[10px] font-black text-[var(--color-text-muted)]">سیشن</th>
                                <th className="p-4 text-[10px] font-black text-[var(--color-text-muted)] text-center">کلاس</th>
                                <th className="p-4 text-[10px] font-black text-[var(--color-text-muted)] text-center">سیکشن</th>
                                <th className="p-4 text-[10px] font-black text-[var(--color-text-muted)] text-center">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {assignedList.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-black text-sm">{item.name}</div>
                                        <div className="text-[9px] text-[var(--color-text-muted)]">{item.rollNo}</div>
                                    </td>
                                    <td className="p-4 text-xs font-bold text-slate-600">{item.session}</td>
                                    <td className="p-4 text-xs font-black text-center"><span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full">{item.class}</span></td>
                                    <td className="p-4 text-xs font-black text-center">{item.section}</td>
                                    <td className="p-4 text-center">
                                        <button className="text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};