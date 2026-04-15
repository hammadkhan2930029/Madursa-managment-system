import React, { useState } from 'react';
import { Eye, Printer, User, Phone, Wallet, Search } from 'lucide-react';
import { DateField, InputField } from '../../../../Components/HR/FormElements';

export const FundList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const funds = [
        { id: '10234', name: 'Hammad Khan', phone: '03001234567', type: 'Zakat', amount: '5000', date: '2026-04-10' },
        { id: '10235', name: 'Ahmed Ali', phone: '03129876543', type: 'Sadaqah', amount: '2000', date: '2026-04-12' },
        { id: '10236', name: 'Mohammad Usman', phone: '03214567890', type: 'Fitrana', amount: '1500', date: '2026-04-14' },
    ];

    const filteredFunds = funds.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.phone.includes(searchTerm);
        const fundDate = new Date(f.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return matchesSearch && ((!start || fundDate >= start) && (!end || fundDate <= end));
    });

    return (
        <div className="min-h-screen p-3 md:p-6 font-urdu bg-[var(--color-bg)] text-[var(--color-text-main)] transition-colors duration-300" dir="rtl">

            {/* Header Section */}
            <div className="mb-6 flex flex-col gap-5 pb-6 px-4 md:px-6 py-5 rounded-[1.5rem] md:rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-[var(--color-primary)]">عطیات کی فہرست</h1>
                    <span className="text-[10px] md:text-xs px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)]">
                        کل ریکارڈ: {filteredFunds.length}
                    </span>
                </div>

                {/* Filters Row - Stack on Mobile, Row on Tablet/Desktop */}
                <div className="flex flex-col lg:flex-row gap-3">
                    
                    {/* Search Field */}
                    <div className="relative w-full lg:flex-grow">
                        <span className="absolute inset-y-0 right-3 flex items-center text-[var(--color-text-muted)]">
                            <Search size={18} />
                        </span>
                        <InputField
                            type="text"
                            placeholder="نام یا فون نمبر..."
                            className="w-full pr-10 pl-4 py-3 rounded-xl focus:outline-none border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text-main)] focus:border-[var(--color-primary)] transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Dates Section - Responsive alignment */}
                    <div className="flex flex-row items-center gap-2 w-full lg:w-auto">
                        <div className="flex-1 lg:flex-none">
                            <DateField
                                type="date"
                                // className="w-full px-2 py-3 rounded-xl text-xs focus:outline-none border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text-main)] [color-scheme:dark] dark:[color-scheme:dark]"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <span className="text-[var(--color-text-muted)] text-[10px] font-bold">تا</span>
                        <div className="flex-1 lg:flex-none">
                            <DateField
                                type="date"
                                // className="w-full px-2 py-3 rounded-xl text-xs focus:outline-none border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text-main)] [color-scheme:dark] dark:[color-scheme:dark]"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="w-full lg:w-auto px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-sm bg-[var(--color-primary)] text-[#0b1120] hover:bg-[var(--color-primary-hover)]">
                        تلاش کریں
                    </button>
                </div>
            </div>

            {/* List - Grid adjustment for all screens */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFunds.map((fund) => (
                    <div key={fund.id} className="rounded-2xl p-4 md:p-5 shadow-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all group relative overflow-hidden">

                        {/* Date Tag */}
                        <div className="absolute top-0 left-0 px-3 py-1 text-[9px] md:text-[10px] rounded-br-xl font-mono bg-[var(--color-primary)] text-[#0b1120] font-bold">
                            {fund.date}
                        </div>

                        {/* Top Info */}
                        <div className="flex justify-between items-start mb-4 mt-5">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 md:p-3 rounded-xl bg-[var(--color-input)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[#0b1120] transition-colors">
                                    <User size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-[var(--color-text-main)] leading-tight">{fund.name}</h3>
                                    <p className="text-[10px] text-[var(--color-text-muted)] mt-1 font-mono">ID: #{fund.id}</p>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-lg text-[9px] md:text-[10px] font-bold border border-[var(--color-primary)] text-[var(--color-primary)] whitespace-nowrap">
                                {fund.type}
                            </span>
                        </div>

                        {/* Amount Box */}
                        <div className="space-y-3 p-3 rounded-xl mb-5 border border-[var(--color-border)] bg-[var(--color-bg)]">
                            <div className="flex justify-between items-center text-xs md:text-sm">
                                <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                                    <Phone size={14} /> فون:
                                </span>
                                <span className="text-[var(--color-text-main)] font-semibold">{fund.phone}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm border-t border-[var(--color-border)] pt-2">
                                <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                                    <Wallet size={14} /> رقم:
                                </span>
                                <span className="text-[var(--color-primary)] font-extrabold text-base md:text-lg">{fund.amount}/-</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 md:gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-[11px] md:text-xs border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text-main)] active:bg-[var(--color-border)]">
                                <Eye size={16} />
                                <span>تفصیل</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-[11px] md:text-xs font-bold bg-[var(--color-primary)] text-[#0b1120] active:opacity-80 shadow-md">
                                <Printer size={16} />
                                <span>پرنٹ</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredFunds.length === 0 && (
                <div className="text-center py-10 text-[var(--color-text-muted)]">
                    کوئی ریکارڈ نہیں ملا
                </div>
            )}
        </div>
    );
};