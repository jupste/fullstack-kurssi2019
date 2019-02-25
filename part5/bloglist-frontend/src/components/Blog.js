import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, addLike, deleteBlog, renderDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showAll, setVisible] = useState(false)

  const showInfo = (blog, addLike, deleteBlog, renderDelete) => (
    <div>
      {showAll ? (
        <div className="expanded">
          <div className="titleAndAuthor">
            Blogi: {blog.title}, Tekijä: {blog.author}
          </div>
          <div className="url">
            URL: <a href={blog.url}> {blog.url}</a>
          </div>
          {blog.likes} tykkäystä
          <button onClick={addLike}>tykkää</button>
          <div className="user"> lisännyt {blog.user.name}</div>
        </div>
      ) : (
        <div className="simple">
          Blogi: {blog.title}, Tekijä: {blog.author}
        </div>
      )}
      {renderDelete ? <button onClick={deleteBlog}>poista</button> : <div />}
    </div>
  )
  const toggleShow = () => {
    setVisible(!showAll)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleShow}>
        {showInfo(blog, addLike, deleteBlog, renderDelete)}
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  renderDelete: PropTypes.bool.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
export default Blog
