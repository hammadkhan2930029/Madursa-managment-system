import React, { useState } from 'react';
import { Search, CreditCard, Layout, Smartphone, User, Printer ,GraduationCap} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppImages } from '../../../Constant/AppImages';

export const CreateIdCard = () => {
    const [searchId, setSearchId] = useState('');
    const [layout, setLayout] = useState('horizontal');
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!searchId) return;
        setLoading(true);
        setTimeout(() => {
            setStudentData({
                idNo: searchId,
                name: "Hammad Khan",
                fatherName: "Abdul Ghaffar",
                class: "Hifz-ul-Quran",
                mobile: "0300-1234567",
                address: "Karachi, Pakistan",
                image: null
            });
            setLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen bg-themeBg p-4 md:p-8" dir="rtl">
            {/* --- Ye section Print mein hide ho jayega --- */}
            <div className="max-w-4xl mx-auto bg-themeSurface p-6 rounded-[2rem] shadow-xl border border-white/5 mb-10 print:hidden">
                <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-themeText">
                    <CreditCard className="text-[#00d094]" /> آئی ڈی کارڈ جنریٹر
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-themeMuted mr-2">رجسٹریشن نمبر</label>
                        <input
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full bg-themeBg border-2 border-slate-200 dark:border-white/10 focus:border-[#00d094] p-3.5 rounded-xl outline-none font-bold text-themeText"
                            placeholder="1234"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-themeMuted mr-2">لے آؤٹ</label>
                        <div className="flex bg-themeBg p-1 rounded-xl border-2 border-slate-200 dark:border-white/10">
                            <button onClick={() => setLayout('horizontal')} className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-2 ${layout === 'horizontal' ? 'bg-[#00d094] text-[#002a33]' : 'text-themeMuted'}`}>
                                <Layout size={16} /> Horizontal
                            </button>
                            <button onClick={() => setLayout('vertical')} className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-2 ${layout === 'vertical' ? 'bg-[#00d094] text-[#002a33]' : 'text-themeMuted'}`}>
                                <Smartphone size={16} /> Vertical
                            </button>
                        </div>
                    </div>

                    <button onClick={handleSearch} className="bg-[#00d094] text-[#002a33] py-4 rounded-xl font-black shadow-lg hover:bg-[#00b37e] transition-all">
                        {loading ? "تلاش جاری..." : "کارڈ جنریٹ کریں"}
                    </button>
                </div>
            </div>

            {/* --- Display & Print Section --- */}
            <AnimatePresence mode="wait">
                {studentData && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">

                        {/* ID CARD CONTAINER */}
                        <div className="print-area">
                            {layout === 'horizontal' ? (
                                <HorizontalCard data={studentData} />
                            ) : (
                                <VerticalCard data={studentData} />
                            )}
                        </div>

                        <button
                            onClick={() => window.print()}
                            className="print:hidden bg-white text-black px-10 py-4 rounded-xl font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <Printer size={20} /> پرنٹ نکالیں
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- STRICT PRINT CSS --- */}
            {/* --- STRICT PRINT CSS --- */}
            <style dangerouslySetInnerHTML={{
                __html: `
    @media print {
        @page { 
            size: A4; 
            margin: 0mm; 
        }
        body * { 
            visibility: hidden; 
        }
        /* Background colors ko force karne ke liye */
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
        }
        .print-area, .print-area * { 
            visibility: visible; 
        }
        .print-area { 
            position: absolute; 
            left: 50mm; /* Printer margin ke mutabiq adjust karein */
            top: 50mm;
            transform: translate(-50%, -50%);
        }
    }
`}} />
        </div>
    );
};

// const HorizontalCard = ({ data }) => (
//     <div className="w-[400px] h-[270px] bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden flex flex-col text-black font-sans print:shadow-none print:border-gray-400">
//         <div className="bg-[#002a33] p-3 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-white rounded-md p-1"><img src={AppImages.logo} className="w-full h-full object-contain" /></div>
//                 <div>
//                     <h2 className="text-white text-sm font-bold leading-none">جامعہ انوار القرآن</h2>
//                     <p className="text-[#00d094] text-[8px] font-bold">Jamia Anwar-ul-Quran</p>
//                 </div>
//             </div>
//             <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[9px] font-bold border border-white/20">STUDENT CARD</span>
//         </div>

