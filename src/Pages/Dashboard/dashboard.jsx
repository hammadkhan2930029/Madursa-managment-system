import React from 'react';
import {
    UserPlus, Users, Calendar, Wallet, UserCheck,
    TrendingUp, BookOpen
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const lineData = [{ name: 'هفتہ', value: 80 }, { name: 'اتوار', value: 85 }, { name: 'پیر', value: 83 }, { name: 'منگل', value: 91 }, { name: 'بدھ', value: 88 }, { name: 'جمعرات', value: 89 }, { name: 'جمعہ', value: 95 }];
const pieData = [{ name: 'موصول', value: 75, color: '#00d094' }, { name: 'باقی', value: 25, color: 'var(--color-bg)' }];

const StatCard = ({ title, value, subValue, icon: Icon, colorClass, borderClass, isIncome }) => (
    <div
        style={{ boxShadow: 'var(--shadow-card)' }}
        className="p-6 hover:shadow-2xl rounded-[2rem] flex-1 min-w-[240px] bg-themeSurface border border-white/5 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
    >
        {/* Background Decorative Icon */}
        <div className="absolute -right-4 -top-4 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity text-themeText">
            <Icon size={80} />
        </div>

        <div className="flex justify-between items-start relative z-10">
            <div className={`p-3 rounded-2xl ${colorClass} bg-gradient-to-br transition-transform group-hover:scale-110 duration-500 shadow-lg shadow-current/20`}>
                <Icon size={22} className="text-white" />
            </div>

            <div className="text-right">
                <p className="text-themeMuted text-[12px] mb-1 font-bold font-urdu tracking-widest uppercase">{title}</p>
                <h3 className={`font-black text-themeText tracking-tight ${isIncome ? 'text-lg' : 'text-2xl'}`}>
                    {value}
                </h3>
            </div>
        </div>

        {subValue && (
            <div className="mt-4 pt-3 border-t border-white/5 relative z-10">
                <p className="text-[11px] text-themeMuted font-medium font-urdu">{subValue}</p>
            </div>
        )}

        {/* Bottom Accent Line */}
        <div className={`absolute bottom-0 right-0 left-0 h-1.5 ${borderClass} opacity-80`} />
    </div>
);

export const Dashboard = () => {
    return (
        <div className="w-full animate-in fade-in duration-700 font-urdu p-2 bg-themeBg min-h-screen text-themeText">

            {/* 1. Top Core Stats */}
            <div className="flex flex-wrap gap-6 mb-8" dir="rtl">
                <StatCard title="کل طالب علم" value="350" icon={Users} colorClass="bg-blue-500" borderClass="bg-blue-500" />
                <StatCard title="کل اساتذہ" value="15" icon={UserCheck} colorClass="bg-teal-500" borderClass="bg-teal-500" />
                <StatCard title="مجموعی فیس" value="PKR 1.7M" icon={Wallet} colorClass="bg-rose-500" borderClass="bg-rose-500" />
            </div>

            {/* 2. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" dir="rtl">
                <div
                    style={{ boxShadow: 'var(--shadow-card)' }}
                    className="min-h-[450px] bg-themeSurface p-8 rounded-[3rem]  border border-white/5 flex flex-col justify-between"
                >
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] bg-themeBg px-4 py-1.5 rounded-full text-themeMuted font-black tracking-widest uppercase border border-white/5">Monthly Overview</span>
                        <h3 className="font-black text-themeText text-lg">فیس کی مجموعی صورتحال</h3>
                    </div>
                    <div className="h-64 flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} innerRadius={80} outerRadius={100} paddingAngle={8} dataKey="value" startAngle={90} endAngle={450}>
                                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderRadius: '20px', border: 'none', boxShadow: 'var(--shadow-card)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-4xl font-black text-themeText tracking-tight">75%</span>
                            <p className="text-[11px] text-emerald-500 font-black uppercase mt-1">موصول شدہ</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="font-extrabold text-themeText text-base">PKR 1,320,000</span>
                        <div className="flex items-center gap-3">
                            <span className="text-themeMuted font-bold text-sm">موصول شدہ رقم</span>
                            <div className="w-3 h-3 rounded-full bg-[#00d094] shadow-[0_0_15px_rgba(0,208,148,0.5)]" />
                        </div>
                    </div>
                </div>

                
                <div
                    style={{ boxShadow: 'var(--shadow-card)' }}
                    className="bg-themeSurface p-8 rounded-[3rem] border border-white/5 flex flex-col min-h-[450px]"
                >
                     <div className="flex justify-between items-center mb-10">
                        <div className="bg-emerald-500/10 text-emerald-500 px-5 py-2 rounded-full text-[10px] font-black tracking-tight border border-emerald-500/20">91% ATTENDANCE</div>
                        <h3 className="font-black text-themeText text-lg">حاضری کا جائزہ</h3>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={lineData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 40 }} 
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke="var(--color-bg)"
                                strokeDasharray="8 8"
                                strokeOpacity={0.5}
                            />

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 13, fill: 'var(--color-text-muted)', fontWeight: '800' }}
                                dy={20} 
                                padding={{ left: 20, right: 20 }}
                            />

                            <YAxis hide domain={['auto', 'auto']} />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: 'var(--shadow-card)'
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#00d094"
                                strokeWidth={6}
                                dot={{ r: 6, fill: '#00d094', strokeWidth: 3, stroke: 'var(--color-surface)' }}
                                activeDot={{ r: 8, fill: '#00d094' }}
                                animationDuration={2500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 3. Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8" dir="rtl">
                <div
                    style={{ boxShadow: 'var(--shadow-card)' }}
                    className="lg:col-span-5 bg-themeSurface p-8 rounded-[3rem] border border-white/5 "
                >
                    <h3 className="text-lg font-bold text-themeText mb-6">کوئیک ایکشنز</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "نیا طالب علم", icon: UserPlus, bg: "bg-blue-600 shadow-blue-600/30" },
                            { label: "نیا والدین", icon: Users, bg: "bg-emerald-500 shadow-emerald-500/30" },
                            { label: "حاضری لگائیں", icon: Calendar, bg: "bg-indigo-500 shadow-indigo-500/30" },
                            { label: "فیس جمع کریں", icon: Wallet, bg: "bg-orange-500 shadow-orange-500/30" }
                        ].map((btn, i) => (
                            <button key={i} className={`flex flex-col items-center justify-center p-6 ${btn.bg} shadow-lg hover:shadow-2xl text-white rounded-3xl transition-all hover:scale-105 active:scale-95`}>
                                <btn.icon size={26} />
                                <span className="text-xs font-bold mt-2">{btn.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    style={{ boxShadow: 'var(--shadow-card)' }}
                    className="lg:col-span-7 bg-themeSurface p-8 rounded-[3rem] border border-white/5"
                >
                    <h3 className="text-lg font-bold text-themeText mb-6">تازہ ترین سرگرمیاں</h3>
                    <div className="space-y-3">
                        {[
                            { title: "احمد رضا نے فیس جمع کروائی", amount: "PKR 4,500", time: "2 منٹ پہلے", color: "bg-blue-500" },
                            { title: "نیا طالب علم رجسٹر ہوا", amount: "داخلہ مکمل", time: "15 منٹ پہلے", color: "bg-emerald-500" }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-5 bg-themeBg/40 hover:bg-themeBg rounded-full transition-all border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-current/40`} />
                                    <span className="text-sm font-bold text-themeText">{item.title}</span>
                                </div>
                                <div className="text-left">
                                    <span className="text-xs font-black text-themeText block">{item.amount}</span>
                                    <span className="text-[10px] text-themeMuted">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Bottom Financial Cards */}
            <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
                <StatCard title="قابل ادائیگی" value="PKR 250,000" subValue="آج: 8 مکمل" icon={BookOpen} colorClass="bg-blue-500" borderClass="bg-blue-500" />
                <StatCard title="قابل وصولی" value="PKR 38,000" subValue="87% حاضری" icon={Users} colorClass="bg-emerald-500" borderClass="bg-emerald-500" />
                <StatCard title="کل خرچ" value="PKR 33,000" subValue="78% اوسط حاضری" icon={TrendingUp} colorClass="bg-indigo-500" borderClass="bg-indigo-500" />
                <StatCard title="کل آمدنی" value="PKR 803,000" subValue="اس مہینے 12% اضافہ" icon={Wallet} colorClass="bg-orange-500" borderClass="bg-orange-500" isIncome={true} />
            </div>

        </div>
    );
};