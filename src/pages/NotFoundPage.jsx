import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="card">
      <h2>404</h2>
      <p className="muted">No page here.</p>
      <p><Link to="/">Back to vendors</Link></p>
    </div>
  )
}

export default NotFoundPage
