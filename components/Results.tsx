"use client";

import { useT } from "./LanguageProvider";
import { CountUp } from "./CountUp";

// Average revenue generated per collaborating partner (USD).
// Months 1–2 are preparation (no revenue by design); revenue ramps from month 3.
const DATA = [0, 0, 4000, 5500, 6800, 8000, 9200, 10500, 11800, 13000];
const N = DATA.length;
const MAXY = 14000;
const GRID = [0, 4000, 8000, 12000];

// viewBox geometry
const VBW = 640, VBH = 340, PL = 56, PR = 20, PT = 22, PB = 42;
const PW = VBW - PL - PR;
const PH = VBH - PT - PB;
const xAt = (i: number) => PL + (i / (N - 1)) * PW;
const yAt = (v: number) => PT + (1 - v / MAXY) * PH;
const money = (v: number) => (v >= 1000 ? `$${v / 1000}k` : `$${v}`);

export function Results() {
  const t = useT();
  const r = t.results;

  const pts = DATA.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`);
  const linePath = "M " + pts.join(" L ");
  const areaPath = `M ${xAt(0)},${yAt(0)} L ${pts.join(" L ")} L ${xAt(N - 1)},${yAt(0)} Z`;
  const prepX0 = xAt(0);
  const prepX1 = xAt(1);

  return (
    <section className="section results" id="results">
      <div className="wrap">
        <header className="section-head section-head--center reveal">
          <p className="section-kicker">{r.kicker}</p>
          <h2>{r.title}</h2>
          <p className="section-sub">{r.sub}</p>
        </header>

        <div className="results-grid">
          <div className="results-copy reveal">
            {r.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="results-stats">
              {r.stats.map((s) => (
                <div className="results-stat" key={s.label}>
                  <CountUp className="rs-value" value={s.value} />
                  <span className="rs-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <figure className="results-chart reveal">
            <svg viewBox={`0 0 ${VBW} ${VBH}`} role="img" aria-label={`${r.title} ${r.note}`} preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5b942" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#f5b942" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="35%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#f5b942" />
                </linearGradient>
              </defs>

              {/* preparation zone */}
              <rect x={prepX0} y={PT} width={prepX1 - prepX0} height={PH} fill="#ffffff" opacity="0.03" />
              <text x={(prepX0 + prepX1) / 2} y={PT + 14} textAnchor="middle" className="chart-zone">{r.prep}</text>
              <text x={(prepX1 + xAt(N - 1)) / 2} y={PT + 14} textAnchor="middle" className="chart-zone chart-zone--accent">{r.ramp}</text>

              {/* gridlines + y labels */}
              {GRID.map((v) => (
                <g key={v}>
                  <line x1={PL} y1={yAt(v)} x2={VBW - PR} y2={yAt(v)} stroke="rgba(148,163,184,.16)" strokeWidth="1" strokeDasharray={v === 0 ? "0" : "3 4"} />
                  <text x={PL - 10} y={yAt(v) + 4} textAnchor="end" className="chart-axis">{money(v)}</text>
                </g>
              ))}

              {/* x labels */}
              {DATA.map((_, i) => (
                <text key={i} x={xAt(i)} y={VBH - PB + 20} textAnchor="middle" className="chart-axis">{i + 1}</text>
              ))}
              <text x={PL + PW / 2} y={VBH - 4} textAnchor="middle" className="chart-axis chart-axis--title">{r.axisX}</text>

              {/* area + line */}
              <path className="chart-area" d={areaPath} fill="url(#areaFill)" />
              <path d={linePath} fill="none" stroke="url(#lineStroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* dots */}
              {DATA.map((v, i) => (
                <circle key={i} cx={xAt(i)} cy={yAt(v)} r={i === 2 || i === N - 1 ? 5.5 : 3} fill={i === 2 || i === N - 1 ? "#f5b942" : "#060a13"} stroke="#f5b942" strokeWidth="2" />
              ))}

              {/* emphasised value labels */}
              <text x={xAt(2)} y={yAt(DATA[2]) - 14} textAnchor="middle" className="chart-value">$4K+</text>
              <text x={xAt(N - 1)} y={yAt(DATA[N - 1]) - 14} textAnchor="middle" className="chart-value">$13K+</text>
            </svg>
            <figcaption>{r.note}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
