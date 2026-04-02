

import React, { useState, useRef, useEffect } from 'react';
import {
    Building2, Mail, Phone, MapPin,
    Edit3, Save, X, Camera, Hash, Map, CheckCircle2, ChevronDown, Search, Check, ClipboardList, Users2
} from 'lucide-react';
import { AppImages } from '../../../Constant/AppImages';

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [citySearch, setCitySearch] = useState('');
    const dropdownRef = useRef(null);

    const allCities = ["کراچی", "لاہور", "اسلام آباد", "راولپنڈی", "فیصل آباد", "ملتان", "پشاور", "کوئٹہ"];

    const [madrassaData, setMadrassaData] = useState({
        name: "جامعہ انوار القران",
        logo: "https://via.placeholder.com/150",
        email: "info@anwarulquran.com",
        phone1: "0300-1234567",
        phone2: "0321-7654321",
        address: "گلشن اقبال، بلاک 13-C، کراچی",
        branch: "مین کیمپس",
        city: "کراچی",
        familyNoSeq: "FAM-2026-001",
        regNo: "REG-QA-9921"
    });

    const [tempData, setTempData] = useState({ ...madrassaData });

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsCityDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSave = () => {
        setMadrassaData({ ...tempData });
        setIsEditing(false);
    };

    const filteredCities = allCities.filter(c => c.includes(citySearch));

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-10" dir="rtl">

            {/* --- HEADER SECTION --- */}
            <div
             style={{ boxShadow: 'var(--shadow-card)' }} className="relative bg-gradient-to-r from-[#004d61] to-[#002a33] rounded-[3rem] p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 bg-white rounded-[2.5rem] p-2 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                            <img src={AppImages.logo} alt="Logo" className="w-full h-full object-cover rounded-[2rem]" />
                        </div>
                        {isEditing && (
                            <button className="absolute -bottom-2 -right-2 bg-[#00d094] p-3 rounded-2xl shadow-lg hover:scale-110 transition-all text-white border-4 border-[#002a33]">
                                <Camera size={20} />
                            </button>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-right">
                        {isEditing ? (
                            <input
                                value={tempData.name}
                                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                                className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-xl font-black w-full outline-none focus:bg-white/20 focus:border-[#00d094] text-white transition-all"
                            />
                        ) : (
                            <h1 className="text-3xl md:text-5xl font-black mb-2 drop-shadow-md">{madrassaData.name}</h1>
                        )}
                        <p className="text-emerald-400 font-bold flex items-center justify-center md:justify-start gap-2 pt-4">
                            <CheckCircle2 size={18} /> تصدیق شدہ تعلیمی ادارہ
                        </p>
                    </div>

                    <div className="flex gap-3">
                        {isEditing && (
                            <button onClick={() => setIsEditing(false)} className="p-4 bg-rose-500/20 text-rose-200 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10">
                                <X size={20} />
                            </button>
                        )}
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-2xl active:scale-95 ${
                                isEditing ? 'bg-[#00d094] text-white' : 'bg-white text-[#002a33] hover:bg-emerald-50'
                            }`}
                        >
                            {isEditing ? <><Save size={20} /> محفوظ کریں</> : <><Edit3 size={20} /> ایڈٹ کریں</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- INFO GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" 
            >

                {/* Registration & Administrative Info */}
                <div 
                 style={{ boxShadow: 'var(--shadow-card)' }}
                 className="bg-themeSurface border border-white/5 p-8 rounded-[3rem] shadow-xl space-y-6 md:col-span-2">
                    <h3 className="text-lg font-black text-themeText border-r-4 border-[#00d094] pr-4">انتظامی معلومات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoField 
                            label="رجسٹریشن نمبر" 
                            icon={<ClipboardList size={16} />}
                            value={madrassaData.regNo} 
                            isEditing={isEditing} 
                            tempValue={tempData.regNo} 
                            onChange={(v) => setTempData({ ...tempData, regNo: v })} 
                        />
                        <InfoField 
                            label="فیملی نمبر سیکوینس" 
                            icon={<Users2 size={16} />}
                            value={madrassaData.familyNoSeq} 
                            isEditing={isEditing} 
                            tempValue={tempData.familyNoSeq} 
                            onChange={(v) => setTempData({ ...tempData, familyNoSeq: v })} 
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div  style={{ boxShadow: 'var(--shadow-card)' }}
                 className="bg-themeSurface border border-white/5 p-8 rounded-[3rem] shadow-xl space-y-6">
                    <h3 className="text-lg font-black text-themeText border-r-4 border-[#00d094] pr-4">رابطہ کی تفصیلات</h3>
                    <InfoField label="ای میل" icon={<Mail size={16} />} value={madrassaData.email} isEditing={isEditing} tempValue={tempData.email} onChange={(v) => setTempData({ ...tempData, email: v })} />
                    <div className="grid grid-cols-2 gap-6">
                        <InfoField label="فون 1" icon={<Phone size={16} />} value={madrassaData.phone1} isEditing={isEditing} tempValue={tempData.phone1} onChange={(v) => setTempData({ ...tempData, phone1: v })} />
                        <InfoField label="فون 2" icon={<Phone size={16} />} value={madrassaData.phone2} isEditing={isEditing} tempValue={tempData.phone2} onChange={(v) => setTempData({ ...tempData, phone2: v })} />
                    </div>
                </div>

                {/* Location Info */}
                <div  style={{ boxShadow: 'var(--shadow-card)' }} 
                className="bg-themeSurface border border-white/5 p-8 rounded-[3rem] shadow-xl space-y-6">
                    <h3 className="text-lg font-black text-themeText border-r-4 border-[#00d094] pr-4">مقام اور برانچ</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <InfoField label="برانچ" icon={<Building2 size={16} />} value={madrassaData.branch} isEditing={isEditing} tempValue={tempData.branch} onChange={(v) => setTempData({ ...tempData, branch: v })} />

                        <div className="space-y-3" ref={dropdownRef}>
                            <label className="text-[11px] font-black text-themeMuted mr-2 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Map size={14} /> شہر
                            </label>
                            {isEditing ? (
                                <div className="relative">
                                    <div
                                        onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                        className="flex items-center justify-between p-4 bg-themeBg border border-[#00d094]/30 rounded-2xl cursor-pointer hover:border-[#00d094] transition-all"
                                    >
                                        <span className="font-bold text-themeText">{tempData.city}</span>
                                        <ChevronDown size={18} className="text-[#00d094]" />
                                    </div>

                                    {isCityDropdownOpen && (
                                        <div className="absolute z-[100] w-full mt-2 bg-themeSurface border border-white/10 shadow-2xl rounded-2xl max-h-60 overflow-hidden animate-in zoom-in-95 duration-200">
                                            <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-themeBg/50">
                                                <Search size={16} className="text-themeMuted" />
                                                <input
                                                    placeholder="تلاش کریں..."
                                                    className="w-full bg-transparent text-sm outline-none text-themeText"
                                                    onChange={(e) => setCitySearch(e.target.value)}
                                                />
                                            </div>
                                            <div className="overflow-y-auto max-h-48 p-2 custom-scrollbar">
                                                {filteredCities.map(city => (
                                                    <div
                                                        key={city}
                                                        onClick={() => {
                                                            setTempData({ ...tempData, city: city });
                                                            setIsCityDropdownOpen(false);
                                                        }}
                                                        className={`p-3 rounded-xl cursor-pointer font-bold text-sm flex justify-between items-center transition-all mb-1 ${
                                                            tempData.city === city ? 'bg-[#00d094]/20 text-[#00d094]' : 'text-themeText hover:bg-white/5'
                                                        }`}
                                                    >
                                                        {city}
                                                        {tempData.city === city && <Check size={16} />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 bg-themeBg border border-transparent rounded-2xl font-bold text-themeText flex items-center gap-3">
                                    <MapPin size={18} className="text-themeMuted" /> {madrassaData.city}
                                </div>
                            )}
                        </div>
                    </div>
                    <InfoField label="مکمل پتہ" icon={<MapPin size={16} />} value={madrassaData.address} isEditing={isEditing} tempValue={tempData.address} onChange={(v) => setTempData({ ...tempData, address: v })} />
                </div>
            </div>
        </div>
    );
};

const InfoField = ({ label, value, isEditing, tempValue, onChange, icon }) => (
    <div className="space-y-3">
        <label className="text-[11px] font-black text-themeMuted mr-2 uppercase tracking-[0.2em] flex items-center gap-2">
            {icon && <span className="opacity-50">{icon}</span>} {label}
        </label>
        <div className={`p-4 rounded-2xl border transition-all duration-300 ${
            isEditing 
            ? 'bg-themeBg border-[#00d094]/50 shadow-[0_0_20px_rgba(0,208,148,0.05)]' 
            : 'bg-themeBg border-transparent'
        }`}>
            {isEditing ? (
                <input 
                    value={tempValue} 
                    onChange={(e) => onChange(e.target.value)} 
                    className="bg-transparent w-full outline-none font-bold text-themeText focus:text-[#00d094] transition-colors" 
                />
            ) : (
                <span className="font-bold text-themeText">{value}</span>
            )}
        </div>
    </div>
);