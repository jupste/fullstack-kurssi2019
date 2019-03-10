import React, { useState, useEffect } from 'react'
import userService from '../services/users.js'

const User = props => {
  const [user, setUser] = useState('')
  useEffect(() => {
    userService.getById(props.userId).then(user => {
      setUser(user)
    })
  }, [])
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map(blog => {
            return (
              <li key={blog.id}>
                {blog.title} by {blog.author}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return null
}

export default User
