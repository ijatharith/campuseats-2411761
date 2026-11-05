import { useEffect, useState } from 'react'

// The Week 3 fetch logic, moved out of App so any page can use it.
export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    // Week 3 stretch task: wait 600 ms so the loading state is visible
    const timer = setTimeout(() => {
      fetch('/api/vendors.json', { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then((data) => setVendors(data))
        .catch((err) => {
          if (err.name !== 'AbortError') setError(err.message)
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false)
        })
    }, 600)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [reloadKey])

  // Reset the status in the handler, not inside the effect
  function reload() {
    setLoading(true)
    setError(null)
    setReloadKey((k) => k + 1)
  }

  return { vendors, loading, error, reload }
}
