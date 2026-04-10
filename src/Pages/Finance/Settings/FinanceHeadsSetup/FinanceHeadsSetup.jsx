// import React, { useState } from 'react';
// import { Plus, Trash2, Save, ArrowRight, Wallet, Edit2, Check, X } from 'lucide-react';

// export const IncomeAndExpenceSetup = () => {
//     // Nayi entries ke liye state
//     const [heads, setHeads] = useState([{ id: Date.now(), title: '', description: '' }]);
    
//     // Farzi data: Mojooda aqsam jo list mein show hongi (Real app mein ye API se ayengi)
//     const [existingHeads, setExistingHeads] = useState([
//         { id: 1, title: 'Admission Fee', description: 'Naye dakhlo ki fees' },
//         { id: 2, title: 'Monthly Tuition', description: 'Mahnana fees' }
//     ]);

//     const [editingId, setEditingId] = useState(null);

//     // --- Actions for New Rows ---
//     const addNewRow = () => {
//         setHeads([...heads, { id: Date.now(), title: '', description: '' }]);
//     };

//     const removeRow = (id) => {
//         if (heads.length > 1) {
//             setHeads(heads.filter(row => row.id !== id));
//         }
//     };

//     const handleInputChange = (id, field, value) => {
//         setHeads(heads.map(row => row.id === id ? { ...row, [field]: value } : row));
//     };

//     const handleSaveNew = () => {
//         console.log("Saving:", heads);
//         alert("Nayi amdani ki aqsam mahfooz ho gayi hain!");
//         setHeads([{ id: Date.now(), title: '', description: '' }]); // Reset
//     };

//     // --- Actions for Existing List ---
//     const deleteExisting = (id) => {
//         if(window.confirm("Kya aap waqai isay khatam karna chahte hain?")) {
//             setExistingHeads(existingHeads.filter(h => h.id !== id));
//         }
//     };

//     return (
//         <div className="p-6 min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'white' }}>
            
//             {/* Header Section */}
//             <div className="flex flex-row items-center justify-between mb-8 p-6 rounded-3xl border" 
//                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'rgba(255,255,255,0.05)' }}>
//                 <div className="flex flex-row-reverse items-center gap-4 text-right">
//                     <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)' }}>
//                         <Wallet size={28} />
//                     </div>
//                     <div>
//                         <h1 className="text-2xl font-bold  text-right">آمدنی کی اقسام</h1>
//                         <p className="text-gray-400 text-sm mt-4">آمدنی کے نئے ذرائع یہاں متعین کریں</p>
//                     </div>
//                 </div>
//                 <button onClick={handleSaveNew} className="flex items-center gap-2 font-bold px-8 py-3 rounded-2xl transition-all shadow-lg active:scale-95"
//                         style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}>
//                     <Save size={20} />
//                     محفوظ کریں
//                 </button>
//             </div>

//             {/* Input Section (Nayi Aqsam) */}
//             <div className="space-y-4 max-w-4xl mb-12">
//                 <h2 className="text-lg font-semibold mb-4 text-right border-r-4 border-emerald-500 pr-3">نئی اقسام شامل کریں</h2>
//                 {heads.map((head, index) => (
//                     <div key={head.id} className="flex flex-row-reverse items-center gap-4 p-4 rounded-2xl border animate-in slide-in-from-right duration-300"
//                          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'rgba(255,255,255,0.05)' }}>
                        
//                         <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
//                              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}>
//                             {index + 1}
//                         </div>
                        
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input dir="rtl" type="text" placeholder="آمدنی کا نام (مثلاً کینٹین کرایہ)" value={head.title}
//                                    onChange={(e) => handleInputChange(head.id, 'title', e.target.value)}
//                                    className="border rounded-xl p-3 text-sm outline-none bg-black/20 text-right focus:border-[var(--color-primary)] border-white/10"
//                             />
//                             <input dir="rtl" type="text" placeholder="تفصیل (اختیاری)" value={head.description}
//                                    onChange={(e) => handleInputChange(head.id, 'description', e.target.value)}
//                                    className="border rounded-xl p-3 text-sm outline-none bg-black/20 text-right focus:border-[var(--color-primary)] border-white/10"
//                             />
//                         </div>

