

// import React from 'react';
// import { InputField, SelectField, DateField, RadioButton } from './FormElements';

// export const PersonalTab = () => (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

//         {/* Right Column: Basic Info */}
//         {/* Mobile par 1 column, SM par 2, aur LG par 2/3 hissa lega */}
//         <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                 <InputField label="ملازم کا نام" placeholder="نام درج کریں" />
//                 <SelectField label="لقب" options={["جناب", "مولانا", "قاری", "ڈاکٹر"]} />

//                 {/* Relation Section: Responsive for all screens */}
//                 <div className="sm:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-4 bg-[var(--color-input)] rounded-2xl border border-[var(--color-border)]">
//                     <div className="flex items-center gap-4 shrink-0">
//                         <label className="text-sm font-black text-[var(--color-text-muted)]">رشتہ:</label>
//                         <div className="flex gap-4">
//                             <RadioButton label="والد" name="relation" defaultChecked />
//                             <RadioButton label="شوہر" name="relation" />
//                         </div>
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="والد/شوہر کا نام"
//                         className="w-full md:flex-1 bg-transparent border-b-2 border-[var(--color-border)] outline-none focus:border-[var(--color-primary)] font-bold text-base md:text-lg"
//                     />
//                 </div>

//                 <DateField label="تاریخ پیدائش" />
//                 <SelectField label="جنس" options={["مرد", "خواتین"]} />
//                 <InputField label="شناختی کارڈ نمبر" placeholder="00000-0000000-0" />
//                 <InputField label="موبائل نمبر" placeholder="03XX-XXXXXXX" />
//                 <InputField label="ای میل" placeholder="example@email.com" type="email" />
//                 <SelectField label="شعبہ" options={["تعلیمی", "انتظامی", "آئی ٹی", "حسابات"]} />
//                  <SelectField
//                         label="شفٹ کا انتخاب"
//                         options={["Morning Shift (8-4)", "Evening Shift (2-10)", "Full Day", "Custom Timing"]}
//                     />

//             </div>
//         </div>

//         {/* Left Column: Family & Emergency Info */}
//         {/* Mobile par ye sab se upar aayega (Optional: order-1) ya niche (order-2) */}
//         <div className="order-1 lg:order-2 space-y-6 bg-[var(--color-input)] p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border border-[var(--color-border)] h-fit shadow-inner">
//             <h3 className="text-sm font-black text-[var(--color-primary)] uppercase tracking-widest border-r-4 border-[var(--color-primary)] pr-3 mb-4 font-urdu">فیملی اور ہنگامی رابطہ</h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
//                 <InputField label="والد کا شناختی کارڈ" placeholder="00000-0000000-0" isDark />
//                 <InputField label="والدہ کا شناختی کارڈ" placeholder="00000-0000000-0" isDark />

//                 <div className="sm:col-span-2 lg:col-span-1 pt-4 border-t border-[var(--color-border)] space-y-4">
//                     <InputField label="وارث کا نام" placeholder="نام درج کریں" isDark />
//                     <SelectField label="رشتہ" options={["بھائی", "بہن", "بیٹا", "بیٹی", "دیگر"]} isDark />
//                     <InputField label="وارث کا شناختی کارڈ" placeholder="00000-0000000-0" isDark />

//                 </div>
//             </div>
//         </div>

//     </div>
// );
import React, { useState } from 'react';
import { InputField, SelectField, DateField, RadioButton } from './FormElements';
import { Plus, GraduationCap, Trash2, X, Image as ImageIcon, UploadCloud } from 'lucide-react';

