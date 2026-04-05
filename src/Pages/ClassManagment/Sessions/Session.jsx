import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, ArrowRight, Save } from 'lucide-react';

export const CreateSessions = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(null); 
    const [formData, setFormData] = useState({ islamiYear: '', esviYear: '' });
    
    const [sessions, setSessions] = useState([
        { id: 1, islamiYear: '۱۴۴۵ - ۱۴۴۶ھ', esviYear: '2024 - 2025' },
    ]);

    const handleEdit = (session) => {
        setEditMode(session.id);
        setFormData({ islamiYear: session.islamiYear, esviYear: session.esviYear });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditMode(null);
        setFormData({ islamiYear: '', esviYear: '' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700 p-2" dir="rtl">
            {/* --- HEADER --- */}
            <div 
                className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--color-surface)] p-6 rounded-[2.5rem] border border-[var(--color-border)] shadow-sm backdrop-blur-sm"
            >
                <div className="text-right">
                    <h2 className="text-2xl font-black text-[var(--color-text)] tracking-tight">تعلیمی سیشن</h2>
                    <p className="text-sm text-[var(--color-text-muted)] font-medium text-right mt-5">کل ریکارڈ: {sessions.length}</p>
                </div>
                <button 
                    onClick={() => isFormOpen ? closeForm() : setIsFormOpen(true)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${
                        isFormOpen 
                        ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                        : 'bg-[#00d094] text-white shadow-emerald-500/20'
                    }`}
                >
                    {isFormOpen ? 'بند کریں' : 'نیا سیشن'}
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {/* --- FORM (Edit & Create Mode) --- */}
            {isFormOpen && (
                <div 
                    className="bg-[var(--color-surface)] border border-[#00d094]/20 rounded-[2.5rem] p-8 animate-in slide-in-from-top duration-500 shadow-xl"
                >
                    <div className="flex items-center gap-2 mb-6 text-[#00d094] font-black">
                        {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
                        <span>{editMode ? 'سیشن تبدیل کریں' : 'نیا سیشن اندراج'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Right: Islami Year */}
                        <div className="space-y-2 text-right">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-2 block text-right tracking-widest uppercase">اسلامی سال (ہجری) *</label>
                            <input 
                                type="text" 
                                value={formData.islamiYear}
                                onChange={(e) => setFormData({...formData, islamiYear: e.target.value})}
                                placeholder="مثلاً: ۱۴۴۵ - ۱۴۴۶ھ" 
                                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[#00d094] focus:ring-4 focus:ring-[#00d094]/5 outline-none h-[64px] pb-2 pt-1 px-4 rounded-2xl text-lg font-bold text-right text-[var(--color-text)] transition-all leading-[2.5]" 
                            />
                        </div>

                        {/* Left: Esvi Year */}
                        <div className="space-y-2 text-right">
                            <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-2 block text-right tracking-widest uppercase">عیسوی سال *</label>
                            <input 
                                type="text" 
                                value={formData.esviYear}
                                onChange={(e) => setFormData({...formData, esviYear: e.target.value})}
                                placeholder="مثلاً: 2024 - 2025" 
                                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[#00d094] focus:ring-4 focus:ring-[#00d094]/5 outline-none h-[64px] pb-2 pt-1 px-4 rounded-2xl text-lg font-bold text-right text-[var(--color-text)] transition-all leading-[2.5]" 
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        {editMode && (
                            <button onClick={closeForm} className="px-6 py-4 rounded-xl font-black text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] transition-all">کینسل</button>
                        )}
                        <button className="bg-[#218838] hover:bg-[#1a6d2c] text-white px-10 py-4 rounded-xl font-black text-sm shadow-xl shadow-green-900/20 transition-all flex items-center gap-3">
                             {editMode ? 'تبدیل کریں' : 'محفوظ کریں'} 
                             {editMode ? <Save size={20} /> : <Plus size={20} />}
                        </button>
                    </div>
                </div>
            )}

            {/* --- LIST TABLE --- */}
            <div 
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[2.5rem] overflow-hidden shadow-sm backdrop-blur-sm"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-[var(--color-text-muted)]">
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">اسلامی سال</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">عیسوی سال</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((ses) => (
                                <tr 
                                    key={ses.id} 
                                    className={`bg-[var(--color-bg)]/40 hover:bg-[var(--color-bg)] hover:scale-[1.01] transition-all duration-300 group shadow-sm rounded-2xl ${editMode === ses.id ? 'ring-2 ring-[#00d094]' : ''}`}
                                >
                                    <td className="px-6 py-4 font-black text-[var(--color-text)] text-right first:rounded-r-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded-lg group-hover:bg-[#00d094] group-hover:text-white transition-all border border-[var(--color-border)]">
                                                <Calendar size={16} />
                                            </div>
                                            <span>{ses.islamiYear}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[var(--color-text)] text-right">
                                        {ses.esviYear}
                                    </td>
                                    <td className="px-6 py-4 text-right last:rounded-l-2xl">
                                        <div className="flex items-center justify-start gap-2">
                                            <button className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(ses)}
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
                <button className="flex items-center gap-2 bg-[var(--color-surface)] text-[var(--color-text-muted)] px-8 py-3 rounded-2xl font-black text-sm border border-[var(--color-border)] hover:bg-[#00d094] hover:text-white transition-all shadow-sm">
                    واپس <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};