//                         {heads.length > 1 && (
//                             <button onClick={() => removeRow(head.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
//                                 <Trash2 size={20} />
//                             </button>
//                         )}
//                     </div>
//                 ))}

//                 <div className="flex justify-start pt-2">
//                     <button onClick={addNewRow} className="flex items-center gap-2 border-2 border-dashed px-6 py-2 rounded-xl transition-all text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]">
//                         <Plus size={18} />
//                         مزید سطر شامل کریں
//                     </button>
//                 </div>
//             </div>

//             {/* List Section (Mojooda Aqsam) */}
//             <div className="max-w-4xl space-y-4">
//                 <h2 className="text-lg font-semibold mb-4 text-right border-r-4 border-blue-500 pr-3">موجودہ اقسام کی فہرست</h2>
//                 <div className="overflow-hidden rounded-3xl border border-white/5" style={{ backgroundColor: 'var(--color-surface)' }}>
//                     <table className="w-full text-right" dir="rtl">
//                         <thead className="bg-black/20 text-gray-400 text-sm">
//                             <tr>
//                                 <th className="p-4">نمبر</th>
//                                 <th className="p-4">آمدنی کا نام</th>
//                                 <th className="p-4">تفصیل</th>
//                                 <th className="p-4 text-center">ایکشن</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {existingHeads.map((item, idx) => (
//                                 <tr key={item.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
//                                     <td className="p-4 text-sm">{idx + 1}</td>
//                                     <td className="p-4 font-medium text-[var(--color-primary)]">{item.title}</td>
//                                     <td className="p-4 text-sm text-gray-400">{item.description}</td>
//                                     <td className="p-4">
//                                         <div className="flex justify-center gap-3">
//                                             <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg">
//                                                 <Edit2 size={16} />
//                                             </button>
//                                             <button onClick={() => deleteExisting(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
//                                                 <Trash2 size={16} />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Note Section */}
//             <div className="mt-12 p-4 border rounded-2xl max-w-4xl text-right" 
//                  style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.05)', borderColor: 'rgba(var(--color-primary-rgb), 0.1)' }}>
//                 <div className="flex flex-row-reverse justify-center gap-3">
//                     <ArrowRight size={18} className="rotate-180" style={{ color: 'var(--color-primary)' }} />
//                     <p className="text-xs text-gray-400">
//                         <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>ضروری نوٹ:</span> یہاں شامل کی گئی اقسام آپ کو فیس وصولی اور دیگر آمدنی کے فارم میں نظر آئیں گی۔
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

import React, { useState } from 'react';
import { Plus, Trash2, Save, Wallet, Receipt, AlertCircle, Edit2, ArrowLeftRight } from 'lucide-react';

