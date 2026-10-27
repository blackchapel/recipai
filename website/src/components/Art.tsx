import { useId, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";

/**
 * Illustrations drawn from the app's own pieces (the first-run tour's art,
 * android/.../ui/welcome/WelcomeArt.kt) so they match the real screens and follow
 * light and dark through the same tokens.
 */

/** A small round plate: the app's stand-in for a recipe picture. */
export function Plate({ size }: { size: number }) {
  return <span className="plate" style={{ width: size, height: size }} aria-hidden="true" />;
}

/** A four-point star. */
export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`sparkle ${className ?? ""}`} style={style} viewBox="-10 -10 20 20" aria-hidden="true">
      <path d="M0 -10 Q2.8 -2.8 10 0 Q2.8 2.8 0 10 Q-2.8 2.8 -10 0 Q-2.8 -2.8 0 -10Z" fill="currentColor" />
    </svg>
  );
}

/* ---- the phone: a recipe that scales ---- */

const scales = [0.5, 1, 2, 3] as const;
const scaleLabels: Record<number, string> = { 0.5: "½×", 1: "1×", 2: "2×", 3: "3×" };

/** 1.5 -> "1½", 0.5 -> "½", 3 -> "3". Only the halves the demo needs. */
function qty(n: number): string {
  const whole = Math.floor(n);
  const half = n - whole >= 0.5 ? "½" : "";
  return `${whole === 0 && half ? "" : whole}${half}`;
}

function ingredients(k: number) {
  const grams = 400 * k;
  return [
    { name: "Tomatoes", amount: grams >= 1000 ? `${grams / 1000} kg` : `${grams} g` },
    { name: "Olive oil", amount: `${qty(k)} tbsp` },
    { name: "Stock", amount: `${qty(k)} ${k > 1 ? "cups" : "cup"}` },
  ];
}

/** Partly scaling time, as the app does it: the square root of the factor. */
const minutesFor = (k: number) => Math.round(20 * Math.sqrt(k));

/** The hero: a phone showing a recipe whose amounts follow the scale chips. */
export function PhoneRecipe() {
  const [k, setK] = useState<number>(2);
  const rows = ingredients(k);
  return (
    <div className="phone" role="group" aria-label="Recipai recipe screen, interactive example">
      <div className="phone-screen">
        <div className="p-hero">
          <Plate size={92} />
          <span className="p-badge">1 photo</span>
        </div>
        <div className="p-body">
          <div className="p-tags">
            <span className="tag tag-saffron">dinner</span>
            <span className="tag tag-basil">vegetarian</span>
          </div>
          <h3 className="p-title">Tomato soup</h3>
          <p className="p-meta">
            <span className="chip-time">
              <Icon name="clock" size={14} />
              <span className="mono">{minutesFor(k)} min</span>
            </span>
            <span className="mono p-serv">
              {k !== 1 && <s>4</s>} <b>{4 * k} servings</b>
            </span>
          </p>
          <div className="seg" role="group" aria-label="Scale the recipe">
            {scales.map((s) => (
              <button key={s} type="button" aria-pressed={s === k} className={s === k ? "on" : ""} onClick={() => setK(s)}>
                {scaleLabels[s]}
              </button>
            ))}
          </div>
          <ul className="p-list" aria-live="polite">
            {rows.map((r) => (
              <li key={r.name}>
                <span>{r.name}</span>
                <span className="mono amount">{r.amount}</span>
              </li>
            ))}
          </ul>
          <div className="p-step">
            <span className="p-n mono">1</span>
            <span>Simmer until thick</span>
            <span className="chip-time">
              <Icon name="timer" size={14} />
              <span className="mono">{minutesFor(k)} min</span>
            </span>
          </div>
          <div className="p-cta">
            <Icon name="flame" size={16} />
            Start cooking
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- import: messy text in, a tidy recipe out ---- */

export function ImportArt() {
  return (
    <div className="art" role="img" aria-label="Pasted text turning into a tidy recipe with ingredients, a step and a timer">
      <Sparkle className="s1" style={{ color: "var(--saffron)" }} />
      <Sparkle className="s2" style={{ color: "var(--ocean)" }} />
      <div className="art-note">
        <p className="art-label">
          <Icon name="clip" size={14} /> Pasted text
        </p>
        <p>Tomato soup ★★★★★ 212 reviews</p>
        <p>2 tbsp olive oil, 1 onion</p>
        <p>Simmer 20 minutes until thick</p>
        <p>Advertisement</p>
      </div>
      <div className="art-spark">
        <Icon name="spark" size={24} />
      </div>
      <div className="art-card">
        <div className="art-card-top">
          <Plate size={32} />
          <div>
            <b>Tomato soup</b>
            <div className="p-tags">
              <span className="tag tag-saffron">dinner</span>
              <span className="tag tag-basil">vegetarian</span>
            </div>
          </div>
        </div>
        <div className="art-pills">
          <span className="pill"><b className="mono">2 tbsp</b> olive oil</span>
          <span className="pill"><b className="mono">1</b> onion</span>
        </div>
        <div className="p-step flat">
          <span className="p-n mono">1</span>
          <span>Simmer until thick</span>
          <span className="chip-time">
            <Icon name="clock" size={14} />
            <span className="mono">20 min</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- backup: recipes up to your own Drive ---- */

export function BackupArt() {
  const id = useId();
  const g = `${id}g`;
  return (
    <div className="art art-backup" role="img" aria-label="Three recipes backed up to a cloud, labelled: your Drive, your files">
      <svg className="cloud" viewBox="0 0 300 150" aria-hidden="true">
        <defs>
          <linearGradient id={g} x1="40" y1="10" x2="260" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--ocean)" />
            <stop offset="1" stopColor="var(--ube)" />
          </linearGradient>
        </defs>
        <g fill={`url(#${g})`} opacity=".95">
          <circle cx="102" cy="78" r="44" />
          <circle cx="150" cy="58" r="54" />
          <circle cx="206" cy="82" r="40" />
          <rect x="44" y="82" width="214" height="60" rx="30" />
        </g>
      </svg>
      <span className="art-tick">
        <Icon name="check" size={24} />
      </span>
      <div className="art-dash" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="art-mini">
        {["Soup", "Pasta", "Cake"].map((t) => (
          <div key={t} className="mini">
            <Plate size={34} />
            <span>{t}</span>
          </div>
        ))}
      </div>
      <p className="art-lock">
        <Icon name="lock" size={13} /> Your Drive, your files
      </p>
      <Sparkle className="s1" style={{ color: "var(--saffron)" }} />
      <Sparkle className="s2" style={{ color: "var(--sumac)" }} />
      <Sparkle className="s3" style={{ color: "var(--basil)" }} />
    </div>
  );
}
