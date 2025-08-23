import React from 'react';
import '../styles/appointments.css';

export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled' ;

export type AppointmentItem = {
  id: string;
  patientFullName: string;
  timeLabel: string;         // e.g. "9:00 AM"
  title: string;             // e.g. "Regular Checkup"
  status: AppointmentStatus;
  avatarUrl?: string;        // optional image
  initials?: string;         // fallback initials (auto-generated if not provided)
  onClick?: () => void;      // optional row click
};

export type AppointmentsProps = {
  items: AppointmentItem[];
  onViewAll?: () => void;
  className?: string;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0]?.toUpperCase() ?? '').join('');
}

function statusClass(s: AppointmentStatus) {
  switch (s) {
    case 'confirmed': return 'status-confirmed';
    case 'pending':   return 'status-pending';
    case 'completed': return 'status-completed';
    case 'cancelled': return 'status-cancelled';
  }
}

const Appointments: React.FC<AppointmentsProps> = ({ items, onViewAll, className }) => {
  return (
    <div className={['card', className].filter(Boolean).join(' ')}>
      <div className="card-header">
        <h3 className="card-title">Today&apos;s Appointments</h3>
        <button className="view-all" type="button" onClick={onViewAll}>View All</button>
      </div>

      <div className="appointment-list" id="apptList">
        {items.length === 0 && (
          <div className="appointment-empty">No appointments for today.</div>
        )}

        {items.map((it, idx) => {
          const initials = it.initials || getInitials(it.patientFullName);
          const cls = statusClass(it.status);
          return (
            <button
              key={it.id}
              type="button"
              className="appointment-item animate-in"
              style={{ ['--delay' as any]: `${idx * 70}ms` }}
              onClick={it.onClick}
              aria-label={`${it.patientFullName}, ${it.timeLabel} — ${it.title}`}
            >
              <div className="patient-avatar" aria-hidden="true">
                {it.avatarUrl
                  ? <img src={it.avatarUrl} alt="" />
                  : <span>{initials}</span>}
              </div>

              <div className="appointment-info">
                <div className="patient-name">{it.patientFullName}</div>
                <div className="appointment-time">
                  <span className="appt-time">{it.timeLabel}</span>
                  <span className="dot">•</span>
                  <span className="appt-title">{it.title}</span>
                </div>
              </div>

              <div className={`appointment-status ${cls}`}>
                <span className="status-dot" aria-hidden="true"></span>
                <span className="status-text">
                  {it.status.charAt(0).toUpperCase() + it.status.slice(1)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Appointments;
