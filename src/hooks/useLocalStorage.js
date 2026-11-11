import { useEffect, useState } from 'react'

function read(key, initialValue) {
  if (key === null) return initialValue // no key (e.g. a guest): nothing to load
  try {
    const saved = localStorage.getItem(key)
    return saved !== null ? JSON.parse(saved) : initialValue
  } catch {
    // Bad JSON in storage, or storage blocked (e.g. private mode): start fresh
    return initialValue
  }
}

// Same shape as useState, but the value survives a page refresh.
// Pass null as the key to get plain state that is never saved (used for guests).
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue))

  // The key can change while the component is on screen: after a refresh the
  // user is null for a moment, then Firebase answers and the key gets their uid.
  // Load the value stored under the new key before anything is saved to it.
  const [loadedKey, setLoadedKey] = useState(key)
  if (key !== loadedKey) {
    setLoadedKey(key)
    setValue(read(key, initialValue))
  }

  useEffect(() => {
    if (key === null) return // guests: do not save
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or blocked: the app still works, it just won't persist
    }
  }, [key, value])

  return [value, setValue]
}
