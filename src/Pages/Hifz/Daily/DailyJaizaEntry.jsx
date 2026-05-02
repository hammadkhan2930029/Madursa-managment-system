import React, { useState } from 'react';
import { Calendar, User, School, BookOpen, Save, ArrowRight, ClipboardCheck } from 'lucide-react';

const DailyJaizaEntry = () => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        campus: '',
        class: '',
        section: '',
        student: '',
        sabaq: { para: '', ayat: '', mistake: '', atkann: '' },
        sabqi: { mistake: '', atkann: '' },
        manzil_1: { mistake: '', atkann: '', samia: '' },
        manzil_2: { mistake: '', atkann: '', samia: '' },
        quality: '',
    });

    const handleChange = (section, field, value) => {
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 bg-[var(--color-bg)] min-h-screen text-right" dir="rtl">

            {/* Header Section */}
            <div className="bg-[var(--color-surface)] rounded-[2rem] border border-[var(--color-border)] p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                            <ClipboardCheck size={30} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-[var(--color-text-main)]">یومیہ جائزہ اندراج</h1>
                            <p className="text-sm font-bold text-[var(--color-text-muted)]">طالب علم کی روزانہ کی کارکردگی درج کریں</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-main)] font-bold flex items-center gap-2 hover:bg-[var(--color-input)] transition-all">
                        <ArrowRight size={18} /> واپس فہرست
                    </button>
                </div>
            </div>

            {/* Selection Filters (Top Dropdowns) */}
            <div className="bg-[var(--color-surface)] rounded-[2rem] border border-[var(--color-border)] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-black text-[var(--color-text-muted)] mr-2">تاریخ</label>
                    <div className="relative">
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={18} />
                        <input
                            type="date"
                            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl py-3 pr-12 pl-4 text-[var(--color-text-main)] font-bold focus:border-[var(--color-primary)] outline-none"
                            value={formData.date}
                            onChange={(e) => handleChange(null, 'date', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-[var(--color-text-muted)] mr-2">کلاس منتخب کریں</label>
                    <div className="relative">
                        <School className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={18} />
                        <select className="w-full appearance-none bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl py-3 pr-12 pl-4 text-[var(--color-text-main)] font-bold focus:border-[var(--color-primary)] outline-none">
                            <option>کلاس منتخب کریں</option>
                            <option>حفظ اول</option>
                            <option>حفظ دوم</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-[var(--color-text-muted)] mr-2">سیکشن</label>
                    <select className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl py-3 px-4 text-[var(--color-text-main)] font-bold focus:border-[var(--color-primary)] outline-none">
                        <option>A</option>
                        <option>B</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-[var(--color-text-muted)] mr-2">طالب علم</label>
                    <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" size={18} />
                        <select className="w-full appearance-none bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl py-3 pr-12 pl-4 text-[var(--color-text-main)] font-bold focus:border-[var(--color-primary)] outline-none">
                            <option>طالب علم منتخب کریں</option>
                            <option>محمد احمد</option>
                            <option>عبداللہ خان</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Sabaq Section */}
                <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] p-6 space-y-4">
                    <h3 className="text-lg font-black text-[var(--color-primary)] flex items-center gap-2 mb-4">
                        <BookOpen size={20} /> سبق (Sabaq)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">پارہ / مقدار</label>
                            <input type="text" placeholder="مثلاً پارہ 1" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold focus:border-[var(--color-primary)] outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">غلطی</label>
                            <input type="number" placeholder="0" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold focus:border-[var(--color-primary)] outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">اٹکن</label>
                            <input type="number" placeholder="0" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold focus:border-[var(--color-primary)] outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">سماعت کرنے والا</label>
                            <input type="text" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold focus:border-[var(--color-primary)] outline-none text-right" />
                        </div>
                    </div>
                </div>

                {/* Sabqi Section */}
                <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] p-6 space-y-4">
                    <h3 className="text-lg font-black text-blue-400 flex items-center gap-2 mb-4">
                        <ClipboardCheck size={20} /> سبقی (Sabqi)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">غلطی</label>
                            <input type="number" placeholder="0" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold focus:border-blue-400 outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">اٹکن</label>
                            <input type="number" placeholder="0" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold focus:border-blue-400 outline-none text-right" />
                        </div>
                    </div>
                </div>

                {/* Manzil (Qabl-az-Zuhar) */}
                <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] p-6 space-y-4">
                    <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2 mb-4">
                        منزل (قبل الظہر)
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">پارہ تفصیل</label>
                            <input type="text" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">غلطی</label>
                            <input type="number" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">اٹکن</label>
                            <input type="number" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold outline-none text-right" />
                        </div>
                    </div>
                </div>

                {/* Manzil (Baad-az-Zuhar) */}
                <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] p-6 space-y-4">
                    <h3 className="text-lg font-black text-orange-400 flex items-center gap-2 mb-4">
                        منزل (بعد الظہر)
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">پارہ تفصیل</label>
                            <input type="text" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">غلطی</label>
                            <input type="number" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold outline-none text-right" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-1">اٹکن</label>
                            <input type="number" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-2.5 px-4 text-sm font-bold outline-none text-right" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quality & Remarks */}
            <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-[var(--color-text-muted)]">کیفیت (Quality)</label>
                        <div className="flex flex-wrap gap-3">
                            {['ممتاز', 'جید جداً', 'جید', 'مقبول', 'راسب'].map((q) => (
                                <button key={q} className="px-4 py-2 rounded-xl border border-[var(--color-border)] text-xs font-bold hover:bg-[var(--color-primary)] hover:text-[#0b1120] transition-colors">
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-[var(--color-text-muted)]">ریمارکس / ڈائری</label>
                        <textarea className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl py-3 px-4 text-sm font-bold outline-none focus:border-[var(--color-primary)] h-20" placeholder="کوئی خاص بات..."></textarea>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-4">
                <button className="w-full md:w-auto px-10 py-4 bg-[var(--color-primary)] text-[#0b1120] font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-[var(--color-primary)]/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Save size={20} /> ریکارڈ محفوظ کریں
                </button>
            </div>
        </div>
    );
};
