import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Printer, User, Phone, Wallet, Search, X, FileText } from 'lucide-react';
import { DateField, InputField } from '../../../../Components/HR/FormElements';
import { useNotificationBridge } from '../../../../Components/Notifications/useNotificationBridge';
import { getFundCollections } from '../../../../Constant/FundCollectionsApi';
import { AppImages } from '../../../../Constant/AppImages';
import { getAdminSession, getApiAssetUrl } from '../../../../Constant/AdminAuth';
import { printFundReceipt } from '../../../../Utils/FundReceiptPrint';

const formatAmount = (value) => Number(value || 0).toLocaleString('en-US');

const formatDate = (value) => {
    if (!value) return '---';
    return new Date(value).toLocaleDateString('ur-PK');
};

const buildQuery = ({ searchTerm, startDate, endDate }) => {
    const params = new URLSearchParams({ page: '1', limit: '100' });
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (startDate) params.set('fromDate', startDate);
    if (endDate) params.set('toDate', endDate);
    return params.toString();
};

export const FundList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [funds, setFunds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFund, setSelectedFund] = useState(null);
    const [error, setError] = useState('');

    useNotificationBridge({ error });

    const totalAmount = useMemo(
        () => funds.reduce((sum, fund) => sum + Number(fund.amount || 0), 0),
        [funds]
    );

    const loadFunds = async () => {
        try {
            setIsLoading(true);
            setError('');
            const data = await getFundCollections(buildQuery({ searchTerm, startDate, endDate }));
            setFunds(data.items || []);
        } catch (err) {
            setError(err?.message || 'عطیات کی فہرست لوڈ نہیں ہو سکی۔');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadFunds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePrint = (fund) => {
        const printWindow = window.open('', '_blank');
        const session = getAdminSession();
        const madrassaProfile = session?.madrassaProfile || {};
        const madrassaName = madrassaProfile.name || 'دارالعلوم المحمدیہ';
        const profileLogo = madrassaProfile.logoUrl ? getApiAssetUrl(madrassaProfile.logoUrl) : '';
        const receiptLogo = profileLogo || new URL(AppImages.logo, window.location.origin).toString();

        printWindow.document.write(`
            <html dir="rtl">
                <head>
                    <title>رسید</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');
                        @page { size: A5; margin: 0; }
                        body { margin: 0; -webkit-print-color-adjust: exact; }
                        .urdu-font { font-family: 'Noto Nastaliq Urdu', serif; }
                    </style>
                </head>
                <body class="bg-gray-100">
                    <div class="w-[148mm] min-h-[210mm] mx-auto bg-white p-8 relative overflow-hidden">
                        <img src="${receiptLogo}" alt="مدرسہ لوگو" class="absolute inset-0 m-auto w-64 opacity-5 -rotate-12" />
                        <div class="relative z-10 text-center border-b-2 border-green-700 pb-4 mb-5">
                            <img src="${receiptLogo}" alt="مدرسہ لوگو" class="w-16 h-16 object-contain mx-auto mb-2" />
                            <h1 class="urdu-font text-2xl font-bold text-green-800">${madrassaName}</h1>
                            <span class="urdu-font text-xs bg-green-700 text-white px-4 py-2 rounded-full inline-block mt-2">الیکٹرانک رسیدِ عطیات</span>
                        </div>
                        <div class="relative z-10 grid grid-cols-2 gap-3 urdu-font text-sm">
                            <div class="border p-3 rounded-lg"><span class="text-green-700">نام دہندہ:</span> <b>${fund.donorName || '---'}</b></div>
                            <div class="border p-3 rounded-lg"><span class="text-green-700">رابطہ نمبر:</span> <b dir="ltr">${fund.phone || '---'}</b></div>
                            <div class="border p-3 rounded-lg"><span class="text-green-700">ولدیت:</span> <b>${fund.careOf || '---'}</b></div>
                            <div class="border p-3 rounded-lg"><span class="text-green-700">تاریخ:</span> <b>${formatDate(fund.paymentDate)}</b></div>
                            <div class="border p-3 rounded-lg"><span class="text-green-700">عطیہ کی قسم:</span> <b>${fund.donationType || '---'}</b></div>
                            <div class="border p-3 rounded-lg"><span class="text-green-700">ذیلی قسم:</span> <b>${fund.donationSubType || '---'}</b></div>
                            <div class="border p-3 rounded-lg"><span class="text-green-700">ادائیگی:</span> <b>${fund.paymentMode || '---'}</b></div>
                            <div class="border p-3 rounded-lg"><span class="text-green-700">رسید نمبر:</span> <b>${fund.receiptNo || '---'}</b></div>
                            <div class="border p-3 rounded-lg col-span-2"><span class="text-green-700">مقصد:</span> <b>${fund.purpose || '---'}</b></div>
                            <div class="border p-3 rounded-lg col-span-2"><span class="text-green-700">تفصیل:</span> <b>${fund.details || fund.remarks || '---'}</b></div>
                            <div class="border p-4 rounded-lg col-span-2 bg-green-50 text-center text-xl">
                                <span class="text-green-800">رقم:</span> <b>${formatAmount(fund.amount)}/-</b>
                            </div>
                        </div>
                        <div class="relative z-10 mt-10 flex justify-between urdu-font text-sm">
                            <span>دستخط دہندہ: __________________</span>
                            <span>دستخط وصول کنندہ: __________________</span>
                        </div>
                    </div>
                    <script>
                        window.onload = () => {
                            window.print();
                            window.onafterprint = () => window.close();
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handleGroupedPrint = async (fund) => {
        try {
            setError('');
            const groupId = fund.collectionGroupId || `FG-${fund.id}`;
            const data = await getFundCollections(`collectionGroupId=${encodeURIComponent(groupId)}&page=1&limit=100`);
            const receiptFunds = data.items?.length ? data.items : [fund];
            printFundReceipt({
                collectionGroupId: groupId,
                funds: receiptFunds,
                donorInfo: {
                    name: fund.donorName,
                    careOf: fund.careOf,
                    number: fund.phone,
                },
            });
        } catch (err) {
            setError(err?.message || 'رسید پرنٹ نہیں ہو سکی۔');
        }
    };

    return (
        <div className="min-h-screen p-3 md:p-6 font-urdu bg-[var(--color-bg)] text-[var(--color-text-main)] transition-colors duration-300" dir="rtl">

            <div className="mb-6 flex flex-col gap-5 pb-6 px-4 md:px-6 py-5 rounded-[1.5rem] md:rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-[var(--color-primary)]">عطیات کی فہرست</h1>
                    <div className="flex flex-wrap gap-2 justify-end">
                        <span className="text-[10px] md:text-sm px-5 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)]">
                            کل ریکارڈ: {funds.length}
                        </span>
                        <span className="text-[10px] md:text-sm px-5 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)]">
                            کل رقم: {formatAmount(totalAmount)}/-
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-3">
                    <div className="relative w-full lg:flex-grow">

                        <InputField
                            type="text"
                            placeholder="نام، رابطہ نمبر، مقصد یا رسید نمبر..."
                            className="w-full pr-10 pl-4 py-3 rounded-xl focus:outline-none border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text-main)] focus:border-[var(--color-primary)] transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row items-center gap-2 w-full lg:w-auto">
                        <div className="flex-1 lg:flex-none">
                            <DateField
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="شروع"
                                size="sm"
                            />
                        </div>
                        <span className="text-[var(--color-text-muted)] text-[10px] font-bold">تا</span>
                        <div className="flex-1 lg:flex-none">
                            <DateField
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="اختتام"
                                size="sm"
                            />
                        </div>
                    </div>

                    <button onClick={loadFunds} disabled={isLoading} className="w-full lg:w-[220px] px-8 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-[14px] bg-[var(--color-primary)] text-[#0b1120] hover:bg-[var(--color-primary-hover)] disabled:opacity-60 disabled:cursor-not-allowed">
                        {isLoading ? 'لوڈ ہو رہا ہے...' : 'تلاش کریں'}
                    </button>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {funds.map((fund) => (
                    <div key={fund.id} className="rounded-2xl p-4 md:p-5 shadow-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all group relative overflow-hidden">

                        <div className="absolute top-0 left-0 px-3 py-1 text-[9px] md:text-[10px] rounded-br-xl font-mono bg-[var(--color-primary)] text-[#0b1120] font-bold">
                            {formatDate(fund.paymentDate)}
                        </div>

                        <div className="flex justify-between items-start mb-4 mt-5">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 md:p-3 rounded-xl bg-[var(--color-input)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[#0b1120] transition-colors">
                                    <User size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-[var(--color-text-main)] leading-tight">{fund.donorName || '---'}</h3>
                                    <p className="text-[10px] text-[var(--color-text-muted)] mt-1 font-mono">رسید: {fund.receiptNo || `#${fund.id}`}</p>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-lg text-[9px] md:text-[10px] font-bold border border-[var(--color-primary)] text-[var(--color-primary)] whitespace-nowrap">
                                {fund.donationSubType || fund.donationType || '---'}
                            </span>
                        </div>

                        <div className="space-y-3 p-3 rounded-xl mb-5 border border-[var(--color-border)] bg-[var(--color-bg)]">
                            <div className="flex justify-between items-center text-xs md:text-sm">
                                <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                                    <Phone size={14} /> رابطہ:
                                </span>
                                <span className="text-[var(--color-text-main)] font-semibold" dir="ltr">{fund.phone || '---'}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm border-t border-[var(--color-border)] pt-2">
                                <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                                    <FileText size={14} /> قسم:
                                </span>
                                <span className="text-[var(--color-text-main)] font-semibold">{fund.donationType || '---'}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs md:text-sm border-t border-[var(--color-border)] pt-2">
                                <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                                    <Wallet size={14} /> رقم:
                                </span>
                                <span className="text-[var(--color-primary)] font-extrabold text-base md:text-lg">{formatAmount(fund.amount)}/-</span>
                            </div>
                        </div>

                        <div className="flex gap-2 md:gap-3">
                            <button onClick={() => setSelectedFund(fund)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-[11px] md:text-xs border border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-text-main)] active:bg-[var(--color-border)]">
                                <Eye size={16} />
                                <span>تفصیل</span>
                            </button>
                            <button onClick={() => handleGroupedPrint(fund)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all text-[11px] md:text-xs font-bold bg-[var(--color-primary)] text-[#0b1120] active:opacity-80 shadow-md">
                                <Printer size={16} />
                                <span>پرنٹ</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isLoading && (
                <div className="text-center py-10 text-[var(--color-text-muted)]">
                    فہرست لوڈ ہو رہی ہے...
                </div>
            )}

            {!isLoading && funds.length === 0 && (
                <div className="text-center py-10 text-[var(--color-text-muted)]">
                    کوئی ریکارڈ نہیں ملا
                </div>
            )}

            {selectedFund && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-4">
                            <h2 className="text-xl font-bold text-[var(--color-primary)]">عطیہ کی تفصیل</h2>
                            <button onClick={() => setSelectedFund(null)} className="p-2 rounded-lg bg-[var(--color-input)] text-[var(--color-text-main)]">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <DetailItem label="نام دہندہ" value={selectedFund.donorName} />
                            <DetailItem label="رابطہ نمبر" value={selectedFund.phone} dir="ltr" />
                            <DetailItem label="ولدیت / ولد" value={selectedFund.careOf} />
                            <DetailItem label="ادائیگی کا طریقہ" value={selectedFund.paymentMode} />
                            <DetailItem label="عطیہ کی قسم" value={selectedFund.donationType} />
                            <DetailItem label="ذیلی قسم" value={selectedFund.donationSubType} />
                            <DetailItem label="مقصد" value={selectedFund.purpose} />
                            <DetailItem label="رسید نمبر" value={selectedFund.receiptNo} />
                            <DetailItem label="تاریخ" value={formatDate(selectedFund.paymentDate)} />
                            <DetailItem label="رقم" value={`${formatAmount(selectedFund.amount)}/-`} />
                            <div className="sm:col-span-2">
                                <DetailItem label="تفصیل" value={selectedFund.details || selectedFund.remarks} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const DetailItem = ({ label, value, dir }) => (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
        <p className="text-xs text-[var(--color-text-muted)] mb-1">{label}</p>
        <p dir={dir} className="font-bold text-[var(--color-text-main)]">{value || '---'}</p>
    </div>
);
