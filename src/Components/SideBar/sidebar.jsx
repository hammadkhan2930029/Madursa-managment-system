import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Users, GraduationCap, UserCheck,
    BookOpen, Wallet, Settings, LogOut, Search,
    Bell, MessageSquare, Menu, ChevronDown,
    ClipboardList, GraduationCap as ExamIcon, HeartHandshake, Building2,
    BadgeCent, Library, Store, X, Moon, Sun, UserPlus,
} from 'lucide-react';
import { Avatar } from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ThemeToggle } from '../ThemToggle/ThemToggle'
import { SelectField } from '../HR/FormElements';


export const SideBar = () => {
    //--------------------------------------------------------------------

    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    //--------------------------------------------------------------------

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    const isActive = (path) => path && location.pathname === path;
    //--------------------------------------------------------------------

    const menuItems = [
        {
            id: 'branch_mgmt',
            label: 'برانچ مینجمنٹ',
            icon: Building2,
            subMenu: [
                { id: 'campus_1', label: 'کیمپس 1', path: '/branch-management/campus-1' },
                { id: 'campus_2', label: 'کیمپس 2', path: '/branch-management/campus-2' },
                { id: 'campus_3', label: 'کیمپس 3', path: '/branch-management/campus-3' },
            ]
        },
        {
            id: 'dashboard',
            label: 'ڈیش بورڈ',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            id: 'class_mgmt',
            label: 'کلاس مینجمنٹ',
            icon: ClipboardList,
            subMenu: [
                { id: 'classes', label: ' جماعت', path: '/class-management/Classes' },
                { id: 'sections', label: 'جماعت سیکشنز', path: '/class-management/sections' },
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

                { id: 'std_admission', label: 'داخلہ فارم', path: '/students/admission' },
                { id: 'std_list', label: 'طلباء کی فہرست', path: '/students/list' },
                { id: 'std_id_card', label: 'آئی ڈی کارڈ بنائیں', path: '/students/create-id-card' },
                { id: 'std_attendance', label: 'طلبہ کی حاضری', path: '/students/attendance' },
                { id: 'std_class_asign', label: 'طلبہ کو کلاس میں ایڈ کریں', path: '/students/class_asign' },


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
        {
            id: 'HRManagement',
            label: 'عملہ',
            icon: UserPlus,
            path: '/HRManagement'
        },
        {
            id: 'exams',
            label: 'امتحان',
            icon: ExamIcon,
            path: '/exams'
        },
        {
            id: 'scholarship',
            label: 'وظیفہ',
            icon: BadgeCent,
            path: '/scholarship'
        },
        {
            id: 'finance',
            label: 'مالیات',
            icon: Wallet,
            path: '/finance'
        },
        {
            id: 'reports',
            label: 'رپورٹس',
            icon: ClipboardList,
            path: '/reports'
        },
        {
            id: 'books',
            label: 'کتاب',
            icon: Library,
            path: '/books'
        },
        {
            id: 'store',
            label: 'اسٹور',
            icon: Store,
            path: '/store'
        },
    ];
    //--------------------------------------------------------------------
    const profileMenuItems = [
        { id: 'settings', label: 'پروفائل سیٹنگ', path: '/Profile/setting', icon: Settings },
        { id: 'add_branch', label: 'نئی برانچ شامل کریں', path: '/branch-management/create-branch', icon: UserCheck },
        { id: 'cities', label: 'شہر', path: '/Profile/cities', icon: UserCheck },
    ];

    const toggleSubMenu = (id) => setOpenSubMenu(openSubMenu === id ? null : id);
    //--------------------------------------------------------------------
    const setting = [
        {
            id: 'setting',
            label: 'ترتیبات',
            icon: Settings,
            subMenu: [
                { id: 'shift', label: 'شفٹ کا انتظام', path: '/setting/shift' },
                { id: 'department', label: 'شعبہ جات کا انتظام', path: '/setting/department' },
                { id: 'degree', label: 'تعلیمی اسناد کے نام', path: '/setting/degree-name' },

            ]
        }

    ];

    //----------------------------------------------------------------------

    return (
        <div className="min-h-screen bg-themeBg flex font-urdu transition-colors duration-300" dir="rtl">
            <style dangerouslySetInnerHTML={{
                __html: `
                .vip-scrollbar::-webkit-scrollbar { width: 5px; }
                .vip-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .vip-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
                .vip-scrollbar:hover::-webkit-scrollbar-thumb { background: #00d094; opacity: 0.3; }
                .animate-spin-slow {
                       animation: spin 4s linear infinite;
                 }
                @keyframes spin {
                       from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                 }
            `}} />

            {/* --- SIDEBAR --- */}


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

                <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)] vip-scrollbar px-1 ">
                    {menuItems.map((item) => (
                        <div key={item.id}>
                            <div
                                onClick={() => item.subMenu ? toggleSubMenu(item.id) : (navigate(item.path), setIsSidebarOpen(false))}
                                className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${isActive(item.path) || (item.subMenu && item.subMenu.some(s => isActive(s.path)))
                                    ? 'bg-[#00d094] text-white shadow-lg shadow-emerald-900/20'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={isActive(item.path) ? 'text-white' : 'text-[#00d094]/70'} />
                                    <span className="text-[13px] font-bold">{item.label}</span>
                                </div>
                                {item.subMenu && <ChevronDown size={14} className={`transition-transform duration-300 ${openSubMenu === item.id ? 'rotate-180' : ''}`} />}
                            </div>

                            {item.subMenu && openSubMenu === item.id && (
                                <div className="mt-2 mr-9 space-y-1 border-r border-white/10 pr-2">
                                    {item.subMenu.map((sub) => (
                                        <div
                                            key={sub.id}
                                            onClick={() => { navigate(sub.path); setIsSidebarOpen(false); }}
                                            className={`text-[12px] p-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition-all ${isActive(sub.path) ? 'text-[#00d094] font-bold bg-[#00d094]/5' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${isActive(sub.path) ? 'bg-[#00d094] scale-125' : 'bg-gray-600'}`} />
                                            {sub.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* --------------------------------------setting---------------------------------------------------- */}
                <div className={`fixed top-1/2 -translate-y-1/2 z-[70] transition-all duration-500 ${isSidebarOpen ? 'right-64' : 'right-0 md:right-64'}`}>
                    <div className="relative group">
                        {/* --- Floating Button --- */}
                        <button
                            onClick={() => toggleSubMenu('floating_settings')}
                            style={{ backgroundColor: 'var(--color-primary)' }}
                            className="flex items-center justify-center w-10 h-12 text-white rounded-l-full shadow-lg hover:w-14 transition-all duration-300 group"
                        >
                            <Settings size={22} className={`${openSubMenu === 'floating_settings' ? 'rotate-90' : 'animate-spin-slow'}`} />
                        </button>

                        {/* --- Floating Quick Menu --- */}
                        {openSubMenu === 'floating_settings' && (
                            <div
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-main)'
                                }}
                                className="absolute top-0 -right-60 lg:right-12 md:right-8 w-56 backdrop-blur-xl border shadow-2xl rounded-[2rem] p-3 animate-in slide-in-from-left-5 fade-in duration-300"
                            >
                                <p
                                    style={{ color: 'var(--color-primary)' }}
                                    className="text-[10px] font-black uppercase tracking-widest mb-3 px-3"
                                >
                                    Quick Actions
                                </p>

                                <div className="space-y-1">
                                    {setting[0].subMenu.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => { navigate(sub.path); setOpenSubMenu(null); }}
                                            style={{ '--hover-bg': 'var(--color-bg)' }}
                                            className="w-full flex items-center justify-between p-3 rounded-xl transition-all group/item hover:bg-[var(--hover-bg)]"
                                        >
                                            <span
                                                style={{ color: 'var(--color-text-main)' }}
                                                className="text-xs font-bold group-hover/item:text-[var(--color-primary)] transition-colors"
                                            >
                                                {sub.label}
                                            </span>

                                            <div
                                                style={{
                                                    backgroundColor: 'var(--color-text-muted)',
                                                    borderColor: 'var(--color-border)'
                                                }}
                                                className="w-1.5 h-1.5 rounded-full group-hover/item:bg-[var(--color-primary)] transition-all"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
            {/* ------------------------------------------------------------------------------------------ */}


            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 md:mr-64 flex flex-col min-h-screen overflow-x-hidden">

                {/* --- TOP NAVBAR (Fixed UI) --- */}
                <nav className="h-20 bg-themeSurface/70 backdrop-blur-md border border-transparent dark:border-themeBorder  shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-6 md:px-10 flex items-center justify-between sticky top-4 z-50 rounded-[2.5rem] mx-2 md:mx-4 transition-all">

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="flex items-center gap-5 cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                <div className="relative group/avatar">
                                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00d094] border-2 border-themeSurface rounded-full z-10 animate-pulse" />
                                    <Avatar src="https://i.pravatar.cc/150?u=a" className="w-11 h-11 border-2 border-emerald-100 shadow-sm" />
                                </div>
                                <div className="hidden sm:block text-right leading-tight">
                                    <p className="font-black text-sm text-themeText">محمد علی</p>
                                    <div className="flex items-center justify-end gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <p className="text-[10px] text-themeMuted font-bold uppercase">Super Admin</p>
                                    </div>
                                </div>
                            </div>
                            {isProfileOpen && (
                                <>
                                    {/* Overlay */}
                                    <div className="fixed inset-0 z-[998]" onClick={() => setIsProfileOpen(false)} />

                                    {/* Profile Dropdown Container */}
                                    <div className="absolute top-full right-0 mt-3 w-64 bg-gradient-to-b from-[#004d61] to-[#002a33] border border-white/10 shadow-2xl rounded-[2rem] z-[999] overflow-hidden p-2">

                                        <div className="space-y-1">
                                            {profileMenuItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => { navigate(item.path); setIsProfileOpen(false); }}
                                                    className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl text-white hover:bg-white/5 transition-all group"
                                                >
                                                    <item.icon size={20} className="text-gray-400 group-hover:text-[#00d094]" />
                                                    <span className="text-sm font-bold text-right flex-1 group-hover:text-[#00d094]">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Separator */}
                                        <div className="h-px bg-white/5 my-2 mx-3" />

                                        {/* Logout Button */}
                                        <button className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all group">
                                            <LogOut size={20} />
                                            <span className="text-sm font-bold text-right flex-1">لاگ آؤٹ</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <ThemeToggle />
                    </div>

                    <div className="flex items-center gap-4 flex-1 justify-end md:justify-center">
                        <div
                            className="
                                  hidden md:flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-300 group relative w-full max-w-md 
                                  bg-[var(--color-input)] border border-[var(--color-border)]
                                  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] 
                                  focus-within:max-w-lg focus-within:border-[var(--color-primary)] focus-within:bg-[var(--color-surface)] focus-within:shadow-md
                                  ">

                            <div className="flex-none transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                                <div className="group-focus-within:text-[var(--color-primary)]">
                                    <Search size={18} />
                                </div>
                            </div>

                            <kbd
                                style={{
                                    backgroundColor: 'var(--color-bg)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-muted)'
                                }}
                                className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase transition-opacity group-focus-within:opacity-0"
                            >
                                ⌘ K
                            </kbd>

                            <input
                                type="text"
                                placeholder="کچھ بھی تلاش کریں..."
                                style={{ color: 'var(--color-text-main)' }}
                                className="bg-transparent outline-none text-[13px] text-right font-medium flex-grow placeholder:text-[var(--color-text-muted)] focus:placeholder-transparent transition-all duration-300"
                            />
                        </div>

                        <div className="hidden lg:flex items-center gap-2">
                            <button className="p-2.5 text-themeMuted hover:bg-emerald-50/10 hover:text-[#00d094] rounded-xl relative transition-all">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-themeSurface" />
                            </button>
                            <button className="p-2.5 text-themeMuted hover:bg-emerald-50/10 hover:text-[#00d094] rounded-xl transition-all"><MessageSquare size={20} /></button>
                        </div>
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-3 bg-gradient-to-br from-[#004d61] to-[#003a49] text-white rounded-2xl">
                            <Menu size={20} />
                        </button>
                    </div>
                </nav>

                <main className="p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-[55] md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}
        </div>
    );
};