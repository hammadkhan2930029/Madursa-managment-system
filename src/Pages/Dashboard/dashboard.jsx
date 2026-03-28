import React from 'react';
import { Grid, Paper } from '@mui/material';
import {
    UserPlus, Users, Calendar, Wallet, UserCheck,
    TrendingUp, BookOpen, Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const lineData = [{ name: 'ہفتہ', value: 80 }, { name: 'اتوار', value: 85 }, { name: 'پیر', value: 83 }, { name: 'منگل', value: 91 }, { name: 'بدھ', value: 88 }, { name: 'جمعرات', value: 89 }, { name: 'جمعہ', value: 95 }];
const pieData = [{ name: 'موصول', value: 75, color: '#00d094' }, { name: 'باقی', value: 25, color: '#e2e8f0' }];
//--------------------------------------------------------------------------------------------------------------

const StatCard = ({ title, value, subValue, icon: Icon, colorClass, borderClass, isIncome }) => (
    <div className={`p-6 rounded-[2rem] flex-1 min-w-[240px] bg-white border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>

        {/* Background Decorative Icon */}
        <div className={`absolute -right-4 -top-4 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
            <Icon size={80} />
        </div>

        <div className="flex justify-between items-start relative z-10">
            {/* Animated Icon Container */}
            <div className={`p-3 rounded-2xl shadow-sm ${colorClass} bg-gradient-to-br transition-transform group-hover:scale-110 duration-500`}>
                <Icon size={22} className="text-white" />
            </div>

            <div className="text-right">
                <p className="text-slate-400 text-[12px] mb-1 font-bold font-urdu tracking-widest uppercase">{title}</p>
                <h3 className={`font-black text-slate-800 tracking-tight ${isIncome ? 'text-lg' : 'text-2xl'}`}>
                    {value}
                </h3>
            </div>
        </div>

        {/* SubValue Section (Neeche waali detail) */}
        {subValue && (
            <div className="mt-4 pt-3 border-t border-slate-50 relative z-10">
                <p className="text-[11px] text-slate-400 font-medium font-urdu">{subValue}</p>
            </div>
        )}

        {/* Bottom Accent Line */}
        <div className={`absolute bottom-0 right-0 left-0 h-1.5 ${borderClass} opacity-80`} />
    </div>
);

//--------------------------------------------------------------------------------------------------------------

export const Dashboard = () => {
    return (
        <div className="w-full animate-in fade-in duration-700 font-urdu ">

            <div className="flex flex-wrap gap-5 mb-8 font-urdu" dir="rtl">
                <StatCard title="کل طالب علم" value="350" icon={Users} colorClass="bg-blue-500" borderClass="border-blue-500" />
                <StatCard title="کل اساتذہ" value="15" icon={UserCheck} colorClass="bg-teal-500" borderClass="border-teal-500" />
                <StatCard title="مجموعی فیس" value="PKR 1.7M" icon={Wallet} colorClass="bg-rose-500" borderClass="border-rose-500" />
            </div>


            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">


                    <div className="min-h-[450px] bg-white p-7 rounded-[2.5rem] shadow-lg border border-slate-100 flex flex-col justify-between  ">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-lg text-slate-500 font-black font-sans tracking-widest uppercase">
                                Monthly
                            </span>
                            <h3 className="font-black text-slate-700 text-lg font-urdu ">فیس کی مجموعی صورتحال</h3>
                        </div>


                        <div className="h-64 flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={75}
                                        outerRadius={95}
                                        paddingAngle={5}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-black text-slate-700 font-sans tracking-tight">75%</span>
                                <p className="text-[11px] text-emerald-500 font-black uppercase tracking-widest mt-1">موصول شدہ</p>
                            </div>
                        </div>


                        <div className="mt-8 space-y-4 pt-6 border-t border-slate-50">
                            <div className="flex justify-between items-center">
                                <span className="font-sans font-extrabold text-slate-700 text-base">PKR 1,320,000</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 font-bold text-sm text-right">موصول شدہ رقم</span>
                                    <div className="w-3 h-3 rounded-full bg-[#00d094] shadow-[0_0_10px_rgba(0,208,148,0.4)]" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-sans font-extrabold text-slate-700 text-base">PKR 380,000</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 font-bold text-sm text-right">باقی ماندہ رقم</span>
                                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white p-7 rounded-[2.5rem] shadow-lg border border-slate-100 flex flex-col min-h-[450px]">
                        <div className="flex justify-between items-center mb-10">
                            <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black font-sans tracking-tight border border-emerald-100/50">
                                91% ATTENDANCE RATE
                            </div>
                            <h3 className="font-black text-slate-700 text-lg">حاضری کا جائزہ</h3>
                        </div>


                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <CartesianGrid vertical={false} stroke="#f8fafc" strokeDasharray="4 4" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: '800' }}
                                        dy={15}
                                    />
                                    <YAxis hide domain={['auto', 'auto']} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ fontWeight: '900', color: '#00d094', fontSize: '14px' }}
                                        cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#00d094"
                                        strokeWidth={5}
                                        dot={{ r: 7, fill: '#00d094', strokeWidth: 4, stroke: '#fff' }}
                                        activeDot={{ r: 9, strokeWidth: 0, fill: '#004d61' }}
                                        animationDuration={2000}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>


                        <div className="mt-6 flex items-center justify-center gap-3 py-3 bg-slate-50/50 rounded-2xl">
                            <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">ہفتہ وار حاضری کی رپورٹ</span>
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-[11px] text-emerald-600 font-black uppercase">Active</span>
                        </div>
                    </div>

                </div>
            </div>
            {/* ---------------------------------------------- */}
            <div className="pt-6  min-h-screen font-urdu" dir="rtl">
                {/* Main Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* 1. Quick Actions Section (6 Columns on Large Screens) */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">کوئیک ایکشنز</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all gap-2 transform-gpu scale-100 hover:scale-105 hover:shadow-2xl hover:brightness-110 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                <UserPlus size={24} />
                                <span className="text-xs font-medium">نیا طالب علم</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl transition-all gap-2 transform-gpu scale-100 hover:scale-105 hover:shadow-2xl hover:brightness-110 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                <Users size={24} />
                                <span className="text-xs font-medium">نیا والدین</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl transition-all gap-2 transform-gpu scale-100 hover:scale-105 hover:shadow-2xl hover:brightness-110 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                <Calendar size={24} />
                                <span className="text-xs font-medium">حاضری لگائیں</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl transition-all gap-2 transform-gpu scale-100 hover:scale-105 hover:shadow-2xl hover:brightness-110 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                <Wallet size={24} />
                                <span className="text-xs font-medium">فیس جمع کریں</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. Activity/Timeline Card (Next to Quick Actions) */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">تازہ ترین سرگرمیاں</h3>
                            <button className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">تمام دیکھیں</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: "احمد رضا نے فیس جمع کروائی", amount: "PKR 4,500", time: "2 منٹ پہلے", color: "bg-blue-500" },
                                { title: "نیا طالب علم رجسٹر ہوا - محمد حمزہ", type: "نیا داخلہ", time: "15 منٹ پہلے", color: "bg-emerald-500" },
                                { title: "سٹاف کی تنخواہ - فروری 2026", amount: "PKR 85,000", time: "1 گھنٹہ پہلے", color: "bg-orange-500" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between px-6 py-3 hover:bg-slate-100 hover:shadow-lg rounded-full transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                                        <span className="text-sm text-slate-700">{item.title}</span>
                                    </div>
                                    <div className="text-left">
                                        {item.amount && <span className="text-xs font-bold text-slate-900 block">{item.amount}</span>}
                                        <span className="text-[10px] text-slate-400">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Bottom Row Stats Cards */}
                    {/* 3. Bottom Row Stats Cards */}
                    <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">

                        <StatCard
                            title="قابل ادائیگی"
                            value="PKR 250,000"

                            subValue="آج: 8 مکمل"
                            icon={BookOpen}
                            colorClass="bg-blue-500"
                            borderClass="bg-blue-500"
                        />

                        <StatCard
                            title="قابل وصولی"
                            value="PKR 38,000"
                            subValue="87% حاضری"
                            icon={Users}
                            colorClass="bg-emerald-500"
                            borderClass="bg-emerald-500"
                        />

                        <StatCard
                            title="کل خرچ"
                            value="PKR 33,000"
                            subValue="78% اوسط حاضری"
                            icon={TrendingUp}
                            colorClass="bg-indigo-500"
                            borderClass="bg-indigo-500"
                        />

                        <StatCard
                            title="کل آمدنی"
                            value="PKR 803,000"
                            subValue="اس مہینے 12% اضافہ"
                            icon={Wallet}
                            colorClass="bg-orange-500"
                            borderClass="bg-orange-500"
                            isIncome={true}
                        />
                    </div>

                </div>
            </div>

            {/* --------------------------------------------------------------- */}


        </div>
    );
};