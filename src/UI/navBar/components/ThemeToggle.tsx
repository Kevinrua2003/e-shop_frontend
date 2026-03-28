'use client'

import React from 'react'
import { useTheme } from '@/providers/theme/components/ThemeProvider'
import { MdDarkMode, MdLightMode, MdWater } from 'react-icons/md'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2
        rounded-[var(--radius-md)]
        text-[hsl(var(--text-secondary))]
        hover:text-[hsl(var(--accent))]
        hover:bg-[hsl(var(--surface-hover))]
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MdDarkMode size={22} />
      ) : (
        <MdLightMode size={22} />
      )}
    </button>
  )
}

export default ThemeToggle
