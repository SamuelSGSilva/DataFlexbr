const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

export const FEATURE_ICONS = {
  cpu: (
    <svg {...common}>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="0.5" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
  save: (
    <svg {...common}>
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M8 3v6h8V3M8 21v-7h8v7" />
    </svg>
  ),
  plug: (
    <svg {...common}>
      <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" />
      <path d="M12 16v5" />
    </svg>
  ),
  shieldCheck: (
    <svg {...common}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  calculator: (
    <svg {...common}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  ),
  cloud: (
    <svg {...common}>
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.3 8.02 4 4 0 0 1 17 18z" />
    </svg>
  ),
  layers: (
    <svg {...common}>
      <path d="M12 3 3 8l9 5 9-5z" />
      <path d="M3 13l9 5 9-5M3 18l9 5 9-5" />
    </svg>
  ),
  puzzle: (
    <svg {...common}>
      <path d="M9 4h4v2.5a1.5 1.5 0 0 0 3 0V4h4v4h-2.5a1.5 1.5 0 0 0 0 3H20v4h-4v-2.5a1.5 1.5 0 0 0-3 0V15H9v-4H6.5a1.5 1.5 0 0 1 0-3H9z" />
    </svg>
  ),
  refresh: (
    <svg {...common}>
      <path d="M4 12a8 8 0 0 1 14-5.3L21 9" />
      <path d="M21 4v5h-5" />
      <path d="M20 12a8 8 0 0 1-14 5.3L3 15" />
      <path d="M3 20v-5h5" />
    </svg>
  ),
  mapPin: (
    <svg {...common}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  cursorClick: (
    <svg {...common}>
      <path d="M8 3l9 9-4 1-2 5-3-15z" />
    </svg>
  ),
  headset: (
    <svg {...common}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19a4 4 0 0 1-4 4h-2" />
    </svg>
  ),
} as const;

export type FeatureIconName = keyof typeof FEATURE_ICONS;