//         <div className="flex flex-1 p-4 gap-4 items-center">
//             <div className="flex-1 space-y-2 text-right">
//                 <div className="flex justify-between border-b border-gray-100 pb-1">
//                     <span className="text-[14px] font-bold">{data.name}</span>
//                     <span className="text-[10px] text-gray-400">:نام</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-100 pb-1">
//                     <span className="text-[14px] font-bold">{data.fatherName}</span>
//                     <span className="text-[10px] text-gray-400">:ولدیت</span>
//                 </div>
//                 <div className="flex justify-between border-b border-gray-100 pb-1">
//                     <span className="text-[14px] font-bold text-[#002a33]">{data.class}</span>
//                     <span className="text-[10px] text-gray-400">:درجہ</span>
//                 </div>
//             </div>
//             <div className="w-24 h-28 border-2 border-[#002a33] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
//                 <User size={40} className="text-gray-300" />
//             </div>
//         </div>
//         <div className="bg-gray-50 px-3 py-1.5 flex justify-between items-center border-t">
//             <span className="text-[10px] font-bold">Reg: {data.idNo}</span>
//             <span className="text-[10px] font-medium text-gray-500">{data.mobile}</span>
//         </div>
//     </div>
// );
const HorizontalCard = ({ data }) => (
    /* Standard Card: 85.6mm x 54mm */
    <div style={{ fontFamily: 'Noto Nastaliq Urdu' }} className="w-[85.6mm] h-[60mm] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col text-black font-sans print:shadow-none print:border-gray-400 relative">
        
        {/* Header Section */}
        <div className="bg-[#002a33] p-2 flex items-center justify-between border-b-2 border-[#00d094]">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white rounded-lg p-1 shadow-inner">
                    <img src={AppImages.logo} className="w-full h-full object-contain" />
                </div>
                <div>
                    <h2 className="text-white text-[11px] font-black leading-tight">جامعہ انوار القرآن</h2>
                    <p className="text-[#00d094] text-[6px] font-bold tracking-wider uppercase">Jamia Anwar-ul-Quran</p>
                </div>
            </div>
            <div className="text-right ">
                <span className="text-white  bg-white/10 px-2 py-0.5 rounded-full text-[7px] font-black border border-white/10 uppercase tracking-tighter">Student ID</span>
            </div>
        </div>
        
        {/* Main Body */}
        <div className="flex flex-1 p-3 gap-3 items-center bg-gradient-to-br from-white to-gray-50">
            {/* Student Info (Right Aligned for Urdu) */}
            <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-0.5">
                    <span className="text-[8px] font-bold text-sidebar-primary/80">نام</span>
                    <span className="text-[11px] font-bold text-gray-800">{data.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-0.5">
                    <span className="text-[8px] font-bold text-sidebar-primary/80">ولدیت</span>
                    <span className="text-[11px] font-bold text-gray-800">{data.fatherName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-0.5">
                    <span className="text-[8px] font-bold text-sidebar-primary/80">درجہ</span>
                    <span className="text-[11px] font-bold text-sidebar-dark">{data.class}</span>
                </div>
            </div>

            {/* Photo Box */}
            <div className="flex flex-col items-center gap-1">
                <div className="w-[22mm] h-[26mm] border-2 border-sidebar-dark rounded-md overflow-hidden bg-white shadow-md flex items-center justify-center">
                    {data.image ? (
                        <img src={data.image} className="w-full h-full object-cover" />
                    ) : (
                        <User size={35} className="text-gray-200" />
                    )}
                </div>
            </div>
        </div>

        {/* Footer / Contact */}
        <div className="bg-gray-100 px-3 py-1.5 flex justify-between items-center border-t border-gray-200">
            <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-sidebar-primary animate-pulse" />
                <span className="text-[9px] font-black text-sidebar-dark">Reg: {data.idNo}</span>
            </div>
            <span className="text-[8px] font-bold text-gray-500 tracking-tight">{data.mobile}</span>
        </div>

        {/* Watermark Pattern (Optional UI touch) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <GraduationCap size={100} />
        </div>
    </div>
);

const VerticalCard = ({ data }) => (
    <div className="w-[280px] h-[470px] bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden flex flex-col text-black font-sans print:shadow-none print:border-gray-400">
        <div className="bg-[#002a33] pt-2 pb-12 px-4 text-center">
            <div className="w-12 h-12 bg-white rounded-lg p-2 mx-auto "><img src={AppImages.logo} className="w-full h-full object-contain" /></div>
            <h2 className="text-white text-lg font-bold">جامعہ انوار القرآن</h2>
            <div className="bg-[#00d094] inline-block px-3 py-0.5 rounded-full text-[9px] font-black text-[#002a33] mt-1 uppercase">Student ID</div>
        </div>

        <div className="flex-1 flex flex-col items-center px-6 -mt-10">
            <div className="w-24 h-24 border-4 border-white shadow-lg rounded-full overflow-hidden bg-gray-50 z-10">
                <User size={40} className="text-gray-300 mt-6 mx-auto" />
            </div>
            <h3 className="text-lg font-black text-[#002a33] mt-1">{data.name}</h3>
            <p className="text-xs font-bold text-gray-400 mb-2">{data.idNo}</p>

            <div className="w-full space-y-1">
                <div className="text-center">
                    <p className="text-[9px] font-bold text-[#00d094] uppercase">Father Name</p>
                    <p className="text-[14px] font-bold">{data.fatherName}</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] font-bold text-[#00d094] uppercase">Class</p>
                    <p className="text-[14px] font-bold">{data.class}</p>
                </div>
            </div>
        </div>
        <div className="p-2 border-t border-gray-400 text-center text-[10px] font-bold text-gray-400">
            {data.mobile}
        </div>
    </div>
);