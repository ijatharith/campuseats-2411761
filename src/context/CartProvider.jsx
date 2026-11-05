import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

// Owns the cart and the orders. Every page reads them with useCart().
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', []) // [{ item, qty }]
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  // Derived, never stored
  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
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

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) => (line.item.id === itemId ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0) // qty 0 → line disappears
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  // details = { name, mahallah, pickupTime } from the checkout form
  function placeOrder(details) {
    const order = {
      id: String(Date.now()),
      ...details,
      items: cart,
      total,
      placedAt: new Date().toISOString(),
    }
    setOrders((prev) => [order, ...prev]) // newest first
    setCart([])
  }

  const value = { cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder }

  return <CartContext value={value}>{children}</CartContext>
}

export default CartProvider
