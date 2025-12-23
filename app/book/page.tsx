'use client';

import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

// Cloud Function URL for availability check
const AVAILABILITY_API = 'https://us-central1-javelin-63cd4.cloudfunctions.net/getAvailableSlots';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp, getDoc, doc } from 'firebase/firestore';

// Get the next 2 Saturdays from today
function getNextSaturdays(): Date[] {
  const saturdays: Date[] = [];
  const today = new Date();
  let current = new Date(today);

  // Find the next Saturday
  while (current.getDay() !== 6) {
    current.setDate(current.getDate() + 1);
  }

  // If today is Saturday and it's still morning, include today
  if (today.getDay() === 6 && today.getHours() < 12) {
    saturdays.push(new Date(current));
    current.setDate(current.getDate() + 7);
    saturdays.push(new Date(current));
  } else {
    // Add this Saturday (or next if today is Saturday afternoon+)
    if (today.getDay() === 6) {
      current.setDate(current.getDate() + 7);
    }
    saturdays.push(new Date(current));
    current.setDate(current.getDate() + 7);
    saturdays.push(new Date(current));
  }

  return saturdays;
}

// Time slots available
const TIME_SLOTS = [
  { time: '8:00 AM', value: '08:00' },
  { time: '10:00 AM', value: '10:00' },
  { time: '12:00 PM', value: '12:00' },
  { time: '2:00 PM', value: '14:00' },
  { time: '4:00 PM', value: '16:00' },
  { time: '6:00 PM', value: '18:00' },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function BookEstimate() {
  const saturdays = useMemo(() => getNextSaturdays(), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  // Slot availability from Google Calendar
  const [slotAvailability, setSlotAvailability] = useState<Record<string, boolean>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch availability when date is selected
  useEffect(() => {
    if (!selectedDate) {
      setSlotAvailability({});
      return;
    }

    const fetchAvailability = async () => {
      setLoadingSlots(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`${AVAILABILITY_API}?date=${dateStr}`);
        const data = await response.json();

        // Convert slots array to availability map
        const availability: Record<string, boolean> = {};
        data.slots?.forEach((slot: { value: string; available: boolean }) => {
          availability[slot.value] = slot.available;
        });
        setSlotAvailability(availability);
      } catch (error) {
        console.error('Error fetching availability:', error);
        // Default all slots to available on error
        const defaultAvailability: Record<string, boolean> = {};
        TIME_SLOTS.forEach(slot => {
          defaultAvailability[slot.value] = true;
        });
        setSlotAvailability(defaultAvailability);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const isSlotAvailable = (timeValue: string): boolean => {
    // If we haven't loaded availability yet, assume available
    if (Object.keys(slotAvailability).length === 0) return true;
    return slotAvailability[timeValue] ?? true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time for your estimate.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the scheduled datetime by combining date and time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const scheduledDateTime = new Date(selectedDate);
      scheduledDateTime.setHours(hours, minutes, 0, 0);

      // Prepare the estimate document matching the Firestore schema
      const estimateData = {
        // Format: "Customer Name - Property Address" (matches dashboard)
        jobs: `${formData.name} - ${formData.address}`,
        phone: formData.phone,
        performed: false,
        signed: false,
        source: 'website' as const,
        scheduledDateTime: Timestamp.fromDate(scheduledDateTime),
        email: formData.email,
        createdAt: Timestamp.now(),
        message: formData.message || '',
      };

      // Write to Firestore
      console.log('Attempting to write to Firestore...', estimateData);
      const docRef = await addDoc(collection(db, 'estimates'), estimateData);
      console.log('Document written with ID:', docRef.id);

      // Verify the document was written by reading it back
      const docSnap = await getDoc(doc(db, 'estimates', docRef.id));
      if (docSnap.exists()) {
        console.log('Document verified! Data:', docSnap.data());
      } else {
        console.error('Document NOT FOUND after write!');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setIsSubmitting(false);
      alert('There was an error booking your estimate. Please try again or call us at (417) 849-0332.');
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Estimate Booked!</h1>
            <p className="text-gray-600 text-lg mb-2">
              Your estimate is scheduled for:
            </p>
            <p className="text-2xl font-semibold text-[#9D2235] mb-6">
              {selectedDate && formatDate(selectedDate)} at {TIME_SLOTS.find(s => s.value === selectedTime)?.time}
            </p>
            <p className="text-gray-600 mb-8">
              Expect a call from an associate the day before to confirm your booking.
              We&apos;ll send a confirmation email to <strong>{formData.email}</strong>.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#9D2235] text-white px-8 py-4 font-medium hover:bg-[#7a1a2a] transition-colors"
            >
              Return to Homepage
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
              Schedule Your Visit
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              Book a Free Estimate
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a Saturday that works for you. Our estimates take about 90 minutes,
              and we&apos;ll provide a detailed quote on the spot.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#9D2235] text-white rounded-full flex items-center justify-center text-sm">1</span>
                Select a Date
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {saturdays.map((saturday, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSelectedDate(saturday);
                      setSelectedTime(null); // Reset time when date changes
                    }}
                    className={`p-6 border-2 text-left transition-all ${
                      selectedDate?.toDateString() === saturday.toDateString()
                        ? 'border-[#9D2235] bg-[#9D2235]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-sm text-gray-500 mb-1">
                      {index === 0 ? 'This Saturday' : 'Next Saturday'}
                    </div>
                    <div className="text-lg font-semibold">{formatDate(saturday)}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Select Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mb-10 transition-opacity ${!selectedDate ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#9D2235] text-white rounded-full flex items-center justify-center text-sm">2</span>
                Select a Time
                {selectedDate && (
                  <span className="text-sm font-normal text-gray-500">
                    ({formatDateShort(selectedDate)})
                  </span>
                )}
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {loadingSlots ? (
                  // Loading skeleton
                  TIME_SLOTS.map((slot) => (
                    <div
                      key={slot.value}
                      className="p-4 border-2 border-gray-100 bg-gray-50 text-center animate-pulse"
                    >
                      <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                    </div>
                  ))
                ) : (
                  TIME_SLOTS.map((slot) => {
                    const available = isSlotAvailable(slot.value);
                    return (
                      <motion.button
                        key={slot.value}
                        type="button"
                        disabled={!available}
                        onClick={() => setSelectedTime(slot.value)}
                        className={`p-4 border-2 text-center transition-all ${
                          !available
                            ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                            : selectedTime === slot.value
                            ? 'border-[#9D2235] bg-[#9D2235]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        whileHover={available ? { scale: 1.05 } : {}}
                        whileTap={available ? { scale: 0.95 } : {}}
                      >
                        <div className="font-medium">{slot.time}</div>
                        {!available && <div className="text-xs text-gray-400 mt-1">Booked</div>}
                      </motion.button>
                    );
                  })
                )}
              </div>
            </motion.div>

            {/* Step 3: Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mb-10 transition-opacity ${!selectedTime ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#9D2235] text-white rounded-full flex items-center justify-center text-sm">3</span>
                Your Information
              </h2>

              <div className="bg-gray-50 p-6 border border-gray-200 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">Property Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                    placeholder="123 Main St, Fayetteville, AR"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">Tell us about your project</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors resize-none"
                    placeholder="Describe what you're looking to have painted (interior, exterior, rooms, etc.)..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Summary & Submit */}
            {selectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#9D2235]/5 border border-[#9D2235]/20 p-6 mb-6"
              >
                <h3 className="font-bold mb-2">Your Estimate Appointment</h3>
                <p className="text-gray-600">
                  <span className="font-medium text-black">{formatDate(selectedDate)}</span> at{' '}
                  <span className="font-medium text-black">
                    {TIME_SLOTS.find(s => s.value === selectedTime)?.time}
                  </span>{' '}
                  (Central Time)
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Duration: ~90 minutes • We&apos;ll call you the day before to confirm
                </p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={!selectedDate || !selectedTime || isSubmitting}
              className={`w-full py-4 font-medium tracking-wide transition-colors ${
                selectedDate && selectedTime && !isSubmitting
                  ? 'bg-[#9D2235] text-white hover:bg-[#7a1a2a]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selectedDate && selectedTime && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={selectedDate && selectedTime && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Booking...
                </span>
              ) : (
                'BOOK FREE ESTIMATE'
              )}
            </motion.button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By booking, you agree to receive communications from Pintura Co.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Navigation Component (simplified for this page)
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          PINTURA<span className="text-[#9D2235]">.</span>
        </Link>

        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </nav>
  );
}

// Footer Component (simplified for this page)
function Footer() {
  return (
    <footer className="py-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-3xl font-bold tracking-tight">
            PINTURA<span className="text-[#9D2235]">.</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Pintura Co. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>(417) 849-0332</span>
            <span>•</span>
            <span>info@pinturaco.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
