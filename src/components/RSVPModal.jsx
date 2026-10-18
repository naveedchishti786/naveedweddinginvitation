import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CheckCircle2, Heart, User, Mail, Phone, Users,
  MessageSquare, Loader2, Send, ExternalLink, AlertCircle, Clock, Edit3, RefreshCw
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { couple } from '../data/events';
import { useTheme } from '../context/ThemeContext';

const STORAGE_KEY = 'shaadi_rsvp_records_v1';
const LAST_EMAIL_KEY = 'shaadi_last_rsvp_email';

const getStoredRsvps = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveRsvpRecord = (email, eventId, data) => {
  try {
    const records = getStoredRsvps();
    const cleanEmail = email.toLowerCase().trim();
    if (!records[cleanEmail]) records[cleanEmail] = {};
    records[cleanEmail][eventId] = {
      ...data,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    localStorage.setItem(LAST_EMAIL_KEY, cleanEmail);
  } catch (err) {
    console.warn('Failed to save RSVP to localStorage:', err);
  }
};

const findExistingRsvp = (email, eventId) => {
  if (!email) return null;
  const records = getStoredRsvps();
  const cleanEmail = email.toLowerCase().trim();
  return records[cleanEmail]?.[eventId] || null;
};

export default function RSVPModal({ open, onClose, event }) {
  const { theme } = event;
  const { isDark } = useTheme();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    attending: 'yes',
    wishes: '',
  });
  const [existingRsvp, setExistingRsvp] = useState(null);
  const [wasUpdated, setWasUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);

  // Check on modal open if this device / email has already submitted for this event
  useEffect(() => {
    if (open) {
      const lastEmail = localStorage.getItem(LAST_EMAIL_KEY) || '';
      if (lastEmail) {
        const found = findExistingRsvp(lastEmail, event.id);
        if (found) {
          setExistingRsvp(found);
          setForm({
            name: found.name || '',
            email: found.email || lastEmail,
            phone: found.phone || '',
            guests: found.guests || '1',
            attending: found.attending || 'yes',
            wishes: found.wishes || '',
          });
          return;
        }
      }
      setExistingRsvp(null);
    }
  }, [open, event.id]);

  // Check dynamically when email changes
  const handleEmailChange = (val) => {
    setForm(f => ({ ...f, email: val }));
    const found = findExistingRsvp(val, event.id);
    if (found) {
      setExistingRsvp(found);
      // Automatically prefill previous responses so guest can edit them easily
      setForm(f => ({
        ...f,
        email: val,
        name: f.name || found.name || '',
        phone: f.phone || found.phone || '',
        guests: found.guests || f.guests,
        attending: found.attending || f.attending,
        wishes: f.wishes || found.wishes || '',
      }));
    } else {
      setExistingRsvp(null);
    }
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // WhatsApp pre-filled message
  const whatsappMessage = encodeURIComponent(
    `*Wedding RSVP ${existingRsvp ? '(Updated)' : ''} — Naveed weds Arfa*\n` +
    `• Ceremony: ${event.name} (${event.date})\n` +
    `• Guest Name: ${form.name || 'A Guest'}\n` +
    `• Status: ${form.attending === 'yes' ? '✅ Joyfully Attending' : '😔 Regretfully Declining'}\n` +
    `• Total Guests: ${form.guests}\n` +
    `• Phone: ${form.phone || 'N/A'}\n` +
    `• Email: ${form.email || 'N/A'}\n` +
    `• Wishes: ${form.wishes || 'May Allah bless this beautiful union!'}`
  );

  // Direct Gmail compose link
  const emailSubject = encodeURIComponent(
    `${existingRsvp ? '🔄 UPDATED RSVP' : '💍 New RSVP'}: ${event.name} — ${form.name}`
  );
  const emailBody = encodeURIComponent(
    `Assalam-o-Alaikum Naveed Bhai,\n\n` +
    `Here are my ${existingRsvp ? 'UPDATED ' : ''}RSVP details for ${event.name} (${event.date}):\n\n` +
    `• Name: ${form.name}\n` +
    `• Email: ${form.email}\n` +
    `• Phone: ${form.phone || 'N/A'}\n` +
    `• Attendance: ${form.attending === 'yes' ? 'Joyfully Attending' : 'Regretfully Declining'}\n` +
    `• Total Guests: ${form.guests}\n` +
    `• Status: ${existingRsvp ? 'UPDATED by Guest' : 'First Submission'}\n` +
    `• Heartfelt Message: ${form.wishes || 'May Allah bless Naveed & Arfa with a lifetime of happiness!'}\n\n` +
    `JazakAllah Khair!`
  );
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${couple.rsvpEmail}&su=${emailSubject}&body=${emailBody}`;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNeedsActivation(false);
    const isUpdateAction = Boolean(existingRsvp);

    // 1. Submit to FormSubmit AJAX endpoint connected to naveedchishti1997@gmail.com
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${couple.rsvpEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `${isUpdateAction ? '🔄 UPDATED RSVP' : '💍 New Shaadi RSVP'}: ${event.name} — ${form.name} (${form.attending === 'yes' ? form.guests + ' Guests' : 'Declining'})`,
          Event: event.name,
          Date: event.date,
          Submission_Type: isUpdateAction ? 'Updated Response' : 'New Response',
          Guest_Name: form.name,
          Guest_Email: form.email,
          Guest_Phone: form.phone || 'Not provided',
          Attendance: form.attending === 'yes' ? '✅ Joyfully Attending' : '❌ Regretfully Declining',
          Total_Guests: form.guests,
          Wishes: form.wishes || 'None',
          _template: 'table',
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (data && data.message && data.message.includes('Activation')) {
        setNeedsActivation(true);
      }
    } catch (err) {
      console.warn('FormSubmit endpoint notice:', err);
    }

    // 2. Submit to EmailJS if configured
    if (couple.emailjs?.serviceId && couple.emailjs?.templateId && couple.emailjs?.publicKey) {
      try {
        await emailjs.send(
          couple.emailjs.serviceId,
          couple.emailjs.templateId,
          {
            to_email: couple.rsvpEmail,
            event_name: event.name,
            event_date: event.date,
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            attendance: form.attending === 'yes' ? `Attending (${form.guests} Guests)` : 'Declining',
            guests: form.guests,
            message: form.wishes,
            is_update: isUpdateAction ? 'Yes' : 'No',
          },
          couple.emailjs.publicKey
        );
      } catch (err) {
        console.warn('EmailJS notice:', err);
      }
    }

    // Save/Update in localStorage
    saveRsvpRecord(form.email, event.id, form);
    setWasUpdated(isUpdateAction);
    setLoading(false);
    setDone(true);
  };

  const handleClose = () => {
    setDone(false);
    setNeedsActivation(false);
    setExistingRsvp(null);
    setForm({ name: '', email: '', phone: '', guests: '1', attending: 'yes', wishes: '' });
    onClose();
  };

  const inputStyle = {
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'}`,
    color: isDark ? 'white' : '#1a1612',
    borderRadius: '0.75rem',
    padding: '0.7rem 0.9rem 0.7rem 2.6rem',
    width: '100%',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'Jost, sans-serif',
    transition: 'border-color 0.2s',
  };
  const focusStyle = { borderColor: `${theme.accent}60` };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-bg"
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-md glass rounded-3xl overflow-hidden"
            style={{
              borderColor: `${theme.accent}25`,
              maxHeight: '92vh',
              overflowY: 'auto',
              background: isDark ? theme.dark : '#fffdf9',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
            />

            {/* Header */}
            <div
              className="px-6 pt-8 pb-5 text-center"
              style={{ background: `linear-gradient(180deg, ${theme.accent}10, transparent)` }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  color: isDark ? 'rgba(255,255,255,0.7)' : '#1a1612',
                }}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-5xl mb-3">{event.icon}</div>
              <div
                className="font-display font-semibold text-2xl mb-1"
                style={{ color: isDark ? '#ffffff' : '#1a1612' }}
              >
                {existingRsvp ? 'Update Your RSVP' : 'RSVP'}
              </div>
              <div className="font-body text-sm font-light" style={{ color: isDark ? `${theme.accent}cc` : '#8c680f' }}>
                {event.name} · {event.date}
              </div>
            </div>

            <div className="px-6 pb-8">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${theme.accent}15`, border: `1.5px solid ${theme.accent}50` }}
                  >
                    <CheckCircle2 className="w-10 h-10" style={{ color: theme.accent }} />
                  </motion.div>

                  <div
                    className="font-display text-2xl font-semibold mb-2"
                    style={{ color: isDark ? '#ffffff' : '#1a1612' }}
                  >
                    {wasUpdated ? 'RSVP Updated Successfully! 🔄' : 'JazakAllah Khair!'}
                  </div>

                  <p
                    className="font-body text-sm leading-relaxed mb-4"
                    style={{ color: isDark ? 'rgba(255,255,255,0.75)' : '#332a22' }}
                  >
                    {wasUpdated ? (
                      <>
                        Your updated response for <span style={{ color: theme.accent }} className="font-medium">{event.name}</span> ({form.attending === 'yes' ? `${form.guests} Guests` : 'Declined'}) has been updated and emailed to the host.
                      </>
                    ) : (
                      <>
                        Your RSVP for <span style={{ color: theme.accent }} className="font-medium">{event.name}</span> has been confirmed.
                      </>
                    )}
                  </p>

                  {/* Activation Notice (if first time) */}
                  {needsActivation && (
                    <div className="mb-5 p-3.5 rounded-xl text-left bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-body leading-relaxed">
                      <div className="font-medium flex items-center gap-1.5 mb-1 text-amber-300">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Form Activation Email Sent</span>
                      </div>
                      Please open your Gmail and click <em>"Activate Form"</em> once to receive RSVPs automatically!
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2.5">
                    {/* Send via WhatsApp */}
                    <a
                      href={`https://wa.me/923017601725?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-full text-xs font-medium uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-300 text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{wasUpdated ? 'Send Updated Copy via WhatsApp' : 'Send Copy via WhatsApp'}</span>
                    </a>

                    {/* Direct Gmail compose */}
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-full text-xs font-body font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Gmail App</span>
                    </a>

                    <button
                      onClick={handleClose}
                      className="w-full py-2.5 rounded-full text-xs font-body text-white/50 hover:text-white transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  {/* Already Submitted Alert Banner */}
                  {existingRsvp && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl text-left backdrop-blur-md"
                      style={{
                        background: 'rgba(245, 158, 11, 0.12)',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Already Submitted for {event.name}</span>
                        </span>
                        <span className="text-[10px] text-amber-200/60 font-mono">
                          {existingRsvp.submittedAt ? new Date(existingRsvp.submittedAt).toLocaleDateString() : 'Previously'}
                        </span>
                      </div>
                      <p
                        className="text-xs font-light leading-relaxed"
                        style={{ color: isDark ? 'rgba(255,255,255,0.85)' : '#332a22' }}
                      >
                        You previously submitted an RSVP ({existingRsvp.attending === 'yes' ? 'Joyfully Attending' : 'Declined'} · {existingRsvp.guests} {existingRsvp.guests === '1' ? 'Guest' : 'Guests'}).
                      </p>
                      <p className="text-[11px] text-amber-500 font-medium mt-1.5 flex items-center gap-1">
                        <Edit3 className="w-3 h-3" />
                        <span>Update your guest count, attendance or message below:</span>
                      </p>
                    </motion.div>
                  )}

                  {/* Attending toggle */}
                  <div
                    className="flex rounded-xl overflow-hidden"
                    style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}` }}
                  >
                    {[['yes', '✅ Joyfully Attending'], ['no', '😔 Regretfully Declining']].map(([v, l]) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => set('attending', v)}
                        className="flex-1 py-2.5 text-xs font-medium transition-all duration-300 font-body"
                        style={{
                          background: form.attending === v ? (theme.btnGradient || theme.accent) : 'transparent',
                          color: form.attending === v ? (theme.btnText || '#1a0e00') : (isDark ? 'rgba(255,255,255,0.45)' : '#665544'),
                          letterSpacing: '0.05em',
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  {/* Email Input (checked for duplicates) */}
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: theme.accent }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={form.email}
                      onChange={e => handleEmailChange(e.target.value)}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => (e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)')}
                    />
                  </div>

                  {/* Name Input */}
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: theme.accent }}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => (e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)')}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: theme.accent }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (+92...)"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => (e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)')}
                    />
                  </div>

                  {/* Guests dropdown */}
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.accent }} />
                    <select
                      value={form.guests}
                      onChange={e => set('guests', e.target.value)}
                      style={{
                        ...inputStyle,
                        appearance: 'none',
                        cursor: 'pointer',
                        background: isDark ? theme.dark : '#ffffff',
                        color: isDark ? '#ffffff' : '#1a1612',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option
                          key={n}
                          value={n}
                          style={{
                            background: isDark ? theme.dark : '#ffffff',
                            color: isDark ? '#ffffff' : '#1a1612',
                          }}
                        >
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Wishes & Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4" style={{ color: theme.accent }} />
                    <textarea
                      rows={3}
                      placeholder="Your heartfelt wishes & prayers for Naveed & Arfa..."
                      value={form.wishes}
                      onChange={e => set('wishes', e.target.value)}
                      style={{ ...inputStyle, paddingTop: '0.7rem', paddingLeft: '2.6rem', resize: 'none' }}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>

                  {/* Primary Submit / Update Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 text-sm rounded-full font-body font-medium uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: theme.btnGradient || `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                      color: theme.btnText || '#1a0e00',
                      boxShadow: `0 8px 32px ${theme.accent}40`,
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{existingRsvp ? 'Updating RSVP...' : 'Sending RSVP...'}</span>
                      </>
                    ) : (
                      <>
                        {existingRsvp ? (
                          <>
                            <RefreshCw className="w-4 h-4" />
                            <span>Update My RSVP</span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4 fill-current" />
                            <span>Confirm RSVP</span>
                          </>
                        )}
                      </>
                    )}
                  </motion.button>

                  {/* Quick WhatsApp RSVP Link */}
                  <div className="pt-1 text-center">
                    <a
                      href={`https://wa.me/923017601725?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>
                        {existingRsvp ? 'Or send updated RSVP via WhatsApp (+92 301 7601725) 💬' : 'Or RSVP directly via WhatsApp (+92 301 7601725) 💬'}
                      </span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
