

import React, { useState } from 'react';
import {
    User, Briefcase, Wallet,
    ChevronDown, ChevronUp, CreditCard, Edit, Printer, ChevronLeft
} from 'lucide-react';
import { AppImages } from '../../../Constant/AppImages';

const InfoField = ({ label, value, dir = "rtl" }) => (
    <div className="space-y-1 print:break-inside-avoid">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-main)]/40 print:text-slate-500">{label}</p>
        <p className={`text-[15px] font-medium text-[var(--color-text-main)]/90 print:text-slate-900 ${dir === 'ltr' ? 'text-left font-sans' : 'text-right'}`} dir={dir}>
            {value || "---"}
        </p>
    </div>
);

const DetailSection = ({ id, title, icon, isOpen, onToggle, children }) => (
    <div className="mb-4 overflow-hidden border border-[var(--color-border)] rounded-[2rem] bg-[var(--color-surface)] shadow-lg transition-all duration-300 print:shadow-none print:border-slate-200 print:rounded-none print:mb-6 print:bg-white">
        <button
            onClick={() => onToggle(id)}
            className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-[var(--color-bg)]/5 transition-colors print:hidden"
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${isOpen ? 'bg-[var(--color-primary)] text-[var(--color-text-main)]' : 'bg-[var(--color-bg)]/5 text-[var(--color-primary)]'}`}>
                    {React.createElement(icon, { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-main)]">{title}</h3>
            </div>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        <div className="hidden print:flex items-center gap-2 border-b-2 border-[var(--color-primary)] mb-4 pb-2">
            {React.createElement(icon, { size: 20, className: 'text-[var(--color-primary)]' })}
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} print:block overflow-hidden`}>
            <div className="p-6 md:p-8 pt-0 border-t border-[var(--color-border)]/5 bg-black/10 print:bg-transparent print:p-0 print:border-none">
                {children}
            </div>
        </div>
    </div>
);

