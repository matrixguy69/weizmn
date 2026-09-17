/* ============================================
   LEVEL UP PROTOCOL — SVG Icons
   ============================================ */

const ICONS = {
  // Navigation
  dashboard: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>',
  quest: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6"/></svg>',
  habit: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v4M8 11v4M1 8h4M11 8h4"/><circle cx="8" cy="8" r="3"/></svg>',
  timer: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="9" r="6"/><path d="M8 5v4l2.5 2.5"/><path d="M6 1h4"/></svg>',
  achievement: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14V8a4 4 0 0 1 8 0v6"/><path d="M2 10h2M12 10h2"/><circle cx="8" cy="5" r="2"/></svg>',
  shop: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 5h12l-1.5 7H3.5L2 5z"/><path d="M5 5V4a3 3 0 0 1 6 0v1"/></svg>',
  settings: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M4.5 11.5L3 13"/></svg>',

  // Actions
  plus: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2v10M2 7h10"/></svg>',
  minus: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 7h10"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l3 3 5-5"/></svg>',
  close: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3l8 8M11 3l-8 8"/></svg>',
  delete: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4h10M5 4V3h4v1M4 4v8h6V4"/></svg>',

  // Status
  fire: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M7 1c0 3-3 4-3 7a4 4 0 0 0 8 0c0-3-3-4-3-7-1 2-2 2-2 0z"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="7,1 8.5,5 13,5.5 9.5,8.5 10.5,13 7,10.5 3.5,13 4.5,8.5 1,5.5 5.5,5"/></svg>',
  bolt: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1L3 8h4l-1 5 5-7H7l1-5z"/></svg>',
  medal: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="7" cy="8" r="4"/><path d="M5 4V2h4v2"/><path d="M5 4l-1 4M9 4l1 4"/></svg>',
  shield: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M7 1L2 3v4c0 4 5 6 5 6s5-2 5-6V3L7 1z"/></svg>',
  heart: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M7 12S1 8 1 4.5C1 2.5 2.5 1 4.5 1 5.5 1 6.5 1.5 7 2.5 7.5 1.5 8.5 1 9.5 1 11.5 1 13 2.5 13 4.5 13 8 7 12 7 12z"/></svg>',
  gem: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 5l5-3.5L12 5l-5 7L2 5z"/><path d="M2 5h10M7 1.5v10.5"/></svg>',
  coin: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="7" cy="7" r="5.5"/><path d="M5 5.5C5 4.7 5.9 4 7 4s2 .7 2 1.5S7.9 7 7 7 5 7.7 5 8.5 5.9 10 7 10"/></svg>',
  potion: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 1h4v3l3 7H2l3-7V1z"/><path d="M4 8h6"/></svg>',
  scroll: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 2h8v10H3z"/><path d="M3 2c0 0-2 0-2 2v8c0 2 2 2 2 2"/><path d="M5 5h4M5 7h4M5 9h2"/></svg>',
  key: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="5" cy="5" r="3"/><path d="M8 7l4 4"/><path d="M10 9l1 1"/></svg>',

  // Habits by category
  brain: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="7" r="5"/><path d="M6 12v2M10 12v2M5 14h6"/></svg>',
  posture: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="3" r="2"/><path d="M8 5v4M6 14l2-5 2 5M5 7h6"/></svg>',
  run: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="10" cy="2.5" r="1.5"/><path d="M7 5l2 2-2 3 3 2M5 14l2-4M10 7l-1 4"/></svg>',
  core: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="5" y="2" width="6" height="12" rx="1"/><path d="M8 2v12M5 5h6M5 8h6M5 11h6"/></svg>',
  stretch: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="3" r="2"/><path d="M8 5v3M4 14l4-6 4 6M3 8h10"/></svg>',

  // Misc
  export: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 1v8M3 5l4-4 4 4"/><path d="M1 10v2h12v-2"/></svg>',
  warning: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 1L1 12h12L7 1z"/><path d="M7 5v3M7 10v.5"/></svg>',
  success: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="6"/><path d="M4 7l2 2 4-4"/></svg>',
  info: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="6"/><path d="M7 6v4M7 4v.5"/></svg>',
};

window.ICONS = ICONS;
