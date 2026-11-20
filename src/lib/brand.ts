// Brand palette: coral + midnight plum.
// Literal hex values (not CSS vars) because several React Bits components
// resolve colours through a canvas context, which cannot read var(--…).
// Keep in sync with the tokens in src/index.css.
export const brand = {
  coral: {
    300: '#FF9E91',
    500: '#FF6B5B',
    600: '#E5483A',
    700: '#C93A2D', // AA-safe coral for text on cream
  },
  plum: {
    300: '#B49ABD',
    700: '#432850',
    800: '#2E1A36',
    900: '#1F1026',
    950: '#140A18',
  },
  cream: '#FFF4EF',
} as const
