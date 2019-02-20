import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('väärä käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3500)
    }
  }
  const logout = () => {
    setUser(null)
    window.localStorage.setItem('loggedBlogappUser', null)
  }
  const loggoutButton = () => <button onClick={logout}>logout</button>

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )
  const handleBlogChange = event => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }
  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
    })
    setNotificationMessage(`lisätty tekijän ${newAuthor} blogi "${newBlog}"`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3500)
  }
  const blogForm = () => (
    <Togglable buttonLabel="lisää uusi">
      <h2>lisää uusi</h2>
      <form onSubmit={addBlog}>
        title
        <input value={newBlog} onChange={handleBlogChange} />
        <br />
        author <input value={newAuthor} onChange={handleAuthorChange} />
        <br />
        url <input value={newUrl} onChange={handleUrlChange} />
        <br />
        <button type="submit">tallenna</button>
      </form>
    </Togglable>
  )
  const errorBar = () => <span className="error">{errorMessage}</span>
  const notificationBar = () => (
    <span className="notification">{notificationMessage}</span>
  )
  return (
    <div>
      {errorBar()}
      {notificationBar()}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} kirjautunut</p>
          {loggoutButton()}
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
