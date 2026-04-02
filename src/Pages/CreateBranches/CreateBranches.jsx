

// import React, { useState, useRef, useEffect } from 'react';
// import {
//     Mail, Phone, MapPin, ChevronDown, Search, Check, PlusCircle, CheckCircle2, Hash, Users2, ClipboardList
// } from 'lucide-react';
// import { AppImages } from '../../Constant/AppImages';

// export const CreateBranch = () => {
//     const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
//     const [citySearch, setCitySearch] = useState('');
//     const dropdownRef = useRef(null);

//     const allCities = ["کراچی", "لاہور", "اسلام آباد", "راولپنڈی", "فیصل آباد", "ملتان", "پشاور", "کوئٹہ"];

//     const madrassaBranding = {
//         name: "جامعہ انوار القران",
//         logo: AppImages.logo 
//     };

//     const [branchData, setBranchData] = useState({
//         email: "",
//         phone1: "",
//         phone2: "",
//         address: "",
//         branchType: "", 
//         city: "شہر منتخب کریں",
//         regPrefix: "",
//         familyPrefix: ""
//     });

//     useEffect(() => {
//         const handleClick = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setIsCityDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClick);
//         return () => document.removeEventListener('mousedown', handleClick);
//     }, []);

//     const handleCreate = () => {
//         console.log("Adding Branch...", branchData);
//         alert(`${branchData.branchType} branch kamyabi se shamil kar di gai hai!`);
//     };

//     const filteredCities = allCities.filter(c => c.includes(citySearch));

//     return (
//         <div className="max-w-6xl mx-auto space-y-8 animate-in zoom-in-95 duration-700" dir="rtl">

//             {/* --- HEADER SECTION --- */}
//             <div 
//              style={{ boxShadow: 'var(--shadow-card)' }}
//              className="relative bg-gradient-to-r from-[#004d61] to-[#002a33] rounded-[3rem] p-8 text-white shadow-2xl shadow-black/20 overflow-hidden">
//                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
//                     <div className="w-32 h-32 bg-white rounded-[2.5rem] p-2 shadow-xl">
//                         <img src={madrassaBranding.logo} alt="Logo" className="w-full h-full object-cover rounded-[2rem]" />
//                     </div>

//                     <div className="flex-1 text-center md:text-right">
//                         <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold mb-3 inline-block tracking-widest">نئی برانچ کا اندراج</span>
//                         <h1 className="text-3xl md:text-5xl font-black mb-2">{madrassaBranding.name}</h1>
//                         <p className="text-white/60 font-medium tracking-tight">برانچ کی تفصیلات اور ڈیفالٹ سیکوینس درج کریں</p>
//                     </div>

//                     <div className="flex gap-2">
//                         <button className="px-8 py-4 bg-[#00d094] text-white rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-xl shadow-emerald-900/20 active:scale-95 hover:bg-[#00b07d]" onClick={handleCreate}>
//                             <PlusCircle size={20} /> برانچ شامل کریں
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* --- FORM SECTION --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                 {/* 1. Sequence Settings */}
//                 <div 
//                  style={{ boxShadow: 'var(--shadow-card)' }}
//                  className="bg-themeSurface/40 border border-white/5 p-8 rounded-[2.5rem] shadow-xl shadow-black/5 backdrop-blur-sm space-y-6 md:col-span-2">
//                     <h3 className="text-lg font-black text-themeText border-r-4 border-[#00d094] pr-3 text-right">برانچ سیکوینس (Prefix)</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <InputField 
//                             label="رجسٹریشن نمبر پری فکس" 
//                             icon={<ClipboardList size={14} />}
//                             placeholder="مثلاً REG-KHI-" 
//                             value={branchData.regPrefix} 
//                             onChange={(v) => setBranchData({ ...branchData, regPrefix: v })} 
//                         />
//                         <InputField 
//                             label="فیملی نمبر پری فکس" 
//                             icon={<Users2 size={14} />}
//                             placeholder="مثلاً FAM-KHI-" 
//                             value={branchData.familyPrefix} 
//                             onChange={(v) => setBranchData({ ...branchData, familyPrefix: v })} 
//                         />
//                     </div>
//                 </div>

