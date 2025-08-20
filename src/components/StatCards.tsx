// src/components/StatCard.tsx
import React from 'react';
import '../styles/statcards.css'


type Delta = { value: string; direction: 'up' | 'down' | 'flat' };

export type StatCardProps = {
  icon?: string;
  label: string;
  value: string;
  delta?: Delta;
  hint?: string;
  className?: string;
  /** Optional entrance animation + stagger */
  animate?: boolean;
  delayMs?: number;
};

const StatCard: React.FC<StatCardProps> = ({
  icon = 'fas fa-circle',
  label,
  value,
  delta,
  hint,
  className,
  animate = true,
  delayMs = 0,
}) => {
  const dir = delta?.direction ?? 'flat';
  return (
    <div
      className={[
        'statcard',
        animate && 'animate-in',
        className,
      ].filter(Boolean).join(' ')}
      style={{ ['--delay' as any]: `${delayMs}ms` }}
    >
      <div className="statcard-head">
        <div className="statcard-icon"><i className={icon} aria-hidden="true" /></div>
        {delta && (
          <div className={`statcard-delta ${dir}`}>
            {dir === 'up' && <i className="fas fa-arrow-up" aria-hidden="true" />}
            {dir === 'down' && <i className="fas fa-arrow-down" aria-hidden="true" />}
            {dir === 'flat' && <i className="fas fa-minus" aria-hidden="true" />}
            <span>{delta.value}</span>
          </div>
        )}
      </div>

      <div className="statcard-body">
        <div className="statcard-value">{value}</div>
        <div className="statcard-label">{label}</div>
        {hint && <div className="statcard-hint">{hint}</div>}
      </div>
    </div>
  );
};

export default StatCard;
