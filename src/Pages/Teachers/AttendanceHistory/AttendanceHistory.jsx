import React, { useState, useRef, useMemo } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, Save, ChevronRight, Edit2, ChevronDown } from 'lucide-react';

export const TeacherAttendanceHistory = ({ teacherId }) => {


    const [isEditMode, setIsEditMode] = useState(false);
    const calendarRef = useRef(null);
    // Month aur Year ki state
    const [selectedYear, setSelectedYear] = useState(2026);
    const [selectedMonth, setSelectedMonth] = useState(3);

    const monthsUrdu = [
        "جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون",
        "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"
    ];

    const years = [2024, 2025, 2026];

    const attendanceHistory = useMemo(() => {
        const data = [];
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        for (let i = daysInMonth; i >= 1; i--) {
            const day = i < 10 ? `0${i}` : i;
            const monthNum = selectedMonth + 1 < 10 ? `0${selectedMonth + 1}` : selectedMonth + 1;
            const dateStr = `${selectedYear}-${monthNum}-${day}`;
            const dayName = new Date(selectedYear, selectedMonth, i).toLocaleDateString('ur-PK', { weekday: 'long' });

            let initialStatus = "Hazir";
            if (i === 3 || i === 10) initialStatus = "Nahi Lagi";
            if (i === 5) initialStatus = "Rukhsat";
            if (i === 7) initialStatus = "Ghair Hazir";

            data.push({
                date: dateStr,
                dayName: dayName,
                dayNum: i,
                status: initialStatus,
                note: initialStatus === "Rukhsat" ? "Zaroori kaam tha" : ""
            });
        }
        return data;
    }, [selectedYear, selectedMonth]);

    const scrollToDate = (dayNum) => {
        const element = document.getElementById(`date-${dayNum}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-[#00d094]');
            setTimeout(() => element.classList.remove('ring-4', 'ring-[#00d094]'), 1500);
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6 bg-[var(--color-bg)] min-h-screen pb-24" dir="rtl">

            {/* --- Sticky Top Bar --- */}
            <div className="sticky top-0 z-10 bg-[var(--color-bg)]/80 backdrop-blur-md  border-b border-[var(--color-border)]/5 no-print">
                <div className="flex  justify-between items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-[var(--color-text)] opacity-70 hover:opacity-100 font-bold transition-all"
                    >
                        <div className="bg-[var(--color-surface)] p-2 rounded-xl shadow-md border border-[var(--color-border)]/10">
                            <ChevronRight size={20} className="text-[var(--color-primary)]" />
                        </div>
                        {/* <span className="hidden md:block">واپس لسٹ پر جائیں</span> */}
                    </button>

                    {/* --- Month & Year Selectors --- */}
                    <div className="flex gap-2 items-center bg-[var(--color-surface)] p-1 rounded-2xl border border-[var(--color-border)]/10">
                        <div className="relative">
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                className="appearance-none bg-transparent pr-8 pl-4 py-2 text-[14px] font-bold text-[var(--color-text)] outline-none cursor-pointer"
                            >
                                {monthsUrdu.map((m, index) => (
                                    <option key={m} value={index} className="bg-[var(--color-surface)]">{m}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                        </div>

                        <div className="w-[1px] h-4 bg-[var(--color-border)]/20" />

                        <div className="relative">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                className="appearance-none bg-transparent pr-8 pl-4 py-2 text-[12px] font-bold text-[var(--color-text)] outline-none cursor-pointer"
                            >
                                {years.map(y => (
                                    <option key={y} value={y} className="bg-[var(--color-surface)] text-[12px]">{y}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                        </div>
                    </div>
                    {/* ////////////////////////////////////////////////// */}
                    {/* <h1 className="text-lg font-bold text-[var(--color-text)] md:hidden">حاضری ہسٹری</h1> */}

                    <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`flex items-center justify-center gap-2 px-3 md:px-6 lg:px-6 py-3 text-[10px] md:text-[12px] lg:text-[14px] rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${isEditMode ? 'bg-emerald-600 text-white' : 'bg-[#00d094] text-[#002a33]'
                            }`}
                    >
                        {isEditMode ? <Save size={18} /> : <Edit2 size={18} />}
                        {isEditMode ? "محفوظ کریں" : "درستگی کریں"}
                    </button>
                </div>
            </div>

            {/* --- Profile & Heatmap Section --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="xl:col-span-1 bg-[var(--color-surface)] p-6 rounded-[2.5rem] border border-[var(--color-border)]/10 shadow-xl flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#00d094] to-[#008a63] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-[#00d094]/20 mb-4">
                        MH
                    </div>
                    <h1 className="text-2xl font-black text-[var(--color-text)]">محمد حماد خان</h1>
                    <span className="bg-[#00d094]/10 text-[#00d094] text-xs px-3 py-1 rounded-full font-bold mt-2 border border-[#00d094]/20">EMP-001</span>
                    <p className="text-sm opacity-60 mt-4 font-medium text-[var(--color-text)]">سینئر مدرس | کتب خانہ</p>

                    <div className="flex gap-3 w-full mt-6 border-t border-[var(--color-border)]/10 pt-6">
                        <StatBox label="حاضر" value="21" color="text-emerald-500" bg="bg-emerald-500/10" />
                        <StatBox label="غائب" value="02" color="text-red-500" bg="bg-red-500/10" />
                        <StatBox label="چھٹی" value="03" color="text-amber-500" bg="bg-amber-500/10" />
                    </div>
                </div>

                {/* UI IDEA: Attendance Heatmap Calendar */}
                <div className="xl:col-span-2 bg-[var(--color-surface)] p-6 rounded-[2.5rem] border border-[var(--color-border)]/10 shadow-xl">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold text-[var(--color-text)] flex items-center gap-2">
                            <Calendar size={18} className="text-[var(--color-primary)]" />
                            اپریل 2026 - حاضری کا پیٹرن
                        </h3>
                        <span className="text-xs opacity-50 text-[var(--color-text)]">(کسی تاریخ پر کلک کریں)</span>
                    </div>

                    {/* Heatmap Grid (30 days) */}
                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 font-mono" dir="ltr">
                        {[...attendanceHistory].reverse().map((item) => (
                            <button
                                key={`map-${item.dayNum}`}
                                onClick={() => scrollToDate(item.dayNum)}
                                title={`${item.date} (${item.status})`}
                                className={`h-12 rounded-xl border-2 flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95
                                    ${item.status === 'Hazir' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : ''}
                                    ${item.status === 'Ghair Hazir' ? 'bg-red-500/10 border-red-500/20 text-red-400' : ''}
                                    ${item.status === 'Leave' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : ''}
                                    ${item.status === 'Not Marked' ? 'bg-slate-500/10 border-slate-500/20 text-slate-400 border-dashed' : ''}
                                `}
                            >
                                <span className="text-lg font-black">{item.dayNum}</span>
                                <span className="text-[7px] uppercase opacity-70">
                                    {item.status === 'Hazir' ? 'Pre' : item.status === 'Ghair Hazir' ? 'Abs' : item.status === 'Leave' ? 'Lea' : 'Mis'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Detailed Attendance Grid (Scrollable Area) --- */}
            <div className="pt-4">
                <h2 className="text-xl font-black text-[var(--color-text)] mb-6 flex items-center gap-3">
                    <AlertCircle className="text-amber-400" />
                    تفصیلی روزنامچہ (Daily Logs)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" ref={calendarRef}>
                    {attendanceHistory.map((item) => (
                        <div
                            key={item.dayNum}
                            id={`date-${item.dayNum}`}
                            className={`relative group p-5 rounded-[2rem] border-2 transition-all duration-300 bg-[var(--color-surface)] ${item.status === 'Not Marked' ? 'border-dashed border-amber-500/40 bg-amber-500/5' : 'border-[var(--color-border)]/10 shadow-md hover:border-[var(--color-primary)]/30'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--color-border)]/5">
                                <div>
                                    <span className="text-xs font-black text-[var(--color-text)] opacity-40 block" dir="ltr">{item.date}</span>
                                    <span className="text-sm font-bold text-[var(--color-primary)]">{item.dayName}</span>
                                </div>
                                <StatusBadge status={item.status} />
                            </div>

                            {isEditMode ? (
                                <div className="space-y-2">
                                    <select
                                        className="w-full bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)]/10 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 ring-[#00d094]"
                                        value={item.status}
                                        onChange={(e) => {
                                            const newHistory = [...attendanceHistory];
                                            const index = newHistory.findIndex(h => h.dayNum === item.dayNum);
                                            newHistory[index].status = e.target.value;
                                            setAttendanceHistory(newHistory);
                                        }}
                                    >
                                        <option value="Hazir">حاضر</option>
                                        <option value="Ghair Hazir">غیر حاضر</option>
                                        <option value="Leave">رخصت</option>
                                        <option value="Not Marked">خالی (Missing)</option>
                                    </select>
                                </div>
                            ) : (
                                <p className="text-[11px] text-[var(--color-text)] opacity-60 italic leading-relaxed">
                                    {item.note || (item.status === 'Not Marked' ? "اس دن کی حاضری درج نہیں کی گئی۔ برائے کرم درست کریں۔" : "کوئی اضافی تفصیل موجود نہیں ہے۔")}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Floating Save Button */}
            {isEditMode && (
                <button className="fixed bottom-6 left-6 z-20 md:hidden bg-emerald-600 text-white p-5 rounded-full shadow-2xl active:scale-95 transition-all no-print">
                    <Save size={24} />
                </button>
            )}
        </div>
    );
};



// Sub-components
const StatBox = ({ label, value, color, bg }) => (
    <div className={`text-center flex-1 ${bg} p-4 rounded-2xl border border-[var(--color-border)]/5`}>
        <p className="text-[10px] font-bold opacity-60 uppercase text-[var(--color-text)]">{label}</p>
        <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const config = {
        "Hazir": { text: "حاضر", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
        "Ghair Hazir": { text: "غیر حاضر", style: "bg-red-500/10 text-red-400 border-red-500/20" },
        "Rukhsat": { text: "رخصت", style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
        "Nahi Lagi": { text: "رہ گئی", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" }
    };
    const current = config[status] || config["Nahi Lagi"];
    return (
        <span className={`px-3 py-1 rounded-full text-[9px] font-black border ${current.style}`}>
            {current.text}
        </span>
    );
};

