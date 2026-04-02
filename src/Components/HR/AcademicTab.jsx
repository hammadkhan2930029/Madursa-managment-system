// import React from 'react';
// import { GraduationCap, Award, BookOpen, Calendar, School, FileText } from 'lucide-react';
// import { InputField, SelectField, DateField } from './FormElements';

// export const AcademicTab = () => {
//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

//             {/* Right Column: Qualifications & Degree Details */}
//             <div className="lg:col-span-2 space-y-6">

//                 {/* Section 1: Highest Qualification */}
//                 <div className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm">
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="p-2 bg-indigo-50 rounded-lg">
//                             <GraduationCap className="text-[var(--color-primary)]" size={24} />
//                         </div>
//                         <div>
//                             <h4 className="font-black text-sm uppercase tracking-wide">تعلیمی اسناد </h4>
//                             <p className="text-[10px] text-[var(--color-text-muted)] font-bold">اعلیٰ ترین ڈگری کی تفصیلات درج کریں</p>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                         <SelectField
//                             label="آخری ڈگری / سند"
//                             options={["میٹرک", "انٹرمیڈیٹ", "گریجویشن", "ماسٹرز", "پی ایچ ڈی", "عالم کورس", "حفظ"]}
//                         />
//                         <InputField label="ادارے کا نام" placeholder="جامعہ / یونیورسٹی کا نام" />
//                         <InputField label="میجر مضامین " placeholder="مثلاً: اسلامیات، کمپیوٹر سائنس" />
//                         <div className="grid grid-cols-2 gap-4">
//                             <InputField label="پاسنگ سال" placeholder="2023" type="number" />
//                             <InputField label="گریڈ / GPA" placeholder="A+ / 3.8" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Section 2: Certifications & Skills */}
//                 <div className="bg-[var(--color-input)] p-6 rounded-[2rem] border border-[var(--color-border)]">
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="p-2 bg-amber-50 rounded-lg">
//                             <Award className="text-amber-600" size={22} />
//                         </div>
//                         <div>
//                             <h4 className="font-black text-sm uppercase tracking-wide text-amber-700">اضافی مہارت </h4>
//                             <p className="text-[10px] text-amber-600/70 font-bold">ڈپلومہ یا شارٹ کورسز کی تفصیل</p>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                         <InputField label="سرٹیفکیٹ کا نام" placeholder="مثلاً: کمپیوٹر کورس، تجوید" isDark />
//                         <InputField label="جاری کردہ ادارہ" placeholder="ادارے کا نام" isDark />
//                     </div>
//                 </div>
//             </div>

//             {/* Left Column: Summary & Verification Status */}
//             <div className="space-y-6">
//                 {/* Academic Status Card */}
//                 <div className="bg-[var(--color-primary)] p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
//                     {/* Background Decorative Icon */}
//                     <School className="absolute -right-6 -bottom-6 opacity-10" size={160} />

//                     <div>
//                         <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-80 border-b border-white/20 pb-2">تعلیمی خاکہ (Profile)</h3>

//                         <div className="space-y-6 relative z-10">
//                             <div className="flex items-center gap-4">
//                                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
//                                     <FileText size={20} />
//                                 </div>
//                                 <div>
//                                     <p className="text-[10px] uppercase font-black opacity-70 tracking-wider">تصدیق کی صورتحال</p>
//                                     <h4 className="font-bold text-emerald-300">تصدیق شدہ ✅</h4>
//                                 </div>
//                             </div>

//                             <div className="bg-black/10 p-4 rounded-2xl">
//                                 <p className="text-[10px] font-black opacity-70 mb-3 uppercase tracking-widest">تکنیکی مہارت (Skills)</p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {["ایم ایس آفس", "عربی", "انتظامیہ"].map((skill) => (
//                                         <span key={skill} className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold border border-white/5">
//                                             {skill}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bottom Quote/Note */}
//                     <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
//                         <p className="text-[10px] font-medium leading-relaxed opacity-80 italic font-urdu">
//                             "تعلیم انسان کا زیور ہے، اور صحیح تعیناتی کے لیے تعلیمی پس منظر کا درست ہونا لازمی ہے۔"
//                         </p>
//                     </div>
//                 </div>

//                 {/* Attachments Note */}
//                 <div className="bg-amber-50/50 p-5 rounded-[2rem] border border-amber-100 flex items-start gap-3">
//                     <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600 shrink-0">
//                         <BookOpen size={16} />
//                     </div>
//                     <p className="text-[10px] font-black text-amber-800 leading-relaxed font-urdu">
//                         نوٹ: براہِ کرم تمام اسناد کی فوٹو کاپی فائل میں لازمی منسلک کریں تاکہ ریکارڈ مکمل رہے۔
//                     </p>
//                 </div>
//             </div>

