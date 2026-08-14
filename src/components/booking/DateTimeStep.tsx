'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// Types
// ============================================================

interface DateTimeStepProps {
  selectedDate: string | null;
  selectedTimeSlot: string | null;
  onDateChange: (date: string) => void;
  onTimeSlotChange: (slot: string) => void;
  onNext: () => void;
}

// ============================================================
// Time Slots
// ============================================================

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '8:00 AM - 10:00 AM', startHour: 8 },
  { id: 'mid-morning', label: 'Mid-Morning', time: '10:00 AM - 12:00 PM', startHour: 10 },
  { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 2:00 PM', startHour: 12 },
  { id: 'mid-afternoon', label: 'Mid-Afternoon', time: '2:00 PM - 4:00 PM', startHour: 14 },
  { id: 'late-afternoon', label: 'Late Afternoon', time: '4:00 PM - 6:00 PM', startHour: 16 },
] as const;

// ============================================================
// Date Helpers
// ============================================================

function getToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function getMinDate(): Date {
  const min = new Date();
  min.setHours(min.getHours() + 24);
  min.setHours(0, 0, 0, 0);
  // If adding 24h still lands on today, push to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  if (min < tomorrow) {
    return tomorrow;
  }
  return min;
}

function getMaxDate(): Date {
  const max = new Date();
  max.setDate(max.getDate() + 90);
  max.setHours(0, 0, 0, 0);
  return max;
}

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

