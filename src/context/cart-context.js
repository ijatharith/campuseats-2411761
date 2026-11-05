import { createContext } from 'react'

// Kept in its own file so CartProvider.jsx only exports a component (Fast Refresh rule).
export const CartContext = createContext(null)
