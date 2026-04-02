import React from 'react';
import { Clock, Coffee, LogIn, LogOut, Timer, AlertTriangle, ShieldCheck } from 'lucide-react';
import { InputField, SelectField } from './FormElements';

export const AttendanceTimingTab = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Right Column: Timing Configurations */}
            <div className="lg:col-span-2 space-y-6">

                <div className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <Clock className="text-orange-600" size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-sm uppercase tracking-wide">اوقاتِ کار (Work Timings)</h4>
                            <p className="text-[10px] text-[var(--color-text-muted)] font-bold">ملازم کی حاضری کے اوقات سیٹ کریں</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <SelectField
                            label="شفٹ کا انتخاب"
                            options={["Morning Shift (8-4)", "Evening Shift (2-10)", "Full Day", "Custom Timing"]}
                        />
                        <InputField label="مقررہ ڈیوٹی گھنٹے" placeholder="8 Hours" isDark />

                        <div className="p-4 bg-[var(--color-input)] rounded-2xl border border-[var(--color-border)] flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                                <LogIn size={14} /> آمد کا وقت (In-Time)
                            </div>
                            <input type="time" className="bg-transparent border-none outline-none text-lg font-black text-[var(--color-text)]" defaultValue="08:00" />
                        </div>

                        <div className="p-4 bg-[var(--color-input)] rounded-2xl border border-[var(--color-border)] flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-widest">
                                <LogOut size={14} /> واپسی کا وقت (Out-Time)
                            </div>
                            <input type="time" className="bg-transparent border-none outline-none text-lg font-black text-[var(--color-text)]" defaultValue="16:00" />
                        </div>
                    </div>
                </div>

                {/* Grace Period & Break Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-amber-50/30 p-6 rounded-[2rem] border border-amber-100 space-y-4">
                        <div className="flex items-center gap-2 text-amber-600 mb-2">
                            <Timer size={18} />
                            <span className="font-black text-xs uppercase tracking-widest">رعایتی وقت </span>
                        </div>
                        <InputField label="لیٹ آنے کی گنجائش (منٹ)" placeholder="15 Minutes" isDark />
                    </div>

                    <div className="bg-blue-50/30 p-6 rounded-[2rem] border border-blue-100 space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <Coffee size={18} />
                            <span className="font-black text-xs uppercase tracking-widest">وقفہ </span>
                        </div>
                        <InputField label="کھانے / نماز کا وقفہ" placeholder="45 Minutes" isDark />
                    </div>
                </div>
            </div>

            {/* Left Column: Rules & Summary Card */}
            <div className="space-y-6">
                {/* Policy Card */}
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ShieldCheck size={140} />
                    </div>

                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-80 border-b border-white/20 pb-2">Attendance Policy</h3>

                        <div className="space-y-6 relative z-10">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <p className="text-[10px] font-black opacity-60 mb-3 uppercase tracking-tighter">Late Policy (لیٹ رولز)</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                                        <p className="text-[10px] font-bold">3 دن لیٹ = 1 آدھی چھٹی کٹوتی</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
                                        <p className="text-[10px] font-bold">بغیر اطلاع چھٹی = 2 دن کٹوتی</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                                <p className="text-[10px] font-black text-emerald-400 mb-1 uppercase tracking-widest">Overtime Mode</p>
                                <p className="text-[11px] font-medium opacity-80 leading-relaxed">
                                    مقررہ وقت کے بعد کام کرنے پر فی گھنٹہ بونس لاگو ہوگا۔
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-start gap-3 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
                        <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                        <p className="text-[9px] font-bold text-amber-200/80 leading-relaxed font-urdu">
                            ٹائمنگ میں تبدیلی براہِ راست پے رول (Salary) پر اثر انداز ہو سکتی ہے۔
                        </p>
                    </div>
                </div>

                {/* Working Days Select */}
                <div className="bg-[var(--color-input)] p-6 rounded-[2.5rem] border border-[var(--color-border)]">
                    <h3 className="text-xs font-black text-[var(--color-primary)] mb-4 uppercase tracking-widest">ہفتہ وار چھٹی</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <button key={day} className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${day === 'Sun' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-600 border-slate-200 hover:border-[var(--color-primary)]'}`}>
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};