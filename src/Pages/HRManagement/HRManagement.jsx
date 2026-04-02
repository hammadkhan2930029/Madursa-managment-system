import React, { useState } from 'react';
import {
  User, Briefcase, Wallet, GraduationCap, Award,
  Building, Clock, ShieldCheck, Search, Save,
  Trash2, X, ArrowRight, ChevronDown
} from 'lucide-react';
//--------------------------------------------------------------
import { PersonalTab } from '../../Components/HR/PersonalTab';
import { AppoinmentTab } from '../../Components/HR/AppointmentTab';
import { ActionButtons } from '../../Components/HR/ActionButtons';
import { SalaryTab } from '../../Components/HR/SalaryTab';
// import { AcademicTab } from '../../Components/HR/AcademicTab';
import { ExperienceTab } from '../../Components/HR/Experience'
import { BankAccountTab } from '../../Components/HR/BankAccounts';
// import { AttendanceTimingTab } from '../../Components/HR/AttendanceTimingTab';
// import { RukhsatPolicyTab } from '../../Components/HR/RukhsatPolicyTab'
export const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('personal');

  // Tabs ki list Urdu mein
  const tabs = [
    { id: 'personal', label: 'ذاتی معلومات', icon: <User size={18} /> },
    { id: 'appointment', label: 'تقرری', icon: <Briefcase size={18} /> },
    { id: 'salary', label: 'تنخواہ', icon: <Wallet size={18} /> },
    // { id: 'academic', label: 'تعلیمی اسناد', icon: <GraduationCap size={18} /> },
    { id: 'experience', label: 'تجربہ', icon: <Award size={18} /> },
    { id: 'bank', label: 'بینک اکاؤنٹ', icon: <Building size={18} /> },
    // { id: 'timing', label: 'اوقات حاضری', icon: <Clock size={18} /> },
    // { id: 'policy', label: 'رخصت پالیسی', icon: <ShieldCheck size={18} /> },
  ];

  return (


    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] p-2 md:p-4 transition-colors duration-300" dir="rtl">

      {/* --- TOP HEADER / SEARCH BAR --- */}
      <div className="max-w-7xl mx-auto bg-[var(--color-surface)] rounded-[1.5rem] lg:rounded-[2.5rem] p-4 shadow-sm border border-[var(--color-border)] mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 transition-all" dir="rtl">

        {/* --- SECTION 1: Search & Checkbox --- */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          

          <div className="flex items-center gap-2 bg-rose-50/50 px-3 py-2 rounded-xl border border-rose-100 shrink-0">
            <input type="checkbox" className="w-3.5 h-3.5 accent-rose-500 cursor-pointer" />
            <label className="text-[10px] font-black text-rose-500 whitespace-nowrap">تنخواہ بند</label>
          </div>
        </div>

        {/* --- SECTION 2: Select Field --- */}
        <div className="w-full lg:max-w-xs lg:flex-1">
          <div className="relative group">
            <select className="w-full bg-[var(--color-input)] border border-[var(--color-border)] rounded-xl py-2.5 pr-4 pl-10 outline-none font-bold text-[11px] appearance-none focus:border-[var(--color-primary)] cursor-pointer">
              <option>عملہ منتخب کریں</option>
              <option>استاد</option>

              <option>دیگر عملہ</option>
              <option>انتظامیہ</option>
            </select>
            <ChevronDown size={14} className="absolute left-3 top-3 text-[var(--color-text-muted)] pointer-events-none" />
          </div>
        </div>

        {/* --- SECTION 3: Status & Location --- */}
        <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 lg:border-r border-[var(--color-border)] pt-3 lg:pt-0 lg:pr-6 shrink-0">
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[8px] font-black text-[var(--color-text-muted)] uppercase leading-none mb-1">حیثیت</p>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></span>
                <p className="font-bold text-[11px] text-[var(--color-primary)] uppercase">Active</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[var(--color-border)] opacity-50"></div>

            <div className="text-right">
              <p className="text-[8px] font-black text-[var(--color-text-muted)] uppercase leading-none mb-1">مقام</p>
              <p className="font-bold text-[11px] whitespace-nowrap">مین برانچ</p>
            </div>
          </div>
        </div>

      </div>

      {/* --- NAVIGATION TABS --- */}
      <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar mb-6">
        <div className="flex gap-2 min-w-max p-1 bg-[var(--color-input)] rounded-[2rem] border border-[var(--color-border)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm transition-all ${activeTab === tab.id
                ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-emerald-200/20'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface)]'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN FORM AREA --- */}
      <div className="max-w-7xl mx-auto rounded-2xl  bg-[var(--color-surface)] p-3 shadow-2xl...">
        {activeTab === 'personal' && <PersonalTab />}
        {activeTab === 'appointment' && <AppoinmentTab />}
        {activeTab === 'salary' && <SalaryTab />}
        {/* {activeTab === 'academic' && <AcademicTab />} */}
        {activeTab === 'experience' && <ExperienceTab />}
        {activeTab === 'bank' && <BankAccountTab />}
        {/* {activeTab === 'timing' && <AttendanceTimingTab />} */}
        {/* {activeTab === 'policy' && <RukhsatPolicyTab />} */}



        {/* Yahan baki tabs aayenge */}

        <ActionButtons
          onBack={() => console.log('Back clicked')}
          onSave={() => console.log('Save clicked')}
        />
      </div>

    </div>
  );
};

