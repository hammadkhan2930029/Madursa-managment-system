
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';
import { Camera, Save, User, MapPin, Phone, BookOpen, HeartPulse, Printer, X, CheckCircle, Search } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { AppImages } from '../../../Constant/AppImages';

export const AdmissionForm = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [tempValues, setTempValues] = useState({});

    // Jab Save button dabayein
    const handleFormSubmit = (values) => {
        setTempValues(values);
        setShowModal(true); // Modal open hoga
    };

    const triggerPrint = () => {
        setShowModal(false);
        setTimeout(() => {
            window.print();
        }, 500);
    };
    //--------------------------------------
    // Ye function date ko dd-mm-yyyy mein convert karega
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-2 " dir="rtl">
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
                onSubmit={handleFormSubmit}
            >
                {({ setFieldValue, values }) => (
                    <>
                        {/* --- SCREEN VIEW (Form) --- */}
                        <Form className="print:hidden space-y-8 pb-10 ">
                            <div className="bg-thembg  rounded-[2rem] shadow-2xl border-1 border-slate-50 overflow-hidden ">
                                <div className="bg-[#002a33] p-8 text-center text-white">
                                    <h2 className="text-3xl font-bold">طالب علم رجسٹریشن فارم</h2>
                                    <p className="text-emerald-400 mt-2">جامعہ انوار القرآن</p>
                                </div>

                                <div className="p-6 md:p-10 space-y-12">
                                    {/* Section 1: Official */}
                                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 items-end border-b pb-8">
                                        <InputField label="داخلہ نمبر" name="idNo" />
                                        <InputField label="داخلہ فیس" name="admissionFee" />
                                        <InputField label="تاریخ داخلہ" name="admissionDate" type="date"  />
                                        <div className="flex justify-center">
                                            <label className="w-28 h-34 border-4 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden bg-slate-50">
                                                {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" alt="preview" /> : <Camera className="text-slate-400" />}
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
                                    {/* --------------search parents------------------- */}
                                    <div className='flex flex-row justify-end items-start '>


                                        <div className="flex flex-row items-center bg-white border-2 border-slate-100 rounded-2xl shadow-sm hover:border-emerald-400 transition-all overflow-hidden group">
                                            <div className="group bg-[#00d094] hover:bg-[#00b37e] text-[#002a33] p-7 transition-colors">
                                                <Search size={22} strokeWidth={2.5} className='group-hover:text-white' />
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="والدین تلاش کریں..."
                                                className="w-full bg-slate-50 p-4 outline-none text-[#002a33] font-medium text-right focus:bg-white focus:border-emerald-400"
                                                dir="rtl"
                                            />
                                        </div>
                                    </div>


                                    {/* Section 2: Personal */}
                                    <FormSection title="بنیادی معلومات" icon={<User size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
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
                                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
                                            <InputField label="حالیہ پتہ" name="currentAddress" />
                                            <InputField label="مستقل پتہ" name="permanentAddress" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <InputField label="ضلع" name="district" />
                                            <InputField label="والد کا پیشہ" name="fatherOccupation" />
                                            <InputField label="موبائل نمبر" name="mobile" />
                                            <InputField label="واٹس ایپ" name="whatsapp" />
                                        </div>
                                    </FormSection>

                                    {/* Section 4: Guardian */}
                                    <FormSection title="سرپرست کی تفصیل" icon={<Phone size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <InputField label="نام سرپرست" name="guardianName" />
                                            <InputField label="رشتہ" name="relation" />
                                            <InputField label="سرپرست موبائل" name="guardianMobile" />
                                            <InputField label="سرپرست CNIC" name="guardianCnic" />
                                            <InputField label="ای میل" name="guardianEmail" />
                                        </div>
                                    </FormSection>

                                    {/* Section 5: Education */}
                                    <FormSection title="تعلیمی ریکارڈ" icon={<BookOpen size={20} />}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <InputField label="ماہانہ فیس" name="monthlyFee" />
                                            <InputField label="بیماری (اگر ہے)" name="medicalCondition" />
                                            <InputField label="رہائشی (ہاں/نہیں)" name="reside" />
                                        </div>
                                    </FormSection>

                                    <button type="submit" className="w-full bg-[#00d094] hover:bg-[#00b37e] text-[#002a33] py-6 rounded-2xl font-black text-2xl transition-all shadow-xl flex items-center justify-center gap-4">
                                        <Save size={28} /> ڈیٹا محفوظ کریں
                                    </button>
                                </div>
                            </div>
                        </Form>

                        {/* --- MODAL POPUP --- */}
                        {showModal && (
                            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 print:hidden">
                                <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl scale-in-center">
                                    <div className="bg-[#002a33] p-8 text-center text-white relative">
                                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X /></button>
                                        <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold">ڈیٹا محفوظ ہو گیا!</h3>
                                    </div>
                                    <div className="p-10 space-y-6 text-center">
                                        <p className="text-slate-600 text-lg">
                                            طالب علم <b>{tempValues.fullName}</b> کا فارم مکمل ہو چکا ہے۔ کیا آپ ابھی پرنٹ نکالنا چاہتے ہیں؟
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <button onClick={triggerPrint} className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all">
                                                <Printer /> ابھی پرنٹ نکالیں
                                            </button>
                                            <button onClick={() => setShowModal(false)} className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                                                صرف محفوظ کریں
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- PRINT VIEW (A4) --- */}
                        <div className="hidden print:block w-full text-[13px] px-2 py-3 relative" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu' }}>

                            <div className="absolute inset-0 flex items-center justify-center z-0" style={{ pointerEvents: 'none' }}>
                                <img
                                    src={AppImages.logo}
                                    alt="Jamia Logo Watermark"
                                    className="w-[600px] h=[300px] -mt-40"
                                    style={{
                                        webkitPrintColorAdjust: 'exact',
                                        printColorAdjust: 'exact'
                                    }}
                                />
                            </div>

                            <div className="border-[3px] border-[#004a5e] border-dashed rounded-md p-6 relative bg-white h-[1095px] z-10">

                                <div className="text-center border-b-2 border-[#004a5e] pb-2 mb-6">
                                    <h1 className="text-4xl font-bold text-[#0f172a]">جامعہ انوار القرآن</h1>
                                    <div className="bg-[#00d094] text-white px-6 py-2 rounded-full shadow-xl inline-block text-lg font-bold mt-7">داخلہ فارم</div>
                                </div>

                                <div className="flex gap-6 mb-8 items-start">
                                    <div className="w-32 h-40 border-2 border-[#00d094] rounded-xl flex-shrink-0 flex items-center justify-center bg-gray-50 z-20">
                                        {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover rounded-lg" alt="Student" /> : <span className="text-xs">تصویر</span>}
                                    </div>
                                    <div className="flex-1 space-y-6 pt-2">
                                        <div className="flex gap-4">
                                            <PrintLine label="داخلہ نمبر" value={values.idNo} />
                                            <PrintLine label="تاریخ داخلہ" value={formatDate(values.admissionDate)} />
                                        </div>
                                        <div className="flex gap-4">
                                            <PrintLine label="داخلہ فیس" value={values.admissionFee} />
                                            <PrintLine label="قومیت / ذات" value={values.caste} />
                                        </div>
                                        <PrintLine label="نام طالب علم" value={values.fullName} flex="1.5" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-6">
                                        <PrintLine label="والد کا نام" value={values.fatherName} />
                                        <PrintLine label="شناختی کارڈ نمبر" value={values.cnic} />
                                    </div>
                                    <div className="flex gap-6">
                                        <PrintLine label="بے فارم نمبر" value={values.bForm} />
                                        <PrintLine label="تاریخ پیدائش" value={formatDate(values.dob)} />
                                    </div>
                                    <PrintLine label="حالیہ پتہ" value={values.currentAddress} />
                                    <PrintLine label="مستقل پتہ" value={values.permanentAddress} />
                                    <div className="grid grid-cols-3 gap-6">
                                        <PrintLine label="ضلع" value={values.district} />
                                        <PrintLine label="موبائل نمبر" value={values.mobile} />
                                        <PrintLine label="واٹس ایپ" value={values.whatsapp} />
                                    </div>

                                    {/* Guardian Section */}
                                    <div className="bg-[#e5faf4]/80 p-4 shadow-sm rounded-lg space-y-4 border border-[#00d094]/20 ">
                                        <div className="flex gap-6">
                                            <PrintLine label="نام سرپرست" value={values.guardianName} />
                                            <PrintLine label="رشتہ" value={values.relation} />
                                        </div>
                                        <div className="flex gap-6">
                                            <PrintLine label="سرپرست موبائل" value={values.guardianMobile} />
                                            <PrintLine label="سرپرست CNIC" value={values.guardianCnic} />
                                        </div>
                                    </div>

                                    {/* Education Section */}
                                    <div className="grid grid-cols-2 gap-x-10 gap-y-6 border-t pt-4 border-[#004a5e]">
                                        <PrintLine label="دینی تعلیم" value={values.religiousEdu} />
                                        <PrintLine label="عصری تعلیم" value={values.secularEdu} />
                                        <PrintLine label="سابقہ مدرسہ" value={values.prevMadrassa} />
                                        <PrintLine label="بیماری" value={values.medicalCondition} />
                                    </div>

                                    {/* Fee Section */}
                                    <div className="flex gap-6 bg-[#e5faf4]/80 shadow-sm p-3 rounded border border-[#00d094]/20">
                                        <PrintLine label="مطلوبہ درجہ" value={values.requiredClass} />
                                        <PrintLine label="جماعت" value={values.requiredJamaat} />
                                        <PrintLine label="ماہانہ فیس" value={values.monthlyFee} />
                                    </div>
                                </div>

                                {/* Footer Signatures */}
                                <div className="absolute bottom-2 left-0 right-0 flex justify-around px-10 z-20">
                                    <div className="text-center w-48 border-t-2 border-[#004a5e] pt-2 font-bold text-lg">دستخط سرپرست</div>
                                    <div className="text-center w-48 border-t-2 border-[#004a5e] pt-2 font-bold text-lg">دستخط ناظمِ اعلیٰ</div>
                                </div>
                            </div>
                        </div>
                        

                        {/* Styles same as your original code */}
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @media print {
                                @page { size: A4 portrait; margin: 0; }
                                body { visibility: hidden; -webkit-print-color-adjust: exact; }
                                .print\\:block { visibility: visible; position: absolute; top: 0; left: 0; width: 100%; font-family: 'Noto Sans Arabic', sans-serif; }
                                h1 { font-family: 'Noto Nastaliq Urdu', serif !important; }
                            }
                        `}} />
                    </>
                )}
            </Formik>
        </div>
    );
};

// UI Components (Must be defined outside or inside the same file)
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
        <Field name={name} type={type} className="bg-themeSurface/50 border-2 border-slate-100 p-3.5 rounded-xl focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-sm font-medium" />
    </div>
);


// const DateInputField = ({ label, name, value, setFieldValue }) => (
//     <div className="flex flex-col gap-2">
//         <label className="text-sm font-semibold text-slate-500 mr-1">{label}</label>
//         <DatePicker
//             selected={(value && new Date(value)) || null}
//             onChange={(val) => setFieldValue(name, val)}
//             dateFormat="dd-MM-yyyy" // <--- Ye aapka matlooba format hai
//             className="w-full bg-slate-50 border-2 border-slate-100 p-3.5 rounded-xl focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-sm font-medium"
//             placeholderText="DD-MM-YYYY"
//         />
//     </div>
// );

const PrintLine = ({ label, value, flex = "1" }) => (
    <div style={{ flex }} className="flex items-baseline gap-2">
        <span className="font-bold text-gray-800 whitespace-nowrap">{label}:</span>
        <span className="flex-1 border-b border-black border-dotted min-h-[22px] px-2 italic text-[14px]">{value}</span>
    </div>
);

