

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, Trash2, MapPin, X, ArrowRight, Check, ChevronDown } from 'lucide-react';

export const CreateCities = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const dropdownRef = useRef(null);

    const allCities = [
        "کراچی", "لاہور", "اسلام آباد", "راولپنڈی", "فیصل آباد",
        "ملتان", "پشاور", "کوئٹہ", "گوجرانوالہ", "سیالکوٹ", "حیدرآباد",
        "سکھر", "جھنگ", "شیخوپورہ", "گجرات", "مردان", "قصور", "رحیم یار خان"
    ];

    const [addedCities, setAddedCities] = useState([
        { id: 1, name: 'کراچی' },
        { id: 2, name: 'لاہور' },
    ]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCities = allCities.filter(city => {
        const isNotAdded = !addedCities.some(a => a.name === city);
        return isNotAdded && city.includes(searchTerm);
    });

    const handleAddCity = () => {
        if (selectedCity) {
            setAddedCities([{ id: Date.now(), name: selectedCity }, ...addedCities]);
            setSelectedCity(null);
            setSearchTerm('');
            setIsOpen(false);
            setIsFormOpen(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700" dir="rtl">
            {/* --- HEADER --- */}
            <div  style={{ boxShadow: 'var(--shadow-card)' }} className="flex flex-col md:flex-row justify-between items-center gap-4 bg-themeSurface/40 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-xl shadow-black/5">
                <div className="text-right">
                    <h2 className="text-2xl font-black text-themeText tracking-tight">شہروں کی فہرست</h2>
                    <p className="text-sm text-themeMuted font-medium">کل شہر: {addedCities.length}</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${isFormOpen
                            ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                            : 'bg-[#00d094] text-white shadow-[#00d094]/20 hover:bg-[#00b07d]'
                        }`}
                >
                    {isFormOpen ? 'بند کریں' : 'نیا شہر شامل کریں'}
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {/* --- SEARCHABLE SELECT FORM --- */}
            {/* --- SEARCHABLE SELECT FORM --- */}
            {isFormOpen && (
                <div  style={{ boxShadow: 'var(--shadow-card)' }} className="bg-themeSurface/60  backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2.5rem] p-8 animate-in slide-in-from-top-4 duration-500 relative z-[100]">
                    <div className="max-w-md mx-auto space-y-4 text-right">
                        <label className="text-[11px] font-black text-themeMuted mr-2 block uppercase tracking-widest">شہر منتخب کریں *</label>

                        <div className="relative" ref={dropdownRef}>
                            <div className="relative group">
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-themeMuted group-focus-within:text-[#00d094]">
                                    <Search size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="شہر تلاش کریں..."
                                    value={searchTerm}
                                    onFocus={() => setIsOpen(true)}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setIsOpen(true);
                                        if (selectedCity !== e.target.value) setSelectedCity(null);
                                    }}
                                    style={{ boxShadow: 'var(--shadow-card)' }}
                                    className="w-full bg-themeBg/50 border-2 border-white/5 focus:border-[#00d094] outline-none h-[64px] pr-12 pl-12 rounded-2xl text-lg font-bold text-right text-themeText transition-all "
                                />
                                <div
                                    className="absolute inset-y-0 left-4 flex items-center cursor-pointer text-themeMuted"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* --- DROPDOWN LIST (Fixed Positioning) --- */}
                            {isOpen && (
                                <div className="absolute top-full left-0 right-0 z-[110] mt-2 bg-themebg   border border-white/10 shadow-2xl rounded-2xl max-h-[250px] overflow-y-auto p-2 border-t-4 border-t-[#00d094] animate-in zoom-in-95 duration-200 vip-scrollbar">
                                    {filteredCities.length > 0 ? (
                                        filteredCities.map((city, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setSearchTerm(city);
                                                    setIsOpen(false);
                                                }}
                                                className={`p-4 mb-1  rounded-xl cursor-pointer font-bold text-right transition-all flex items-center justify-between hover:bg-[#00d094]/10 group ${selectedCity === city ? 'bg-[#00d094]/20 text-[#00d094]' : 'text-themeText'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {selectedCity === city ? <Check size={18} /> : <MapPin size={16} className="opacity-30 group-hover:opacity-100 group-hover:text-[#00d094]" />}
                                                    <span>{city}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-themeMuted font-bold">کوئی شہر نہیں ملا</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAddCity}
                            disabled={!selectedCity}
                            style={{ boxShadow: 'var(--shadow-card)' }}
                            className={`w-full mt-4 py-4 rounded-xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-3 ${selectedCity ? 'bg-emerald-600 text-white' : 'bg-themeBg text-themeMuted/30 cursor-not-allowed'
                                }`}
                        >
                            فہرست میں شامل کریں <Plus size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* --- LIST TABLE --- */}
            <div  style={{ boxShadow: 'var(--shadow-card)' }} className="bg-themeSurface/30 border border-white/10 shadow-inner rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-separate border-spacing-y-2 px-4">
                        <thead>
                            <tr className="text-themeMuted text-[11px] font-black uppercase tracking-widest">
                                <th className="px-6 py-4">نمبر شمار</th>
                                <th className="px-6 py-4">شہر کا نام</th>
                                <th className="px-6 py-4 text-center">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedCities.map((city, index) => (
                                <tr key={city.id} className="bg-themeBg/40 hover:bg-themeBg transition-all duration-300 group rounded-2xl shadow-sm border border-white/5 hover:scale-101 ">
                                    <td className="px-6 py-4 font-bold text-themeMuted first:rounded-r-2xl border-r border-white/5">
                                        {addedCities.length - index}
                                    </td>
                                    <td className="px-6 py-4 font-black text-themeText">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-themeBg/60 text-themeMuted rounded-lg group-hover:bg-[#00d094] group-hover:text-white transition-all shadow-inner">
                                                <MapPin size={16} />
                                            </div>
                                            <span>{city.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 last:rounded-l-2xl border-l border-white/5 text-center">
                                        <button
                                            onClick={() => setAddedCities(addedCities.filter(c => c.id !== city.id))}
                                            className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- BACK BUTTON --- */}
            <div className="flex justify-start px-4 pb-4">
                <button className="flex items-center gap-2 bg-themeMuted/5 text-themeMuted px-8 py-3 rounded-2xl font-black text-sm border border-white/5 hover:bg-themeMuted/10 transition-all">
                    واپس <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};