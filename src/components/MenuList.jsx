import { useSearchParams } from 'react-router'
import MenuItem from './MenuItem.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ vendor }) {
  const { addToCart } = useCart()

  // Week 4 feature: the category lives in the URL (/vendor/:id?cat=Rice),
  // so each filtered view has its own shareable link and survives Back/refresh.
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('cat') ?? 'All'

  function setCategory(c) {
    setSearchParams(c === 'All' ? {} : { cat: c })
  }

  // Derived from the menu: unique categories in the order they first appear
  const categories = ['All', ...new Set(vendor.menu.map((item) => item.category))]
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
