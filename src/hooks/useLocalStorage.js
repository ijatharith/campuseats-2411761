import { useEffect, useState } from 'react'

// Same shape as useState, but the value survives a page refresh.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      // Bad JSON in storage, or storage blocked (e.g. private mode): start fresh
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or blocked: the app still works, it just won't persist
    }
  }, [key, value])

  return [value, setValue]
}