export const EmployeeDetails = () => {
    //-----------------------------------------------------------------
    const [showPrintPreview, setShowPrintPreview] = useState(false);

    const [openSection, setOpenSection] = useState('personal');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };
    //-----------------------------------------------------------------

    // Data Object (Variables)
    const emp = {
        name: "محمد حماد خان",
        id: "EMP-2024-082",
        father: "عبدالرشید خان",
        dob: "12/05/1995",
        cnic: "42101-1234567-1",
        phone: "0300-1234567",
        email: "hammad@example.com",
        address: "بلاک 13، گلشن اقبال، کراچی، سندھ، پاکستان",
        jobDate: "01/01/2024",
        designation: "سینئر استاد",
        grade: "Grade A",
        dept: "تعلیمی",
        type: "مستقل",
        shift: "Morning Shift (8-4)",
        salary: "72,000",
        bank: "Meezan Bank",
        iban: "PK00 MEZN 0000 0000 0000 0000"
    };
    //-----------------------------------------------------------------

    return (
        <div>

            {showPrintPreview && (
                <div className='flex flex-row justify-between '>
                    <button
                        onClick={() => setShowPrintPreview(!showPrintPreview)}
                        className="flex items-center text-[12px] gap-2 bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all"
                    >
                        {showPrintPreview ? "Back to Dashboard" : "Show Print Preview"} <ChevronLeft size={22} />

                    </button>
                    <p className='print:hidden'>Press (ctrl + p)</p>
                </div>
            )}

            <div >
                {!showPrintPreview && (
                    <div className="min-h-screen space-y-6 pb-10 bg-[var(--color-bg)]" dir="rtl">
                        {/* --- Header --- */}
                        <div className="bg-[var(--color-surface)] rounded-[2.5rem] p-8 mt-5 md:mt-0 lg:mt-0 shadow-xl border border-[var(--color-border)]/5 flex flex-col md:flex-col lg:flex-row items-center gap-6 print:shadow-none print:border-none print:p-0 print:mb-10 print:bg-white">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#008a63] flex items-center justify-center text-3xl font-black text-white shadow-xl print:shadow-none print:border print:border-slate-200">
                                H
                            </div>
                            <div className="text-center md:text-right space-y-2 flex-1">
                                <h1 className="text-3xl font-black text-[var(--color-text-main)] print:text-slate-900">محمد حماد خان</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                                    <span className="bg-emerald-500/10 text-[var(--color-primary)] text-[10px] font-bold px-4 py-1.5 rounded-full border border-emerald-500/20 print:border-slate-200">Active</span>
                                    <span className="bg-emerald-500/10 text-[var(--color-primary)] text-[10px] font-bold px-4 py-1.5 rounded-full border border-emerald-500/20 print:border-slate-200">ID: EMP-2024-082</span>
                                </div>
                            </div>
                            {/* Action Buttons (Hidden on Print) */}
                            <div className="flex gap-3 print:hidden">
                                <button className="flex items-center text-[10px] md:text-[12px] lg:text-[14px] gap-2 bg-[var(--color-primary)] text-[var(--color-text-main)] px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all">
                                    ایڈٹ کریں <Edit size={20} />
                                </button>
                                <button onClick={() => setShowPrintPreview(!showPrintPreview)} className="flex items-center text-[10px] gap-2 bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all">
                                    پرینٹ <Printer size={20} />
                                </button>
                            </div>
                        </div>

                        {/* --- Data Sections --- */}
                        <div className="print:space-y-8">
                            <DetailSection id="personal" title="ذاتی معلومات" icon={User} isOpen={openSection === 'personal'} onToggle={toggleSection}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
                                    <InfoField label="ملازم کا نام" value="محمد حامد خان" />
                                    <InfoField label="والد / شوہر کا نام" value="عبدالرشید خان" />
                                    <InfoField label="تاریخِ پیدائش" value="12/05/1995" dir="ltr" />
                                    <InfoField label="شناختی کارڈ نمبر" value="42101-1234567-1" dir="ltr" />
                                    <InfoField label="موبائل نمبر" value="0300-1234567" dir="ltr" />
                                    <InfoField label="ای میل" value="hammad@example.com" dir="ltr" />
                                    <div className="md:col-span-3 print:col-span-3">
                                        <InfoField label="مستقل پتہ" value="بلاک 13، گلشن اقبال، کراچی، سندھ، پاکستان" />
                                    </div>
                                </div>
                            </DetailSection>

                            <DetailSection id="job" title="تقرری کی تفصیلات" icon={Briefcase} isOpen={openSection === 'job'} onToggle={toggleSection}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
                                    <InfoField label="تاریخِ تقرری" value="01/01/2024" dir="ltr" />
                                    <InfoField label="عہدہ" value="سینئر استاد" />
                                    <InfoField label="گریڈ" value="Grade A" />
                                    <InfoField label="شعبہ" value="تعلیمی" />
                                    <InfoField label="ملازمت کی نوعیت" value="مستقل" />
                                    <InfoField label="شفٹ" value="Morning Shift (8-4)" />
                                </div>
                            </DetailSection>

                            <DetailSection id="salary" title="تنخواہ اور مراعات" icon={Wallet} isOpen={openSection === 'salary'} onToggle={toggleSection}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
                                    <InfoField label="بنیادی تنخواہ" value="PKR 55,000" dir="ltr" />
                                    <InfoField label="ہاؤس رینٹ" value="PKR 10,000" dir="ltr" />
                                    <InfoField label="کنوینس الاؤنس" value="PKR 5,000" dir="ltr" />
                                    <div className="md:col-span-1 bg-[var(--color-primary)]/10 p-4 rounded-2xl border border-[var(--color-primary)]/20 print:bg-slate-100 print:border-slate-300">
                                        <InfoField label="کل ماہانہ تنخواہ" value="PKR 72,000" dir="ltr" />
                                    </div>
                                </div>
                            </DetailSection>

                            <DetailSection id="bank" title="بینک اکاؤنٹ کی تفصیلات" icon={CreditCard} isOpen={openSection === 'bank'} onToggle={toggleSection}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                                    <InfoField label="بینک کا نام" value="Meezan Bank" />
                                    <InfoField label="اکاؤنٹ ٹائٹل" value="Muhammad Hammad Khan" />
                                    <div className="md:col-span-2 print:col-span-2">
                                        <InfoField label="IBAN / اکاؤنٹ نمبر" value="PK00 MEZN 0000 0000 0000 0000" dir="ltr" />
                                    </div>
                                </div>
                            </DetailSection>
                        </div>

                        {/* Footer only for Print */}
                        <div className="hidden print:block mt-10 text-center text-xs text-slate-400 border-t pt-4">
                            Generated by HR Management System - {new Date().toLocaleDateString()}
                        </div>
                    </div>
                )}
                {/* //--------------------------------------------------------------// */}
                <div>
                    {/* --- Professional A4 Print Layout (Only for Printer) --- */}
                    <style>{`
  /* --- Screen Preview Settings --- */
  .print-preview-container {
    background-color: #f3f4f6; /* Grey background taaki paper alag nazar aaye */
    padding: 40px 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  .print-only {
    display: block; /* Screen par dikhane ke liye */
    background: white;
    width: 210mm; /* A4 Width */
    min-height: 297mm; /* A4 Height */
    padding: 10mm; /* Standard Margin */
    margin: 10px auto;
    // box-shadow: 0 0 20px rgba(0,0,0,0.2);
     /* Paper effect */
  }

  /* --- Actual Print Settings --- */
  @media print {
    @page { 
      size: A4; 
      margin: 0; /* Printer margins */
    }
    
    body { 
      margin: 0; 
      padding: 0; 
      background: white !important; 
      -webkit-print-color-adjust: exact;
    }

    nav, aside, header, .no-print, button { 
      display: none !important; 
    }

    .print-preview-container {
      padding: 0;
      background: none;
    }

    .print-only {
      width: 100% !important; /* Print ke waqt full width */
      margin: 0 !important;
      padding: 5mm !important; /* Internal spacing */
      box-shadow: none !important;
      display: block !important;
    }

    * {
      -webkit-print-color-adjust: exact; /* Background colors print karne ke liye */
      print-color-adjust: exact;
    }
  }

  /* Screen par hidden rakhne ke liye agar preview mode on nahi hai */
  /* .print-only { display: none; } */ 
`}</style>

                    {/* --- Print Layout Content --- */}
                    <div className={`${showPrintPreview ? 'block bg-white p-10 shadow-2xl print:shadow-none max-w-[210mm] mx-auto' : 'hidden'} print:block`} dir="rtl">

                        {/* A4 Container */}
                        <div className="max-w-[800px] mx-auto border border-black p-6 relative">

                            {/* Photo Box */}
                            <div className="absolute top-2 left-6 w-22 h-26 border border-gray-400 rounded-xl">
                                <img src={AppImages.profile}  className=' w-22 h-26 rounded-xl'/>
                            </div>

                            {/* Header */}
                            <div className="text-center border-b-2 border-black pb-8 mb-5 ">
                                <h1 className="text-xl font-bold">
                                    ملازم کا معلوماتی فارم
                                </h1>
                                <p className="text-xs mt-4">
                                    مدرسہ انتظامیہ - ہیومن ریسورس ڈیپارٹمنٹ
                                </p>
                            </div>

                            {/* SECTION 1 */}
                            <div className="mb-5">
                                <div className="border border-gray-300 px-2 py-2 text-xs font-bold mb-3 bg-gray-100 rounded-xl">
                                    ذاتی معلومات
                                </div>

                                <div className="flex mb-2">
                                    <span className="w-40 text-xs font-bold">ملازم کا نام:</span>
                                    <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1">{emp.name}</span>
                                </div>

                                <div className="flex mb-2">
                                    <span className="w-40 text-xs font-bold">والد / شوہر کا نام:</span>
                                    <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1">{emp.father}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6">
                                    <div className="flex mb-2">
                                        <span className="w-40 text-xs font-bold">آئی ڈی نمبر:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1">{emp.id}</span>
                                    </div>

                                    <div className="flex mb-2">
                                        <span className="w-40 text-xs font-bold">تاریخ پیدائش:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1" dir="ltr">{emp.dob}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6">
                                    <div className="flex mb-2">
                                        <span className="w-40 text-xs font-bold">شناختی کارڈ نمبر:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1" dir="ltr">{emp.cnic}</span>
                                    </div>

                                    <div className="flex mb-2">
                                        <span className="w-40 text-xs font-bold">موبائل نمبر:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1" dir="ltr">{emp.phone}</span>
                                    </div>
                                </div>

                                <div className="flex mb-2">
                                    <span className="w-40 text-xs font-bold">مستقل پتہ:</span>
                                    <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1">{emp.address}</span>
                                </div>
                            </div>

                            {/* SECTION 2 */}
                            <div className="mb-5">
                                <div className="border border-gray-300 px-2 py-2 text-xs font-bold mb-3 bg-gray-100 rounded-xl">
                                    تقرری کی تفصیلات
                                </div>

                                <div className="grid grid-cols-3 gap-x-6">
                                    <div className="flex mb-2">
                                        <span className="w-28 text-xs font-bold">تاریخ تقرری:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1" dir="ltr">{emp.jobDate}</span>
                                    </div>

                                    <div className="flex mb-2">
                                        <span className="w-20 text-xs font-bold">عہدہ:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1">{emp.designation}</span>
                                    </div>

                                    <div className="flex mb-2">
                                        <span className="w-16 text-xs font-bold">گریڈ:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1">{emp.grade}</span>
                                    </div>
                                </div>

                                {/* Job Type */}
                                <div className="flex items-center gap-4 mt-3">
                                    <span className="text-xs font-bold">ملازمت کی نوعیت:</span>

                                    <div className="flex gap-6 text-xs">
                                        <label className="flex items-center gap-2">
                                            <span className="w-3 h-3 border border-gray-400"></span> مستقل
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <span className="w-3 h-3 border border-gray-400"></span> عارضی
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <span className="w-3 h-3 border border-gray-400"></span> کنٹریکٹ
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3 */}
                            <div className="mb-6">
                                <div className="border border-gray-300 px-2 py-2 text-xs font-bold mb-3 bg-gray-100 rounded-xl">
                                    مالیاتی تفصیلات
                                </div>

                                <div className="grid grid-cols-2 gap-x-6">
                                    <div className="flex mb-2">
                                        <span className="w-32 text-xs font-bold">بنیادی تنخواہ:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1" dir="ltr">
                                            PKR {emp.salary}
                                        </span>
                                    </div>

                                    <div className="flex mb-2">
                                        <span className="w-28 text-xs font-bold">بینک کا نام:</span>
                                        <span className="flex-1 border-b border-gray-400 text-sm px-1 py-1">{emp.bank}</span>
                                    </div>
                                </div>

                                <div className="flex mb-2">
                                    <span className="w-40 text-xs font-bold">IBAN / اکاؤنٹ نمبر:</span>
                                    <span className="flex-1 border-b border-gray-400 text-sm px-1 tracking-wider py-1" dir="ltr">
                                        {emp.iban}
                                    </span>
                                </div>
                            </div>

                            {/* Declaration */}
                            <div className="border border-black p-3 text-[10px] leading-relaxed mb-10 rounded-xl">
                                <strong className='ml-1'> حلف نامہ: </strong> میں تصدیق کرتا ہوں کہ فراہم کردہ تمام معلومات درست ہیں۔
                                کسی بھی غلط معلومات کی صورت میں ادارہ کارروائی کا مجاز ہوگا۔
                            </div>

                            {/* Signatures */}
                            <div className="flex justify-between text-center mt-10">
                                <div>
                                    <div className="border-t border-gray-400 w-32 mx-auto mb-1"></div>
                                    <p className="text-xs">ملازم کے دستخط</p>
                                </div>

                                <div>
                                    <div className="border-t border-gray-400 w-32 mx-auto mb-1"></div>
                                    <p className="text-xs">ایچ آر مینیجر</p>
                                </div>

                                <div>
                                    <div className="border-t border-gray-400 w-32 mx-auto mb-1"></div>
                                    <p className="text-xs">مہر ادارہ</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-10 flex justify-between text-[9px] border-t border-gray-400 pt-2">
                                <span>System Generated Document</span>
                                <span dir="ltr">
                                    Printed on: {new Date().toLocaleString("en-GB")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
