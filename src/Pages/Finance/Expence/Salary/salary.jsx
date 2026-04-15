import React, { useState } from 'react';
import { User, DollarSign, Briefcase, Calendar, CheckCircle, Clock, Plus, Save, Search } from 'lucide-react';

export const SalaryEntry = () => {
    // Farzi database (Employees List)
    const employeeDB = [
        { id: '1', name: 'Hammad Khan', role: 'Teacher', baseSalary: '45000' },
        { id: '2', name: 'Ahmed Ali', role: 'Staff', baseSalary: '25000' },
        { id: '3', name: 'Usman Ghani', role: 'Teacher', baseSalary: '35000' },
        { id: '4', name: 'Zohaib Hassan', role: 'Staff', baseSalary: '18000' },
    ];

    const [formData, setFormData] = useState({
        name: '',
        role: 'Teacher',
        amount: '',
        month: '',
        status: 'Pending'
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [entries, setEntries] = useState([
        { id: 101, name: 'Hammad Khan', role: 'Teacher', amount: '45000', month: '2026-03', status: 'Paid' }
    ]);

    // Search logic
    const filteredEmployees = employeeDB.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectEmployee = (emp) => {
        setFormData({
            ...formData,
            name: emp.name,
            role: emp.role,
            amount: emp.baseSalary
        });
        setSearchQuery(emp.name);
        setShowSuggestions(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.amount) return alert("Pehly employee select karen ya detail bharen!");

        setEntries([{ ...formData, id: Date.now() }, ...entries]);
        setFormData({ name: '', role: 'Teacher', amount: '', month: '', status: 'Pending' });
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen p-3 md:p-6 font-urdu bg-[var(--color-bg)] text-[var(--color-text-main)]" dir="rtl">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Entry Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 p-5 md:p-6 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[var(--color-primary)] rounded-lg text-[#0b1120]">
                                <Plus size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--color-primary)]">تنخواہ کی انٹری</h2>
                        </div>

                        {/* Search Bar for Employee */}
                        <div className="mb-6 relative">
                            <label className="block text-xs text-[var(--color-text-muted)] mb-2 mr-2">ملازم تلاش کریں (Auto-fill)</label>
                            <div className="relative">
                                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                <input
                                    type="text"
                                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-[var(--color-primary)] bg-[var(--color-input)] text-sm focus:outline-none shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)]"
                                    placeholder="نام سے تلاش کریں..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                            </div>

                            {/* Suggestions Dropdown */}
                            {showSuggestions && searchQuery && (
                                <div className="absolute z-20 w-full mt-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl max-h-48 overflow-y-auto">
                                    {filteredEmployees.length > 0 ? filteredEmployees.map(emp => (
                                        <div
                                            key={emp.id}
                                            onClick={() => handleSelectEmployee(emp)}
                                            className="p-3 hover:bg-[var(--color-primary)] hover:text-[#0b1120] cursor-pointer flex justify-between items-center transition-colors border-b border-[var(--color-border)] last:border-0"
                                        >
                                            <span className="font-bold text-sm">{emp.name}</span>
                                            <span className="text-[10px] opacity-70 px-2 py-0.5 rounded-md border border-current">{emp.role}</span>
                                        </div>
                                    )) : (
                                        <div className="p-3 text-xs text-center text-[var(--color-text-muted)]">کوئی ملازم نہیں ملا</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <hr className="mb-6 border-[var(--color-border)]" />

                        <form onSubmit={handleSave} className="space-y-4">
                            {/* Selected Name Display */}
                            <div className="p-3 rounded-xl bg-[var(--color-bg)] border border-dashed border-[var(--color-border)]">
                                <p className="text-[10px] text-[var(--color-text-muted)] mb-1">منتخب ملازم:</p>
                                <p className="font-bold text-[var(--color-primary)]">{formData.name || '---'}</p>
                            </div>

                            {/* Amount & Month */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-[var(--color-text-muted)] mb-2 mr-2">رقم (Amount)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-input)] text-sm focus:outline-none"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[var(--color-text-muted)] mb-2 mr-2">مہینہ</label>
                                    <input
                                        type="month"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-input)] text-sm focus:outline-none [color-scheme:dark]"
                                        value={formData.month}
                                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex gap-4 p-2 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)]">
                                <label className="flex items-center gap-2 cursor-pointer grow justify-center">
                                    <input type="radio" checked={formData.status === 'Paid'} onChange={() => setFormData({ ...formData, status: 'Paid' })} className="accent-[var(--color-primary)]" />
                                    <span className="text-xs">Paid</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer grow justify-center">
                                    <input type="radio" checked={formData.status === 'Pending'} onChange={() => setFormData({ ...formData, status: 'Pending' })} className="accent-orange-500" />
                                    <span className="text-xs">Pending</span>
                                </label>
                            </div>

                            <button className="w-full py-4 rounded-xl font-bold bg-[var(--color-primary)] text-[#0b1120] hover:bg-[var(--color-primary-hover)] shadow-lg transition-all flex items-center justify-center gap-2">
                                <Save size={18} />
                                تنخواہ جاری کریں
                            </button>
                        </form>
                    </div>
                </div>

                {/* Records List */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">حالیہ ریکارڈز</h2>
                        <span className="text-xs bg-[var(--color-surface)] px-4 py-1.5 rounded-full border border-[var(--color-border)]">
                            {entries.length} انٹریز
                        </span>
                    </div>

                    <div className="space-y-3">
                        {entries.map((entry) => (
                            <div key={entry.id} className="p-4 rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap md:flex-nowrap justify-between items-center gap-4 hover:border-[var(--color-primary)]/50 transition-all">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className={`p-3 rounded-xl ${entry.role === 'Teacher' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{entry.name}</h3>
                                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase">{entry.role}</p>
                                    </div>
                                </div>
                                <div className="flex flex-1 justify-between md:justify-around items-center w-full md:w-auto px-4">
                                    <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
                                        <Calendar size={14} />
                                        <span>{entry.month}</span>
                                    </div>
                                    <div className="text-[var(--color-primary)] font-extrabold text-lg">{entry.amount}/-</div>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-[10px] font-bold ${entry.status === 'Paid' ? 'bg-[var(--color-primary)] text-[#0b1120]' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                                    {entry.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};