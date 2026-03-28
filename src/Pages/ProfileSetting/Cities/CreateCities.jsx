import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, X, ArrowRight, Save, Check } from 'lucide-react';

export const CreateCities = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);

    // Ye wo cities hain jo system mein pehle se majood hain (Options)
    const allCities = [
        "کراچی", "لاہور", "اسلام آباد", "راولپنڈی", "فیصل آباد",
        "ملتان", "پشاور", "کوئٹہ", "گوجرانوالہ", "سیالکوٹ", "حیدرآباد"
    ];

    // User ki add ki hui cities
    const [addedCities, setAddedCities] = useState([
        { id: 1, name: 'کراچی' },
        { id: 2, name: 'لاہور' },
    ]);

    // Filter cities based on search
    const filteredCities = allCities.filter(city =>
        city.includes(searchTerm) && !addedCities.some(a => a.name === city)
    );

    const handleAddCity = () => {
        if (selectedCity) {
            const newCity = { id: Date.now(), name: selectedCity };
            setAddedCities([newCity, ...addedCities]);
            setSelectedCity(null);
            setSearchTerm('');
            setIsFormOpen(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700" dir="rtl">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/40 p-6 rounded-[2.5rem] border border-white/60 backdrop-blur-sm">
                <div className="text-right">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">شہروں کی فہرست</h2>
                    <p className="text-sm text-slate-500 font-medium text-right">کل شہر: {addedCities.length}</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${isFormOpen ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-[#00d094] text-white shadow-emerald-200'
                        }`}
                >
                    {isFormOpen ? 'بند کریں' : 'نیا شہر شامل کریں'}
                    {isFormOpen ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {/* --- SEARCHABLE SELECT FORM --- */}
            {isFormOpen && (
                <div className="bg-white/80 backdrop-blur-xl border border-[#00d094]/30 shadow-2xl rounded-[2.5rem] p-8 animate-in slide-in-from-top duration-500">
                    <div className="max-w-md mx-auto space-y-4">
                        <label className="text-[11px] font-black text-slate-500 mr-2 block text-right tracking-widest">شہر منتخب کریں *</label>

                        <div className="relative">
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="شہر کا نام تلاش کریں..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-slate-200 focus:border-[#00d094] focus:ring-4 focus:ring-emerald-50 outline-none h-[64px] pr-12 pl-4 rounded-2xl text-lg font-bold text-right transition-all"
                            />

                            {/* Dropdown Options */}
                            {searchTerm && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-slate-100 shadow-xl rounded-2xl max-h-[200px] overflow-y-auto overflow-x-hidden p-2">
                                    {filteredCities.length > 0 ? (
                                        filteredCities.map((city, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setSearchTerm(city);
                                                }}
                                                className="p-4 hover:bg-emerald-50 rounded-xl cursor-pointer font-bold text-right text-slate-700 transition-colors flex items-center justify-between"
                                            >
                                                {selectedCity === city && <Check size={16} className="text-[#00d094]" />}
                                                <span>{city}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-slate-400 text-sm font-medium">کوئی شہر نہیں ملا</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAddCity}
                            disabled={!selectedCity}
                            className={`w-full mt-4 py-4 rounded-xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-3 ${selectedCity ? 'bg-[#218838] text-white hover:bg-[#1a6d2c]' : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                                }`}
                        >
                            فہرست میں شامل کریں <Plus size={20} />
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
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">نمبر شمار</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">شہر کا نام</th>
                                <th className="px-6 py-4 text-[11px] font-black text-right uppercase tracking-widest">ایکشن</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedCities.map((city, index) => (
                                <tr key={city.id} className="bg-white/60 hover:bg-white transition-all duration-300 group rounded-2xl  hover:scale-[1.01] transition-all duration-300 group shadow-sm hover:shadow-md">
                                    <td className="px-6 py-4 font-bold text-slate-500 text-right first:rounded-r-2xl">
                                        {addedCities.length - index}
                                    </td>
                                    <td className="px-6 py-4 font-black text-slate-800 text-right">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover:bg-[#00d094] group-hover:text-white transition-all">
                                                <MapPin size={16} />
                                            </div>
                                            <span>{city.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right last:rounded-l-2xl">
                                        <div className="flex items-center justify-start gap-2">
                                            <button
                                                onClick={() => setAddedCities(addedCities.filter(c => c.id !== city.id))}
                                                className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={16} />
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