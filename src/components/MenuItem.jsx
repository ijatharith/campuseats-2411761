function MenuItem({ item, canOrder, onAdd }) {
  return (
    <li className="card menu-item">
      <div>
        <p className="cart-name">
          {item.name} {item.popular && <span className="tag">Popular</span>}
        </p>
        <p className="muted">{item.category}</p>
      </div>
      <p className="line-total">RM {item.price.toFixed(2)}</p>
      <button type="button" className="btn" disabled={!canOrder} onClick={() => onAdd(item)}>
        {canOrder ? 'Add' : 'Closed'}
      </button>
    </li>
  )
}

export default MenuItem