import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showAll, setVisible] = useState(false)

  const showInfo = blog => (
    <div>
      {showAll ? (
        <div>
          <div>
            Blogi: {blog.title}, Tekijä: {blog.author}
          </div>
          <div>
            URL: <a href={blog.url}> {blog.url}</a>
          </div>
          {blog.likes} tykkäystä
          <button>tykkää</button>
          <div> lisännyt {blog.user.name}</div>
        </div>
      ) : (
        `Blogi: ${blog.title}, Tekijä: ${blog.author}`
      )}
    </div>
  )
  const toggleShow = () => {
    setVisible(!showAll)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleShow}>{showInfo(blog)}</div>
    </div>
  )
}

export default Blog