//                 {/* 2. Contact Info */}
//                 <div 
//                  style={{ boxShadow: 'var(--shadow-card)' }}
//                 className="bg-themeSurface/40 border border-white/5 p-8 rounded-[2.5rem] shadow-xl shadow-black/5 backdrop-blur-sm space-y-6">
//                     <h3 className="text-lg font-black text-themeText border-r-4 border-[#00d094] pr-3 text-right">رابطہ کی تفصیلات</h3>
//                     <InputField label="ای میل ایڈریس" placeholder="branch.email@example.com" value={branchData.email} onChange={(v) => setBranchData({ ...branchData, email: v })} />
//                     <div className="grid grid-cols-2 gap-4">
//                         <InputField label="فون نمبر 1" placeholder="0300-0000000" value={branchData.phone1} onChange={(v) => setBranchData({ ...branchData, phone1: v })} />
//                         <InputField label="فون نمبر 2" placeholder="0321-0000000" value={branchData.phone2} onChange={(v) => setBranchData({ ...branchData, phone2: v })} />
//                     </div>
//                 </div>

//                 {/* 3. Location Info */}
//                 <div
//                  style={{ boxShadow: 'var(--shadow-card)' }}
//                  className="bg-themeSurface/40 border border-white/5 p-8 rounded-[2.5rem] shadow-xl shadow-black/5 backdrop-blur-sm space-y-6">
//                     <h3 className="text-lg font-black text-themeText border-r-4 border-[#00d094] pr-3 text-right">مقام کی تفصیلات</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <InputField label="برانچ کا نام" placeholder="مثلاً گلشن کیمپس" value={branchData.branchType} onChange={(v) => setBranchData({ ...branchData, branchType: v })} />

//                         <div className="space-y-2 text-right" ref={dropdownRef}>
//                             <label className="text-[11px] font-black text-themeMuted mr-2 uppercase tracking-widest block">شہر</label>
//                             <div className="relative">
//                                 <div
//                                     onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
//                                     className="flex items-center justify-between p-4 bg-themeBg/40 border border-white/10 focus-within:border-[#00d094] ring-4 ring-[#00d094]/5 rounded-2xl cursor-pointer transition-all shadow-inner"
//                                 >
//                                     <span className={`font-bold ${branchData.city === "شہر منتخب کریں" ? 'text-themeMuted/50' : 'text-themeText'}`}>{branchData.city}</span>
//                                     <ChevronDown size={18} className="text-[#00d094]" />
//                                 </div>

//                                 {isCityDropdownOpen && (
//                                     <div className="absolute z-50 w-full mt-2 bg-themeSurface border border-white/10 shadow-2xl rounded-2xl max-h-48 overflow-y-auto p-2 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
//                                         <div className="flex items-center gap-2 p-2 border-b border-white/5 mb-2">
//                                             <Search size={14} className="text-themeMuted" />
//                                             <input
//                                                 placeholder="تلاش کریں..."
//                                                 className="w-full text-xs outline-none bg-transparent text-themeText"
//                                                 onChange={(e) => setCitySearch(e.target.value)}
//                                             />
//                                         </div>
//                                         {filteredCities.map(city => (
//                                             <div
//                                                 key={city}
//                                                 onClick={() => {
//                                                     setBranchData({ ...branchData, city: city });
//                                                     setIsCityDropdownOpen(false);
//                                                 }}
//                                                 className="p-3 hover:bg-[#00d094]/10 rounded-xl cursor-pointer font-bold text-themeText text-sm flex justify-between items-center transition-colors"
//                                             >
//                                                 {city}
//                                                 {branchData.city === city && <Check size={14} className="text-[#00d094]" />}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <InputField label="مکمل پتہ" placeholder="گھر نمبر، گلی نمبر، علاقہ..." value={branchData.address} onChange={(v) => setBranchData({ ...branchData, address: v })} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// const InputField = ({ label, placeholder, value, onChange, icon }) => (
//     <div className="space-y-2 text-right">
//         <label className="text-[11px] font-black text-themeMuted mr-2 uppercase tracking-widest flex items-center justify-end gap-2">
//              {label} <span className="opacity-60">{icon}</span>
//         </label>
//         <div className="p-4 rounded-2xl border bg-themeBg/40 border-white/10 focus-within:border-[#00d094] ring-4 ring-[#00d094]/5 transition-all ">
//             <input
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="bg-transparent w-full outline-none font-bold text-themeText placeholder:text-themeMuted/50 text-right transition-colors"
//             />
//         </div>
//     </div>
// );
import React, { useState, useRef, useEffect } from 'react';
import {
    Mail, Phone, MapPin, ChevronDown, Search, Check,
    Hash, Users2, ClipboardList, CheckCircle2
} from 'lucide-react';
import { AppImages } from '../../Constant/AppImages';
import { InputField } from '../../Components/HR/FormElements';

