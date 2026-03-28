import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, ArrowRight, Save } from 'lucide-react';

export const CreateSections = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(null); // Track karney ke liye ke konsa section edit ho raha hai
    const [formData, setFormData] = useState({ darja: '' });
    
    const [sections, setSections] = useState([
        { id: 1, darja: 'الف' },
        { id: 2, darja: 'ب' },
    ]);

    // Edit Button Click Logic
    const handleEdit = (sec) => {
        setEditMode(sec.id);
        setFormData({ darja: sec.darja });
        setIsFormOpen(true);
    };

    // Form Reset & Close
    const closeForm = () => {
        setIsFormOpen(false);
        setEditMode(null);
        setFormData({ darja: '' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700" dir="rtl">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/40 p-6 rounded-[2.5rem] border border-white/60 backdrop-blur-sm">
                <div className="text-right">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">جماعت کا سیکشن</h2>
                    <p className="text-sm text-slate-500 font-medium text-right">کل ریکارڈ: {sections.length}</p>
                </div>
                <button 
                    onClick={() => isFormOpen ? closeForm() : setIsFormOpen(true)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${
                        isFormOpen ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-[#00d094] text-white shadow-emerald-200'
                    }`}
                >
                    {isFormOpen ? 'بند کریں' : 'نیا اندراج'}
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {/* --- FORM (Edit & Create Mode) --- */}
            {isFormOpen && (
                <div className="bg-white/80 backdrop-blur-xl border border-[#00d094]/30 shadow-2xl rounded-[2.5rem] p-8 animate-in slide-in-from-top duration-500">
                    <div className="flex items-center gap-2 mb-6 text-[#00d094] font-black">
                        {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
                        <span>{editMode ? 'سیکشن تبدیل کریں' : 'نیا سیکشن اندراج'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Darja Input */}
                        <div className="space-y-2 text-right">
                            <label className="text-[11px] font-black text-slate-500 mr-2 block uppercase tracking-widest text-right">درجہ : *</label>
                            <input 
                                type="text" 
                                value={formData.darja}
                                onChange={(e) => setFormData({ darja: e.target.value })}
                                placeholder="e.g: الف" 
                                className="w-full bg-white border border-slate-200 focus:border-[#00d094] focus:ring-4 focus:ring-emerald-50 outline-none h-[64px] pb-2 pt-1 px-4 rounded-2xl text-lg font-bold text-right transition-all leading-[2.5]" 
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        {editMode && (
                            <button onClick={closeForm} className="px-6 py-4 rounded-xl font-black text-sm text-slate-400 hover:bg-slate-100 transition-all">کینسل</button>
                        )}
                        <button className="bg-[#218838] hover:bg-[#1a6d2c] text-white px-10 py-4 rounded-xl font-black text-sm shadow-xl transition-all flex items-center gap-3">
                             {editMode ? 'تبدیل کریں' : 'اندراج'} 
                             {editMode ? <Save size={20} /> : <Plus size={20} />}
                        </button>
                    </div>
                </div>
            )}

            {/* --- LIST TABLE --- */}
            <div className="bg-white/40 border border-white/60 shadow-inner rounded-[2.5rem] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-slate-400">
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">درجہ / سیکشن</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest text-start pr-12">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((sec) => (
                                <tr key={sec.id} className={`bg-white/60 hover:bg-white hover:scale-[1.01] transition-all duration-300 group shadow-sm hover:shadow-md group rounded-2xl  ${editMode === sec.id ? 'ring-2 ring-[#00d094]' : ''}`}>
                                    <td className="px-6 py-4 text-right first:rounded-r-2xl">
                                        <span className="bg-emerald-50 text-[#00d094] px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider">
                                            سیکشن {sec.darja}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right last:rounded-l-2xl">
                                        <div className="flex items-center justify-start gap-2">
                                            <button className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(sec)}
                                                className="p-2.5 bg-emerald-50 text-[#00d094] rounded-xl hover:bg-[#00d094] hover:text-white transition-all shadow-sm"
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
                <button className="flex items-center gap-2 bg-[#17a2b8]/10 text-[#17a2b8] px-8 py-3 rounded-2xl font-black text-sm border border-[#17a2b8]/20 hover:bg-[#17a2b8] hover:text-white transition-all shadow-sm">
                    واپس <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};