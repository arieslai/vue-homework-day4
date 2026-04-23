import { defineStore } from 'pinia'
import { ref } from 'vue'

const THEME_STORAGE_KEY = 'auo-theme'

const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref('dark')

  const initTheme = () => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    currentTheme.value = saved ?? 'dark'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme.value)
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }

  return { currentTheme, initTheme, toggleTheme }
})

export { useThemeStore }