export const CreateBranch = () => {
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [citySearch, setCitySearch] = useState('');
    const dropdownRef = useRef(null);

    const allCities = ["کراچی", "لاہور", "اسلام آباد", "راولپنڈی", "فیصل آباد", "ملتان", "پشاور", "کوئٹہ"];

    const madrassaBranding = {
        name: "جامعہ انوار القران",
        logo: AppImages.logo
    };

    const [branchData, setBranchData] = useState({
        email: "",
        phone1: "",
        phone2: "",
        address: "",
        branchType: "",
        city: "شہر منتخب کریں",
        regPrefix: "",
        familyPrefix: ""
    });

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsCityDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleCreate = () => {
        console.log("Adding Branch...", branchData);
    };

    const filteredCities = allCities.filter(c => c.includes(citySearch));

    return (
        // Main Container with dir="rtl" and text-right
        <div className="max-w-6xl mx-auto space-y-8 animate-in zoom-in-95 duration-700 pb-10 text-right" dir="rtl">

            {/* --- HEADER SECTION --- */}
            <div
                className="relative bg-gradient-to-br from-[#004d61] to-[#002a33] rounded-[3.5rem] p-10 text-white shadow-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: 'var(--shadow-card)' }}
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    {/* Logo Section */}
                    <div className="w-36 h-36 bg-white rounded-[2.8rem] p-3 shadow-2xl shrink-0">
                        <img src={madrassaBranding.logo} alt="Logo" className="w-full h-full object-contain rounded-[2rem]" />
                    </div>

                    {/* Text Section */}
                    <div className="flex-1 space-y-2 md:text-right text-center">
                        {/* <span className="bg-emerald-500/20 text-emerald-300 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/30">
                            Branch Management
                        </span> */}
                        <h1 className="text-4xl md:text-6xl font-black ">{madrassaBranding.name}</h1>
                        <p className="text-white font-bold text-lg mt-7">نئی برانچ کا ڈیٹا بیس میں اندراج کریں</p>
                    </div>

                    {/* Save Button */}
                    <button
                        className="group bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-[2rem] font-black flex items-center gap-4 transition-all shadow-lg active:scale-95 shrink-0"
                        onClick={handleCreate}
                    >
                        <span>محفوظ کریں</span>
                        <CheckCircle2 size={24} />
                    </button>
                </div>
            </div>

            {/* --- FORM SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Right Side (Main Content): Forms */}
                <div className="lg:col-span-8 space-y-8 order-1">

                    {/* 1. Contact Info */}
                    <div
                        className="bg-themeSurface border border-white/5 p-10 rounded-[3.5rem] shadow-xl space-y-8"
                        style={{ boxShadow: 'var(--shadow-card)' }}
                    >
                        <div className="flex items-center gap-3 border-r-4 border-emerald-500 pr-4">
                            <h3 className="text-xl font-black text-themeText">رابطہ کی معلومات</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField
                                label="ای میل ایڈریس"
                                icon={<Mail size={18} />}
                                placeholder="example@madrassa.com"
                                value={branchData.email}
                                onChange={(v) => setBranchData({ ...branchData, email: v })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="فون نمبر 1" icon={<Phone size={16} />} placeholder="0300-0000000" value={branchData.phone1} onChange={(v) => setBranchData({ ...branchData, phone1: v })} />
                                <InputField label="فون نمبر 2" icon={<Phone size={16} />} placeholder="0321-0000000" value={branchData.phone2} onChange={(v) => setBranchData({ ...branchData, phone2: v })} />
                            </div>
                        </div>

                        <InputField
                            label="مکمل پتہ"
                            icon={<MapPin size={18} />}
                            placeholder="مکمل لوکیشن یہاں درج کریں..."
                            value={branchData.address}
                            onChange={(v) => setBranchData({ ...branchData, address: v })}
                        />
                    </div>

                    {/* 2. Branch & City Selection */}
                    <div
                        className="bg-themeSurface border border-white/5 p-10 rounded-[3.5rem] shadow-xl space-y-8"
                        style={{ boxShadow: 'var(--shadow-card)' }}
                    >
                        <div className="flex items-center gap-3 border-r-4 border-emerald-500 pr-4">
                            <h3 className="text-xl font-black text-themeText">مقام اور انتخاب</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="برانچ کا نام / کیمپس" icon={<Hash size={18} />} placeholder="مثلاً گلشن کیمپس" value={branchData.branchType} onChange={(v) => setBranchData({ ...branchData, branchType: v })} />

                            {/* Dropdown with RTL logic */}
                            <div className="space-y-3 text-right" ref={dropdownRef}>
                                <label className="text-[11px] font-black text-themeMuted mr-2 uppercase tracking-widest block">شہر منتخب کریں</label>
                                <div className="relative">
                                    <div
                                        onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                        className="flex flex-row-reverse items-center justify-between p-5 bg-themeBg border border-white/10 rounded-[1.8rem] cursor-pointer transition-all shadow-inner hover:border-emerald-500/50"
                                    >
                                        <ChevronDown size={22} className="text-emerald-500" />
                                        <span className={`font-black text-lg ${branchData.city === "شہر منتخب کریں" ? 'text-themeMuted/30' : 'text-themeText'}`}>{branchData.city}</span>
                                    </div>

                                    {isCityDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-3 bg-themeSurface border border-white/10 shadow-2xl rounded-[2rem] overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
                                            <div className="flex flex-row-reverse items-center gap-3 p-4 border-b border-white/5 bg-themeBg/40">
                                                <Search size={18} className="text-emerald-500" />
                                                <input
                                                    placeholder="شہر تلاش کریں..."
                                                    className="w-full bg-transparent outline-none text-themeText font-bold text-sm text-right"
                                                    onChange={(e) => setCitySearch(e.target.value)}
                                                />
                                            </div>
                                            <div className="overflow-y-auto max-h-48 custom-scrollbar">
                                                {filteredCities.map(city => (
                                                    <div
                                                        key={city}
                                                        onClick={() => {
                                                            setBranchData({ ...branchData, city: city });
                                                            setIsCityDropdownOpen(false);
                                                        }}
                                                        className="p-4 hover:bg-emerald-500/10 rounded-xl cursor-pointer font-black text-themeText text-md flex flex-row-reverse justify-between items-center mx-2 my-1 transition-all"
                                                    >
                                                        {branchData.city === city && <Check size={18} className="text-emerald-500" />}
                                                        <span>{city}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Side (Sidebar): Sequence Settings */}
                <div className="lg:col-span-4 space-y-8 order-2">
                    <div
                        className="bg-themeSurface border border-white/5 p-8 rounded-[3.5rem] shadow-xl sticky top-6 space-y-8"
                        style={{ boxShadow: 'var(--shadow-card)' }}
                    >
                        <div className="flex items-center gap-3 border-r-4 border-emerald-500 pr-4">
                            <h3 className="text-xl font-black text-themeText">آٹو جنریشن</h3>
                        </div>

                        <div className="space-y-6">
                            <InputField
                                label="رجسٹریشن پری فکس"
                                icon={<Hash size={14} />}
                                placeholder="REG-KHI-"
                                value={branchData.regPrefix}
                                onChange={(v) => setBranchData({ ...branchData, regPrefix: v })}
                            />
                            <InputField
                                label="فیملی پری فکس"
                                icon={<Users2 size={14} />}
                                placeholder="FAM-KHI-"
                                value={branchData.familyPrefix}
                                onChange={(v) => setBranchData({ ...branchData, familyPrefix: v })}
                            />
                        </div>

                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                            <p className="text-themeText text-[13px] font-bold leading-relaxed opacity-80 text-center italic">
                                "یہ پری فکس تمام طلبہ کے رجسٹریشن نمبرز پر خودکار طریقے سے لگ جائیں گے۔"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Refined RTL Input Component
// const InputField = ({ label, placeholder, value, onChange, icon }) => (
//     <div className="space-y-3 text-right group">
//         <label className="text-[11px] font-black text-themeMuted mr-2 uppercase tracking-widest flex items-center justify-end gap-2 group-focus-within:text-emerald-500 transition-colors">
//              <span>{label}</span>
//              <span className="opacity-40">{icon}</span>
//         </label>
//         <div className="p-5 rounded-[1.8rem] border bg-themeBg border-white/5 focus-within:border-emerald-500 transition-all shadow-inner relative overflow-hidden">
//             <input
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="bg-transparent w-full outline-none font-black text-lg text-themeText placeholder:text-themeMuted/20 text-right dir-rtl"
//             />
//         </div>
//     </div>
// );