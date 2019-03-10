import React, { useState } from 'react'
import blogService from '../services/blogs'

const CommentForm = ({ entry, setBlog }) => {
  const [content, setContent] = useState('')

  const addComment = async event => {
    event.preventDefault()
    if (!content) {
      return
    }
    try {
      const blog = await blogService.addComment(entry, content)
      setBlog(blog)
      setContent('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleFieldChange = event => {
    setContent(event.target.value)
  }
  return (
    <div>
      <form onSubmit={addComment}>
        <input type="text" value={content} onChange={handleFieldChange} />
        <button type="submit">lisää kommentti</button>
      </form>
    </div>
  )
}

export default CommentForm
