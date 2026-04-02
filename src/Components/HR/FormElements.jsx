import React from 'react';
import { ChevronDown } from 'lucide-react';

export const InputField = ({ label, placeholder, isDark, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-2 uppercase tracking-widest">{label} *</label>
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full p-4 rounded-2xl border outline-none font-bold transition-all focus:ring-4 focus:ring-emerald-500/10 ${
        isDark ? 'bg-[var(--color-surface)] border-[var(--color-border)]' : 'bg-[var(--color-input)] border-transparent focus:border-[var(--color-primary)]'
      }`}
    />
  </div>
);

export const SelectField = ({ label, options, isDark }) => (
  <div className="space-y-2 relative">
    <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-2 uppercase tracking-widest">{label}</label>
    <div className="relative">
      <select className={`w-full p-4 rounded-2xl border outline-none font-bold appearance-none transition-all ${
        isDark ? 'bg-[var(--color-surface)] border-[var(--color-border)]' : 'bg-[var(--color-input)] border-transparent focus:border-[var(--color-primary)]'
      }`}>
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={18} className="absolute left-4 top-4 text-[var(--color-text-muted)] pointer-events-none" />
    </div>
  </div>
);

export const DateField = ({ label }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-[var(--color-text-muted)] mr-2 uppercase tracking-widest">{label}</label>
    <input type="date" className="w-full p-4 rounded-2xl border bg-[var(--color-input)] border-transparent outline-none font-bold focus:border-[var(--color-primary)] transition-all" />
  </div>
);

export const RadioButton = ({ label, name, defaultChecked }) => (
  <label className="flex items-center gap-2 cursor-pointer group">
    <input type="radio" name={name} defaultChecked={defaultChecked} className="w-4 h-4 accent-[var(--color-primary)]" />
    <span className="text-sm font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">{label}</span>
  </label>
);