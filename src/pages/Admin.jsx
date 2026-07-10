import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toDateString(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function AdminCalendar({ year, month, blockedDates, onToggle, loading }) {
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
          const isBlocked = blockedDates.includes(dateStr);

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
              disabled={loading === dateStr}
              onClick={() => onToggle(dateStr, isBlocked)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm transition-all relative
                ${loading === dateStr ? 'opacity-50' : ''}
                ${isSunday
                  ? 'text-text-light/20 cursor-default'
                  : isBlocked
                    ? 'bg-red-500/20 text-red-400 line-through border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'
                }
              `}
            >
              {day}
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
  const [toggleLoading, setToggleLoading] = useState(null);

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
        .then((data) => setBlockedDates(data.blockedDates || []))
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

  const handleToggle = async (dateStr, currentlyBlocked) => {
    setToggleLoading(dateStr);
    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          date: dateStr,
          action: currentlyBlocked ? 'unblock' : 'block',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBlockedDates(data.blockedDates || []);
      }
    } catch {
      // Silently fail — state stays unchanged
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

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl text-text-light mb-2">
              Manage <span className="gold-text-gradient">Availability</span>
            </h1>
            <p className="text-text-light/40 text-sm">
              Click any date to block or unblock it. Sundays are always off. Blocked dates appear in red.
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
              onToggle={handleToggle}
              loading={toggleLoading}
            />
            <AdminCalendar
              year={nextYearVal}
              month={nextMonthVal}
              blockedDates={blockedDates}
              onToggle={handleToggle}
              loading={toggleLoading}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
