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
        // New Fields
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
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700" dir="rtl">

            {/* --- HEADER SECTION --- */}
            <div className="relative bg-gradient-to-r from-[#004d61] to-[#002a33] rounded-[3rem] p-8 text-white shadow-2xl overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 bg-white rounded-[2.5rem] p-2 shadow-xl">
                            <img src={AppImages.logo} alt="Logo" className="w-full h-full object-cover rounded-[2rem]" />
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-2 right-2 bg-[#00d094] p-3 rounded-2xl shadow-lg hover:scale-110 transition-all text-white">
                                <Camera size={20} />
                            </button>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-right">
                        {isEditing ? (
                            <input
                                value={tempData.name}
                                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-md font-black w-full outline-none focus:bg-white/20 text-white"
                            />
                        ) : (
                            <h1 className="text-3xl md:text-5xl font-black mb-2">{madrassaData.name}</h1>
                        )}
                        <p className="text-emerald-400 font-bold flex items-center justify-center md:justify-start gap-2 pt-5">
                            <CheckCircle2 size={16} /> تصدیق شدہ تعلیمی ادارہ
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {isEditing && (
                            <button onClick={() => setIsEditing(false)} className="p-4 bg-rose-500/20 text-rose-200 rounded-2xl hover:bg-rose-500 hover:text-white transition-all">
                                <X size={20} />
                            </button>
                        )}
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-xl active:scale-95 ${isEditing ? 'bg-[#00d094] text-white' : 'bg-white text-slate-800'
                                }`}
                        >
                            {isEditing ? <><Save size={20} /> محفوظ کریں</> : <><Edit3 size={20} /> ایڈٹ کریں</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- INFO GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Registration & Family Sequence (New Section) */}
                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm space-y-6 md:col-span-2">
                    <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#00d094] pr-3">انتظامی معلومات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoField 
                            label="رجسٹریشن نمبر" 
                            icon={<ClipboardList size={14} className="text-slate-400" />}
                            value={madrassaData.regNo} 
                            isEditing={isEditing} 
                            tempValue={tempData.regNo} 
                            onChange={(v) => setTempData({ ...tempData, regNo: v })} 
                        />
                        <InfoField 
                            label="فیملی نمبر سیکوینس" 
                            icon={<Users2 size={14} className="text-slate-400" />}
                            value={madrassaData.familyNoSeq} 
                            isEditing={isEditing} 
                            tempValue={tempData.familyNoSeq} 
                            onChange={(v) => setTempData({ ...tempData, familyNoSeq: v })} 
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#00d094] pr-3">رابطہ کی تفصیلات</h3>
                    <InfoField label="ای میل" value={madrassaData.email} isEditing={isEditing} tempValue={tempData.email} onChange={(v) => setTempData({ ...tempData, email: v })} />
                    <div className="grid grid-cols-2 gap-4">
                        <InfoField label="فون 1" value={madrassaData.phone1} isEditing={isEditing} tempValue={tempData.phone1} onChange={(v) => setTempData({ ...tempData, phone1: v })} />
                        <InfoField label="فون 2" value={madrassaData.phone2} isEditing={isEditing} tempValue={tempData.phone2} onChange={(v) => setTempData({ ...tempData, phone2: v })} />
                    </div>
                </div>

                {/* Location Info */}
                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#00d094] pr-3">مقام اور برانچ</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InfoField label="برانچ" value={madrassaData.branch} isEditing={isEditing} tempValue={tempData.branch} onChange={(v) => setTempData({ ...tempData, branch: v })} />

                        <div className="space-y-2" ref={dropdownRef}>
                            <label className="text-[11px] font-black text-slate-400 mr-2 uppercase">شہر</label>
                            {isEditing ? (
                                <div className="relative">
                                    <div
                                        onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                        className="flex items-center justify-between p-4 bg-white border border-emerald-200 ring-4 ring-emerald-50 rounded-2xl cursor-pointer"
                                    >
                                        <span className="font-bold text-slate-700">{tempData.city}</span>
                                        <ChevronDown size={18} className="text-[#00d094]" />
                                    </div>

                                    {isCityDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl max-h-48 overflow-y-auto p-2">
                                            <div className="flex items-center gap-2 p-2 border-b border-slate-50 mb-2">
                                                <Search size={14} className="text-slate-400" />
                                                <input
                                                    placeholder="تلاش کریں..."
                                                    className="w-full text-[11px] outline-none"
                                                    onChange={(e) => setCitySearch(e.target.value)}
                                                />
                                            </div>
                                            {filteredCities.map(city => (
                                                <div
                                                    key={city}
                                                    onClick={() => {
                                                        setTempData({ ...tempData, city: city });
                                                        setIsCityDropdownOpen(false);
                                                    }}
                                                    className="p-3 hover:bg-emerald-50 rounded-xl cursor-pointer font-bold text-slate-700 text-sm flex justify-between items-center"
                                                >
                                                    {city}
                                                    {tempData.city === city && <Check size={14} className="text-[#00d094]" />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 flex items-center gap-2">
                                    <MapPin size={16} className="text-slate-400" /> {madrassaData.city}
                                </div>
                            )}
                        </div>
                    </div>
                    <InfoField label="مکمل پتہ" value={madrassaData.address} isEditing={isEditing} tempValue={tempData.address} onChange={(v) => setTempData({ ...tempData, address: v })} />
                </div>
            </div>
        </div>
    );
};

const InfoField = ({ label, value, isEditing, tempValue, onChange, icon }) => (
    <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest flex items-center gap-1">
            {icon} {label}
        </label>
        <div className={`p-4 rounded-2xl border transition-all ${isEditing ? 'bg-white border-emerald-200 ring-4 ring-emerald-50' : 'bg-slate-50 border-transparent'}`}>
            {isEditing ? (
                <input value={tempValue} onChange={(e) => onChange(e.target.value)} className="bg-transparent w-full outline-none font-bold text-slate-700" />
            ) : (
                <span className="font-bold text-slate-700">{value}</span>
            )}
        </div>
    </div>
);