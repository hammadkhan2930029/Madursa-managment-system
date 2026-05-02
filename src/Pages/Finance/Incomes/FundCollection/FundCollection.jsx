import React, { useState } from 'react';
import { Save, Copy, Plus, Trash2, User, Phone, Wallet, Landmark, FileText, Printer, X, CheckCircle } from 'lucide-react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { BankSearchField, DateField, InputField } from '../../../../Components/HR/FormElements';
import { pakistanBanks } from '../../../../Constant/AllBanks';
import {AppImages} from '../../../../Constant/AppImages'

const createFundEntry = () => ({
    id: crypto.randomUUID(),
    paymentMode: 'Cash',
    type: '',
    subCategory: '',
    amount: '',
    purpose: '',
    receiptNo: '',
    bankName: '',
    branchCode: '',
    chequeNo: '',
    chequeDate: new Date().toISOString().split('T')[0]
});

export const FundCollection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [donorInfo, setDonorInfo] = useState({ name: '', careOf: '', number: '' });

    const donationTypes = {
        "واجبی (Wajiba)": ["زکوٰۃ", "فطرہ", "فدیہ", "کفارہ", "قربانی"],
        "نفلی (Nafila)": ["عام صدقہ", "تعمیرات", "عطیہ", "افطار پارٹی", "تعلیمی فنڈ"]
    };

    const [funds, setFunds] = useState(() => [createFundEntry()]);

    const handleAddFund = () => setFunds([...funds, createFundEntry()]);
    const handleCopyFund = (index) => setFunds([...funds, { ...funds[index], id: crypto.randomUUID() }]);
    const removeFund = (id) => { if (funds.length > 1) setFunds(funds.filter(f => f.id !== id)); };

    const updateFund = (index, field, value) => {
        const newFunds = [...funds];
        newFunds[index][field] = value;
        if (field === 'type') newFunds[index]['subCategory'] = '';
        setFunds(newFunds);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const totalAmount = funds.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
        const currentDate = new Date().toLocaleDateString('en-GB');
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const cashTotal = funds.filter(f => f.paymentMode === 'Cash').reduce((a, b) => a + Number(b.amount || 0), 0);
        const chequeTotal = funds.filter(f => f.paymentMode === 'Cheque').reduce((a, b) => a + Number(b.amount || 0), 0);

        printWindow.document.write(`
        <html dir="rtl">
            <head>
                <title>A5 Receipt</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');
                    
                    @page { 
                        size: A5; 
                        margin: 0; 
                    }
                    body { 
                        margin: 0; 
                        padding: 0; 
                        -webkit-print-color-adjust: exact; 
                    }
                    .urdu-font { font-family: 'Noto Nastaliq Urdu', serif; }
                    
                    /* A5 dimensions constraint */
                    .a5-page {
                        width: 148mm;
                        height: 210mm;
                        padding: 10mm;
                        margin: auto;
                        box-sizing: border-box;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        background: white;
                    }
                </style>
            </head>
            <body class="bg-gray-100">
                <div class="a5-page shadow-lg">
                    <div class="flex justify-between text-[8px] text-gray-500 mb-2">
                        <span>وقتِ پرنٹ: ${currentDate} | ${currentTime}</span>
                        <span dir="ltr">ID: ${donorInfo.name ? donorInfo.name.substring(0, 5) : '---'}</span>
                    </div>
                    <div>
                       <div class="text-center mb-4 border-b-2 border-green-700 pb-2">
                             <h1 class="urdu-font text-xl font-bold text-green-800">جامعہ مدرسہ (آپ کا نام)</h1>
                             <span class="mt-3 urdu-font text-xs bg-green-700 text-white px-3 py-3 rounded-full inline-block mt-1">الیکٹرانک رسیدِ عطیات</span>
                        </div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                        <img 
                             src={${AppImages.logo} 
                             alt="Watermark Logo" 
                             class="w-1/2 opacity-5 -rotate-12 object-contain"
                          />
                    </div>

                    <div class="grid grid-cols-2 gap-2 mb-3">
                        <div class="border border-green-200 bg-green-50 p-2 rounded-lg flex flex-row items-center">
                            <p class="urdu-font text-[10px] text-green-700">نام دہندہ:</p>
                            <p class="urdu-font text-xs font-bold mr-4">${donorInfo.name || '---'}</p>
                        </div>
                        <div class="border border-green-200 bg-green-50 p-2 rounded-lg flex flex-row items-center">
                            <p class="urdu-font text-[10px] text-green-700">فون نمبر:</p>
                            <p class="text-xs font-bold" dir="ltr mr-4">${donorInfo.number || '---'}</p>
                        </div>
                    </div>

                    <div class="flex-grow overflow-hidden">
                        <table class="w-full text-right border-collapse">
                            <thead>
                                <tr class="bg-green-700 text-white urdu-font text-[10px]">
                                    <th class="p-1 border border-green-800 text-center">شمار</th>
                                    <th class="p-1 border border-green-800">نوعیت</th>
                                    <th class="p-1 border border-green-800 text-center">طریقہ</th>
                                    <th class="p-1 border border-green-800 text-center">رقم</th>
                                </tr>
                            </thead>
                            <tbody class="urdu-font text-[10px]">
                                ${funds.map((f, i) => `
                                    <tr class="border-b border-gray-200">
                                        <td class="p-1 text-center border-x">${i + 1}</td>
                                        <td class="p-1 border-x">${f.type} - ${f.subCategory}</td>
                                        <td class="p-1 text-center border-x">${f.paymentMode === 'Cash' ? 'نقد' : 'چیک'}</td>
                                        <td class="p-1 text-center font-bold border-x">${f.amount}/-</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-4 border-t border-dashed border-gray-400 pt-3">
                        <div class="flex justify-between items-start gap-4">
                            <div class="w-1/2">
                                <table class="w-full text-[10px] border border-gray-300">
                                    <tr class="bg-gray-50 border-b">
                                        <td class="p-1 border-l urdu-font text-center font-bold">نقد</td>
                                        <td class="p-1 border-l urdu-font text-center font-bold">چیک</td>
                                        <td class="p-1 urdu-font text-center font-bold bg-green-50 text-green-800">میزان کل</td>
                                    </tr>
                                    <tr>
                                        <td class="p-1 border-l text-center">${cashTotal}/-</td>
                                        <td class="p-1 border-l text-center">${chequeTotal}/-</td>
                                        <td class="p-1 text-center font-extrabold text-sm bg-green-100 text-green-900">${totalAmount}/-</td>
                                    </tr>
                                </table>
                            </div>

                            <div class="w-1/2 urdu-font text-[10px] space-y-4 pt-2">
                                <div class="flex justify-between border-b border-black pb-1">
                                    <span>دستخط دہندہ:</span>
                                    <span></span>
                                </div>
                                <div class="flex justify-between border-b border-black pb-1">
                                    <span>دستخط وصول کنندہ:</span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 bg-green-800 text-white p-2 rounded-lg text-center">
                        <p class="urdu-font text-[9px] leading-relaxed">
                            آپ کا شکریہ
                        </p>
                    </div>
                </div>

                <script>
                    window.onload = () => {
                        window.print();
                        window.onafterprint = () => window.close();
                    };
                </script>
            </body>
        </html>
    `);
        printWindow.document.close();
    };

    const handleFinalSave = (shouldPrint) => {
        setIsModalOpen(false);
        if (shouldPrint) handlePrint();
        else alert("ڈیٹا محفوظ کر لیا گیا!");
    };

    return (
        <div dir="rtl" className="min-h-screen bg-[var(--color-bg)] md:p-8 font-urdu">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header - ORIGINAL UI */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20">
                        <Wallet size={28} />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-main)]">فنڈ کلیکشن فارم</h1>
                </div>

                {/* Section 1: Personal Info - ORIGINAL UI */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-[var(--color-surface)] rounded-[2rem] p-6 border border-[var(--color-border)] shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b border-[var(--color-border)] pb-3">
                        <User className="text-[var(--color-primary)]" size={20} />
                        <h2 className="text-xl font-bold">ذاتی معلومات (Personal Info)</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold pr-2">نام دہندہ</label>
                            <input type="text" value={donorInfo.name} onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })} className="w-full bg-[var(--color-input)] p-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="احمد علی..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold pr-2">ولدیت / ولد</label>
                            <input type="text" value={donorInfo.careOf} onChange={(e) => setDonorInfo({ ...donorInfo, careOf: e.target.value })} className="w-full bg-[var(--color-input)] p-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="نام..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold pr-2">فون نمبر</label>
                            <input type="text" dir="ltr" value={donorInfo.number} onChange={(e) => setDonorInfo({ ...donorInfo, number: e.target.value })} className="w-full bg-[var(--color-input)] p-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-right" placeholder="03xx-xxxxxxx" />
                        </div>
                    </div>
                </motion.div>

                {/* Section 2: Fund Info - ORIGINAL UI */}
                <AnimatePresence>
                    {funds.map((fund, index) => (
                        <motion.div key={fund.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 50 }}
                            className="bg-[var(--color-surface)] rounded-[2rem] p-6 border-2 border-[var(--color-primary)]/10 shadow-md relative"
                        >
                            <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border)] pb-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="text-[var(--color-primary)]" size={20} />
                                    <h2 className="text-xl font-bold text-[var(--color-primary)]">فنڈ کی تفصیلات #{index + 1}</h2>
                                </div>
                                <div className="flex gap-2">
                                    <InputField type='file' placeholder='تصویر منتضب فرمائے' />
                                    <button onClick={() => handleCopyFund(index)} className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-all"><Copy size={20} /></button>
                                    {funds.length > 1 && <button onClick={() => removeFund(fund.id)} className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"><Trash2 size={20} /></button>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">ادائیگی کا طریقہ</label>
                                    <select value={fund.paymentMode} onChange={(e) => updateFund(index, 'paymentMode', e.target.value)} className="w-full bg-[var(--color-input)] p-3 rounded-xl border border-[var(--color-border)] outline-none">
                                        <option value="Cash">Cash (نقد)</option>
                                        <option value="Cheque">Cheque (چیک)</option>
                                        <option value="online">Online (آن لائن)</option>

                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">قسم (Type)</label>
                                    <select value={fund.type} onChange={(e) => updateFund(index, 'type', e.target.value)} className="w-full bg-[var(--color-input)] p-3 rounded-xl border border-[var(--color-border)] outline-none">
                                        <option value="">منتخب کریں...</option>
                                        {Object.keys(donationTypes).map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">ذیلی قسم (Sub-Type)</label>
                                    <select value={fund.subCategory} onChange={(e) => updateFund(index, 'subCategory', e.target.value)} className="w-full bg-[var(--color-input)] p-3 rounded-xl border border-[var(--color-border)] outline-none">
                                        <option value="">منتخب کریں...</option>
                                        {fund.type && donationTypes[fund.type].map(st => <option key={st} value={st}>{st}</option>)}
                                    </select>
                                </div>
                                <InputField label='رقم' placeholder="00000" type="number" value={fund.amount} onChange={(e) => updateFund(index, 'amount', e.target.value)} />
                                <InputField label="رسید نمبر" placeholder="R-101" value={fund.receiptNo} onChange={(e) => updateFund(index, 'receiptNo', e.target.value)} />
                                <div className="space-y-2 lg:col-span-3">
                                    <InputField label='مقصد / تفصیل' placeholder="کوئی خاص وجہ یا پیغام..." value={fund.purpose} onChange={(e) => updateFund(index, 'purpose', e.target.value)} />
                                </div>
                            </div>

                            {fund.paymentMode === 'Cheque' && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                    className="mt-6 p-4 bg-[var(--color-surface)] rounded-2xl border border-blue-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <BankSearchField label=" بینک کا نام" value={fund.bankName} options={pakistanBanks} isDark={true} onSelect={(bank) => updateFund(index, 'bankName', bank)} onChange={(val) => updateFund(index, 'bankName', val)} />
                                    <InputField label='برانچ کوڈ' type="number" placeholder="0021" value={fund.branchCode} onChange={(e) => updateFund(index, 'branchCode', e.target.value)} />
                                    <InputField label='چیک نمبر' type="number" placeholder="0021000" value={fund.chequeNo} onChange={(e) => updateFund(index, 'chequeNo', e.target.value)} />
                                    <DateField label='تاریخ' value={fund.chequeDate} onChange={(e) => updateFund(index, 'chequeDate', e.target.value)} />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Buttons - ORIGINAL UI */}
                <div className="flex flex-wrap gap-4 pt-4">
                    <button onClick={handleAddFund} className="flex-1 min-w-[150px] bg-[var(--color-input)] text-[var(--color-text-main)] py-4 rounded-2xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] flex items-center justify-center gap-2 font-bold">
                        <Plus size={20} /> ایک اور فنڈ شامل کریں
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="flex-1 min-w-[150px] bg-[var(--color-primary)] text-white py-4 rounded-2xl shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2 font-bold transition-all hover:scale-[1.02]">
                        <Save size={20} /> ڈیٹا محفوظ کریں
                    </button>
                </div>

                {/* Pop-up Modal (Added Logic) */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} /></div>
                                <h3 className="text-xl font-bold mb-2">ڈیٹا محفوظ کریں</h3>
                                <div className="space-y-3 mt-6">
                                    <button onClick={() => handleFinalSave(true)} className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"><Printer size={18} /> محفوظ اور پرنٹ کریں</button>
                                    <button onClick={() => handleFinalSave(false)} className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-bold flex items-center justify-center gap-2"><Save size={18} /> صرف محفوظ کریں</button>
                                    <button onClick={() => setIsModalOpen(false)} className="w-full text-gray-400 py-2 text-sm font-bold underline">کینسل کریں</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
