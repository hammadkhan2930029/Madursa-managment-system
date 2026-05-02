import React, { useState, useRef, useEffect } from "react";
import moment from "moment-hijri";
/* eslint-disable-next-line no-unused-vars */
import { motion } from "framer-motion";

export const HijriDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const ref = useRef();

  const startOfMonth = currentDate.clone().startOf("iMonth");
  const endOfMonth = currentDate.clone().endOf("iMonth");

  const daysInMonth = endOfMonth.iDate();
  const startDay = startOfMonth.day();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "iMonth"));
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "iMonth"));
  };

  const handleSelect = (day) => {
    const date = currentDate.clone().iDate(day);
    setSelectedDate(date.format("iD iMMMM iYYYY"));
    setShowCalendar(false);
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={"empty-" + i}></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected =
        selectedDate ===
        currentDate.clone().iDate(d).format("iD iMMMM iYYYY");

      days.push(
        <div
          key={d}
          onClick={() => handleSelect(d)}
          className={`p-1 text-center rounded-xl cursor-pointer 
          transition-all duration-200 ease-in-out
          hover:bg-[var(--color-primary)] hover:scale-105
          text-[var(--color-text-main)]
          ${
            isSelected
              ? "bg-[var(--color-primary)] text-[var(--color-text-main)] shadow-md scale-105"
              : " bg-[var(--color-surface)]"
          }`}
        >
          {d}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="relative w-64" ref={ref}>
      
      {/* Input */}
      <input
        type="text"
        value={selectedDate}
        onClick={() => setShowCalendar(!showCalendar)}
        placeholder="Select Islamic Date"
        readOnly
        className="w-full p-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Calendar Dropdown */}
      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute  top-12 left-0 w-full bg-[var(--color-bg)] shadow-2xl rounded-2xl p-4 z-50 border border-gray-200"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 px-1 ">

            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
            >
              ▶
            </button>

            <h3 className="text-md font-semibold tracking-wide">
              {currentDate.format("iMMMM iYYYY")}
            </h3>

            <button
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
            >
              ◀
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 text-xs text-center mb-2 text-gray-500 font-medium">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-2 text-center ">
            {renderDays()}
          </div>
        </motion.div>
      )}
    </div>
  );
};
