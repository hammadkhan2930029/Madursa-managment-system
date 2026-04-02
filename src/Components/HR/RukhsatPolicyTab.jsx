import React from 'react';
import { CalendarOff, Palmtree, Stethoscope, AlertCircle, FileText, Info, ShieldCheck } from 'lucide-react';
import { InputField, SelectField } from './FormElements';

export const RukhsatPolicyTab = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Right Column: Leave Quota Configuration */}
            <div className="lg:col-span-2 space-y-6">
                
                <div className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <CalendarOff className="text-indigo-600" size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-sm uppercase tracking-wide">رخصت کی پالیسی (Leave Policy)</h4>
                            <p className="text-[10px] text-[var(--color-text-muted)] font-bold">سالانہ چھٹیوں کا کوٹہ مقرر کریں</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {/* Casual Leaves */}
                        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between transition-all hover:border-blue-300">
                            <div className="flex items-center gap-3">
                                <Palmtree className="text-blue-600" size={20} />
                                <span className="font-bold text-xs">اتفاقی چھٹی (Casual)</span>
                            </div>
                            <div className="w-20">
                                <InputField label="" placeholder="10" type="number" isDark />
                            </div>
                        </div>

                        {/* Sick Leaves */}
                        <div className="p-5 bg-violet-50/50 rounded-2xl border border-violet-100 flex items-center justify-between transition-all hover:border-violet-300">
                            <div className="flex items-center gap-3">
                                <Stethoscope className="text-violet-600" size={20} />
                                <span className="font-bold text-xs">طبی چھٹی (Sick)</span>
                            </div>
                            <div className="w-20">
                                <InputField label="" placeholder="08" type="number" isDark />
                            </div>
                        </div>

                        {/* Annual/Paid Leaves */}
                        <div className="sm:col-span-2 p-5 bg-indigo-50/40 rounded-2xl border border-indigo-100 flex items-center justify-between transition-all hover:border-indigo-300">
                            <div className="flex items-center gap-3">
                                <FileText className="text-indigo-600" size={20} />
                                <span className="font-bold text-xs">سالانہ بااجرت چھٹی (Earned/Paid Leaves)</span>
                            </div>
                            <div className="w-20">
                                <InputField label="" placeholder="15" type="number" isDark />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leave Approval Rules */}
                <div className="bg-[var(--color-input)] p-6 rounded-[2rem] border border-[var(--color-border)]">
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 px-2">درخواست کے قواعد (Rules)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField 
                            label="پہلے سے اطلاع (Notice)" 
                            options={["2 دن پہلے", "1 ہفتہ پہلے", "فوری"]} 
                        />
                        <SelectField 
                            label="غیر حاضری کا اثر" 
                            options={["تنخواہ کٹوتی", "کوٹہ سے کٹوتی", "وارننگ"]} 
                        />
                    </div>
                </div>
            </div>

            {/* Left Column: Summary Card (Now in Indigo/Slate) */}
            <div className="space-y-6">
                <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                    <ShieldCheck className="absolute -right-6 -bottom-6 opacity-10" size={180} />
                    
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-80 border-b border-white/20 pb-2">Policy Overview</h3>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <AlertCircle size={20} className="shrink-0 mt-0.5 text-indigo-200" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-wider mb-1 text-indigo-200">ضروری معلومات</p>
                                    <p className="text-[11px] leading-relaxed opacity-90 font-medium font-urdu">
                                        مقررہ کوٹہ ختم ہونے کے بعد تمام چھٹیاں "بغیر تنخواہ" (LWP) شمار ہوں گی۔
                                    </p>
                                </div>
                            </div>

                            <div className="px-2">
                                <p className="text-[10px] font-black opacity-70 mb-3 uppercase tracking-widest">پالیسی تفصیلات</p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="opacity-80">ہفتہ وار چھٹی</span>
                                        <span className="text-emerald-400">شامل نہیں</span>
                                    </li>
                                    <li className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="opacity-80">سرکاری چھٹی</span>
                                        <span className="text-emerald-400">شامل نہیں</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <Info size={16} className="text-indigo-300 shrink-0" />
                        <p className="text-[9px] font-bold leading-relaxed opacity-70 uppercase tracking-tighter">
                            Adjustments will reflect in monthly payroll automatically.
                        </p>
                    </div>
                </div>

                {/* Additional Note (Violet Theme) */}
                <div className="bg-indigo-50 p-5 rounded-[2rem] border border-indigo-100 flex items-start gap-3">
                    <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600 shrink-0">
                        <CalendarOff size={16} />
                    </div>
                    <p className="text-[10px] font-black text-indigo-800 leading-relaxed font-urdu">
                        خاص حالات (مثلاً فریضہ حج) کے لیے الگ سے درخواست دی جا سکتی ہے۔
                    </p>
                </div>
            </div>
        </div>
    );
};