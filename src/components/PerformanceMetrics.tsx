import React, { useId } from "react";
import "../styles/performanceMetrics.css";

export type MetricTone = "emerald" | "blue" | "amber" | "violet" | "red";
export type PerfMetric = {
  id: string;
  label: string;
  valueLabel: string;      // "94%" / "4.9/5" / "+18%"
  percent: number;         // 0..100 for the bar
  tone?: MetricTone;
  trend?: { value: string; direction: "up" | "down" | "flat" }; // optional chip
  series?: number[];       // optional sparkline data (0..100)
};

export type PerformanceMetricsProps = {
  title?: string;
  metrics: PerfMetric[];
  animate?: boolean;
  className?: string;
};

const toneMap: Record<MetricTone, { from: string; to: string; text: string }> = {
  emerald: { from: "#10b981", to: "#34d399", text: "#b6ffe0" },
  blue:    { from: "#3b82f6", to: "#60a5fa", text: "#d7e9ff" },
  amber:   { from: "#f59e0b", to: "#fbbf24", text: "#fff0c9" },
  violet:  { from: "#8b5cf6", to: "#a78bfa", text: "#efe4ff" },
  red:     { from: "#ef4444", to: "#f87171", text: "#ffd7d7" },
};

function Sparkline({
  data = [],
  tone = "emerald",
}: {
  data?: number[];
  tone?: MetricTone;
}) {
  const id = useId();
  const w = 120, h = 36, pad = 2;
  const vals = data.length ? data : [10, 20, 40, 30, 55, 65, 72, 68, 90];
  const min = 0, max = 100;
  const sx = (i: number) => pad + (i / (vals.length - 1)) * (w - pad * 2);
  const sy = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const d = vals.map((v, i) => `${i === 0 ? "M" : "L"} ${sx(i)} ${sy(v)}`).join(" ");
  const { from, to } = toneMap[tone];
  return (
    <svg className="pm-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} stopOpacity="0.55" />
          <stop offset="100%" stopColor={to} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`} fill={`url(#g-${id})`} />
      <path d={d} fill="none" stroke={from} strokeWidth="2" />
    </svg>
  );
}

function TrendChip({ trend }: { trend?: PerfMetric["trend"] }) {
  if (!trend) return null;
  const icon =
    trend.direction === "up" ? "fas fa-arrow-up" :
    trend.direction === "down" ? "fas fa-arrow-down" : "fas fa-minus";
  const cls =
    trend.direction === "up" ? "trend up" :
    trend.direction === "down" ? "trend down" : "trend flat";
  return (
    <span className={cls}>
      <i className={icon} aria-hidden="true" />
      {trend.value}
    </span>
  );
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  title = "Performance Metrics",
  metrics,
  animate = true,
  className,
}) => {
  return (
    <div className={["card", "pm-card", className].filter(Boolean).join(" ")}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="pm-list">
        {metrics.map((m, idx) => {
          const tone = m.tone ?? "emerald";
          const g = toneMap[tone];
          const pct = Math.max(0, Math.min(100, m.percent));
          return (
            <div
              key={m.id}
              className={["pm-item", animate && "animate-in"].filter(Boolean).join(" ")}
              style={{ ["--delay" as any]: `${idx * 70}ms` }}
            >
              <div className="pm-top">
                <div className="pm-title">
                  <span className="pm-label">{m.label}</span>
                  <TrendChip trend={m.trend} />
                </div>
                <div className="pm-value" style={{ color: g.text }}>{m.valueLabel}</div>
              </div>

              <div className="pm-barwrap">
                <div className="pm-bartrack">
                  <div
                    className="pm-barfill"
                    style={
                      {
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${g.from}, ${g.to})`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="pm-cap" />
                    <span className="pm-stripes" />
                  </div>
                </div>
                {m.series && <Sparkline data={m.series} tone={tone} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
