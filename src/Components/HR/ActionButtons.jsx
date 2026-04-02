import React from 'react';
import { ArrowRight, Trash2, Save } from 'lucide-react';

export const ActionButtons = ({ onBack, onDelete, onCancel, onSave }) => (
  <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-4 items-center justify-between">
    <button 
      onClick={onBack}
      className="flex items-center gap-2 px-8 py-3 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all active:scale-95"
    >
      <ArrowRight size={18} /> واپس جائیں
    </button>

    <div className="flex gap-4">
      <button 
        onClick={onDelete}
        className="flex items-center gap-2 px-8 py-3 bg-rose-50 text-rose-500 rounded-2xl font-black text-sm hover:bg-rose-500 hover:text-white transition-all"
      >
        <Trash2 size={18} /> ختم کریں
      </button>
      <button 
        onClick={onCancel}
        className="flex items-center gap-2 px-8 py-3 bg-slate-200 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-300 transition-all"
      >
        منسوخ کریں
      </button>
      <button 
        onClick={onSave}
        className="flex items-center gap-2 px-12 py-3 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-200/50 hover:bg-[var(--color-primary-hover)] transition-all active:scale-95"
      >
        <Save size={18} /> محفوظ کریں
      </button>
    </div>
  </div>
);