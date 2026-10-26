function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`card vendor-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <h3>{vendor.name}</h3>
      <p className="muted">{vendor.location}</p>
      <p className="muted">{vendor.openHours}</p>
      <span className={vendor.isOpen ? 'status open' : 'status closed'}>
        {vendor.isOpen ? 'Open' : 'Closed'}
      </span>
    </button>
  )
}

export default VendorCard