import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const BlogList = ({ blogs }) => {
  const style = {
    paddingTop: 8,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  return (
    <div>
      <h2>Blogs:</h2>
      <Table striped>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id} style={style}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
