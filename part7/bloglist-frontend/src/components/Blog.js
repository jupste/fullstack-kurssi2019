import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import CommentForm from './CommentForm'
const Blog = ({ addLike, deleteBlog, renderDelete, blogId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blog, setBlog] = useState('')
  useEffect(() => {
    blogService.getById(blogId).then(blog => {
      setBlog(blog)
    })
  }, [])

  if (blog) {
    return (
      <div style={blogStyle}>
        <div>
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
          {renderDelete ? (
            <button onClick={deleteBlog}>poista</button>
          ) : (
            <div />
          )}
          <br />
          <div>
            <strong>Kommentit:</strong>{' '}
          </div>
          {blog.comments.map(comment => (
            <div>{comment}</div>
          ))}
          <CommentForm entry={blogId} setBlog={setBlog} />
        </div>
      </div>
    )
  }
  return null
}
Blog.propTypes = {
  renderDelete: PropTypes.bool.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
export default Blog
