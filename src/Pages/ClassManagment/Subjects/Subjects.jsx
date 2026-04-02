


import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Book, ArrowRight, Save } from 'lucide-react';

export const CreateSubjects = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(null); 
    const [formData, setFormData] = useState({ name: '', detail: '' });

    const [subjects, setSubjects] = useState([
        { id: 1, name: 'قرآن کریم', detail: 'تجوید و قراءت' },
        { id: 2, name: 'اردو', detail: 'بنیادی قواعد' },
    ]);

    const handleEdit = (subject) => {
        setEditMode(subject.id);
        setFormData({ name: subject.name, detail: subject.detail });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditMode(null);
        setFormData({ name: '', detail: '' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700" dir="rtl">
            {/* --- HEADER --- */}
            <div 
                className="flex flex-col md:flex-row justify-between items-center gap-4 bg-themeSurface/40 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/20"
            >
                <div className="text-right">
                    <h2 className="text-2xl font-black text-themeText tracking-tight">مضامین کی فہرست</h2>
                    <p className="text-sm text-themeMuted font-medium text-right">کل ریکارڈ: {subjects.length}</p>
                </div>
                <button
                    onClick={() => isFormOpen ? closeForm() : setIsFormOpen(true)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${
                        isFormOpen 
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                        : 'bg-[#00d094] text-white shadow-emerald-500/20'
                    }`}
                >
                    {isFormOpen ? 'بند کریں' : 'نیا مضمون شامل کریں'}
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {/* --- FORM --- */}
            {isFormOpen && (
                <div 
                 style={{ boxShadow: 'var(--shadow-card)' }}
                    className="bg-themeSurface/80 backdrop-blur-xl border border-[#00d094]/20 rounded-[2.5rem] p-8 animate-in slide-in-from-top duration-500 shadow-2xl shadow-black/10 dark:shadow-black/40"
                >
                    <div className="flex items-center gap-2 mb-6 text-[#00d094] font-black">
                        {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
                        <span>{editMode ? 'مضمون تبدیل کریں' : 'نیا مضمون'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 text-right">
                            <label className="text-[11px] font-black text-themeMuted mr-2 block uppercase tracking-widest">مضمون کا نام : *</label>
                            <input
                                type="text"
                                value={formData.name}
                                placeholder="نام درج کریں"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-themeBg/40 border border-white/10 focus:border-[#00d094] focus:ring-4 focus:ring-[#00d094]/10 outline-none h-[64px] pb-2 pt-1 px-4 rounded-2xl text-lg font-bold text-right text-themeText transition-all leading-[2.5] placeholder-themeMuted/40 shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)]"
                            />
                        </div>

                        <div className="space-y-2 text-right">
                            <label className="text-[11px] font-black text-themeMuted mr-2 block uppercase tracking-widest">تفصیل / کوڈ</label>
                            <input
                                type="text"
                                value={formData.detail}
                                placeholder="مزید تفصیل"
                                onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                                className="w-full bg-themeBg/40 border border-white/10 focus:border-[#00d094] focus:ring-4 focus:ring-[#00d094]/10 outline-none h-[64px] pb-2 pt-1 px-4 rounded-2xl text-lg font-bold text-right text-themeText transition-all leading-[2.5] placeholder-themeMuted/40 shadow-[2px_6px_26px_2px_rgba(0,_0,_0,_0.1)]"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        {editMode && (
                            <button onClick={closeForm} className="px-6 py-4 rounded-xl font-black text-sm text-themeMuted hover:bg-white/5 transition-all">کینسل</button>
                        )}
                        <button className="bg-[#218838] hover:bg-[#1a6d2c] text-white px-10 py-4 rounded-xl font-black text-sm shadow-xl shadow-green-900/20 transition-all flex items-center gap-3">
                            {editMode ? 'تبدیل کریں' : 'اندراج کریں'}
                            {editMode ? <Save size={20} /> : <Plus size={20} />}
                        </button>
                    </div>
                </div>
            )}

            {/* --- LIST TABLE --- */}
            <div 
             style={{ boxShadow: 'var(--shadow-card)' }}
                className="bg-themeSurface/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm shadow-xl shadow-black/5"
            >
                {/* Table code same rahega */}
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-themeMuted">
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">مضمون</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">تفصیل</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((sub) => (
                                <tr 
                                    key={sub.id} 
                                    className={`bg-themeSurface/60 hover:bg-themeSurface hover:scale-[1.01] transition-all duration-300 group shadow-sm rounded-2xl ${editMode === sub.id ? 'ring-2 ring-[#00d094]' : ''}`}
                                >
                                    <td className="px-6 py-4 font-black text-themeText text-right first:rounded-r-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-themeBg text-themeMuted rounded-lg group-hover:bg-[#00d094] group-hover:text-white transition-all border border-white/5">
                                                <Book size={16} />
                                            </div>
                                            <span>{sub.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-themeMuted text-right">
                                        {sub.detail}
                                    </td>
                                    <td className="px-6 py-4 text-right last:rounded-l-2xl">
                                        <div className="flex items-center justify-start gap-2">
                                            <button className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(sub)}
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