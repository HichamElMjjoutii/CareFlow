import React from "react";
import "../styles/quickActions.css";

export type ActionToMake = {
  id?: string;
  label: string;
  description?: string;
  icon?: string;     // e.g. "fas fa-plus"
  href?: string;     // if provided, renders as <a>
  onClick?: () => void;
};

export type QuickActionsProps = {
  title?: string;
  actions: ActionToMake[];
  columns?: 1 | 2 | 3; // responsive grid hint
  className?: string;
};

const QuickActions: React.FC<QuickActionsProps> = ({
  title = "Quick Actions",
  actions,
  columns = 1,
  className,
}) => {
  return (
    <div className={["card", className].filter(Boolean).join(" ")}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div
        className="quick-actions"
        style={
          { ["--qa-cols" as any]: columns } as React.CSSProperties
        }
      >
        {actions.map((a, idx) => {
          const content = (
            <>
              <div className="action-icon" aria-hidden="true">
                <i className={a.icon ?? "fas fa-bolt"} />
              </div>
              <div className="action-text">
                <h4>{a.label}</h4>
                {a.description && <p>{a.description}</p>}
              </div>
            </>
          );

          const commonProps = {
            className: "action-btn animate-in",
            style: { ["--delay" as any]: `${idx * 70}ms` },
            "data-action": a.label,
          };

          return a.href ? (
            <a
              key={a.id ?? a.label}
              href={a.href}
              {...commonProps}
              onClick={a.onClick}
            >
              {content}
            </a>
          ) : (
            <button
              key={a.id ?? a.label}
              type="button"
              {...commonProps}
              onClick={a.onClick}
              aria-label={a.label}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
