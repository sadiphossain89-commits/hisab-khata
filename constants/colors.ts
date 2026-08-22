/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#1B2521',
    tint: '#C8673D',

    // Core surfaces
    background: '#F8F5EF',
    foreground: '#1B2521',

    // Cards / elevated surfaces
    card: '#FFFDF9',
    cardForeground: '#1B2521',

    // Primary action color (buttons, links, active states)
    primary: '#C8673D',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#E8F0E8',
    secondaryForeground: '#2C553C',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EEE9DF',
    mutedForeground: '#718078',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#F2D8C7',
    accentForeground: '#8F4428',

    // Destructive actions (delete, error states)
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#E3DED3',
    input: '#D7D0C3',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
