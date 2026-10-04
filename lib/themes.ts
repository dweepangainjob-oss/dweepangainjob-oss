export const themes = [
  { name: 'tokyo-night', label: 'Tokyo Night' },
  { name: 'catppuccin', label: 'Catppuccin Mocha' },
  { name: 'dracula', label: 'Dracula' },
  { name: 'gruvbox', label: 'Gruvbox' },
  { name: 'nord', label: 'Nord' },
  { name: 'matrix', label: 'Matrix' },
  { name: 'paper', label: 'Rosé Paper (light)' },
] as const

export type ThemeName = (typeof themes)[number]['name']

export const themeNames = themes.map((t) => t.name) as ThemeName[]

export function isThemeName(value: string): value is ThemeName {
  return (themeNames as string[]).includes(value)
}

export const THEME_STORAGE_KEY = 'cli-portfolio-theme'