export const FinanceHeadsSetup = () => {
    // Tab State: 'income' ya 'expense'
    const [activeTab, setActiveTab] = useState('income');

    // --- STATES FOR INCOME ---
    const [incomeHeads, setIncomeHeads] = useState([{ id: Date.now(), title: '', description: '' }]);
    const [existingIncome, setExistingIncome] = useState([
        { id: 1, title: 'Admission Fee', description: 'Naye dakhlo ki fees' },
        { id: 2, title: 'Monthly Tuition', description: 'Mahnana fees' }
    ]);

    // --- STATES FOR EXPENSE ---
    const [expenseHeads, setExpenseHeads] = useState([{ id: Date.now(), title: '', category: 'General', budgetLimit: '' }]);
    const [existingExpenses, setExistingExpenses] = useState([
        { id: 1, title: 'Bijli ka Bill', category: 'Operational', budgetLimit: '15000' },
        { id: 2, title: 'Staff Tea', category: 'General', budgetLimit: '2000' }
    ]);

    // --- COMMON ACTIONS ---
    const addRow = () => {
        if (activeTab === 'income') {
            setIncomeHeads([...incomeHeads, { id: Date.now(), title: '', description: '' }]);
        } else {
            setExpenseHeads([...expenseHeads, { id: Date.now(), title: '', category: 'General', budgetLimit: '' }]);
        }
    };

    const deleteNewRow = (id) => {
        if (activeTab === 'income') {
            if (incomeHeads.length > 1) setIncomeHeads(incomeHeads.filter(row => row.id !== id));
        } else {
            if (expenseHeads.length > 1) setExpenseHeads(expenseHeads.filter(row => row.id !== id));
        }
    };

    const handleInputChange = (id, field, value) => {
        if (activeTab === 'income') {
            setIncomeHeads(incomeHeads.map(row => row.id === id ? { ...row, [field]: value } : row));
        } else {
            setExpenseHeads(expenseHeads.map(row => row.id === id ? { ...row, [field]: value } : row));
        }
    };

    const handleSave = () => {
        const data = activeTab === 'income' ? incomeHeads : expenseHeads;
        console.log(`Saving ${activeTab}:`, data);
        alert(`${activeTab === 'income' ? 'آمدنی' : 'اخراجات'} کی اقسام محفوظ کر لی گئی ہیں!`);
        // Reset form
        activeTab === 'income' 
            ? setIncomeHeads([{ id: Date.now(), title: '', description: '' }])
            : setExpenseHeads([{ id: Date.now(), title: '', category: 'General', budgetLimit: '' }]);
    };

    return (
        <div className="p-6 min-h-screen text-[var(--color-text)] bg-[var(--color-bg)]" >
            
            {/* Top Navigation & Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 p-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                
                <div className="flex flex-row-reverse items-center gap-4 text-right">
                    <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)' }}>
                        {activeTab === 'income' ? <Wallet size={28} /> : <Receipt size={28} />}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{activeTab === 'income' ? 'آمدنی کی اقسام' : 'اخراجات کی اقسام'}</h1>
                        <p className="text-gray-400 text-sm mt-4">مالیاتی کیٹیگریز کی سیٹنگ یہاں سے کریں</p>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-black/40 p-1.5 rounded-2xl border border-[var(--color-border)] w-full md:w-auto">
                    <button 
                        onClick={() => setActiveTab('expense')}
                        className={`flex-1 md:w-32 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'expense' ? 'bg-[var(--color-primary)] text-[var(--color-bg)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Receipt size={16} /> اخراجات
                    </button>
                    <button 
                        onClick={() => setActiveTab('income')}
                        className={`flex-1 md:w-32 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'income' ? 'bg-[var(--color-primary)] text-[var(--color-bg)]' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Wallet size={16} /> آمدنی
                    </button>
                </div>

                <button onClick={handleSave} className="bg-[var(--color-primary)] text-[var(--color-bg)] w-full md:w-auto flex items-center justify-center gap-2 font-bold px-10 py-3 rounded-2xl transition-all shadow-lg active:scale-95">
                    <Save size={20} /> محفوظ کریں
                </button>
            </div>

            {/* Dynamic Input Form */}
            <div className="max-w-6xl mx-auto space-y-4 mb-12">
                <h2 className="text-lg font-semibold mb-4 text-right border-r-4 border-[var(--color-primary)] pr-3">
                    نئی {activeTab === 'income' ? 'آمدنی' : 'اخراجات'} شامل کریں
                </h2>
                
                {(activeTab === 'income' ? incomeHeads : expenseHeads).map((item, index) => (
                    <div key={item.id} className="bg-[var(--color-surface)] flex flex-row-reverse items-center gap-4 p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] animate-in slide-in-from-top-4 duration-300">
                        
                        <div className="w-8 h-8 bg-[var(--color-primary)]  rounded-full flex items-center justify-center font-bold text-xs shrink-0 text-[var(--color-bg)]">
                            {index + 1}
                        </div>
                        
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input dir="rtl" type="text" 
                                   placeholder={activeTab === 'income' ? "آمدنی کا نام" : "خرچ کا نام"} 
                                   value={item.title}
                                   onChange={(e) => handleInputChange(item.id, 'title', e.target.value)}
                                   className="border rounded-xl p-3 text-sm outline-none bg-black/20 text-right focus:border-[var(--color-primary)] border-white/10"
                            />
                            
                            {activeTab === 'expense' ? (
                                <>
                                    <select dir="rtl" value={item.category} onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
                                            className="border bg-black/20 rounded-xl p-3 text-sm outline-none bg-black text-right focus:border-[var(--color-primary)] border-white/10">
                                        <option value="General">عام اخراجات</option>
                                        <option value="Operational">کاروباری</option>
                                        <option value="Fixed Asset">مستقل اثاثے</option>
                                    </select>
                                    <input dir="rtl" type="number" placeholder="بجٹ لمٹ" value={item.budgetLimit}
                                           onChange={(e) => handleInputChange(item.id, 'budgetLimit', e.target.value)}
                                           className="border rounded-xl p-3 text-sm outline-none bg-black/20 text-right focus:border-[var(--color-primary)] border-white/10"
                                    />
                                </>
                            ) : (
                                <input dir="rtl" type="text" placeholder="تفصیل (اختیاری)" value={item.description}
                                       onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                                       className="md:col-span-2 border rounded-xl p-3 text-sm outline-none bg-black/20 text-right focus:border-[var(--color-primary)] border-white/10"
                                />
                            )}
                        </div>

                        <button onClick={() => deleteNewRow(item.id)} 
                                className={`p-2 rounded-lg transition-all ${(activeTab === 'income' ? incomeHeads.length : expenseHeads.length) === 1 ? 'opacity-20 cursor-not-allowed' : 'text-red-400 hover:bg-red-500/10'}`}>
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}

                <button onClick={addRow} className="flex items-center gap-2 border-2 border-dashed px-6 py-2 rounded-xl transition-all text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]">
                    <Plus size={18} /> مزید سطر شامل کریں
                </button>
            </div>

            {/* List Table Section */}
            <div className="max-w-6xl mx-auto space-y-4">
                <h2 className="text-lg font-semibold mb-4 text-right border-r-4 border-blue-500 pr-3">موجودہ فہرست ({activeTab === 'income' ? 'آمدنی' : 'اخراجات'})</h2>
                <div className="overflow-hidden rounded-3xl border border-white/5" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <table className="w-full text-right" dir="rtl">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">نام</th>
                                {activeTab === 'expense' ? <th className="p-4">کیٹیگری / بجٹ</th> : <th className="p-4">تفصیل</th>}
                                <th className="p-4 text-center">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {(activeTab === 'income' ? existingIncome : existingExpenses).map((item, idx) => (
                                <tr key={item.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-gray-500">{idx + 1}</td>
                                    <td className="p-4 font-medium text-[var(--color-primary)]">{item.title}</td>
                                    <td className="p-4">
                                        {activeTab === 'expense' ? (
                                            <div className="flex flex-col">
                                                <span>{item.category}</span>
                                                <span className="text-xs text-gray-500">لمٹ: {item.budgetLimit || 'N/A'}</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">{item.description || '---'}</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit2 size={16} /></button>
                                            <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hint Box */}
            <div className="mt-12 max-w-6xl mx-auto flex flex-row items-center gap-4 p-5 rounded-3xl border border-white/5 bg-white/5">
                <AlertCircle size={24} className="text-gray-500 shrink-0" />
                <p className="text-xs text-gray-500 text-right leading-relaxed">
                    <span className="font-bold text-[var(--color-primary)]">پیشہ ورانہ مشورہ:</span> آمدنی اور اخراجات کو صحیح طرح کیٹیگریز میں تقسیم کرنے سے آپ کو مہینے کے آخر میں "Profit & Loss" رپورٹ سمجھنے میں آسانی ہوگی۔
                </p>
            </div>
        </div>
    );
};