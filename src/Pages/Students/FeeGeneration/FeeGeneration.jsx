import React, { useEffect, useState } from 'react';
import { Search, Printer, Eye, CreditCard, Filter, CheckCircle, Clock } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const FeesCollection = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const navigate = useNavigate()
    const [isGenerated, setIsGenerated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const [students] = useState([
        { id: 'MD-101', name: 'محمد احمد', class: 'حفظ', status: 'paid', amount: 1500 },
        { id: 'MD-102', name: 'علی رضا', class: 'ناظرہ', status: 'unpaid', amount: 1000 },
        { id: 'MD-103', name: 'عمران خان', class: 'درجہ اول', status: 'unpaid', amount: 2000 },
        { id: 'MD-104', name: 'عبداللہ', class: 'حفظ', status: 'paid', amount: 1500 },
    ]);
    const monthsArrayOfObjects = [
        { id: 1, name: "جنوری" },    // January
        { id: 2, name: "فروری" },    // February
        { id: 3, name: "مارچ" },     // March
        { id: 4, name: "اپریل" },    // April
        { id: 5, name: "مئی" },      // May
        { id: 6, name: "جون" },      // June
        { id: 7, name: "جولائی" },   // July
        { id: 8, name: "اگست" },     // August
        { id: 9, name: "ستمبر" },    // September
        { id: 10, name: "اکتوبر" },  // October
        { id: 11, name: "نومبر" },   // November
        { id: 12, name: "دسمبر" }    // December
    ];

    console.log(monthsArrayOfObjects[0]);
    // Output: { id: 1, name: "جنوری" }

    const handleGenerateFees = () => {
        if (!selectedMonth) return;
        setIsGenerated(true);
    };
    //------------------------------------------------------
    // Pehle se mojood states ke sath ye add karein
    const [selectedClass, setSelectedClass] = useState('');

    // Filter logic ko update karein
    const filteredStudents = students.filter(s => {
        const matchesSearch = s.id.toLowerCase().includes(searchTerm.toLowerCase()) || s.name.includes(searchTerm);
        const matchesClass = selectedClass === '' || s.class === selectedClass;

        return matchesSearch && matchesClass;
    });

    // Classes ki list (aap isay dynamic bhi kar sakte hain)
    const classesList = ["حفظ", "ناظرہ", "درجہ اول", "درجہ دوم"];
    //--------------------------------------------------
    const [printData, setPrintData] = useState(null);

    const handlePrint = (student) => {
        setPrintData(student); // Receipt mein student ka data set karein
        setTimeout(() => {
            window.print(); // Thori der baad print command den taake DOM update ho jaye
        }, 100);
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] p-6 font-urdu transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header & Generation Card */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[var(--color-surface)] rounded-[2rem] shadow-sm border border-[var(--color-border)] p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg text-[var(--color-primary)] bg-[var(--color-primary)]/10">
                            <CreditCard size={24} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">فیس مینجمنٹ سسٹم</h1>
                    </div>

                    <div className="flex flex-wrap items-end gap-4 ">
                        <div className="flex-1 min-w-[240px]">
                            <label className="block text-sm font-semibold text-[var(--color-text-muted)] mb-5">ماہانہ فیس کا انتخاب کریں</label>
                            <select
                                className="w-full bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-text-main)] p-3 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] transition-all outline-none appearance-none"
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                <option value="">مہینہ منتخب کریں...</option>
                                {monthsArrayOfObjects.map((item) => {
                                    return (
                                        <option value="1" >{item.name}</option>

                                    )
                                })}

                            </select>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGenerateFees}
                            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-[var(--color-primary)]/20 transition-all"
                        >
                            فیس جنریٹ کریں
                        </motion.button>
                    </div>
                </motion.div>

                {/* Results Section */}
                <AnimatePresence>
                    {isGenerated && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                        >
                            {/* Search Bar */}
                            {/* Search & Filter Bar */}
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-[var(--color-surface)] p-4 rounded-[2rem] border border-[var(--color-border)] shadow-sm">

                                <div className="flex flex-col md:flex-row w-full lg:w-auto gap-3 flex-1">
                                    {/* Search Input */}
                                    <div className="relative flex-1 max-w-md">
                                        <input
                                            type="text"
                                            placeholder="طالب علم کی آئی ڈی یا نام..."
                                            className="w-full pr-12 pl-4 py-3 bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-text-main)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Search className="absolute right-4 top-3.5 text-[var(--color-text-muted)]" size={20} />
                                    </div>

                                    {/* Class Dropdown Filter */}
                                    <div className="relative min-w-[160px]">
                                        <select
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                            className="w-full bg-[var(--color-input)] border border-[var(--color-border)] text-[var(--color-text-main)] p-3 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">تمام کلاسز</option>
                                            {classesList.map((cls) => (
                                                <option key={cls} value={cls}>{cls}</option>
                                            ))}
                                        </select>
                                        <Filter className="absolute right-3 top-3.5 text-[var(--color-text-muted)] pointer-events-none" size={18} />
                                    </div>
                                </div>

                                {/* Record Counter */}
                                <div className="flex items-center gap-2 text-[var(--color-text-muted)] bg-[var(--color-input)] px-6 py-2 rounded-full text-sm font-medium border border-[var(--color-border)] whitespace-nowrap">
                                    <span>فلٹر شدہ ریکارڈ: {filteredStudents.length}</span>
                                </div>
                            </div>

                            {/* Table Card */}
                            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">

                                {/* --- Desktop View: Table (Large screens par show hoga) --- */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full text-right border-collapse">
                                        <thead>
                                            <tr className="bg-[var(--color-input)] text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                                                <th className="p-5 font-bold">آئی ڈی</th>
                                                <th className="p-5 font-bold">نام</th>
                                                <th className="p-5 font-bold">درجہ</th>
                                                <th className="p-5 font-bold">رقم</th>
                                                <th className="p-5 font-bold text-center">اسٹیٹس</th>
                                                <th className="p-5 font-bold text-center">ایکشن</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--color-border)]">
                                            {filteredStudents.map((student) => (
                                                <motion.tr
                                                    layout
                                                    key={student.id}
                                                    className="hover:bg-[var(--color-primary)]/5 transition-colors"
                                                >
                                                    <td className="p-5 font-mono text-[var(--color-primary)] font-bold tracking-wider">{student.id}</td>
                                                    <td className="p-5 font-bold text-[var(--color-text-main)]">{student.name}</td>
                                                    <td className="p-5 text-[var(--color-text-muted)] font-medium">{student.class}</td>
                                                    <td className="p-5 font-black">{student.amount}</td>
                                                    <td className="p-5 text-center">
                                                        {student.status === 'paid' ? (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold">
                                                                <CheckCircle size={14} /> ادا شدہ
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold">
                                                                <Clock size={14} /> بقایا
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                onClick={() => navigate(`/students/details/${student.id}`)}
                                                                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-all" title="دیکھیں">
                                                                <Eye size={20} />
                                                            </button>
                                                            <button
                                                                onClick={() => handlePrint(students[student.id])}
                                                                className="p-2 text-[var(--color-text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all" title="پرنٹ">
                                                                <Printer size={20} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* --- Mobile & Tablet View: Card Layout (Sirf Mobile/Tab par show hoga) --- */}
                                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[var(--color-bg)]">
                                    {filteredStudents.map((student) => (
                                        <motion.div
                                            layout
                                            key={student.id}
                                            className="bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-xl shadow-sm space-y-3"
                                        >
                                            <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-2">
                                                <div>
                                                    <span className="text-[var(--color-primary)] font-mono font-bold text-xs uppercase">{student.id}</span>
                                                    <h3 className="text-lg font-bold text-[var(--color-text-main)]">{student.name}</h3>
                                                </div>
                                                {student.status === 'paid' ? (
                                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold border border-[var(--color-primary)]/20">
                                                        <CheckCircle size={14} /> ادا شدہ
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">
                                                        <Clock size={14} /> بقایا
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-[var(--color-text-muted)] font-medium">درجہ: {student.class}</span>
                                                <span className="font-black text-[var(--color-text-main)] underline decoration-[var(--color-primary)]">رقم: {student.amount}</span>
                                            </div>

                                            <div className="flex gap-2 pt-2">
                                                <button
                                                    onClick={() => navigate(`students/details/${student.id}`)}
                                                    className="flex-1 flex justify-center items-center gap-2 py-2 bg-[var(--color-input)] text-[var(--color-text-main)] rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary)]/5 transition-all text-sm font-bold">
                                                    <Eye size={16} /> تفصیل
                                                </button>
                                                <button className="flex-1 flex justify-center items-center gap-2 py-2 bg-[var(--color-input)] text-[var(--color-text-main)] rounded-lg border border-[var(--color-border)] hover:bg-blue-500/5 transition-all text-sm font-bold text-blue-500">
                                                    <Printer size={16} /> پرنٹ
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* ------------------------------------------ */}

                            <div style={{ display: 'block', height: 0, overflow: 'hidden' }}>
                                <div className="printable-area rounded-lg bg-white text-black">
                                    {/* Header */}
                                    <div className="text-center border-b-2 border-dotted pb-4 mb-4">
                                        <h1 className="text-3xl font-black  uppercase p-4">مدرسہ تعلیم القرآن</h1>
                                        <p className="text-sm">ایڈریس: کراچی، پاکستان | فون: 0300-1234567</p>
                                        <h2 className="text-[14px] font-bold bg-gray-100 inline-block px-6 rounded-full mt-3">فیس رسید (Student Copy)</h2>
                                    </div>

                                    {/* Student Info Grid */}
                                    <div className="grid grid-cols-2 gap-y-4 mb-6 text-md">
                                        <div className="flex gap-2 font-bold">نام طالب علم: <span className="font-normal border-b border-black flex-1">{printData?.name}</span></div>
                                        <div className="flex gap-2 font-bold">آئی ڈی نمبر: <span className="font-normal border-b border-black flex-1 font-mono">{printData?.id}</span></div>
                                        <div className="flex gap-2 font-bold">درجہ / کلاس: <span className="font-normal border-b border-black flex-1">{printData?.class}</span></div>
                                        <div className="flex gap-2 font-bold">تاریخ: <span className="font-normal border-b border-black flex-1">{new Date().toLocaleDateString('ur-PK')}</span></div>
                                    </div>

                                    {/* Fee Details Table */}
                                    <table className="w-full border-collapse border border-black text-center mb-6">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-black p-2">تفصیل (Particulars)</th>
                                                <th className="border border-black p-2">رقم (Amount)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-black p-3 text-right">ماہانہ تعلیمی فیس</td>
                                                <td className="border border-black p-3 font-bold">{printData?.amount} /-</td>
                                            </tr>
                                            <tr className="h-10">
                                                <td className="border border-black p-3 text-right font-bold">کل میزان (Total)</td>
                                                <td className="border border-black p-3 font-black text-xl">{printData?.amount} /-</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Footer Signature */}
                                    <div className="flex justify-between mt-12 pt-8">
                                        <div className="text-center">
                                            <div className="border-t border-black w-32 mb-1"></div>
                                            <p>دستخط (کیشیئر)</p>
                                        </div>
                                        <div className="text-center italic text-sm">
                                            <CheckCircle size={40} className="mx-auto text-gray-300 mb-1" />
                                            <p>کمپیوٹر سے تیار کردہ رسید</p>
                                        </div>
                                    </div>

                                    {/* Notice */}
                                    <div className="mt-8 text-[10px] text-gray-500 border-t pt-2">
                                        * نوٹ: جمع شدہ فیس واپس نہیں ہوگی۔ براہ کرم رسید سنبھال کر رکھیں۔
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <style>
                        <style>
                            {`
@media print {
    /* Page size aur orientation set karein */
    @page {
        size: A5 portrait; /* Ya sirf 'A5' agar portrait chahiye */
        margin: 0; /* Browser ke default margins khatam karne ke liye */
    }

    body * { visibility: hidden; }

    .printable-area {
        visibility: visible !important;
        display: block !important;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 10mm; /* A5 ke liye munasib padding */
        box-sizing: border-box;
        direction: rtl;
        background: white;
    }

    .printable-area * { visibility: visible !important; }

    /* Print mein faltu gaps hatane ke liye */
    .no-print { display: none !important; }
}
`}
                        </style>
                    </style>
                </AnimatePresence>
            </div>
        </div>
    );
};

