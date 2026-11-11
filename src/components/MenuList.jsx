import { useSearchParams } from 'react-router'
import MenuItem from './MenuItem.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function MenuList({ vendor }) {
  const { addToCart } = useCart()

  // Week 4 feature: the category lives in the URL (/vendor/:id?cat=Rice),
  // so each filtered view has its own shareable link and survives Back/refresh.
  const [searchParams, setSearchParams] = useSearchParams()

  // Week 5 feature: each signed-in user's preferred category is remembered
  // under their own key. Guests get a null key: they start on "All", unsaved.
  const { user } = useAuth()
  const [savedCategory, setSavedCategory] = useLocalStorage(
    user ? 'ce-category-' + user.uid : null,
    'All',
  )

  function setCategory(c) {
    setSavedCategory(c)
    setSearchParams(c === 'All' ? {} : { cat: c })
  }

  // Derived from the menu: unique categories in the order they first appear
  const categories = ['All', ...new Set(vendor.menu.map((item) => item.category))]

  // A category in the URL wins (shared link); otherwise use the saved one.
  // If this vendor does not have that category, fall back to "All".
  const wanted = searchParams.get('cat') ?? savedCategory
  const category = categories.includes(wanted) ? wanted : 'All'
  const visible =
    category === 'All' ? vendor.menu : vendor.menu.filter((item) => item.category === category)

  return (
    <section>
      <h2>{vendor.name} menu</h2>
      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${c === category ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="menu-list">
        {visible.map((item) => (
          <MenuItem key={item.id} item={item} canOrder={vendor.isOpen} onAdd={addToCart} />
        ))}
      </ul>
    </section>
  )
}

export default MenuList