//         </div>
//     );
// };

import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, School, FileText, Plus, Trash2, Paperclip } from 'lucide-react';
import { InputField, SelectField } from './FormElements';

export const AcademicTab = () => {
    // Multiple education entries ke liye state
    const [educations, setEducations] = useState([
        { id: 1, degree: '', institute: '', subjects: '', year: '', grade: '' }
    ]);

    // Naya education block add karne ka function
    const addEducation = () => {
        setEducations([...educations, { id: Date.now(), degree: '', institute: '', subjects: '', year: '', grade: '' }]);
    };

    // Education block remove karne ka function
    const removeEducation = (id) => {
        if (educations.length > 1) {
            setEducations(educations.filter(edu => edu.id !== id));
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Right Column: Dynamic Education Forms */}
            <div className="lg:col-span-2 space-y-6">
                
                <div className="flex justify-between items-center px-2">
                    <h4 className="font-black text-sm uppercase tracking-widest text-[var(--color-primary)]">تعلیمی اسناد (Multiple)</h4>
                    <button 
                        onClick={addEducation}
                        className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/20"
                    >
                        <Plus size={16} /> مزید شامل کریں
                    </button>
                </div>

                {educations.map((edu, index) => (
                    <div key={edu.id} className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm relative group animate-in zoom-in-95 duration-300">
                        {/* Remove Button */}
                        {educations.length > 1 && (
                            <button 
                                onClick={() => removeEducation(edu.id)}
                                className="absolute -top-2 -left-2 bg-rose-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <GraduationCap className="text-[var(--color-primary)]" size={24} />
                            </div>
                            <span className="text-[10px] font-black bg-[var(--color-input)] px-3 py-1 rounded-full border border-[var(--color-border)]">
                                ڈگری نمبر {index + 1}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <SelectField
                                label="ڈگری / سند"
                                options={["میٹرک", "انٹرمیڈیٹ", "گریجویشن", "ماسٹرز", "پی ایچ ڈی", "عالم کورس", "حفظ"]}
                            />
                            <InputField label="ادارے کا نام" placeholder="جامعہ / یونیورسٹی کا نام" />
                            <InputField label="میجر مضامین" placeholder="مثلاً: اسلامیات، کمپیوٹر" />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="پاسنگ سال" placeholder="2023" type="number" />
                                <InputField label="گریڈ / GPA" placeholder="A+ / 3.8" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Section 2: Attachment Section (All documents at once) */}
                <div className="bg-emerald-50/30 p-6 rounded-[2rem] border-2 border-dashed border-emerald-200">
                    <div className="flex flex-col items-center justify-center text-center space-y-3">
                        <div className="p-4 bg-emerald-100 rounded-full text-emerald-600">
                            <Paperclip size={28} />
                        </div>
                        <div>
                            <h4 className="font-black text-sm text-emerald-900">تمام اسناد یہاں منسلک کریں</h4>
                            <p className="text-[10px] font-bold text-emerald-700/70">PDF یا Image فارمیٹ میں تمام رزلٹ کارڈز اپ لوڈ کریں</p>
                        </div>
                        <label className="cursor-pointer bg-emerald-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black hover:bg-emerald-700 transition-colors">
                            فائلیں منتخب کریں
                            <input type="file" multiple className="hidden" />
                        </label>
                    </div>
                </div>
            </div>

            {/* Left Column: Summary Card */}
            <div className="space-y-6">
                <div className="bg-[var(--color-primary)] p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                    <School className="absolute -right-6 -bottom-6 opacity-10" size={160} />
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-80 border-b border-white/20 pb-2">تعلیمی خاکہ (Profile)</h3>
                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black opacity-70 tracking-wider">کل ڈگریاں</p>
                                    <h4 className="font-bold text-emerald-300">{educations.length} اسناد شامل ہیں</h4>
                                </div>
                            </div>
                            <div className="bg-black/10 p-4 rounded-2xl">
                                <p className="text-[10px] font-black opacity-70 mb-3 uppercase tracking-widest">تکنیکی مہارت (Skills)</p>
                                <div className="flex flex-wrap gap-2">
                                    {["ایم ایس آفس", "عربی", "انتظامیہ"].map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold border border-white/5">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50/50 p-5 rounded-[2rem] border border-amber-100 flex items-start gap-3">
                    <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600 shrink-0">
                        <BookOpen size={16} />
                    </div>
                    <p className="text-[10px] font-black text-amber-800 leading-relaxed font-urdu">
                        نوٹ: ہائرنگ کے وقت تمام اصل اسناد کی سکین شدہ کاپی اپ لوڈ کرنا لازمی ہے۔
                    </p>
                </div>
            </div>
        </div>
    );
};