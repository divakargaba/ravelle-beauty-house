import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

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

function AdminCalendar({ year, month, blockedDates, blockedTimes, onDateClick, selectedDate, loading }) {
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [year, month]);

  const today = new Date();

  return (
    <div className="bg-primary/50 border border-gold/20 rounded-xl p-4">
      <h3 className="font-heading text-text-light text-lg text-center mb-4">
        {MONTHS[month]} {year}
      </h3>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-text-light/30 text-xs font-medium py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;

          const dateStr = toDateString(year, month, day);
          const date = new Date(year, month, day);
          const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isSunday = date.getDay() === 0;
          const isFullyBlocked = blockedDates.includes(dateStr);
          const hasBlockedTimes = blockedTimes[dateStr] && blockedTimes[dateStr].length > 0;
          const isSelected = selectedDate === dateStr;

          if (isPast) {
            return (
              <div key={day} className="aspect-square flex items-center justify-center rounded-lg text-sm text-text-light/15">
                {day}
              </div>
            );
          }

          return (
            <button
              key={day}
              type="button"
              disabled={isSunday}
              onClick={() => !isSunday && onDateClick(dateStr)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm transition-all relative
                ${isSunday
                  ? 'text-text-light/20 cursor-default'
                  : isSelected
                    ? 'bg-gold text-primary font-semibold ring-2 ring-gold/50'
                    : isFullyBlocked
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                      : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'
                }
              `}
            >
              {day}
              {hasBlockedTimes && !isFullyBlocked && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]);
  const [blockedTimes, setBlockedTimes] = useState({});
  const [toggleLoading, setToggleLoading] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  // Second month for the two-month view
  const nextMonthVal = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextYearVal = viewMonth === 11 ? viewYear + 1 : viewYear;

  useEffect(() => {
    if (authenticated) {
      fetch('/api/availability')
        .then((res) => res.json())
        .then((data) => {
          setBlockedDates(data.blockedDates || []);
          setBlockedTimes(data.blockedTimes || {});
        })
        .catch(() => {});
    }
  }, [authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      // Verify password by attempting a no-op POST
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, date: '2000-01-01', action: 'unblock' }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDateClick = (dateStr) => {
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  const handleToggleDay = async (dateStr) => {
    const isBlocked = blockedDates.includes(dateStr);
    setToggleLoading('day');
    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          date: dateStr,
          action: isBlocked ? 'unblock' : 'block',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBlockedDates(data.blockedDates || []);
        setBlockedTimes(data.blockedTimes || {});
      }
    } catch {
      // Silently fail
    } finally {
      setToggleLoading(null);
    }
  };

  const handleToggleTime = async (dateStr, time) => {
    const slotsForDate = blockedTimes[dateStr] || [];
    const isBlocked = slotsForDate.includes(time);
    setToggleLoading(time);
    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          date: dateStr,
          time,
          action: isBlocked ? 'unblock' : 'block',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBlockedDates(data.blockedDates || []);
        setBlockedTimes(data.blockedTimes || {});
      }
    } catch {
      // Silently fail
    } finally {
      setToggleLoading(null);
    }
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth <= today.getMonth();

  if (!authenticated) {
    return (
      <PageTransition>
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-heading text-2xl text-text-light">Admin Access</h1>
              <p className="text-text-light/40 text-sm mt-1">Enter your password to manage availability</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                placeholder="Password"
                className="w-full bg-primary/50 border border-gold/20 rounded-xl px-4 py-3 text-text-light text-sm placeholder:text-text-light/30 focus:outline-none focus:border-gold/50 transition-colors"
                autoFocus
              />
              {authError && <p className="text-red-400 text-xs">{authError}</p>}
              <button
                type="submit"
                disabled={authLoading || !password}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3 text-primary font-medium hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
              </button>
            </form>
          </motion.div>
        </section>
      </PageTransition>
    );
  }

  const isSelectedFullyBlocked = selectedDate && blockedDates.includes(selectedDate);
  const selectedDateBlockedTimes = selectedDate ? (blockedTimes[selectedDate] || []) : [];

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl text-text-light mb-2">
              Manage <span className="gold-text-gradient">Availability</span>
            </h1>
            <p className="text-text-light/40 text-sm">
              Click any date to manage its time slots. Sundays are always off.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-6 text-xs text-text-light/50">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gold/10 border border-gold/20" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30" /> Blocked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-primary/50" /> Sunday / Past
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Partial
            </span>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={prevMonth}
              disabled={isPrevDisabled}
              className="p-2 rounded-lg hover:bg-gold/10 text-text-light/60 hover:text-gold transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-text-light/60 text-sm font-medium min-w-[120px] text-center">
              Navigate Months
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gold/10 text-text-light/60 hover:text-gold transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Two-month calendar grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <AdminCalendar
              year={viewYear}
              month={viewMonth}
              blockedDates={blockedDates}
              blockedTimes={blockedTimes}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
              loading={toggleLoading}
            />
            <AdminCalendar
              year={nextYearVal}
              month={nextMonthVal}
              blockedDates={blockedDates}
              blockedTimes={blockedTimes}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
              loading={toggleLoading}
            />
          </div>

          {/* Time Slot Management Panel */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 bg-primary/50 border border-gold/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-text-light text-lg">
                      Time Slots for <span className="text-gold">{selectedDate}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedDate(null)}
                      className="p-1.5 rounded-lg hover:bg-gold/10 text-text-light/40 hover:text-gold transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Block/Unblock Entire Day Button */}
                  <div className="mb-4">
                    <button
                      type="button"
                      disabled={toggleLoading === 'day'}
                      onClick={() => handleToggleDay(selectedDate)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                        ${isSelectedFullyBlocked
                          ? 'bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20'
                          : 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                        }
                        ${toggleLoading === 'day' ? 'opacity-50' : ''}
                      `}
                    >
                      {toggleLoading === 'day' && <Loader2 className="w-3 h-3 animate-spin" />}
                      {isSelectedFullyBlocked ? 'Unblock Entire Day' : 'Block Entire Day'}
                    </button>
                  </div>

                  {isSelectedFullyBlocked ? (
                    <p className="text-red-400/60 text-sm">
                      This entire day is blocked. Unblock it to manage individual time slots.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const isBlocked = selectedDateBlockedTimes.includes(slot);
                        const isLoading = toggleLoading === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleToggleTime(selectedDate, slot)}
                            className={`
                              px-3 py-2 rounded-lg text-sm transition-all
                              ${isLoading ? 'opacity-50' : ''}
                              ${isBlocked
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                                : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'
                              }
                            `}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
