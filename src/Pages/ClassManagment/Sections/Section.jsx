


import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, ArrowRight, Save } from 'lucide-react';

export const CreateSections = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(null); 
    const [formData, setFormData] = useState({ darja: '' });
    
    const [sections, setSections] = useState([
        { id: 1, darja: 'الف' },
        { id: 2, darja: 'ب' },
    ]);

    const handleEdit = (sec) => {
        setEditMode(sec.id);
        setFormData({ darja: sec.darja });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditMode(null);
        setFormData({ darja: '' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700" dir="rtl">
            {/* --- HEADER --- */}
            <div 
                style={{ boxShadow: 'var(--shadow-card)' }}
                className="flex flex-col md:flex-row justify-between items-center gap-4 bg-themeSurface/40 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-sm"
            >
                <div className="text-right">
                    <h2 className="text-2xl font-black text-themeText tracking-tight">جماعت کا سیکشن</h2>
                    <p className="text-sm text-themeMuted font-medium text-right">کل ریکارڈ: {sections.length}</p>
                </div>
                <button 
                    onClick={() => isFormOpen ? closeForm() : setIsFormOpen(true)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${
                        isFormOpen 
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                        : 'bg-[#00d094] text-white shadow-emerald-500/20'
                    }`}
                >
                    {isFormOpen ? 'بند کریں' : 'نیا اندراج'}
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {/* --- FORM (Edit & Create Mode) --- */}
            {isFormOpen && (
                <div 
                    style={{ boxShadow: 'var(--shadow-card)' }}
                    className="bg-themeSurface/80 backdrop-blur-xl border border-[#00d094]/20 rounded-[2.5rem] p-8 animate-in slide-in-from-top duration-500"
                >
                    <div className="flex items-center gap-2 mb-6 text-[#00d094] font-black">
                        {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
                        <span>{editMode ? 'سیکشن تبدیل کریں' : 'نیا سیکشن اندراج'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Darja Input */}
                        <div className="space-y-2 text-right">
                            <label className="text-[11px] font-black text-themeMuted mr-2 block uppercase tracking-widest text-right">درجہ : *</label>
                            <input 
                                type="text" 
                                value={formData.darja}
                                onChange={(e) => setFormData({ darja: e.target.value })}
                                placeholder="e.g: الف" 
                                className="w-full bg-themeBg/50 shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)] border border-white/10 focus:border-[#00d094] focus:ring-4 focus:ring-[#00d094]/5 outline-none h-[64px] pb-2 pt-1 px-4 rounded-2xl text-lg font-bold text-right text-themeText transition-all leading-[2.5]" 
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        {editMode && (
                            <button onClick={closeForm} className="px-6 py-4 rounded-xl font-black text-sm text-themeMuted hover:bg-white/5 transition-all">کینسل</button>
                        )}
                        <button className="bg-[#218838] hover:bg-[#1a6d2c] text-white px-10 py-4 rounded-xl font-black text-sm shadow-xl shadow-green-900/20 transition-all flex items-center gap-3">
                             {editMode ? 'تبدیل کریں' : 'اندراج'} 
                             {editMode ? <Save size={20} /> : <Plus size={20} />}
                        </button>
                    </div>
                </div>
            )}

            {/* --- LIST TABLE --- */}
            <div 
                style={{ boxShadow: 'var(--shadow-card)' }}
                className="bg-themeSurface/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-themeMuted">
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">درجہ / سیکشن</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest text-start pr-12">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((sec) => (
                                <tr 
                                    key={sec.id} 
                                    className={`bg-themeSurface/60 hover:bg-themeSurface hover:scale-[1.01] transition-all duration-300 group shadow-sm rounded-2xl ${editMode === sec.id ? 'ring-2 ring-[#00d094]' : ''}`}
                                >
                                    <td className="px-6 py-4 text-right first:rounded-r-2xl">
                                        <span className="bg-emerald-500/10 text-[#00d094] px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider border border-emerald-500/10">
                                            سیکشن {sec.darja}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right last:rounded-l-2xl">
                                        <div className="flex items-center justify-start gap-2">
                                            <button className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(sec)}
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

            {/* --- BACK BUTTON --- */}
            <div className="flex justify-start px-4">
                <button className="flex items-center gap-2 bg-themeSurface/50 text-themeMuted px-8 py-3 rounded-2xl font-black text-sm border border-white/5 hover:bg-[#00d094] hover:text-white transition-all shadow-sm">
                    واپس <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};