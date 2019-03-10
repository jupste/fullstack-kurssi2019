import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/users">
          users
        </Link>
        <Link style={padding} to="/">
          blogs
        </Link>
      </div>
    </div>
  )
}
export default Menu
