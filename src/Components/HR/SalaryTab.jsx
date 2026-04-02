import React from 'react';
import { Wallet, PlusCircle, BadgeDollarSign, Info } from 'lucide-react';
import { InputField, SelectField } from './FormElements';

export const SalaryTab = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Right Column: Hiring Salary Details */}
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    
                    {/* Basic Hiring Pay */}
                    <div className="sm:col-span-2 bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <BadgeDollarSign className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase tracking-wide">بنیادی پیکج </h4>
                                <p className="text-[10px] text-[var(--color-text-muted)] font-bold">ملازم کی بنیادی تنخواہ طے کریں</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InputField label="طے شدہ تنخواہ" placeholder="0.00" type="number" />
                            <SelectField label="کرنسی / ادائیگی" options={["PKR - روپیہ", "USD - ڈالر"]} />
                        </div>
                    </div>

                    {/* Allowances Section */}
                    <div className="sm:col-span-2 bg-[var(--color-input)] p-6 rounded-[2rem] border border-[var(--color-border)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <PlusCircle className="text-emerald-600" size={22} />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase tracking-wide text-emerald-700">اضافی مراعات </h4>
                                <p className="text-[10px] text-emerald-600/70 font-bold">ہائرنگ کے وقت دیے جانے والے الاؤنسز</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <InputField label="ہاؤس رینٹ" placeholder="0.00" isDark />
                            <InputField label="کنوینس (Travel)" placeholder="0.00" isDark />
                            <InputField label="میڈیکل" placeholder="0.00" isDark />
                            <InputField label="دیگر الاؤنس" placeholder="0.00" isDark />
                        </div>
                    </div>

                </div>
            </div>

            {/* Left Column: Hiring Summary */}
            <div className="space-y-6">
                <div className="bg-[var(--color-primary)] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[var(--color-primary)]/20 relative overflow-hidden h-full min-h-[300px] flex flex-col justify-between">
                    {/* Decorative Background Icon */}
                    <BadgeDollarSign className="absolute -right-6 -bottom-6 opacity-10" size={160} />
                    
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-80 border-b border-white/20 pb-2">Total Offering</h3>
                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-[10px] uppercase font-black opacity-70 mb-1">Gross Salary (کل تنخواہ)</p>
                                <h2 className="text-4xl font-black tracking-tight">Rs. 0.00</h2>
                            </div>
                            
                            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold opacity-80">Basic Pay</span>
                                    <span className="text-xs font-bold">Rs. 0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold opacity-80">Allowances</span>
                                    <span className="text-xs font-bold">Rs. 0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 bg-black/10 p-4 rounded-2xl mt-6">
                        <Info size={16} className="shrink-0 mt-0.5 opacity-80" />
                        <p className="text-[12px] font-bold leading-relaxed opacity-90 ">
                            یہ رقم ملازم کے ہائرنگ لیٹر پر پرنٹ ہوگی۔ کٹوتیاں اور ٹیکس پے رول کے وقت مینیج کیے جائیں گے۔
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};