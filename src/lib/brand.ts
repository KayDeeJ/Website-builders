// Union Motor Trade palette: coral ("brass" in the site's own CSS) on midnight plum.
// Literal hex values (not CSS vars) because several React Bits components resolve
// colours through a canvas context, which cannot read var(--…).
// Keep in sync with the tokens in src/umt/legacy.css (:root) and src/index.css.
export const brand = {
  coral: {
    300: '#FF9A8A',
    500: '#FF5D5D', // --brass
    600: '#E54848',
    700: '#C02E2E', // --brass-t, coral for text on light grounds
  },
  plum: {
    300: '#B3A6BD', // --muted (dark)
    700: '#3A2A47', // --line (dark)
    800: '#2B1640', // --hero
    900: '#1E1426', // --ink (light), --on-brass
    950: '#140A1C', // --bg (dark)
  },
  cream: '#FBF8FA', // --bg (light)
} as const
