import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import {
  getStudentProfileById,
  initializeStudentProfiles,
  subscribeToStudentProfiles,
} from '../../../Constant/StudentProfiles';

const InfoGrid = ({ items, columns = 'md:grid-cols-2 lg:grid-cols-3' }) => (
  <div className={`grid grid-cols-1 ${columns} gap-4`}>
    {items.map((item) => (
      <div key={item.label} className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[1.5rem] p-4">
        <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">{item.label}</p>
        <p className="text-sm font-bold text-[var(--color-text-main)] mt-2">{item.value || '---'}</p>
      </div>
    ))}
  </div>
);

const SectionCard = ({
  title,
  icon,
  children,
  className = '',
  collapsible = false,
  isOpen = true,
  onToggle,
}) => {
  const header = (
    <div className="flex items-center gap-3 text-[var(--color-primary)]">
      <div className="p-3 rounded-2xl bg-[var(--color-primary)]/10">
        {React.createElement(icon, { size: 22 })}
      </div>
      <h2 className="text-xl font-black text-[var(--color-text-main)] flex-1">{title}</h2>
      {collapsible ? (
        <ChevronDown
          size={20}
          className={`text-[var(--color-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      ) : null}
    </div>
  );

  return (
    <section className={`bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] shadow-sm p-6 md:p-8 ${isOpen ? 'space-y-5' : ''} ${className}`}>
      {collapsible ? (
        <button type="button" onClick={onToggle} className="w-full text-right">
          {header}
        </button>
      ) : (
        header
      )}
      {(!collapsible || isOpen) ? children : null}
    </section>
  );
};

const getAttendanceTone = (status) => {
  if (status === 'Hazir') return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
  if (status === 'Leave') return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
  return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
};

const getAttendanceChartData = (attendance) => ([
  { name: 'حاضر', value: attendance.present, color: '#10b981' },
  { name: 'غیر حاضر', value: attendance.absent, color: '#f43f5e' },
  { name: 'رخصت', value: attendance.leave, color: '#f59e0b' },
]).filter((item) => item.value > 0);

const AttendanceChartCard = ({ attendance, attendanceChartData }) => (
  <SectionCard title="حاضری چارٹ" icon={CalendarDays}>
    <div className="bg-[var(--color-bg)] rounded-[2rem] border border-[var(--color-border)] p-5 flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">Attendance Overview</p>
          <h3 className="text-lg font-black text-[var(--color-text-main)] mt-2">حاضری کا تناسب</h3>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl font-black">
          {attendance.percentage}%
        </div>
      </div>

      <div className="h-44 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={attendanceChartData}
              dataKey="value"
              nameKey="name"
              innerRadius={44}
              outerRadius={68}
              paddingAngle={4}
              stroke="transparent"
            >
              {attendanceChartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-2">
        {attendanceChartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-bold text-[var(--color-text-main)]">{item.name}</span>
            </div>
            <span className="text-sm font-black text-[var(--color-text-muted)]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </SectionCard>
);

export const StudentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [, setStoreVersion] = useState(0);
  const [openAttendanceDate, setOpenAttendanceDate] = useState(null);
  const [openSections, setOpenSections] = useState({
    personal: false,
    contact: false,
    education: false,
    health: false,
    attendance: true,
  });
  const student = getStudentProfileById(id);

  useEffect(() => {
    initializeStudentProfiles();
    window.scrollTo(0, 0);
    const unsubscribe = subscribeToStudentProfiles(() => {
      setStoreVersion((currentVersion) => currentVersion + 1);
    });
    return unsubscribe;
  }, [id]);

  if (!student) {
    return (
      <div className="max-w-5xl mx-auto p-6" dir="rtl">
        <div className="bg-[var(--color-surface)] rounded-[2.5rem] border border-[var(--color-border)] p-12 text-center">
          <h1 className="text-2xl font-black text-[var(--color-text-main)]">طالب علم کا پروفائل نہیں ملا</h1>
          <button
            onClick={() => navigate('/students/list')}
            className="mt-6 px-6 py-3 rounded-2xl bg-[var(--color-primary)] text-[#0b1120] font-bold"
          >
            واپس فہرست پر جائیں
          </button>
        </div>
      </div>
    );
  }

  const attendance = student.attendance;
  const attendanceChartData = getAttendanceChartData(attendance);
  const toggleSection = (sectionKey) => {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [sectionKey]: !currentSections[sectionKey],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 bg-[var(--color-bg)] min-h-screen" dir="rtl">
      <div className="bg-[var(--color-surface)] rounded-[2.8rem] border border-[var(--color-border)] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img
            src={student.image}
            alt={student.personal.fullName}
            className="w-32 h-32 rounded-[2rem] object-cover border-4 border-[var(--color-primary)]/20"
          />

          <div className="flex-1 text-center md:text-right space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[11px] font-black text-[var(--color-text-muted)] uppercase tracking-[0.25em]">Student Profile</p>
                <h1 className="text-3xl md:text-4xl font-black text-[var(--color-text-main)] mt-2">{student.personal.fullName}</h1>
                <p className="text-sm font-bold text-[var(--color-text-muted)] mt-4">
                  ولدیت:  {student.personal.fatherName}
                </p>
                <p className="text-sm font-bold text-[var(--color-text-muted)] mt-4">
                  رول نمبر: {student.classInfo.rollNo}
                </p>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="self-center md:self-start flex items-center gap-2 px-5 py-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-main)] font-bold"
              >
                <ArrowRight size={18} /> واپس
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-[var(--color-bg)] rounded-[1.8rem] p-4 border border-[var(--color-border)]">
                <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">Admission No</p>
                <p className="text-lg font-black text-[var(--color-primary)] mt-2">{student.admission.idNo}</p>
              </div>
              <div className="bg-[var(--color-bg)] rounded-[1.8rem] p-4 border border-[var(--color-border)]">
                <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">Class</p>
                <p className="text-lg font-black text-[var(--color-text-main)] mt-2">{student.classInfo.className}</p>
              </div>
              <div className="bg-[var(--color-bg)] rounded-[1.8rem] p-4 border border-[var(--color-border)]">
                <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">Section</p>
                <p className="text-lg font-black text-[var(--color-text-main)] mt-2">{student.classInfo.section}</p>
              </div>
              <div className="bg-[var(--color-bg)] rounded-[1.8rem] p-4 border border-[var(--color-border)]">
                <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase">Attendance</p>
                <p className="text-lg font-black text-emerald-500 mt-2">{attendance.percentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.35fr)_320px] gap-6 items-start">
        <SectionCard title="کلاس اور داخلہ" icon={GraduationCap}>
          <InfoGrid
            columns="md:grid-cols-2 lg:grid-cols-3"
            items={[
              { label: 'کیمپس', value: student.classInfo.campus },
              { label: 'کلاس', value: student.classInfo.className },
              { label: 'سیکشن', value: student.classInfo.section },
              { label: 'جماعت', value: student.education.requiredJamaat },
              { label: 'استاد', value: student.education.teacherName },
              { label: 'فیملی نمبر', value: student.classInfo.familyNo },
              { label: 'تاریخ داخلہ', value: student.admission.admissionDate },
              { label: 'داخلہ فیس', value: student.admission.admissionFee },
              { label: 'ماہانہ فیس', value: student.admission.monthlyFee },
            ]}
          />
        </SectionCard>

        <AttendanceChartCard attendance={attendance} attendanceChartData={attendanceChartData} />
      </div>

      <SectionCard
        title="بنیادی معلومات"
        icon={User}
        collapsible
        isOpen={openSections.personal}
        onToggle={() => toggleSection('personal')}
      >
        <InfoGrid
          items={[
            { label: 'نام طالب علم', value: student.personal.fullName },
            { label: 'والد کا نام', value: student.personal.fatherName },
            { label: 'قومیت / ذات', value: student.personal.caste },
            { label: 'شناختی کارڈ', value: student.personal.cnic },
            { label: 'ب فارم', value: student.personal.bForm },
            { label: 'تاریخ پیدائش', value: student.personal.dob },
            { label: 'بیماری', value: student.personal.medicalCondition },
            { label: 'رہائشی', value: student.admission.reside },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="رابطہ اور والدین"
        icon={Users}
        collapsible
        isOpen={openSections.contact}
        onToggle={() => toggleSection('contact')}
      >
        <InfoGrid
          items={[
            { label: 'حالیہ پتہ', value: student.contact.currentAddress },
            { label: 'مستقل پتہ', value: student.contact.permanentAddress },
            { label: 'ضلع', value: student.contact.district },
            { label: 'والد کا پیشہ', value: student.contact.fatherOccupation },
            { label: 'موبائل', value: student.contact.mobile },
            { label: 'واٹس ایپ', value: student.contact.whatsapp },
            { label: 'سرپرست', value: student.guardian.guardianName },
            { label: 'رشتہ', value: student.guardian.relation },
            { label: 'سرپرست موبائل', value: student.guardian.guardianMobile },
            { label: 'سرپرست ای میل', value: student.guardian.guardianEmail },
            { label: 'سرپرست CNIC', value: student.guardian.guardianCnic },
          ]}
          columns="md:grid-cols-2 lg:grid-cols-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.parents.map((parent) => (
            <div key={parent.role} className="bg-[var(--color-bg)] rounded-[1.8rem] border border-[var(--color-border)] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[var(--color-text-main)]">{parent.role}</h3>
                <span className="text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full text-xs font-bold">
                  Parent
                </span>
              </div>
              <p className="mt-4 text-base font-bold text-[var(--color-text-main)]">{parent.name}</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{parent.phone}</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{parent.occupation}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="تعلیمی ریکارڈ"
        icon={BookOpen}
        collapsible
        isOpen={openSections.education}
        onToggle={() => toggleSection('education')}
      >
        <InfoGrid
          items={[
            { label: 'دینی تعلیم', value: student.education.religiousEdu },
            { label: 'عصری تعلیم', value: student.education.secularEdu },
            { label: 'سابقہ مدرسہ', value: student.education.prevMadrassa },
            { label: 'سابقہ اسکول', value: student.education.prevSchool },
            { label: 'مطلوبہ درجہ', value: student.education.requiredClass },
            { label: 'استاد', value: student.education.teacherName },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="حاضری کی تفصیل"
        icon={CalendarDays}
        collapsible
        isOpen={openSections.attendance}
        onToggle={() => toggleSection('attendance')}
      >
        <div className="rounded-[2rem] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
          <div className="px-5 py-4 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
            <p className="text-[11px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">Attendance Details</p>
            <p className="text-sm font-bold text-[var(--color-text-main)] mt-2">کسی بھی تاریخ پر کلک کریں اور اس دن کی حاضری کی تفصیل دیکھیں</p>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {attendance.records.map((record) => {
              const isOpen = openAttendanceDate === record.date;
              return (
                <div key={record.date} className="bg-[var(--color-surface)]">
                  <button
                    type="button"
                    onClick={() => setOpenAttendanceDate(isOpen ? null : record.date)}
                    className="w-full px-5 py-4 text-right flex flex-col md:flex-row md:items-center gap-3 md:gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4 md:min-w-[220px]">
                      <div className="font-bold text-[var(--color-text-main)]">{record.date}</div>
                      <ChevronDown
                        size={18}
                        className={`text-[var(--color-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                    <div className="md:flex-1 md:flex md:items-center md:justify-between gap-4">
                      <span className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-black ${getAttendanceTone(record.status)}`}>
                        {record.status === 'Hazir' ? 'حاضر' : record.status === 'Leave' ? 'رخصت' : 'غیر حاضر'}
                      </span>
                      <span className="text-sm font-medium text-[var(--color-text-muted)] md:text-left">
                        {isOpen ? 'تفصیل چھپائیں' : 'تفصیل دیکھیں'}
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[1.5rem] p-4 md:p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">تاریخ</p>
                          <p className="mt-2 text-sm font-bold text-[var(--color-text-main)]">{record.date}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">حیثیت</p>
                          <div className="mt-2">
                            <span className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-black ${getAttendanceTone(record.status)}`}>
                              {record.status === 'Hazir' ? 'حاضر' : record.status === 'Leave' ? 'رخصت' : 'غیر حاضر'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">نوٹ</p>
                          <p className="mt-2 text-sm font-medium text-[var(--color-text-main)]">{record.note || 'کوئی نوٹ موجود نہیں'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="سرپرستی اور صحت"
        icon={ShieldCheck}
        collapsible
        isOpen={openSections.health}
        onToggle={() => toggleSection('health')}
      >
        <InfoGrid
          items={[
            { label: 'سرپرست نام', value: student.guardian.guardianName },
            { label: 'رشتہ', value: student.guardian.relation },
            { label: 'سرپرست فون', value: student.guardian.guardianMobile },
            { label: 'سرپرست ای میل', value: student.guardian.guardianEmail },
            { label: 'طبی حالت', value: student.personal.medicalCondition },
            { label: 'ہاسٹل / رہائش', value: student.admission.reside },
          ]}
        />
      </SectionCard>
    </div>
  );
};
