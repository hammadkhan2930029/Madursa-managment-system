import React, { useEffect, useState } from 'react';
import { ArrowRight, Eye, GraduationCap, MapPin, Phone, School, Search, Users, Hash } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getStudentProfiles,
    initializeStudentProfiles,
    subscribeToStudentProfiles,
} from '../../../Constant/StudentProfiles';
import {
    getParentEntryById,
    initializeParentEntries,
    subscribeToParentEntries,
} from '../../../Constant/ParentsStore';

const isSameParent = (studentParent, parentEntry) => {
    const studentName = (studentParent.name || '').trim().toLowerCase();
    const entryName = (parentEntry.name || '').trim().toLowerCase();
    const studentPhone = (studentParent.phone || '').trim();
    const entryPhone = (parentEntry.phone || '').trim();
    return studentName === entryName || (studentPhone && studentPhone === entryPhone);
};

const mapChildren = (profiles, parentEntry) =>
    profiles
        .filter((student) => student.parents.some((studentParent) => isSameParent(studentParent, parentEntry)))
        .map((student) => ({
            idNo: student.admission.idNo,
            name: student.personal.fullName,
            fatherName: student.personal.fatherName,
            campus: student.classInfo.campus,
            className: student.classInfo.className,
            section: student.classInfo.section,
            familyNo: student.classInfo.familyNo,
        }));

