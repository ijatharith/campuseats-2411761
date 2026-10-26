import { useState } from 'react'
import MenuItem from './MenuItem.jsx'

function MenuList({ vendor, onAdd }) {
  const [category, setCategory] = useState('All')

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
          <MenuItem key={item.id} item={item} canOrder={vendor.isOpen} onAdd={onAdd} />
        ))}
      </ul>
    </section>
  )
}

export default MenuList
