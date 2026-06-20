import React from "react";
import { MARK_VIEWBOX, SPIRAL_D, KNOT_D, SKETCH_DS, DOTS } from "@/lib/logoMark";

/** The coiled-boerewors mark on its own. Inherits color via `currentColor`. */
export function LogoMark({
  className = "",
  strokeWidth = 3.2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={SPIRAL_D}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={KNOT_D}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {SKETCH_DS.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {DOTS.map((dt, i) => (
        <circle key={i} cx={dt.cx} cy={dt.cy} r={dt.r} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Full stacked logo lockup (mark + wordmark). Inherits color via `currentColor`. */
export default function Logo({
  className = "",
  markClassName = "w-24 h-24 sm:w-28 sm:h-28",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <LogoMark className={markClassName} />
      <span className="mt-4 flex flex-col items-center leading-none font-sans">
        <span className="text-3xl sm:text-5xl font-semibold tracking-[0.22em] sm:tracking-[0.3em] pl-[0.22em] sm:pl-[0.3em]">
          SPICE ISLAND
        </span>
        <span className="mt-3 flex items-center gap-3 text-xs sm:text-sm tracking-[0.4em] pl-[0.4em]">
          <span className="h-px w-6 sm:w-8 bg-current opacity-60" aria-hidden="true"></span>
          BOEREWORS
          <span className="h-px w-6 sm:w-8 bg-current opacity-60" aria-hidden="true"></span>
        </span>
      </span>
    </span>
  );
}
