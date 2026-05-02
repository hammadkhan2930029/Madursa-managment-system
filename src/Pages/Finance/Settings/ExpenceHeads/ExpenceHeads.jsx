import React, { useState } from 'react';
import { Plus, Trash2, Save, ArrowRight, Receipt, AlertCircle, Edit2, Check, X } from 'lucide-react';

const createExpenseHead = () => ({ id: crypto.randomUUID(), title: '', category: 'General', budgetLimit: '' });

export const ExpenseHeadsSetup = () => {
    // Nayi entries ke liye state
    const [expenseHeads, setExpenseHeads] = useState(() => [createExpenseHead()]);

    // Mojooda data (List ke liye) - Real app mein ye API se ayega
    const [existingExpenses, setExistingExpenses] = useState([
        { id: 1, title: 'Bijli ka Bill', category: 'Operational', budgetLimit: '15000' },
        { id: 2, title: 'Staff Tea', category: 'General', budgetLimit: '2000' }
    ]);

    // --- Create Actions ---
    const addRow = () => {
        setExpenseHeads([...expenseHeads, createExpenseHead()]);
    };

    const deleteNewRow = (id) => {
        if (expenseHeads.length > 1) {
            setExpenseHeads(expenseHeads.filter(row => row.id !== id));
        }
    };

    const handleInputChange = (id, field, value) => {
        setExpenseHeads(expenseHeads.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    const handleSaveNew = () => {
        console.log("Saving Expenses:", expenseHeads);
        alert("اخراجات کی نئی اقسام محفوظ کر لی گئی ہیں!");
        setExpenseHeads([createExpenseHead()]);
    };

    // --- Delete Action ---
    const deleteExisting = (id) => {
        if (window.confirm("کیا آپ واقعی اس خرچ کی قسم کو ختم کرنا چاہتے ہیں؟")) {
            setExistingExpenses(existingExpenses.filter(e => e.id !== id));
        }
    };

    return (
        <div className="p-6 min-h-screen text-white " style={{ backgroundColor: 'var(--color-bg)' }}>

            {/* Header Section */}
            <div className="flex flex-row items-center justify-between mb-8 p-6 rounded-3xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex flex-row-reverse items-center gap-4 text-right">
                    <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)' }}>
                        <Receipt size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl ">اخراجات کی اقسام</h1>
                        <p className="text-gray-400 text-sm mt-4">طے کریں کہ پیسہ کہاں خرچ ہو رہا ہے</p>
                    </div>
                </div>
                <button onClick={handleSaveNew} className="flex items-center gap-2 font-bold px-8 py-3 rounded-2xl transition-all shadow-lg active:scale-95"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}>
                    <Save size={20} />
                    ڈیٹا محفوظ کریں
                </button>
            </div>

            {/* Input Section (Nayi Entry) */}
            <div className="max-w-5xl space-y-4 mb-12">
                <h2 className="text-lg font-semibold mb-4 text-right border-r-4 border-emerald-500 pr-3">نئی اقسام شامل کریں</h2>
                {expenseHeads.map((item, index) => (
                    <div key={item.id} className="flex flex-row-reverse items-center gap-4 p-4 rounded-2xl border animate-in slide-in-from-right duration-300"
                        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'rgba(255,255,255,0.05)' }}>

                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}>
                            {index + 1}
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input dir="rtl" type="text" placeholder="خرچ کا نام (مثلاً بجلی کا بل)" value={item.title}
                                onChange={(e) => handleInputChange(item.id, 'title', e.target.value)}
                                className="border rounded-xl p-3 text-sm outline-none bg-black/20 text-right focus:border-[var(--color-primary)] border-white/10"
                            />
                            <select dir="rtl" value={item.category} onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
                                className="border rounded-xl p-3 text-sm outline-none bg-black text-right focus:border-[var(--color-primary)] border-white/10">
                                <option value="General">عام اخراجات (General)</option>
                                <option value="Operational">کاروباری (Operational)</option>
                                <option value="Fixed Asset">مستقل اثاثے (Fixed Asset)</option>
                                <option value="Staff Related">عملے کے متعلق</option>
                            </select>
                            <input dir="rtl" type="number" placeholder="بجٹ لمٹ (اختیاری)" value={item.budgetLimit}
                                onChange={(e) => handleInputChange(item.id, 'budgetLimit', e.target.value)}
                                className="border rounded-xl p-3 text-sm outline-none bg-black/20 text-right focus:border-[var(--color-primary)] border-white/10"
                            />
                        </div>

                        {expenseHeads.length > 1 && (
                            <button onClick={() => deleteNewRow(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>
                ))}

                <div className="flex justify-start pt-2">
                    <button onClick={addRow} className="flex items-center gap-2 border-2 border-dashed px-6 py-2 rounded-xl transition-all text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]">
                        <Plus size={18} />
                        مزید سطر شامل کریں
                    </button>
                </div>
            </div>

            {/* List Section (Read & Update) */}
            <div className="max-w-5xl space-y-4">
                <h2 className="text-lg font-semibold mb-4 text-right border-r-4 border-blue-500 pr-3">موجودہ اخراجات کی فہرست</h2>
                <div className="overflow-hidden rounded-3xl border border-white/5" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <table className="w-full text-right" dir="rtl">
                        <thead className="bg-black/20 text-gray-400 text-sm">
                            <tr>
                                <th className="p-4">نمبر</th>
                                <th className="p-4">نام</th>
                                <th className="p-4">کیٹیگری</th>
                                <th className="p-4">بجٹ لمٹ</th>
                                <th className="p-4 text-center">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {existingExpenses.map((item, idx) => (
                                <tr key={item.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-sm">{idx + 1}</td>
                                    <td className="p-4 font-medium text-[var(--color-primary)]">{item.title}</td>
                                    <td className="p-4"><span className="px-3 py-1 bg-white/5 rounded-full text-xs">{item.category}</span></td>
                                    <td className="p-4 text-sm font-mono">{item.budgetLimit || '---'}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-3">
                                            <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => deleteExisting(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Note Section */}
            <div className="mt-12 flex flex-row items-start justify-center gap-4 p-5 rounded-3xl max-w-5xl text-right border border-[var(--color-border)]"
            >
                <AlertCircle size={24} className="shrink-0 mt-1 text-[var(--color-primary)]" />
                <div className="flex flex-row justify-center items-center gap-3">
                    <h4 style={{ color: 'var(--color-primary)' }} className="font-bold mb-1">ضروری نوٹ:</h4>
                    <p className="text-xs text-gray-500 leading-loose">
                        یہاں ڈیفائن کیے گئے اخراجات آپ کے <strong>"Daily Voucher Entry"</strong> میں ڈراپ ڈاؤن بن کر آئیں گے۔ بجٹ لمٹ لگانے سے سافٹ ویئر آپ کو خبردار کرے گا اگر خرچہ حد سے بڑھ جائے۔
                    </p>
                </div>
            </div>

        </div>
    );
};