// ============================================================
// Calendar Component
// ============================================================

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const today = getToday();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const minDate = useMemo(() => getMinDate(), []);
  const maxDate = useMemo(() => getMaxDate(), []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const canGoPrev = useMemo(() => {
    const prevMonth = new Date(viewYear, viewMonth, 1);
    const minMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    return prevMonth > minMonth;
  }, [viewYear, viewMonth, minDate]);

  const canGoNext = useMemo(() => {
    const nextMonth = new Date(viewYear, viewMonth + 1, 1);
    const maxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
    return nextMonth <= maxMonth;
  }, [viewYear, viewMonth, maxDate]);

  const goToPrevMonth = useCallback(() => {
    if (!canGoPrev) return;
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, [canGoPrev]);

  const goToNextMonth = useCallback(() => {
    if (!canGoNext) return;
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, [canGoNext]);

  const isDateDisabled = useCallback(
    (day: number): boolean => {
      const date = new Date(viewYear, viewMonth, day);
      date.setHours(0, 0, 0, 0);
      return date < minDate || date > maxDate;
    },
    [viewYear, viewMonth, minDate, maxDate]
  );

  const isDateSelected = useCallback(
    (day: number): boolean => {
      if (!selectedDate) return false;
      const date = new Date(viewYear, viewMonth, day);
      const selected = new Date(selectedDate + 'T00:00:00');
      return isSameDay(date, selected);
    },
    [selectedDate, viewYear, viewMonth]
  );

  const isToday = useCallback(
    (day: number): boolean => {
      const date = new Date(viewYear, viewMonth, day);
      return isSameDay(date, today);
    },
    [viewYear, viewMonth, today]
  );

  const handleDayClick = useCallback(
    (day: number) => {
      if (isDateDisabled(day)) return;
      const date = new Date(viewYear, viewMonth, day);
      onSelectDate(toISODate(date));
    },
    [viewYear, viewMonth, isDateDisabled, onSelectDate]
  );

  // Build calendar grid cells
  const calendarCells = useMemo(() => {
    const cells: (number | null)[] = [];
    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }
    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }
    return cells;
  }, [firstDay, daysInMonth]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="text-lg font-semibold text-white">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <button
          type="button"
          onClick={goToNextMonth}
          disabled={!canGoNext}
          className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarCells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-10" />;
          }

          const disabled = isDateDisabled(day);
          const selected = isDateSelected(day);
          const todayMark = isToday(day);

          return (
            <motion.button
              key={`day-${day}`}
              type="button"
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              className={`
                relative h-10 w-full rounded-lg text-sm font-medium transition-colors
                min-h-[44px] flex items-center justify-center
                ${disabled
                  ? 'text-gray-700 cursor-not-allowed bg-transparent'
                  : selected
                    ? 'bg-accent-500 text-white shadow-glow-sm'
                    : 'text-gray-300 hover:bg-white/5 cursor-pointer'
                }
                ${todayMark && !selected ? 'ring-1 ring-accent-500/50' : ''}
              `}
              whileHover={!disabled && !selected ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}${disabled ? ' (unavailable)' : ''}${selected ? ' (selected)' : ''}`}
              aria-pressed={selected}
            >
              {selected && (
                <motion.div
                  layoutId="selected-date"
                  className="absolute inset-0 bg-accent-500 rounded-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className={`relative z-10 ${selected ? 'text-white' : ''}`}>
                {day}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// DateTimeStep Component
// ============================================================

export default function DateTimeStep({
  selectedDate,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotChange,
  onNext,
}: DateTimeStepProps) {
  const [error, setError] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch available slots when date changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots(new Set());
      return;
    }

    setLoadingSlots(true);
    fetch(`/api/available-slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.availableSlots) {
          // The API returns available hour strings like "8:00 AM", "2:00 PM"
          // Convert to 24-hour format to match our slot startHour values
          const availableHours = new Set(
            data.availableSlots.map((s: string) => {
              const match = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
              if (!match) return -1;
              let h = parseInt(match[1], 10);
              const period = match[3].toUpperCase();
              if (period === 'PM' && h !== 12) h += 12;
              if (period === 'AM' && h === 12) h = 0;
              return h;
            })
          );
          const booked = new Set<string>();
          TIME_SLOTS.forEach((slot) => {
            // A slot is booked if its start hour is NOT in available hours
            if (!availableHours.has(slot.startHour)) {
              booked.add(slot.id);
            }
          });
          setBookedSlots(booked);
        }
      })
      .catch(() => {
        // On error, assume all slots are available
        setBookedSlots(new Set());
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const handleDateSelect = useCallback(
    (date: string) => {
      onDateChange(date);
      setError(null);
    },
    [onDateChange]
  );

  const handleTimeSlotSelect = useCallback(
    (slot: string) => {
      onTimeSlotChange(slot);
      setError(null);
    },
    [onTimeSlotChange]
  );

  const handleNext = useCallback(() => {
    if (!selectedDate && !selectedTimeSlot) {
      setError('Please select a date and time slot to continue.');
      return;
    }
    if (!selectedDate) {
      setError('Please select a preferred date.');
      return;
    }
    if (!selectedTimeSlot) {
      setError('Please select a time slot.');
      return;
    }
    setError(null);
    onNext();
  }, [selectedDate, selectedTimeSlot, onNext]);

  return (
    <div className="flex flex-col py-6">
      <h2 className="text-2xl font-display font-bold text-center text-white mb-2">
        Elige Fecha y Hora
      </h2>
      <p className="text-gray-400 text-center text-sm mb-8">
        Select your preferred date and time for the appointment
      </p>

      {/* Calendar */}
      <div className="mb-8">
        <Calendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
      </div>

      {/* Time Slots */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Horarios Disponibles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-lg mx-auto">
              {loadingSlots ? (
                <div className="col-span-full text-center py-4">
                  <div className="w-6 h-6 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-gray-500 text-xs mt-2">Verificando disponibilidad...</p>
                </div>
              ) : (
                TIME_SLOTS.map((slot, index) => {
                  const isSelected = selectedTimeSlot === slot.id;
                  const isBooked = bookedSlots.has(slot.id);
                  return (
                    <motion.button
                      key={slot.id}
                      type="button"
                      onClick={() => !isBooked && handleTimeSlotSelect(slot.id)}
                      disabled={isBooked}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className={`
                        relative p-4 rounded-xl border-2 text-left transition-all min-h-[44px]
                        ${isBooked
                          ? 'border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed'
                          : isSelected
                            ? 'border-accent-500 bg-accent-500/10 shadow-glow-sm'
                            : 'border-white/10 hover:border-accent-500/50 hover:bg-white/5'
                        }
                      `}
                      whileHover={!isBooked ? { scale: 1.02 } : {}}
                      whileTap={!isBooked ? { scale: 0.98 } : {}}
                      aria-pressed={isSelected}
                      aria-disabled={isBooked}
                      aria-label={`${slot.label}: ${slot.time}${isBooked ? ' (unavailable)' : ''}${isSelected ? ' (selected)' : ''}`}
                    >
                      {isSelected && !isBooked && (
                        <motion.div
                          layoutId="selected-time"
                          className="absolute inset-0 border-2 border-accent-500 rounded-xl"
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      )}
                      <div className="relative z-10">
                        <p className={`text-sm font-semibold ${isBooked ? 'text-gray-600 line-through' : isSelected ? 'text-accent-400' : 'text-white'}`}>
                          {slot.label}
                        </p>
                        <p className={`text-xs mt-0.5 ${isBooked ? 'text-gray-700' : isSelected ? 'text-accent-400/80' : 'text-gray-500'}`}>
                          {isBooked ? 'No disponible' : slot.time}
                        </p>
                      </div>
                      {isSelected && !isBooked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          className="absolute top-2 right-2 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-red-400 text-sm text-center mb-4"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <div className="flex justify-center mt-4">
        <motion.button
          type="button"
          onClick={handleNext}
          className="px-8 py-3 rounded-lg bg-accent-500 text-white font-medium text-sm hover:bg-accent-600 transition-colors shadow-md min-h-[44px] min-w-[44px]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Continuar
        </motion.button>
      </div>
    </div>
  );
}

