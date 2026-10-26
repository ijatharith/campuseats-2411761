import MenuItem from './MenuItem.jsx'

function MenuList({ vendor, onAdd }) {
  return (
    <section>
      <h2>{vendor.name} menu</h2>
      <ul className="menu-list">
        {vendor.menu.map((item) => (
          <MenuItem key={item.id} item={item} canOrder={vendor.isOpen} onAdd={onAdd} />
        ))}
      </ul>
    </section>
  )
}

export default MenuList