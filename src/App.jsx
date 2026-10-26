import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  // ---------- Fetched data ----------
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedId, setSelectedId] = useState(null)

  // ---------- Cart and views ----------
  const [cart, setCart] = useState([]) // [{ item, qty }]
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // ---------- Fetch vendors ----------
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) setSelectedId(data[0].id) // select first vendor
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort() // cleanup
  }, [reloadKey]) // Try again changes reloadKey, so this runs again

  const selectedVendor = vendors.find((v) => v.id === selectedId)

  // ---------- Cart handlers ----------
  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0) // qty 0 → line disappears
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // ---------- Derived values ----------
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  // ---------- Choose what to show ----------
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done' && lastOrder) {
    content = (
      <div className="card">
        <h2>Order placed</h2>
        <p>
          Thank you, {lastOrder.name}. Please pick up your order at{' '}
          <strong>{lastOrder.pickupTime}</strong> (Mahallah {lastOrder.mahallah}).
        </p>
        <p>Total: <strong>RM {lastOrder.total.toFixed(2)}</strong></p>
        <button type="button" className="btn" onClick={() => setView('menu')}>
          Back to menus
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    content = (
      <>
        <section>
          <h2>Vendors</h2>
          <div className="vendor-grid">
            {vendors.map((v) => (
              <VendorCard
                key={v.id}
                vendor={v}
                isSelected={v.id === selectedId}
                onSelect={() => setSelectedId(v.id)}
              />
            ))}
          </div>
        </section>
        {selectedVendor && <MenuList vendor={selectedVendor} onAdd={handleAddToCart} />}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App