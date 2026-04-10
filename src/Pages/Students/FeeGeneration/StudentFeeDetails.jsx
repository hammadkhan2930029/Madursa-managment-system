import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus, History, Wallet, CheckCircle, Clock, Printer, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const StudentFeeDetail = ({ studentId, onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const navigate = useNavigate()

    // Mock Data: Student ki history
    const [history, setHistory] = useState([
        { id: 1, month: 'مارچ 2026', amount: 1500, date: '2026-03-05', status: 'paid', method: 'Cash' },
        { id: 2, month: 'فروری 2026', amount: 1500, date: '2026-02-10', status: 'partial', method: 'Online' },
        { id: 3, month: 'جنوری 2026', amount: 1500, date: '-', status: 'unpaid', method: '-' },
    ]);

    // Total Unpaid Calculation
    const totalUnpaid = history
        .filter(f => f.status !== 'paid')
        .reduce((sum, current) => sum + current.amount, 0);

    return (
        <div dir="rtl" className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8 font-urdu text-[var(--color-text-main)]">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Back Button & Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all"
                    >
                        <ArrowRight size={20} /> واپس جائیں
                    </button>
                    <h2 className="text-xl font-bold">طالب علم فیس پروفائل</h2>
                </div>

                {/* 1. Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm"
                    >
                        <p className="text-[var(--color-text-muted)] text-sm">طالب علم کا نام</p>
                        <h3 className="text-2xl font-bold mt-2">محمد احمد (ID: {studentId})</h3>
                        <p className="text-sm opacity-70 mt-1 ">درجہ: حفظ</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm flex items-center gap-4"
                    >
                        <div className="bg-[var(--color-primary)]/10 p-4 rounded-full text-[var(--color-primary)]">
                            <Wallet size={32} />
                        </div>
                        <div>
                            <p className="text-[var(--color-text-muted)] text-sm">کل واجب الادا رقم </p>
                            <h3 className="text-3xl font-black text-red-500 tracking-tighter">{totalUnpaid} روپیہ</h3>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Add Fee Form (Updated with 2 Dropdowns) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-6 text-[var(--color-primary)] font-bold">
                        <Plus size={20} /> فیس جمع کریں
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
                        {/* Field: Amount */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold px-1 text-[var(--color-text-muted)]">رقم </label>
                            <input type="number" placeholder="رقم لکھیں..." className="w-full bg-[var(--color-input)] border border-[var(--color-border)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                        </div>

                        {/* Dropdown: Payment Status */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold px-1 text-[var(--color-text-muted)]">اسٹیٹس </label>
                            <select className="w-full bg-[var(--color-input)] border border-[var(--color-border)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] appearance-none">
                                <option value="paid">مکمل ادا شدہ </option>
                                <option value="partial">ادھوری ادائیگی </option>
                                <option value="unpaid">بقایا </option>
                            </select>
                        </div>

                        {/* Dropdown: Payment Method */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold px-1 text-[var(--color-text-muted)]">ادائیگی کا طریقہ</label>
                            <select className="w-full bg-[var(--color-input)] border border-[var(--color-border)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)] appearance-none">
                                <option value="cash">نقد </option>
                                <option value="online">آن لائن </option>
                                <option value="cheque">چیک </option>
                            </select>
                        </div>

                        {/* Field: Date */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold px-1 text-[var(--color-text-muted)]">تاریخ</label>
                            <input type="date" className="w-full bg-[var(--color-input)] border border-[var(--color-border)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
                        </div>

                        {/* Save Button */}
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 h-[50px]">
                            محفوظ کریں
                        </button>
                    </div>
                </motion.div>

                {/* 3. Payment History Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-lg px-2">
                        <History size={20} className="text-[var(--color-text-muted)]" /> سابقہ ریکارڈ
                    </div>

                    <div className="space-y-3">
                        {history.map((record) => (
                            <div
                                key={record.id}
                                className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] flex items-center justify-between hover:border-[var(--color-primary)]/40 transition-all shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl ${record.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                                        record.status === 'partial' ? 'bg-orange-500/10 text-orange-500' :
                                            'bg-red-500/10 text-red-500'
                                        }`}>
                                        {record.status === 'paid' ? <CheckCircle size={22} /> : <Clock size={22} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{record.month}</h4>
                                        <div className="flex gap-3 mt-0.5">
                                            <p className="text-[var(--color-text-muted)] text-xs flex items-center gap-1">
                                                تاریخ: {record.date}
                                            </p>
                                            <p className="text-[var(--color-text-muted)] text-xs flex items-center gap-1">
                                                <CreditCard size={12} /> {record.method}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left flex flex-col items-end gap-1">
                                    <div className="font-black text-xl tracking-tight">{record.amount}</div>
                                    <div className="flex gap-2">
                                        <button className="text-[var(--color-primary)] text-xs font-bold py-1 px-2 rounded-lg bg-[var(--color-primary)]/5 flex items-center gap-1 hover:bg-[var(--color-primary)]/10 transition-all">
                                            <Printer size={12} /> رسید
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};