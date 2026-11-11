import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/authProvider.jsx'
import CartProvider from './context/CartProvider.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

function App() {
  return (
    <BrowserRouter>
 <AuthProvider>
 <CartProvider>
 <Routes>
 <Route element={<Layout />}>
 <Route index element={<HomePage />} />
 <Route path="vendor/:id" element={<VendorPage />} />
 <Route path="login" element={<LoginPage />} />
 {/* TODO: add back once src/pages/RegisterPage.jsx exists (and import it above)
 <Route path="register" element={<RegisterPage />} /> */}
 {/* Everything inside ProtectedRoute needs a signed-in user */}
 <Route path="register" element={<RegisterPage />} />
 <Route element={<ProtectedRoute />}>
 <Route path="cart" element={<CartPage />} />
 <Route path="orders" element={<OrdersPage />} />
 </Route>
 <Route path="*" element={<NotFoundPage />} />
 </Route>
 </Routes>
 </CartProvider>
 </AuthProvider>
</BrowserRouter>
  )
}

export default App
