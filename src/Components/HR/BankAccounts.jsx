import React from 'react';
import { Landmark, CreditCard, MapPin, Fingerprint, ShieldCheck, HelpCircle, FileCheck } from 'lucide-react';
import { InputField, SelectField } from './FormElements';

export const BankAccountTab = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Right Column: Bank Details Form */}
            <div className="lg:col-span-2 space-y-6">
                
                <div className="bg-[var(--color-surface)] p-6 rounded-[2rem] border border-[var(--color-border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <Landmark className="text-emerald-600" size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-sm uppercase tracking-wide">بینک اکاؤنٹ کی تفصیلات</h4>
                            <p className="text-[10px] text-[var(--color-text-muted)] font-bold">تنخواہ کی ادائیگی کے لیے اکاؤنٹ کی معلومات درج کریں</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <SelectField 
                            label="بینک کا نام" 
                            options={["Meezan Bank", "Habib Bank (HBL)", "MCB Bank", "Allied Bank", "Bank Alfalah", "UBL", "Standard Chartered", "دیگر"]} 
                        />
                        <InputField label="اکاؤنٹ ٹائٹل (نام)" placeholder="جیسا کہ چیک بک پر لکھا ہے" />
                        
                        <div className="sm:col-span-2">
                            <InputField label="IBAN / اکاؤنٹ نمبر" placeholder="PK00 XXXX 0000 0000 0000 0000" />
                        </div>

                        <InputField label="برانچ کا نام / کوڈ" placeholder="مثلاً: گلشن برانچ (0123)" />
                        <InputField label="شہر" placeholder="کراچی، لاہور، وغیرہ" />
                    </div>
                </div>

                {/* Verification Document Upload */}
                <div className="bg-emerald-50/30 p-8 rounded-[2rem] border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600">
                        <CreditCard size={32} />
                    </div>
                    <div>
                        <h4 className="font-black text-sm text-emerald-900 font-urdu">چیک بک یا ڈیبٹ کارڈ کی تصویر</h4>
                        <p className="text-[10px] font-bold text-emerald-700/70 max-w-xs mx-auto">
                            اکاؤنٹ نمبر کی تصدیق کے لیے کینسل شدہ چیک (Cancelled Cheque) کی تصویر اپ لوڈ کریں
                        </p>
                    </div>
                    <label className="cursor-pointer bg-emerald-600 text-white px-8 py-3 rounded-2xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                        تصویر اپ لوڈ کریں
                        <input type="file" className="hidden" />
                    </label>
                </div>
            </div>

            {/* Left Column: Security & Info Sidebar */}
            <div className="space-y-6">
                {/* Security Card */}
                <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                    <ShieldCheck className="absolute -right-6 -bottom-6 opacity-10" size={180} />
                    
                    <div>
                        <div className="flex justify-between items-start mb-8 border-b border-white/20 pb-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Payment Security</h3>
                            <Fingerprint size={20} className="opacity-60" />
                        </div>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="bg-black/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-3 text-emerald-200">
                                    <FileCheck size={18} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">ڈیٹا کی حفاظت</p>
                                </div>
                                <p className="text-[11px] leading-relaxed opacity-90 font-medium">
                                    آپ کی بینکنگ تفصیلات صرف تنخواہ کی منتقلی کے لیے استعمال کی جائیں گی اور سسٹم میں انکرپٹڈ (Encrypted) محفوظ رہیں گی۔
                                </p>
                            </div>

                            <div className="flex items-center gap-4 px-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter italic">Automatic Payroll Ready</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-white/10 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <HelpCircle size={14} className="opacity-70" />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">ضروری ہدایت</span>
                        </div>
                        <p className="text-[10px] font-bold leading-relaxed opacity-90 font-urdu">
                            تنخواہ کی بروقت ادائیگی کے لیے درست IBAN نمبر فراہم کرنا لازمی ہے۔
                        </p>
                    </div>
                </div>

                {/* Branch Info Note */}
                <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-200 flex items-start gap-3">
                    <div className="p-1.5 bg-slate-200 rounded-lg text-slate-600 shrink-0">
                        <MapPin size={16} />
                    </div>
                    <p className="text-[10px] font-black text-slate-600 leading-relaxed font-urdu">
                        اگر آپ کا بینک لسٹ میں موجود نہیں تو "دیگر" منتخب کر کے نام ٹائپ کریں۔
                    </p>
                </div>
            </div>

        </div>
    );
};