export const PersonalTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Demo Data for visualization
    const [academicList, setAcademicList] = useState([
        { 
            id: 1, 
            degree: 'میٹرک', 
            institute: 'گورنمنٹ ہائی اسکول', 
            year: '2018', 
            grade: 'A', 
            image: 'https://via.placeholder.com/150/e2e8f0/475569?text=Matric' 
        },
        { 
            id: 2, 
            degree: 'انٹرمیڈیٹ', 
            institute: 'پنجاب کالج', 
            year: '2020', 
            grade: 'A+', 
            image: null 
        }
    ]);
    
    const [tempDegree, setTempDegree] = useState({ 
        degree: '', institute: '', year: '', grade: '', image: null 
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTempDegree({ ...tempDegree, image: URL.createObjectURL(file) });
        }
    };

    const handleAddDegree = () => {
        // Validation: Degree aur Institute lazmi hona chahiye
        if (tempDegree.degree.trim() !== '' && tempDegree.institute.trim() !== '') {
            setAcademicList([...academicList, { ...tempDegree, id: Date.now() }]);
            
            // Reset fields and close modal
            setTempDegree({ degree: '', institute: '', year: '', grade: '', image: null });
            setIsModalOpen(false);
        } else {
            alert("براہ کرم ڈگری اور ادارے کا نام درج کریں۔");
        }
    };

    const removeDegree = (id) => {
        setAcademicList(academicList.filter(item => item.id !== id));
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Right Column: Personal Info */}
                <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <InputField label="ملازم کا نام" placeholder="نام درج کریں" />
                        <SelectField label="لقب" options={["جناب", "مولانا", "قاری", "ڈاکٹر"]} />

                        <div className="sm:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-4 bg-[var(--color-input)] rounded-2xl border border-[var(--color-border)]">
                            <div className="flex items-center gap-4 shrink-0">
                                <label className="text-sm font-black text-[var(--color-text-muted)]">رشتہ:</label>
                                <div className="flex gap-4">
                                    <RadioButton label="والد" name="relation" defaultChecked />
                                    <RadioButton label="شوهر" name="relation" />
                                </div>
                            </div>
                            <input type="text" placeholder="والد/شوہر کا نام" className="w-full md:flex-1 bg-transparent border-b-2 border-[var(--color-border)] outline-none focus:border-[var(--color-primary)] font-bold text-base md:text-lg" />
                        </div>

                        <DateField label="تاریخ پیدائش" />
                        <SelectField label="جنس" options={["مرد", "خواتین"]} />
                        <InputField label="شناختی کارڈ نمبر" placeholder="00000-0000000-0" />
                        <InputField label="موبائل نمبر" placeholder="03XX-XXXXXXX" />
                        <InputField label="ای میل" placeholder="example@email.com" type="email" />
                        <SelectField label="شعبہ" options={["تعلیمی", "انتظامی", "آئی ٹی", "حسابات"]} />
                      
                    </div>
                       <div>
                        <InputField label="مستقل پتا" placeholder="مستقل پتا" />
                    </div>
                    <div >
                        <SelectField label="شفٹ کا انتخاب" options={["Morning Shift (8-4)", "Evening Shift (2-10)", "Full Day"]} />

                    </div>
                   

                    {/* Academic List View */}
                    <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                        <div className="flex justify-between items-center mb-6 px-2">
                            <h4 className="text-sm font-black text-[var(--color-primary)] uppercase tracking-widest font-urdu">تعلیمی اسناد</h4>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl text-xs font-black hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/20"
                            >
                                <Plus size={16} /> مزید شامل کریں
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {academicList.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-sm group hover:border-[var(--color-primary)] transition-all animate-in zoom-in-95">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--color-input)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt="degree" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={18} className="text-[var(--color-text-muted)] opacity-40" />
                                            )}
                                        </div>
                                        <div>
                                            <h5 className="font-black text-xs leading-none mb-1 text-[var(--color-text)]">
                                                {item.degree} <span className="text-[var(--color-primary)] ml-1">({item.year})</span>
                                            </h5>
                                            <p className="text-[9px] text-[var(--color-text-muted)] font-bold truncate max-w-[150px]">{item.institute}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeDegree(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Left Column (No Changes) */}
                <div className="order-1 lg:order-2 space-y-6 bg-[var(--color-input)] p-5 md:p-6 rounded-[2rem] border border-[var(--color-border)] h-fit shadow-inner">
                    <h3 className="text-sm font-black text-[var(--color-primary)] uppercase tracking-widest border-r-4 border-[var(--color-primary)] pr-3 mb-4 font-urdu">فیملی اور ہنگامی رابطہ</h3>
                    <div className="space-y-4">
                        <InputField label="والد کا شناختی کارڈ" isDark />
                        <InputField label="والدہ کا شناختی کارڈ" isDark />
                        <div className="pt-4 border-t border-[var(--color-border)] space-y-4">
                            <InputField label="وارث کا نام" isDark />
                            <SelectField label="رشتہ" options={["بھائی", "بیٹا", "بیٹی", "دیگر"]} isDark />
                        </div>
                          <InputField label="موبائل نمبر" placeholder="03XX-XXXXXXX" isDark/>
                    </div>
                </div>
            </div>

            {/* Modal - Now Using Theme Colors */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[var(--color-surface)] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="bg-[var(--color-primary)] p-5 text-white flex justify-between items-center">
                            <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2"> <GraduationCap size={18}/> تعلیمی اسناد کی معلومات</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={20}/></button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <SelectField label="ڈگری کا نام" options={["میٹرک", "انٹرمیڈیٹ", "گریجویشن", "ماسٹرز", "حفظ"]} onChange={(e) => setTempDegree({...tempDegree, degree: e.target.value})} />
                                </div>
                                <div className="col-span-2">
                                    <InputField label="ادارے کا نام" onChange={(e) => setTempDegree({...tempDegree, institute: e.target.value})} />
                                </div>
                                <InputField label="سال" type="number" onChange={(e) => setTempDegree({...tempDegree, year: e.target.value})} />
                                <InputField label="گریڈ" onChange={(e) => setTempDegree({...tempDegree, grade: e.target.value})} />
                            </div>

                            <div className="relative group">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-border)] rounded-3xl bg-[var(--color-input)] hover:bg-[var(--color-surface)] transition-all cursor-pointer overflow-hidden">
                                    {tempDegree.image ? (
                                        <img src={tempDegree.image} className="w-full h-full object-contain p-2" alt="preview" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <UploadCloud className="text-[var(--color-primary)] opacity-50 mb-2" size={30} />
                                            <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase">تصویر اپ لوڈ کریں</p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>

                            <button 
                                onClick={handleAddDegree} 
                                className="w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-xs hover:opacity-90 shadow-xl shadow-[var(--color-primary)]/20"
                            >
                                محفوظ کریں
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};