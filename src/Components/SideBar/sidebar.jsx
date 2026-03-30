import React, { useState } from 'react';
import {
    LayoutDashboard, Users, GraduationCap, UserCheck,
    BookOpen, Wallet, Settings, LogOut, Search,
    Bell, MessageSquare, Menu, ChevronDown,
    ClipboardList, GraduationCap as ExamIcon, HeartHandshake,
    BadgeCent, Library, Store, X
} from 'lucide-react';
import { Badge, IconButton, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export const SideBar = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // --- FIX: isActive Function ---
    const isActive = (path) => {
        if (!path) return false;
        return location.pathname === path;
    };

    const menuItems = [
        { id: 'dashboard', label: 'ڈیش بورڈ', icon: LayoutDashboard, path: '/dashboard' },
        {
            id: 'class_mgmt',
            label: 'کلاس مینجمنٹ',
            icon: ClipboardList,
            subMenu: [
                { id: 'classes', label: ' جماعت', path: '/class-management/Classes' },
                { id: 'sections', label: 'جماعت سیکشنز  ', path: '/class-management/sections' },
                { id: 'session', label: 'سیشن ', path: '/class-management/session' },
                { id: 'subjects', label: 'مظامین ', path: '/class-management/subjects' },


            ]
        },
        {
            id: 'hifz',
            label: 'شعبہ حفظ',
            icon: HeartHandshake,
            subMenu: [
                { id: 'hifz_daily', label: 'روزانہ رپورٹ', path: '/hifz/daily-report' },
                { id: 'hifz_exams', label: 'امتحانات', path: '/hifz/exams' }
            ]
        },
        {
            id: 'students',
            label: 'طلباء',
            icon: GraduationCap,
            subMenu: [
                { id: 'std_list', label: 'فہرست طلباء', path: '/students/list' },
                { id: 'std_admission', label: 'نیا داخلہ', path: '/students/admission' }
            ]
        },
        {
            id: 'teachers',
            label: 'اساتذہ',
            icon: UserCheck,
            subMenu: [
                { id: 't_list', label: 'فہرست اساتذہ', path: '/teachers/list' },
                { id: 't_attendance', label: 'حاضری', path: '/teachers/attendance' }
            ]
        },
        { id: 'exams', label: 'امتحان', icon: ExamIcon, path: '/exams' },
        { id: 'scholarship', label: 'وظیفہ', icon: BadgeCent, path: '/scholarship' },
        { id: 'finance', label: 'مالیات', icon: Wallet, path: '/finance' },
        { id: 'reports', label: 'رپورٹس', icon: ClipboardList, path: '/reports' },
        { id: 'books', label: 'کتاب', icon: Library, path: '/books' },
        { id: 'store', label: 'اسٹور', icon: Store, path: '/store' },
    ];

    const toggleSubMenu = (id) => {
        setOpenSubMenu(openSubMenu === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex font-urdu" dir="rtl">
            <style dangerouslySetInnerHTML={{
                __html: `
                .vip-scrollbar::-webkit-scrollbar { width: 5px; }
                .vip-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .vip-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
                .vip-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(0, 208, 148, 0.3); }
            `}} />

            <aside className={`fixed inset-y-0 right-0 z-[60] w-64 bg-gradient-to-b from-[#004d61] to-[#002a33] text-white p-4 transition-all duration-500 ease-in-out shadow-[10px_0_30px_rgba(0,0,0,0.1)] ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>

                <button className="md:hidden absolute left-4 top-6 text-white/50" onClick={() => setIsSidebarOpen(false)}>
                    <X size={24} />
                </button>

                <div className="flex items-center gap-3 mb-8 px-2 py-4">
                    <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl">
                        <GraduationCap className="text-[#00d094]" size={26} />
                    </div>
                    <div>
                        <h1 className="text-white font-black text-base leading-tight">مدرسہ انتظامیہ</h1>
                        <p className="text-[9px] text-[#00d094] font-bold tracking-[0.2em] uppercase">Premium Hub</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)] vip-scrollbar px-1">
                    {menuItems.map((item) => (
                        <div key={item.id}>
                            <div
                                onClick={() => {
                                    if (!item.subMenu) {
                                        navigate(item.path);
                                        setIsSidebarOpen(false);
                                    } else {
                                        toggleSubMenu(item.id);
                                    }
                                }}
                                className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${isActive(item.path) || (item.subMenu && item.subMenu.some(s => isActive(s.path)))
                                    ? 'bg-[#00d094] text-white shadow-lg shadow-emerald-900/20'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={isActive(item.path) ? 'text-white' : 'text-[#00d094]/70'} />
                                    <span className="text-[13px] font-bold">{item.label}</span>
                                </div>
                                {item.subMenu && (
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${openSubMenu === item.id ? 'rotate-180' : ''}`} />
                                )}
                            </div>

                            {item.subMenu && openSubMenu === item.id && (
                                <div className="mt-2 mr-9 space-y-1 border-r border-white/10 pr-2">
                                    {item.subMenu.map((sub) => (
                                        <div
                                            key={sub.id}
                                            onClick={() => {
                                                navigate(sub.path);
                                                setIsSidebarOpen(false);
                                            }}
                                            className={`text-[12px] p-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition-all ${isActive(sub.path) ? 'text-[#00d094] font-bold bg-[#00d094]/5' : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${isActive(sub.path) ? 'bg-[#00d094] scale-125' : 'bg-gray-600'}`} />
                                            {sub.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-white/5">
                    <button className="flex items-center gap-3 p-3 w-full text-gray-400 hover:text-rose-400 transition-all hover:bg-rose-500/5 rounded-xl">
                        <LogOut size={18} />
                        <span className="text-[13px] font-medium">خروج ہوں</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 md:mr-64 flex flex-col min-h-screen overflow-x-hidden">
                <nav className="h-20 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-6 md:px-10 flex items-center justify-between sticky top-4 z-50 rounded-[2.5rem] mx-2 md:mx-4 transition-all">

                    {/* User Profile Section with Dropdown */}
                    <div className="relative">
                        <div
                            className="flex items-center gap-5 cursor-pointer"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <div className="relative group/avatar">
                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00d094] border-2 border-white rounded-full z-10 animate-pulse" />
                                <Avatar src="https://i.pravatar.cc/150?u=a" className="w-11 h-11 border-2 border-emerald-100 shadow-sm" />
                            </div>
                            <div className="hidden sm:block text-right leading-tight">
                                <p className="font-black text-sm text-slate-800">محمد علی</p>
                                <div className="flex items-center justify-end gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Super Admin</p>
                                </div>
                            </div>
                        </div>

                        {/* --- DROPDOWN MENU --- */}
                        {isProfileOpen && (
                            <>
                                {/* Click outside to close */}
                                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />

                                <div className="absolute top-full right-0 mt-4 w-52 bg-white  border border-white/20 shadow-2xl rounded-[2rem] z-50 overflow-hidden p-2 animate-in fade-in zoom-in duration-200 origin-top-right">
                                    <button
                                        onClick={() => {
                                            navigate('/Profile/setting')
                                            setIsProfileOpen(false)
                                        }}
                                        className="w-full flex items-center justify-start gap-3 p-3.5 rounded-2xl hover:bg-emerald-50 text-slate-600 hover:text-[#00d094] transition-all group" >
                                        <span className="text-xs font-bold">پروفائل سیٹنگ</span>
                                        <Settings size={18} className="text-slate-400 group-hover:text-[#00d094]" />
                                    </button>

                                    <button
                                        onClick={() => {

                                            setIsProfileOpen(false)
                                        }}
                                        className="w-full flex items-center justify-start gap-3 p-3.5 rounded-2xl hover:bg-emerald-50 text-slate-600 hover:text-[#00d094] transition-all group" >
                                        <span className="text-xs font-bold">میری سرگرمیاں</span>
                                        <UserCheck size={18} className="text-slate-400 group-hover:text-[#00d094]" />
                                    </button>
                                    <button
                                        className="w-full flex items-center justify-start gap-3 p-3.5 rounded-2xl hover:bg-emerald-50 text-slate-600 hover:text-[#00d094] transition-all group"
                                        onClick={() => {
                                            navigate('/Profile/cities')
                                            setIsProfileOpen(false)
                                        }}>
                                        <span className="text-xs font-bold">شہر</span>
                                        <UserCheck size={18} className="text-slate-400 group-hover:text-[#00d094]" />
                                    </button>

                                    <div className="h-px bg-slate-100 my-1 mx-2" />

                                    <button className="w-full flex items-center justify-start gap-3 p-3.5 rounded-2xl hover:bg-rose-50 text-rose-500 transition-all group" onClick={() => setIsProfileOpen(false)}>
                                        <span className="text-xs font-bold">لاگ آؤٹ</span>
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Search Bar Section (Same as before) */}
                    <div className="flex items-center gap-4 flex-1 justify-end md:justify-center">
                        <div className="hidden md:flex items-center gap-3 bg-white/50 px-5 py-2.5 rounded-full border border-slate-200/60 w-full max-w-md focus-within:max-w-lg focus-within:border-[#00d094] focus-within:bg-white focus-within:shadow-md transition-all group relative">
                            <div className="flex-none text-slate-400 group-focus-within:text-[#00d094]">
                                <Search size={18} />
                            </div>
                            <kbd className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-[10px] text-slate-400 font-bold uppercase">⌘ K</kbd>
                            <input type="text" placeholder="کچھ بھی تلاش کریں..." className="bg-transparent outline-none text-[13px] text-right font-medium text-slate-600 flex-grow" />
                        </div>

                        {/* Notification & Messages (Same as before) */}
                        <div className="hidden lg:flex items-center gap-2">
                            <button className="p-2.5 text-slate-500 hover:bg-emerald-50 hover:text-[#00d094] rounded-xl relative transition-all">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                            </button>
                            <button className="p-2.5 text-slate-500 hover:bg-emerald-50 hover:text-[#00d094] rounded-xl transition-all">
                                <MessageSquare size={20} />
                            </button>
                        </div>

                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-3 bg-gradient-to-br from-[#004d61] to-[#003a49] text-white rounded-2xl shadow-lg shadow-emerald-900/20 active:scale-95 transition-transform">
                            <Menu size={20} />
                        </button>
                    </div>
                </nav>

                {/* <main className="p-8">
                    {children}
                </main> */}
                <main className="p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {isSidebarOpen && <div className="fixed inset-0 bg-[#002a33]/60 z-[55] md:hidden backdrop-blur-md" onClick={() => setIsSidebarOpen(false)} />}
        </div>
    );
};