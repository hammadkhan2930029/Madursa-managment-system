import React, { useState } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, FileCheck, Award, BookOpen } from 'lucide-react';
import { InputField } from '../../../Components/HR/FormElements';

export const QualificationManagement = () => {
    const [qualifications] = useState([
        { id: 1, title: 'Matriculation', category: 'Secondary', level: 'Level 10' },
        { id: 2, title: 'Intermediate', category: 'Higher Secondary', level: 'Level 12' },
        { id: 3, title: 'Bachelor of Science', category: 'Graduation', level: 'Level 16' },
    ]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700 lg:pt-0 md:pt-0 pt-6" dir="rtl">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-row justify-between items-center gap-6 bg-[var(--color-surface)] p-4 md:p-6 rounded-[3rem] shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] border border-[var(--color-border)]">
                <div>
                    <h1 style={{ color: 'var(--color-text-main)' }} className="text-2xl font-black">تعلیمی اسناد کی ترتیب</h1>
                    <p style={{ color: 'var(--color-text-muted)' }} className="text-sm font-medium mt-7">تعلیمی ڈگریوں اور سرٹیفکیٹس کے نام یہاں رجسٹر کریں</p>
                </div>
                <div style={{ backgroundColor: 'var(--color-primary)' }} className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00d094]/20">
                    <GraduationCap size={24} />
                </div>
            </div>

            {/* --- ADD NEW DOCUMENT FORM --- */}
            <div
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                className="border rounded-[2.5rem] p-6 md:p-8 shadow-sm"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <InputField
                            type="text"
                            label={'سند / ڈگری کا نام'}
                            placeholder="مثلاً: بی ایس سی ایس"
                        />
                    </div>
                    <div className="space-y-2">
                        <InputField
                            type="text"
                            label={'کیٹیگری'}
                            placeholder="مثلاً: گریجویشن"
                        />
                    </div>
                    <div className="space-y-2">
                        <InputField
                            type="text"
                            label={'تعلیمی لیول'}
                            placeholder="مثلاً: 16 سالہ تعلیم"
                        />
                    </div>
                </div>

                <button
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    className="mt-8 w-full md:w-auto px-10 py-4 rounded-2xl text-white font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#00d094]/20"
                >
                    <Plus size={20} />
                    <span>نئی سند شامل کریں</span>
                </button>
            </div>

            {/* --- QUALIFICATIONS LIST --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {qualifications.map((edu) => (
                    <div
                        key={edu.id}
                        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                        className="group border rounded-[2rem] p-5 flex items-center justify-between hover:border-[var(--color-primary)] transition-all shadow-sm hover:shadow-md"
                    >
                        <div className="flex items-center gap-5">
                            <div style={{ backgroundColor: 'var(--color-input)' }} className="w-14 h-14 rounded-2xl flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                                <FileCheck size={26} />
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--color-text-main)' }} className="font-bold text-lg">
                                    {edu.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-4 mt-1">
                                    <span style={{ color: 'var(--color-text-muted)' }} className="text-xs flex items-center gap-1 font-medium">
                                        <BookOpen size={12} /> {edu.category}
                                    </span>
                                    <span style={{ color: 'var(--color-text-muted)' }} className="text-xs flex items-center gap-1 font-medium">
                                        <Award size={12} /> {edu.level}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                                <Edit2 size={18} />
                            </button>
                            <button className="p-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
