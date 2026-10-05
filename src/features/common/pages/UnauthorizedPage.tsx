import React from 'react'

export default function UnauthorizedPage() {
  return (
    <div className="system-screen">
      <div className="card state state--error">
        <h1>Unauthorized</h1>
        <p className="section-description">You don't have permission to view this page.</p>
      </div>
    </div>
  )
}
