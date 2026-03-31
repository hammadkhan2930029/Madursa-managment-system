

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, X, Save } from 'lucide-react';

export const CreateClasses = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        detail: '',
        admissionFee: '',
        monthlyFee: ''
    });

    const [classes, setClasses] = useState([
        { id: 1, name: 'حفظ اول', detail: 'تصیلی الفاظ', admissionFee: '1000', monthlyFee: '500' },
    ]);

    const handleEdit = (cls) => {
        setEditMode(cls.id);
        setFormData({
            name: cls.name,
            detail: cls.detail,
            admissionFee: cls.admissionFee,
            monthlyFee: cls.monthlyFee
        });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditMode(null);
        setFormData({ name: '', detail: '', admissionFee: '', monthlyFee: '' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* --- HEADER --- */}
            <div 
                style={{ boxShadow: 'var(--shadow-card)' }}
                className="flex flex-col md:flex-row justify-between items-center gap-4 bg-themeSurface/40 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-sm"
            >
                <div className="text-right">
                    <h2 className="text-2xl font-black text-themeText tracking-tight">جماعت مینجمنٹ</h2>
                    <p className="text-sm text-themeMuted font-medium tracking-wide">کل فہرست: {classes.length}</p>
                </div>
                <button
                    onClick={() => isFormOpen ? closeForm() : setIsFormOpen(true)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${
                        isFormOpen 
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                        : 'bg-[#00d094] text-white shadow-emerald-500/20'
                    }`}
                >
                    {isFormOpen ? 'بند کریں' : 'نئی جماعت بنائیں'}
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {/* --- FORM --- */}
            {isFormOpen && (
                <div 
                    style={{ boxShadow: 'var(--shadow-card)' }}
                    className="bg-themeSurface/80 backdrop-blur-xl border border-[#00d094]/20 rounded-[2.5rem] p-8 animate-in slide-in-from-top duration-500"
                >
                    <div className="flex items-center justify-start gap-2 mb-6 text-[#00d094] font-black">
                        <span>{editMode ? 'جماعت کی معلومات تبدیل کریں' : 'نئی جماعت کا اندراج'}</span>
                        {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-themeMuted mr-2 text-right block uppercase tracking-widest">جماعت *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="جماعت کا نام"
                                    className="w-full bg-themeBg/50 border border-white/10  shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] focus:border-[#00d094] focus:ring-4 focus:ring-[#00d094]/5 outline-none h-[54px] px-4 rounded-2xl text-sm font-bold text-right text-themeText transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-themeMuted mr-2 text-right block uppercase tracking-widest">داخلہ فیس</label>
                                <input
                                    type="number"
                                    value={formData.admissionFee}
                                    onChange={(e) => setFormData({ ...formData, admissionFee: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-themeBg/50 border border-white/10 focus:border-[#00d094] shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] focus:ring-4 focus:ring-[#00d094]/5 outline-none h-[54px] px-4 rounded-2xl text-sm font-bold text-right text-themeText transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-themeMuted mr-2 text-right block uppercase tracking-widest">تفصیل</label>
                                <input
                                    type="text"
                                    value={formData.detail}
                                    onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                                    placeholder="تفصیلی الفاظ"
                                    className="w-full bg-themeBg/50 border border-white/10 focus:border-[#00d094]  shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] focus:ring-4 focus:ring-[#00d094]/5 outline-none h-[54px] px-4 rounded-2xl text-sm font-bold text-right text-themeText transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-themeMuted mr-2 text-right block uppercase tracking-widest">ماہانہ فیس</label>
                                <input
                                    type="number"
                                    value={formData.monthlyFee}
                                    onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full bg-themeBg/50 border border-white/10 focus:border-[#00d094]  shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] focus:ring-4 focus:ring-[#00d094]/5 outline-none h-[54px] px-4 rounded-2xl text-sm font-bold text-right text-themeText transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        {editMode && (
                            <button onClick={closeForm} className="px-6 py-4 rounded-xl font-black text-sm text-themeMuted hover:bg-white/5 transition-all">کینسل</button>
                        )}
                        <button className="bg-[#218838] hover:bg-[#1a6d2c] text-white px-10 py-4 rounded-xl font-black text-sm shadow-xl shadow-green-900/20 transition-all flex items-center gap-3">
                            {editMode ? 'تبدیل کریں' : 'بنائیں'}
                            {editMode ? <Save size={20} /> : <Plus size={20} />}
                        </button>
                    </div>
                </div>
            )}

            {/* --- TABLE --- */}
            <div 
                style={{ boxShadow: 'var(--shadow-card)' }}
                className="bg-themeSurface/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm"
            >
                <div className="overflow-x-auto" dir="rtl">
                    <table className="w-full text-right border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-themeMuted">
                                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-right">جماعت</th>
                                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-right">تفصیل</th>
                                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-right">داخلہ فیس</th>
                                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-right">ماہانہ فیس</th>
                                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-right">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((cls) => (
                                <tr
                                    key={cls.id}
                                    className={`bg-themeSurface/60 hover:bg-themeSurface hover:scale-[1.01] transition-all duration-300 group shadow-sm rounded-2xl ${editMode === cls.id ? 'ring-2 ring-[#00d094]' : ''}`}
                                >
                                    <td className="px-6 py-4 first:rounded-r-2xl text-right">
                                        <div className="flex items-center justify-start gap-3 font-black text-themeText">
                                            <div className="p-2 bg-themeBg text-themeMuted rounded-lg group-hover:bg-[#00d094] group-hover:text-white transition-all">
                                                <BookOpen size={16} />
                                            </div>
                                            <span>{cls.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-themeMuted text-sm text-right">{cls.detail}</td>
                                    <td className="px-6 py-4 font-bold text-themeText text-right">Rs. {cls.admissionFee}</td>
                                    <td className="px-6 py-4 font-bold text-themeText text-right">Rs. {cls.monthlyFee}</td>
                                    <td className="px-6 py-4 last:rounded-l-2xl text-right">
                                        <div className="flex items-center justify-start gap-2">
                                            <button className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(cls)}
                                                className="p-2.5 bg-emerald-500/10 text-[#00d094] rounded-xl hover:bg-[#00d094] hover:text-white transition-all shadow-sm"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};