import React, { useState } from 'react';
import { Briefcase, Building2, Calendar, Plus, Trash2, History, CheckCircle2, FileUp } from 'lucide-react';
import { InputField, DateField } from './FormElements';

export const ExperienceTab = () => {
    // Multiple experience entries ke liye state
    const [experiences, setExperiences] = useState([
        { id: 1, title: '', company: '', start: '', end: '', description: '' }
    ]);

    const addExperience = () => {
        setExperiences([...experiences, { id: Date.now(), title: '', company: '', start: '', end: '', description: '' }]);
    };

    const removeExperience = (id) => {
        if (experiences.length > 1) {
            setExperiences(experiences.filter(exp => exp.id !== id));
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Right Column: Experience History */}
            <div className="lg:col-span-2 space-y-6">
                
                <div className="flex justify-between items-center px-2">
                    <h4 className="font-black text-sm uppercase tracking-widest text-[var(--color-primary)]">سابقہ تجربہ </h4>
                    <button 
                        onClick={addExperience}
                        className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                        <Plus size={16} /> مزید تجربہ شامل کریں
                    </button>
                </div>

                {experiences.map((exp, index) => (
                    <div key={exp.id} className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm relative group animate-in slide-in-from-right-4 duration-300">
                        
                        {/* Remove Button */}
                        {experiences.length > 1 && (
                            <button 
                                onClick={() => removeExperience(exp.id)}
                                className="absolute -top-2 -left-2 bg-rose-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Briefcase className="text-blue-600" size={24} />
                            </div>
                            <span className="text-[10px] font-black bg-[var(--color-input)] px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]">
                                تجربہ نمبر {index + 1}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <InputField label="عہدہ " placeholder="مثلاً: سینئر استاد، اکاؤنٹنٹ" />
                            <InputField label="ادارے کا نام" placeholder="سکول یا کمپنی کا نام" />
                            <DateField label="آغاز کی تاریخ" />
                            <DateField label="ختم ہونے کی تاریخ" />
                            
                            <div className="sm:col-span-2">
                                <InputField label="اہم ذمہ داریاں" placeholder="اپنی ذمہ داریوں کی مختصر تفصیل لکھیں..." />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Experience Certificates Upload */}
                <div className="bg-blue-50/30 p-6 rounded-[2rem] border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                        <FileUp size={28} />
                    </div>
                    <div>
                        <h4 className="font-black text-sm text-blue-900">تجربہ سرٹیفکیٹس اپ لوڈ کریں</h4>
                        <p className="text-[10px] font-bold text-blue-700/70">تمام سابقہ اداروں کے Experience Letters یہاں منسلک کریں</p>
                    </div>
                    <label className="cursor-pointer bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black hover:bg-blue-700 transition-colors">
                        فائلیں اپ لوڈ کریں
                        <input type="file" multiple className="hidden" />
                    </label>
                </div>
            </div>

            {/* Left Column: Experience Summary Card */}
            <div className="space-y-6">
                <div className="bg-slate-800 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/20 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                    <History className="absolute -right-6 -bottom-6 opacity-10" size={180} />
                    
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-80 border-b border-white/20 pb-2">Experience Summary</h3>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                                    <CheckCircle2 size={22} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black opacity-70 tracking-wider">کل تجربہ</p>
                                    <h4 className="font-bold">{experiences.length > 0 ? `${experiences.length} جگہ کام کیا` : 'کوئی سابقہ ریکارڈ نہیں'}</h4>
                                </div>
                            </div>

                            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                <p className="text-[10px] font-black opacity-70 mb-3 uppercase tracking-widest text-blue-300">تصدیق (Verification)</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-[10px] font-bold">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                        سابقہ ادارے سے رابطہ
                                    </li>
                                    <li className="flex items-center gap-2 text-[10px] font-bold">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                        سرٹیفکیٹ کی جانچ پڑتال
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                        <p className="text-[10px] font-bold leading-relaxed text-blue-200 font-urdu italic">
                            "سابقہ تجربہ ملازم کی پیشہ ورانہ مہارت اور استقامت کی عکاسی کرتا ہے۔"
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-[2rem] border border-blue-100 flex items-start gap-3">
                    <div className="p-1.5 bg-blue-200 rounded-lg text-blue-600 shrink-0">
                        <Building2 size={16} />
                    </div>
                    <p className="text-[10px] font-black text-blue-800 leading-relaxed font-urdu">
                        نوٹ: اگر ملازم "فریشر" ہے تو اس سیکشن کو خالی چھوڑا جا سکتا ہے۔
                    </p>
                </div>
            </div>

        </div>
    );
};