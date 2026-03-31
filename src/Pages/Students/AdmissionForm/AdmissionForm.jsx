import React, { useState } from 'react';
import { Camera, Save, User, MapPin, Phone, BookOpen, HeartPulse } from 'lucide-react';
import { Formik, Form, Field } from 'formik';

export const AdmissionForm = () => {
    const [imagePreview, setImagePreview] = useState(null);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6" dir="rtl">
            <Formik
                initialValues={{
                    idNo: '', admissionDate: '', admissionFee: '',
                    fullName: '', fatherName: '', caste: '', cnic: '', dob: '', bForm: '',
                    currentAddress: '', permanentAddress: '', district: '',
                    fatherOccupation: '', mobile: '', whatsapp: '',
                    guardianName: '', relation: '', guardianMobile: '', guardianEmail: '', guardianCnic: '',
                    prevMadrassa: '', prevSchool: '', secularEdu: '', religiousEdu: '',
                    requiredClass: '', requiredJamaat: '', teacherName: '',
                    medicalCondition: '', monthlyFee: '', reside: 'نہیں'
                }}
                onSubmit={() => window.print()}
            >
                {({ setFieldValue, values }) => (
                    <>
                        {/* --- MODERN INPUT UI (Screen View) --- */}
                        <Form className="print:hidden space-y-8 pb-10">
                            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
                                <div className="bg-[#002a33] p-8 text-center text-white">
                                    <h2 className="text-3xl font-bold">طالب علم رجسٹریشن فارم</h2>
                                    <p className="text-emerald-400 mt-2">جامعہ انوار القرآن</p>
                                </div>

                                <div className="p-6 md:p-10 space-y-12">
                                    {/* Section 1: Official */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end border-b pb-8">
                                        <InputField label="داخلہ نمبر" name="idNo" />
                                        <InputField label="داخلہ فیس" name="admissionFee" />
                                        <InputField label="تاریخ داخلہ" name="admissionDate" type="date" />
                                        <div className="flex justify-center">
                                            <label className="w-24 h-28 border-4 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden bg-slate-50">
                                                {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <Camera className="text-slate-400" />}
                                                <input type="file" className="hidden" onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => { setImagePreview(reader.result); setFieldValue('studentImage', reader.result); };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Section 2: Personal */}
                                    <FormSection title="بنیادی معلومات" icon={<User size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <InputField label="نام طالب علم" name="fullName" />
                                            <InputField label="والد کا نام" name="fatherName" />
                                            <InputField label="قومیت / ذات" name="caste" />
                                            <InputField label="شناختی کارڈ نمبر" name="cnic" />
                                            <InputField label="بے فارم نمبر" name="bForm" />
                                            <InputField label="تاریخ پیدائش" name="dob" type="date" />
                                        </div>
                                    </FormSection>

                                    {/* Section 3: Contact */}
                                    <FormSection title="رابطہ اور پتہ" icon={<MapPin size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <InputField label="حالیہ پتہ" name="currentAddress" />
                                            <InputField label="مستقل پتہ" name="permanentAddress" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                            <InputField label="ضلع" name="district" />
                                            <InputField label="والد کا پیشہ" name="fatherOccupation" />
                                            <InputField label="موبائل نمبر" name="mobile" />
                                            <InputField label="واٹس ایپ" name="whatsapp" />
                                        </div>
                                    </FormSection>

                                    {/* Section 4: Guardian */}
                                    <FormSection title="سرپرست کی تفصیل" icon={<Phone size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <InputField label="نام سرپرست" name="guardianName" />
                                            <InputField label="رشتہ" name="relation" />
                                            <InputField label="سرپرست موبائل" name="guardianMobile" />
                                            <InputField label="سرپرست CNIC" name="guardianCnic" />
                                            <InputField label="ای میل" name="guardianEmail" />
                                        </div>
                                    </FormSection>

                                    {/* Section 5: Education */}
                                    <FormSection title="تعلیمی ریکارڈ" icon={<BookOpen size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <InputField label="دینی تعلیم" name="religiousEdu" />
                                            <InputField label="عصری تعلیم" name="secularEdu" />
                                            <InputField label="سابقہ مدرسہ" name="prevMadrassa" />
                                            <InputField label="مطلوبہ درجہ" name="requiredClass" />
                                            <InputField label="جماعت" name="requiredJamaat" />
                                            <InputField label="استاد کا نام" name="teacherName" />
                                        </div>
                                    </FormSection>

                                    {/* Section 6: Others */}
                                    <FormSection title="دیگر معلومات" icon={<HeartPulse size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <InputField label="ماہانہ فیس" name="monthlyFee" />
                                            <InputField label="بیماری (اگر ہے)" name="medicalCondition" />
                                            <InputField label="رہائشی (ہاں/نہیں)" name="reside" />
                                        </div>
                                    </FormSection>

                                    <button type="submit" className="w-full bg-[#00d094] hover:bg-[#00b37e] text-[#002a33] py-6 rounded-2xl font-black text-2xl transition-all shadow-xl flex items-center justify-center gap-4">
                                        <Save size={28} /> ڈیٹا محفوظ اور پرنٹ نکالیں
                                    </button>
                                </div>
                            </div>
                        </Form>

                        {/* --- PROFESSIONAL PRINT VIEW (A4 - Clean Layout) --- */}
                        {/* --- IMPROVED PRINT VIEW (No Overlap) --- */}
                        <div className="hidden print:block w-full text-[13px] font-serif" dir="rtl">
                            <div className="border-[3px] border-black p-6 relative bg-white h-[1060px]">

                                {/* Header Section */}
                                <div className="text-center border-b-2 border-black pb-4 mb-6">
                                    <h1 className="text-4xl font-bold">جامعہ انوار القرآن</h1>
                                    <div className="bg-black text-white px-6 py-1 rounded-full inline-block text-lg font-bold mt-2">داخلہ فارم</div>
                                </div>

                                {/* Top Info Row with Image */}
                                <div className="flex gap-6 mb-8 items-start">
                                    {/* Student Photo - Ab ye layout ka hissa hai, overlap nahi karega */}
                                    <div className="w-32 h-40 border-2 border-black flex-shrink-0 flex items-center justify-center bg-gray-50 shadow-sm">
                                        {imagePreview ? (
                                            <img src={imagePreview} className="w-full h-full object-cover" alt="Student" />
                                        ) : (
                                            <span className="text-xs text-center p-2 text-gray-400">تصویر چسپاں کریں</span>
                                        )}
                                    </div>

                                    {/* Basic Official Fields next to photo */}
                                    <div className="flex-1 space-y-6 pt-2">
                                        <div className="flex gap-4">
                                            <PrintLine label="داخلہ نمبر" value={values.idNo} />
                                            <PrintLine label="تاریخ داخلہ" value={values.admissionDate} />
                                        </div>
                                        <div className="flex gap-4">
                                            <PrintLine label="داخلہ فیس" value={values.admissionFee} />
                                            <PrintLine label="قومیت / ذات" value={values.caste} />
                                        </div>
                                        <div className="flex gap-4">
                                            <PrintLine label="نام طالب علم" value={values.fullName} flex="1.5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Remaining Fields - Safe from Overlap */}
                                <div className="space-y-6">
                                    <div className="flex gap-6">
                                        <PrintLine label="والد کا نام" value={values.fatherName} />
                                        <PrintLine label="شناختی کارڈ نمبر" value={values.cnic} />
                                    </div>

                                    <div className="flex gap-6">
                                        <PrintLine label="بے فارم نمبر" value={values.bForm} />
                                        <PrintLine label="تاریخ پیدائش" value={values.dob} />
                                    </div>

                                    <PrintLine label="حالیہ پتہ" value={values.currentAddress} />
                                    <PrintLine label="مستقل پتہ" value={values.permanentAddress} />

                                    <div className="grid grid-cols-3 gap-6">
                                        <PrintLine label="ضلع" value={values.district} />
                                        <PrintLine label="موبائل نمبر" value={values.mobile} />
                                        <PrintLine label="واٹس ایپ" value={values.whatsapp} />
                                    </div>

                                    <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg space-y-4">
                                        <div className="flex gap-6">
                                            <PrintLine label="نام سرپرست" value={values.guardianName} />
                                            <PrintLine label="رشتہ" value={values.relation} />
                                        </div>
                                        <div className="flex gap-6">
                                            <PrintLine label="سرپرست موبائل" value={values.guardianMobile} />
                                            <PrintLine label="سرپرست CNIC" value={values.guardianCnic} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-10 gap-y-6 border-t pt-4">
                                        <PrintLine label="دینی تعلیم" value={values.religiousEdu} />
                                        <PrintLine label="عصری تعلیم" value={values.secularEdu} />
                                        <PrintLine label="سابقہ مدرسہ" value={values.prevMadrassa} />
                                        <PrintLine label="بیماری" value={values.medicalCondition} />
                                    </div>

                                    <div className="flex gap-6 bg-slate-100 p-3 rounded border border-black/20">
                                        <PrintLine label="مطلوبہ درجہ" value={values.requiredClass} />
                                        <PrintLine label="جماعت" value={values.requiredJamaat} />
                                        <PrintLine label="ماہانہ فیس" value={values.monthlyFee} />
                                    </div>
                                </div>

                                {/* Footer Signatures */}
                                <div className="absolute bottom-2 left-0 right-0 flex justify-around px-10">
                                    <div className="text-center w-48 border-t-2 border-black pt-2 font-bold text-lg">دستخط سرپرست</div>
                                    <div className="text-center w-48 border-t-2 border-black pt-2 font-bold text-lg">دستخط ناظمِ اعلیٰ</div>
                                </div>
                            </div>
                        </div>

                        <style dangerouslySetInnerHTML={{
                            __html: `
        /* Google Fonts Import */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Sans+Arabic:wght@400;700&display=swap');

        @media print {
            @page { 
                size: A4 portrait; 
                margin: 0; 
            }
            
            body { 
                margin: 0; 
                visibility: hidden; 
                -webkit-print-color-adjust: exact; 
            }

            .print\\:block { 
                visibility: visible; 
                position: absolute; 
                top: 0; 
                left: 0; 
                width: 100%; 
                /* Modern Clean Font Apply Kiya Hai */
                font-family: 'Noto Sans Arabic', sans-serif; 
                line-height: 1.6;
            }

            /* Heading ke liye Nastaliq Font (Madrassa Look) */
            .print\\:block h1 {
                font-family: 'Noto Nastaliq Urdu', serif;
                line-height: 2.2;
            }

            nav, aside, footer, .navbar, .print\\:hidden { 
                display: none !important; 
            }

            /* Dotted lines ko print mein wazay karne ke liye */
            .border-dotted {
                border-bottom-style: dotted !important;
                border-bottom-width: 2px !important;
                border-bottom-color: #000 !important;
            }
        }

        /* Screen par bhi font acha dikhne ke liye */
        .form-container {
            font-family: 'Noto Sans Arabic', sans-serif;
        }
    `
                        }} />
                    </>
                )}
            </Formik>
        </div>
    );
};

// UI Helper Components
const FormSection = ({ title, icon, children }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#002a33] flex items-center gap-2 border-r-4 border-[#00d094] pr-3 bg-slate-50 py-2 rounded-l-lg">
            {icon} {title}
        </h3>
        {children}
    </div>
);

const InputField = ({ label, name, type = "text" }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-500 mr-1">{label}</label>
        <Field name={name} type={type} className="bg-slate-50 border-2 border-slate-100 p-3.5 rounded-xl focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-sm font-medium" />
    </div>
);

const PrintLine = ({ label, value, flex = "1" }) => (
    <div style={{ flex }} className="flex items-baseline gap-2">
        <span className="font-bold text-gray-800 whitespace-nowrap">{label}:</span>
        <span className="flex-1 border-b border-black border-dotted min-h-[22px] px-2 italic text-[14px]">{value}</span>
    </div>
);