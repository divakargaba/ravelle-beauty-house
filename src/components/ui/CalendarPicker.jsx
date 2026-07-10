import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM',
];

function toDateString(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isDateDisabled(year, month, day, blockedDates) {
  const date = new Date(year, month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Past dates
  if (date < today) return true;
  // Sundays
  if (date.getDay() === 0) return true;
  // Blocked dates
  if (blockedDates.includes(toDateString(year, month, day))) return true;

  return false;
}

export default function CalendarPicker({ selectedDate, selectedTime, onDateChange, onTimeChange, blockedDates = [], blockedTimes = {}, dateError, timeError }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days = [];

    // Empty slots for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  }, [viewMonth, viewYear]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth <= today.getMonth();

  const handleDateClick = (day) => {
    if (!day) return;
    if (isDateDisabled(viewYear, viewMonth, day, blockedDates)) return;
    const dateStr = toDateString(viewYear, viewMonth, day);
    onDateChange(dateStr);
    // Clear time when date changes
    onTimeChange('');
  };

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <div>
        <label className="block text-text-light/60 text-sm mb-2">Preferred Date *</label>
        <div className="bg-primary/50 border border-gold/20 rounded-xl p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              disabled={isPrevDisabled}
              className="p-1.5 rounded-lg hover:bg-gold/10 text-text-light/60 hover:text-gold transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-heading text-text-light text-lg">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-gold/10 text-text-light/60 hover:text-gold transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-text-light/30 text-xs font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) {
                return <div key={`empty-${i}`} />;
              }

              const dateStr = toDateString(viewYear, viewMonth, day);
              const disabled = isDateDisabled(viewYear, viewMonth, day, blockedDates);
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === toDateString(today.getFullYear(), today.getMonth(), today.getDate());

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDateClick(day)}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm transition-all
                    ${disabled
                      ? 'text-text-light/15 cursor-not-allowed'
                      : isSelected
                        ? 'bg-gold text-primary font-semibold'
                        : isToday
                          ? 'border border-gold/40 text-gold hover:bg-gold/10'
                          : 'text-text-light/70 hover:bg-gold/10 hover:text-gold'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        {dateError && <p className="text-red-400 text-xs mt-1">{dateError}</p>}
      </div>

      {/* Time Slots */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="block text-text-light/60 text-sm mb-2">Preferred Time *</label>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => {
                const isTimeBlocked = (blockedTimes[selectedDate] || []).includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isTimeBlocked}
                    onClick={() => onTimeChange(slot)}
                    className={`
                      px-3 py-2 rounded-lg text-sm transition-all
                      ${isTimeBlocked
                        ? 'text-text-light/15 cursor-not-allowed border border-text-light/10'
                        : selectedTime === slot
                          ? 'bg-gold text-primary font-semibold'
                          : 'border border-gold/20 text-text-light/60 hover:border-gold/40 hover:text-gold'
                      }
                    `}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            {timeError && <p className="text-red-400 text-xs mt-1">{timeError}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