export const ParentProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [, setStoreVersion] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        initializeStudentProfiles();
        initializeParentEntries(getStudentProfiles());
        window.scrollTo(0, 0);

        const unsubscribeParents = subscribeToParentEntries(() => {
            setStoreVersion((currentVersion) => currentVersion + 1);
        });

        const unsubscribeStudents = subscribeToStudentProfiles((profiles) => {
            initializeParentEntries(profiles);
            setStoreVersion((currentVersion) => currentVersion + 1);
        });

        return () => {
            unsubscribeParents();
            unsubscribeStudents();
        };
    }, []);

    const parent = getParentEntryById(id);
    const children = parent ? mapChildren(getStudentProfiles(), parent) : [];

    const filteredChildren = children.filter((child) =>
        [child.name, child.idNo, child.familyNo]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    if (!parent) {
        return (
            <div className="max-w-5xl mx-auto p-6" dir="rtl">
                <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] p-12 text-center">
                    <h1 className="text-2xl font-black text-[var(--color-text-main)]">والدین کا پروفائل نہیں ملا</h1>
                    <button
                        onClick={() => navigate('/students/parents')}
                        className="mt-6 px-6 py-3 rounded-2xl bg-[var(--color-primary)] text-[#0b1120] font-bold"
                    >
                        واپس فہرست پر جائیں
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 space-y-5 md:space-y-6 bg-[var(--color-bg)] min-h-screen" dir="rtl">
            <div className="bg-[var(--color-surface)] rounded-[2rem] md:rounded-[2.8rem] border border-[var(--color-border)] p-5 sm:p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-center md:items-start">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.8rem] md:rounded-[2rem] bg-[var(--color-primary)]/10 border-4 border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                        <Users size={36} className="sm:w-[42px] sm:h-[42px]" />
                    </div>

                    <div className="flex-1 w-full min-w-0 text-center md:text-right space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-[11px] font-black text-[var(--color-text-muted)] uppercase tracking-[0.25em]">Parent Profile</p>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--color-text-main)] mt-2 break-words">
                                    {parent.name}
                                </h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-6">
                                    <p className="text-sm font-bold text-[var(--color-text-muted)]">
                                        رشتہ : <span className="text-[var(--color-text-main)]">{parent.role || '---'}</span>
                                    </p>
                                    <p className="text-sm font-bold text-[var(--color-text-muted)]">
                                        پیشہ : <span className="text-[var(--color-text-main)]">{parent.occupation || '---'}</span>
                                    </p>
                                    {/* Added Family No here */}
                                    <p className="text-sm font-bold text-[var(--color-text-muted)]">
                                        فیملی نمبر : <span className="text-[var(--color-primary)]">{children[0]?.familyNo || '---'}</span>
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(-1)}
                                className="w-full md:w-auto self-stretch md:self-start flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-main)] font-bold transition-colors hover:bg-[var(--color-input)]"
                            >
                                <ArrowRight size={18} /> واپس
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                            <div className="bg-[var(--color-bg)] rounded-[1.6rem] md:rounded-[1.8rem] p-4 border border-[var(--color-border)]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Phone size={14} className="text-[var(--color-primary)]" />
                                    <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">فون نمبر</p>
                                </div>
                                <p className="text-base md:text-lg font-black text-[var(--color-primary)] break-all">{parent.phone || '---'}</p>
                            </div>

                            {/* Added Family No Card */}
                            <div className="bg-[var(--color-bg)] rounded-[1.6rem] md:rounded-[1.8rem] p-4 border border-[var(--color-border)]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Hash size={14} className="text-[var(--color-primary)]" />
                                    <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">فیملی نمبر</p>
                                </div>
                                <p className="text-base md:text-lg font-black text-[var(--color-text-main)]">{children[0]?.familyNo || '---'}</p>
                            </div>

                            <div className="bg-[var(--color-bg)] rounded-[1.6rem] md:rounded-[1.8rem] p-4 border border-[var(--color-border)]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users size={14} className="text-[var(--color-primary)]" />
                                    <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">کل بچے</p>
                                </div>
                                <p className="text-base md:text-lg font-black text-emerald-500">{children.length}</p>
                            </div>

                            <div className="bg-[var(--color-bg)] rounded-[1.6rem] md:rounded-[1.8rem] p-4 border border-[var(--color-border)] sm:col-span-1 lg:col-span-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin size={14} className="text-[var(--color-primary)]" />
                                    <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">گھر کا پتہ</p>
                                </div>
                                <p className="text-xs md:text-sm font-bold text-[var(--color-text-main)] " title={parent.address}>
                                    {parent.address || 'پتہ درج نہیں ہے'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* List of Children Header */}
            <div className="flex items-center justify-between px-2">
                <h3 className="text-lg md:text-xl font-black text-[var(--color-text-main)] flex items-center gap-3">
                    <GraduationCap className="text-[var(--color-primary)]" />
                    منسلک طلباء
                </h3>
                <div className="relative group hidden sm:block">
                    <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)]" />
                    <input 
                        type="text" 
                        placeholder="طالب علم تلاش کریں..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl py-2 pr-10 pl-4 text-xs font-bold outline-none focus:border-[var(--color-primary)]/50"
                    />
                </div>
            </div>

            {/* Mobile View for Children List */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredChildren.map((student) => (
                    <div
                        key={student.idNo}
                        onClick={() => navigate(`/students/profile/${student.idNo}`)}
                        className="bg-[var(--color-surface)] p-5 rounded-[2rem] border border-[var(--color-border)] shadow-sm space-y-4 cursor-pointer hover:border-[var(--color-primary)]/40 transition-all"
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex gap-3 min-w-0">
                                <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)] font-black text-[11px] border border-[var(--color-primary)]/20 shrink-0">
                                    {student.idNo.split('-')[1]}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-black text-[var(--color-text)] text-base break-words">{student.name}</h4>
                                    <p className="text-[11px] text-[var(--color-text-muted)] font-bold mt-0.5 break-words">ولدیت: {student.fatherName}</p>
                                </div>
                            </div>
                            <span className="bg-[var(--color-input)] text-[var(--color-text-muted)] px-2.5 py-1 rounded-xl font-black text-[10px] border border-[var(--color-border)] shrink-0">
                                {student.idNo}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-[var(--color-border)]">
                            <div className="flex items-center gap-2 min-w-0">
                                <School size={16} className="text-[var(--color-primary)] shrink-0" />
                                <span className="text-[12px] font-bold text-themeText/80 break-words">{student.campus}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:justify-end min-w-0">
                                <Users size={16} className="text-[var(--color-primary)] shrink-0" />
                                <span className="text-[12px] font-bold text-[var(--color-text)]/80 break-words">
                                    {student.className} ({student.section})
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                                <Phone size={15} className="text-[var(--color-text-muted)] shrink-0" />
                                <span className="text-xs font-black text-[var(--color-text-muted)] break-all">{student.familyNo}</span>
                            </div>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(`/students/profile/${student.idNo}`);
                                }}
                                className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shrink-0"
                            >
                                <Eye size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View for Children Table */}
            <div className="hidden md:block bg-[var(--color-surface)] rounded-[3rem] border border-[var(--color-border)] shadow-sm overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-[var(--color-input)]/50 border-b border-white/5">
                        <tr>
                            <th className="p-6 text-[var(--color-text-muted)] font-black text-[11px] uppercase tracking-widest">آئی ڈی</th>
                            <th className="p-6 text-[var(--color-text-muted)] font-black text-[11px] uppercase tracking-widest">طالب علم کی تفصیلات</th>
                            <th className="p-6 text-[var(--color-text-muted)] font-black text-[11px] uppercase tracking-widest">کیمپس و کلاس</th>
                            <th className="p-6 text-[var(--color-text-muted)] font-black text-[11px] uppercase tracking-widest text-center">ایکشن</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredChildren.map((student) => (
                            <tr
                                key={student.idNo}
                                onClick={() => navigate(`/students/profile/${student.idNo}`)}
                                className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                            >
                                <td className="p-6">
                                    <span className="bg-[var(--color-input)] text-[var(--color-text)]/70 px-4 py-2 rounded-2xl font-black text-[12px] border border-[var(--color-border)]">
                                        {student.idNo}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="font-black text-[var(--color-text)] text-base">{student.name}</div>
                                    <div className="text-[11px] text-[var(--color-text-muted)] font-bold mt-1">ولدیت: {student.fatherName} | فیملی: {student.familyNo}</div>
                                </td>
                                <td className="p-6">
                                    <span className="text-[var(--color-primary)] font-bold text-xs bg-[var(--color-primary)]/10 px-4 py-1.5 rounded-full border border-[var(--color-primary)]/20 inline-block">
                                        {student.campus}
                                    </span>
                                    <div className="text-[11px] text-[var(--color-text-muted)] font-bold mt-2 pr-1">{student.className} ({student.section})</div>
                                </td>
                                <td className="p-6 text-center">
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            navigate(`/students/profile/${student.idNo}`);
                                        }}
                                        className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/5"
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {filteredChildren.length === 0 ? (
                <div className="p-10 md:p-24 text-center bg-[var(--color-surface)] rounded-[2rem] md:rounded-[3rem] border border-[var(--color-border)]">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--color-input)] rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-[var(--color-text-muted)] opacity-20">
                        <Search size={40} className="md:w-12 md:h-12" />
                    </div>
                    <h3 className="text-[var(--color-text)] text-lg md:text-xl font-black">اس والدین سے منسلک کوئی طالب علم نہیں ملا</h3>
                    <p className="text-[var(--color-text-muted)] font-bold mt-2 text-sm md:text-base">
                        ممکن ہے یہ entry دستی طور پر بنائی گئی ہو یا ابھی matching student data موجود نہ ہو
                    </p>
                </div>
            ) : null}
        </div>
    );
};